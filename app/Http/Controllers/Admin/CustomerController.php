<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $customers = Booking::query()
            ->select('full_name', 'phone', 'email')
            ->selectRaw('COUNT(*) as total_bookings')
            ->selectRaw('MAX(created_at) as last_booking')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->groupBy('full_name', 'phone', 'email')
            ->orderByDesc('last_booking')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/customers', [
            'customers' => $customers,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function show(Request $request)
    {
        $phone = $request->query('phone');

        abort_if(!$phone, 404);

        $bookings = Booking::query()
            ->where('phone', $phone)
            ->orderByDesc('created_at')
            ->get();

        abort_if($bookings->isEmpty(), 404);

        $customer = [
            'full_name' => $bookings->first()->full_name,
            'phone' => $bookings->first()->phone,
            'email' => $bookings->first()->email,
            'total_bookings' => $bookings->count(),
        ];

        return Inertia::render('admin/customer-details', [
            'customer' => $customer,
            'bookings' => $bookings,
        ]);
    }
}
