<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class Floor extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Floor::factory()->count(10)->create();
    }
}
