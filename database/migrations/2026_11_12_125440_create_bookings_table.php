<?php



use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            $table->string('booking_reference')->unique();

            $table->string('full_name');
            $table->string('phone');
            $table->string('email')->nullable();

            $table->string('service_type');
            $table->string('trip_type');

            $table->string('airport');
            $table->date('travel_date');

            $table->string('flight_number')->nullable();

            $table->unsignedInteger('passenger_count')->default(1);

            $table->text('message')->nullable();

            $table->string('status')->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};

