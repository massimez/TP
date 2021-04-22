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
            $table->increments('student_id');
            $table->unsignedInteger('room_id');
            $table->string('name');
            $table->string('surname');
            $table->string('patronymic');
            $table->unsignedInteger('status_student');
            $table->string('status_accommodation');
            $table->string('email');
            $table->string('phone_number');
            $table->unsignedInteger('group');
            $table->string('sex');
            $table->string('number_contract');
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
