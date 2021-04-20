<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id('student_id');
            $table->integer('room_id');
            $table->string('name');
            $table->string('surname');
            $table->string('patronymic');
            $table->string('status_student');
            $table->string('status_accommodation');
            $table->string('email')->unique();
            $table->string('phone_number')->unique();
            $table->string('group');
            $table->string('sex');
            $table->string('number_contract')->unique();
            $table->date('date_of_conclusion');
            $table->date('date_of_ended_registration');
            $table->string('citizenship');
            $table->date('birthday');
            $table->string('place_of_birth');
            $table->string('number_passport');
            $table->string('info_passport');
            $table->string('registration');
            $table->string('note');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
