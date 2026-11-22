<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    protected $connection = 'mysql';

    protected $fillable = [
        // Booking Information
        'booking_reference',
        'full_name',
        'phone',
        'email',
        'service_type',
        'trip_type',
        'airport',
        'travel_date',
        'flight_number',
        'passenger_count',
        'message',
        'status',

        // Plan Pricing
        'plan_name',
        'plan_unit_price',
        'plan_subtotal',

        // Currency
        'currency',
        'exchange_rate_bdt_per_usd',

        // Vehicle Information
        'car_type',
        'car_rate_per_km',

        // Journey Information
        'origin',
        'destination',
        'car_trip_type',

        // Distance Information
        'route_distance_km',
        'charged_distance_km',

        // Fare Information
        'car_fare',
        'total_amount',
    ];

    protected function casts(): array
    {
        return [
            'travel_date' => 'date',
            'passenger_count' => 'integer',

            'plan_unit_price' => 'decimal:2',
            'plan_subtotal' => 'decimal:2',

            'exchange_rate_bdt_per_usd' => 'decimal:2',

            'car_rate_per_km' => 'decimal:2',
            'route_distance_km' => 'decimal:2',
            'charged_distance_km' => 'decimal:2',

            'car_fare' => 'decimal:2',
            'total_amount' => 'decimal:2',
        ];
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
}
