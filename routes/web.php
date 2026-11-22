<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Admin\BookingManagementController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\ProtocolStaffController;
use App\Http\Controllers\Admin\PricingSettingsController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// Admin Dashboard, Booking, Customer, Payment, Staff and Settings Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    // Admin Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])
        ->name('dashboard');

    // Booking Management
    Route::get('/bookings', [BookingManagementController::class, 'index'])
        ->name('bookings');

    // Booking Details
    Route::get('/bookings/{booking}', [BookingManagementController::class, 'show'])
        ->name('bookings.show');

    // Update Booking Status
    Route::patch('/bookings/{booking}/status', [BookingManagementController::class, 'updateStatus'])
        ->name('bookings.updateStatus');

    // Customer Management
    Route::get('/customers', [CustomerController::class, 'index'])
        ->name('customers');

    // Customer Details
    Route::get('/customers/details', [CustomerController::class, 'show'])
        ->name('customers.details');

    // Payment Management
    Route::get('/payments', [PaymentController::class, 'index'])
        ->name('payments');

    // Create Payment
    Route::post('/payments', [PaymentController::class, 'store'])
        ->name('payments.store');

    // Update Payment Status
    Route::patch('/payments/{payment}/status', [PaymentController::class, 'updateStatus'])
        ->name('payments.updateStatus');

    // Protocol Staff Management
    Route::get('/protocol-staff', [ProtocolStaffController::class, 'index'])
        ->name('protocol-staff');

    // Add Staff
    Route::post('/protocol-staff', [ProtocolStaffController::class, 'store'])
        ->name('protocol-staff.store');

    // Update Staff
    Route::put('/protocol-staff/{protocolStaff}', [ProtocolStaffController::class, 'update'])
        ->name('protocol-staff.update');

    // Delete Staff
    Route::delete('/protocol-staff/{protocolStaff}', [ProtocolStaffController::class, 'destroy'])
        ->name('protocol-staff.destroy');

    // Pricing and Currency Settings
    Route::get('/settings', [PricingSettingsController::class, 'index'])
        ->name('settings');

    // Update Pricing and Currency Settings
    Route::put('/settings', [PricingSettingsController::class, 'update'])
        ->name('settings.update');
});

// Authentication and Account Settings Routes
require __DIR__.'/settings.php';

// Customer Booking Submission
Route::post('/booking', [BookingController::class, 'store'])
    ->name('booking.store');
