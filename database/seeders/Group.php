<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class Group extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Group::truncate();
        \App\Models\Group::factory()->count(10)->create();
    }
}
