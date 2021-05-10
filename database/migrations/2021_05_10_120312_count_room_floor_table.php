<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CountRoomFloorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countRoomFloor',function (Blueprint $table){
           $table->increments('id');
           $table->unsignedInteger('max_room')->default(45);
           $table->unsignedInteger('used_room')->default(0);
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
        Schema::drop('countRoomFloor');
    }
}
