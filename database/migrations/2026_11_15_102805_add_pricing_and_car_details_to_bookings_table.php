<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {

            // Selected Service Plan
            $table->string('plan_name')->nullable();
            $table->decimal('plan_unit_price', 12, 2)->default(0);
            $table->decimal('plan_subtotal', 12, 2)->default(0);

            // Currency and Exchange Rate
            $table->string('currency', 3)->default('BDT');
            $table->decimal('exchange_rate_bdt_per_usd', 12, 2)->default(120);

            // Vehicle Information
            $table->string('car_type')->nullable();
            $table->decimal('car_rate_per_km', 12, 2)->default(0);

            // Journey Information
            $table->string('origin')->nullable();
            $table->string('destination')->nullable();
            $table->string('car_trip_type')->nullable();

            // Distance Information
            $table->decimal('route_distance_km', 12, 2)->default(0);
            $table->decimal('charged_distance_km', 12, 2)->default(0);

            // Fare Information
            $table->decimal('car_fare', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2)->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'plan_name',
                'plan_unit_price',
                'plan_subtotal',
                'currency',
                'exchange_rate_bdt_per_usd',
                'car_type',
                'car_rate_per_km',
                'origin',
                'destination',
                'car_trip_type',
                'route_distance_km',
                'charged_distance_km',
                'car_fare',
                'total_amount',
            ]);
        });
    }
};
