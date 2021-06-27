<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class Admin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::truncate();
        \App\Models\User::create([
            'name'=>'Админ',
            'email'=>'tararinivan@gmail.com',
            "password" => Hash::make('qwerty123'),
            'role' => 'admin'
        ]);
    }
}
