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
            $table->string('room_id')->nullable();
            $table->string('name');
            $table->string('surname');
            $table->string('patronymic');
            $table->string('student_payment')->nullable();
            $table->string('status_student')->default('Студент');
            $table->string('status_accommodation')->default('Оформление');
            $table->string('email')->unique();
            $table->string('phone_number')->unique();;
            $table->string('group')->nullable();
            $table->string('sex');
            $table->string('number_contract')->unique()->nullable();
            $table->date('date_of_conclusion')->nullable();
            $table->date('date_of_ended_registration')->nullable();;
            $table->string('citizenship');
            $table->date('birthday');
            $table->string('place_of_birth');
            $table->string('number_passport')->unique();
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
