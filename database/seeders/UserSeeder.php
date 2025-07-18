<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => "admin@gmail.com",
            'password' => Hash::make('admin'),
            'role' => 'admin'
        ]);
        
        User::create([
            'name' => 'staff',
            'email' => "staff@gmail.com",
            'password' => Hash::make('staff'),
            'role' => 'staff'
        ]);
        User::create([
            'name' => 'nathan tanoko',
            'email' => "nathantanoko@gmail.com",
            'password' => Hash::make('password'),
            'role' => 'user'
        ]);
    }
}