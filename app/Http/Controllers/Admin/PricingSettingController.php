<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PricingSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingSettingController extends Controller
{
    /**
     * Display pricing settings.
     */
    public function index()
    {
        $settings = PricingSetting::firstOrCreate(
            ['id' => 1],
            [
                'private_car_rate' => 30,
                'noah_rate' => 40,
                'hiace_rate' => 50,
                'hearse_rate' => 60,
                'usd_rate' => 120,
                'basic_plan_price' => 500,
                'standard_plan_price' => 1000,
                'premium_plan_price' => 1500,
            ]
        );

        return Inertia::render('admin/settings', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update pricing settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'private_car_rate' => 'required|numeric|min:0.01|max:999999',
            'noah_rate' => 'required|numeric|min:0.01|max:999999',
            'hiace_rate' => 'required|numeric|min:0.01|max:999999',
            'hearse_rate' => 'required|numeric|min:0.01|max:999999',
            'usd_rate' => 'required|numeric|min:0.01|max:999999',

            'basic_plan_price' => 'required|numeric|min:0.01|max:999999',
            'standard_plan_price' => 'required|numeric|min:0.01|max:999999',
            'premium_plan_price' => 'required|numeric|min:0.01|max:999999',
        ]);

        $settings = PricingSetting::firstOrCreate(
            ['id' => 1],
            $validated
        );

        $settings->update($validated);

        return redirect()
            ->back()
            ->with('success', 'Pricing settings updated successfully!');
    }
}
