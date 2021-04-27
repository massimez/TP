<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForgeinKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->foreign('status_student')->references('status_student')->on('status_students')->onDelete('set null');
            $table->foreign('room_id')->references('room_id')->on('rooms')->onDelete('set null');
            $table->foreign('group')->references('group_name')->on('groups')->onDelete('set null');
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
            $table->dropForeign(['status_student']);
            $table->dropForeign(['room_id']);
            $table->dropForeign(['group']);
        });
    }
}
