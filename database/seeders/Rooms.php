<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class Rooms extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Room::truncate();
        Room::factory()->count(20)->create();
    }
}
