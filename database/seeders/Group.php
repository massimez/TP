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
        \App\Models\Group::create([
            'group_name'=>'222',
            'faculty'=>'ФВС',
            'course_of_study'=>1,
            'form_of_education'=>'Очная'
        ]);

    }
}
