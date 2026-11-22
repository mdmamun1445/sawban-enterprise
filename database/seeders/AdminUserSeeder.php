<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@sawban.com'],
            [
                'name' => 'SAWBAN Admin',
                'password' => Hash::make('ChangeThisPassword123!'),
                'role' => 'admin',
            ]
        );
    }
}