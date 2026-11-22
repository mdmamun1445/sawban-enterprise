<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingSetting extends Model
{
    protected $connection = 'mysql';

    protected $fillable = [
        'private_car_rate',
        'noah_rate',
        'hiace_rate',
        'hearse_rate',
        'usd_rate',
        'basic_plan_price',
        'standard_plan_price',
        'premium_plan_price',
    ];

    protected function casts(): array
    {
        return [
            'private_car_rate' => 'decimal:2',
            'noah_rate' => 'decimal:2',
            'hiace_rate' => 'decimal:2',
            'hearse_rate' => 'decimal:2',
            'usd_rate' => 'decimal:2',
            'basic_plan_price' => 'decimal:2',
            'standard_plan_price' => 'decimal:2',
            'premium_plan_price' => 'decimal:2',
        ];
    }
}
