<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $payments = Payment::with('booking')
            ->when($search, function ($query) use ($search) {
                $query->whereHas('booking', function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('booking_reference', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $availableBookings = Booking::whereDoesntHave('payment')
            ->select('id', 'booking_reference', 'full_name', 'phone', 'service_type')
            ->latest()
            ->get();

        return Inertia::render('admin/payments', [
            'payments' => $payments,
            'filters' => ['search' => $search],
            'availableBookings' => $availableBookings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id|unique:payments,booking_id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|in:cash,bank_transfer,mobile_banking,card',
            'transaction_reference' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $validated['status'] = 'unpaid';

        Payment::create($validated);

        return redirect()->back()->with('success', 'Payment record created successfully!');
    }

    public function updateStatus(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'status' => 'required|in:paid,unpaid',
        ]);

        $payment->update([
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'Payment status updated successfully!');
    }
}
