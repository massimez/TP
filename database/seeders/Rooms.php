<?php

namespace Database\Seeders;

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
            \App\Models\Room::create([
                'room_id' => '123',
                'status' => 'Мужская',
                'number_of_living' => rand(1, 4),
                'floor' => rand(1, 10),
            ]);
        }
}
