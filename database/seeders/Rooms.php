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

        $city = ['Томск',"Москва","Лондон","Питер","Каир","Нью-Йорк","Киев"];
        \App\Models\Room::truncate();
        \App\Models\Room::create([
            'room_id' =>rand(100,999),
            'status'=>$city[array_rand($city,1)],
            'number_of_living'=>rand(1,4),
            'floor' => rand(1,10),
        ]);
    }
}
