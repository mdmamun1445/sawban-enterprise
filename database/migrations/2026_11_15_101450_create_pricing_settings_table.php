<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pricing_settings', function (Blueprint $table) {
            $table->id();

            // Vehicle rates per kilometer (BDT)
            $table->decimal('private_car_rate', 10, 2)->default(30);
            $table->decimal('noah_rate', 10, 2)->default(40);
            $table->decimal('hiace_rate', 10, 2)->default(50);
            $table->decimal('hearse_rate', 10, 2)->default(60);

            // Sample exchange rate: 1 USD = 120 BDT.
            // Admin can update this value from Settings.
            $table->decimal('usd_rate', 10, 2)->default(120);

            // Plan prices per passenger (BDT)
            $table->decimal('basic_plan_price', 10, 2)->default(500);
            $table->decimal('standard_plan_price', 10, 2)->default(1000);
            $table->decimal('premium_plan_price', 10, 2)->default(1500);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pricing_settings');
    }
};
