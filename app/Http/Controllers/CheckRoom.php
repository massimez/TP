<?php


namespace App\Http\Controllers;


use App\Models\Room;

class CheckRoom
{
    private $room_id;
    private $status;
    public function __construct($room_id)
    {
        $this->room_id=$room_id;
        $this->status=false;
        $this->checkStatus();
    }

    private function checkStatus(){
        $id = $this->room_id;
        $table = Room::find($id);
        $student_now = $table->number_of_living;
        $student_max = $table->max_living;
        if ($student_max - $student_now >= 1) $this->status=true;
    }

    public function getStatus(){
        return $this->status;
    }
}
