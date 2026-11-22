<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Payment;
use App\Models\ProtocolStaff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $totalBookings = Booking::count();

        $todayBookings = Booking::whereDate('created_at', $today)->count();

        $pendingBookings = Booking::where('status', 'pending')->count();

        $confirmedBookings = Booking::where('status', 'confirmed')->count();

        $completedBookings = Booking::where('status', 'completed')->count();

        $cancelledBookings = Booking::where('status', 'cancelled')->count();

        // Payment Statistics
        $totalRevenue = Payment::where('status', 'paid')->sum('amount');

        $pendingPayments = Payment::where('status', 'unpaid')->sum('amount');

        // Active Protocol Staff
        $activeProtocolStaff = ProtocolStaff::where('status', 'active')->count();

        $upcomingArrivals = Booking::where('trip_type', 'arrival')
            ->whereDate('travel_date', '>=', $today)
            ->whereIn('status', ['pending', 'confirmed'])
            ->orderBy('travel_date')
            ->get();

        $upcomingDepartures = Booking::where('trip_type', 'departure')
            ->whereDate('travel_date', '>=', $today)
            ->whereIn('status', ['pending', 'confirmed'])
            ->orderBy('travel_date')
            ->get();

        $recentBookings = Booking::latest()
            ->take(10)
            ->get();

        $lastThreeMonthsCustomers = Booking::where('created_at', '>=', now()->subMonths(3))
            ->select('full_name', 'phone', 'email', 'created_at')
            ->latest()
            ->get();

        $monthlyBookings = Booking::where('created_at', '>=', now()->subMonths(5)->startOfMonth())
            ->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as total')
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalBookings' => $totalBookings,
                'todayBookings' => $todayBookings,
                'pendingBookings' => $pendingBookings,
                'confirmedBookings' => $confirmedBookings,
                'completedBookings' => $completedBookings,
                'cancelledBookings' => $cancelledBookings,
                'totalRevenue' => $totalRevenue,
                'pendingPayments' => $pendingPayments,
                'activeProtocolStaff' => $activeProtocolStaff,
                'upcomingArrivals' => $upcomingArrivals->count(),
                'upcomingDepartures' => $upcomingDepartures->count(),
            ],

            'recentBookings' => $recentBookings,
            'upcomingArrivals' => $upcomingArrivals,
            'upcomingDepartures' => $upcomingDepartures,
            'lastThreeMonthsCustomers' => $lastThreeMonthsCustomers,
            'monthlyBookings' => $monthlyBookings,
        ]);
    }
}
