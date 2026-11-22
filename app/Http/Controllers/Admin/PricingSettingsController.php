<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PricingSettingsController extends Controller
{
    /**
     * Show pricing and currency settings.
     */
    public function index()
    {
        $settings = DB::table('pricing_settings')->where('id', 1)->first();

        // Create default settings if they do not exist.
        if (!$settings) {
            DB::table('pricing_settings')->insert([
                'id' => 1,

                'private_car_rate' => 30,
                'noah_rate' => 40,
                'hiace_rate' => 50,
                'hearse_rate' => 60,

                'usd_rate' => 120,

                'basic_plan_price' => 500,
                'standard_plan_price' => 1000,
                'premium_plan_price' => 1500,

                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $settings = DB::table('pricing_settings')
                ->where('id', 1)
                ->first();
        }

        return Inertia::render('admin/settings', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update pricing and currency settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'private_car_rate' => 'required|numeric|min:0.01|max:1000000',
            'noah_rate' => 'required|numeric|min:0.01|max:1000000',
            'hiace_rate' => 'required|numeric|min:0.01|max:1000000',
            'hearse_rate' => 'required|numeric|min:0.01|max:1000000',

            'usd_rate' => 'required|numeric|min:0.01|max:1000000',

            'basic_plan_price' => 'required|numeric|min:0.01|max:1000000',
            'standard_plan_price' => 'required|numeric|min:0.01|max:1000000',
            'premium_plan_price' => 'required|numeric|min:0.01|max:1000000',
        ]);

        DB::table('pricing_settings')->updateOrInsert(
            ['id' => 1],
            array_merge($validated, [
                'updated_at' => now(),
                'created_at' => now(),
            ])
        );

        return redirect()->back()->with(
            'success',
            'Pricing and currency settings updated successfully!'
        );
    }
}
