<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:30',
            'email' => 'nullable|email|max:255',
            'service_type' => 'required|string|max:100',
            'trip_type' => 'required|in:arrival,departure',
            'airport' => 'required|string|max:255',
            'travel_date' => 'required|date|after_or_equal:today',
            'flight_number' => 'nullable|string|max:50',
            'passenger_count' => 'required|integer|min:1|max:100',
            'message' => 'nullable|string|max:2000',

            // Plan and vehicle selection
            'plan_name' => 'required|in:Basic,Standard,Premium',
            'car_type' => 'required|in:Private Car,Noah,HiAce,Hearse',
            'destination' => 'required|string|max:255',
            'car_trip_type' => 'required|in:one_way,round_trip',
            'currency' => 'required|in:BDT,USD',
        ]);

        // Get current admin pricing settings
        $settings = DB::table('pricing_settings')
            ->where('id', 1)
            ->first();

        if (!$settings) {
            throw ValidationException::withMessages([
                'plan_name' => 'Pricing settings are not configured.',
            ]);
        }

        // Plan prices per passenger
        $planPrices = [
            'Basic' => (float) $settings->basic_plan_price,
            'Standard' => (float) $settings->standard_plan_price,
            'Premium' => (float) $settings->premium_plan_price,
        ];

        $planUnitPrice = $planPrices[$validated['plan_name']];

        // Calculate plan subtotal
        $planSubtotal = round(
            $planUnitPrice * $validated['passenger_count'],
            2
        );

        // Vehicle rates per kilometer from Admin Settings
        $vehicleRates = [
            'Private Car' => (float) $settings->private_car_rate,
            'Noah' => (float) $settings->noah_rate,
            'HiAce' => (float) $settings->hiace_rate,
            'Hearse' => (float) $settings->hearse_rate,
        ];

        $carRate = $vehicleRates[$validated['car_type']];

        // Airport origin
        $origin = 'Hazrat Shahjalal International Airport, Dhaka, Bangladesh';

        // Exchange rate snapshot
        $exchangeRate = (float) $settings->usd_rate;

        // Temporary system:
        // Actual route distance and vehicle fare will be confirmed by Admin.
        $routeDistance = 0;
        $chargedDistance = 0;
        $carFare = 0;

        // Current total includes plan price only.
        // Vehicle fare is pending Admin confirmation.
        $totalAmount = $planSubtotal;

        $booking = Booking::create([
            // Booking reference
            'booking_reference' => 'SAP-' . strtoupper(Str::random(8)),

            // Customer details
            'full_name' => $validated['full_name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'service_type' => $validated['service_type'],
            'trip_type' => $validated['trip_type'],
            'airport' => $validated['airport'],
            'travel_date' => $validated['travel_date'],
            'flight_number' => $validated['flight_number'] ?? null,
            'passenger_count' => $validated['passenger_count'],
            'message' => $validated['message'] ?? null,

            'status' => 'pending',

            // Plan pricing
            'plan_name' => $validated['plan_name'],
            'plan_unit_price' => $planUnitPrice,
            'plan_subtotal' => $planSubtotal,

            // Currency
            'currency' => $validated['currency'],
            'exchange_rate_bdt_per_usd' => $exchangeRate,

            // Vehicle information
            'car_type' => $validated['car_type'],
            'car_rate_per_km' => $carRate,

            // Journey information
            'origin' => $origin,
            'destination' => $validated['destination'],
            'car_trip_type' => $validated['car_trip_type'],

            // Distance pending Admin confirmation
            'route_distance_km' => $routeDistance,
            'charged_distance_km' => $chargedDistance,

            // Vehicle fare pending Admin confirmation
            'car_fare' => $carFare,
            'total_amount' => $totalAmount,
        ]);

        return redirect()->back()->with(
            'success',
            'Your booking request has been submitted successfully! Reference: ' .
            $booking->booking_reference .
            '. Vehicle fare will be confirmed by our team.'
        );
    }
}
