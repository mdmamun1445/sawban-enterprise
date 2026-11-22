<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingManagementController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $bookings = Booking::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('booking_reference', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/bookings', [
            'bookings' => $bookings,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    // Booking Details
    public function show(Booking $booking)
    {
        return Inertia::render('admin/booking-details', [
            'booking' => $booking,
        ]);
    }

    // Update Booking Status
    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
        ]);

        $booking->update([
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with(
            'success',
            'Booking status updated successfully!'
        );
    }
}
