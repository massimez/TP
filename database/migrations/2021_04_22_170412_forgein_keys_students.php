<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForgeinKeysStudents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
//            $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
//            $table->foreign('status_student')->references('id')->on('status_students')->onDelete('cascade');
//            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
//            $table->foreign('group')->references('id')->on('groups')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
//            $table->dropForeign(['student_id']);
//            $table->dropForeign(['status_student']);
//            $table->dropForeign(['room_id']);
//            $table->dropForeign(['group']);
        });
    }
}
