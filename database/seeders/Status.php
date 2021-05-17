<?php

namespace Database\Seeders;

use App\Models\Status_student;
use Illuminate\Database\Seeder;

class Status extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Status_student::truncate();
        \App\Models\Status_student::create([
            'status_student'=>'Студент',
            'neighbors'=>4
        ]);

    }
}
