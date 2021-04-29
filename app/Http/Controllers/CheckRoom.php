<?php


namespace App\Http\Controllers;


use App\Models\Room;

class CheckRoom
{
    private $request;
    private $status;
    public function __construct($request)
    {
        $this->request=$request;
        $this->status=false;
        $this->checkStatus();
    }

    private function checkStatus(){
        $id = $this->request->input('room_id');
        $student_now = Room::find($id)->number_of_living;
        $student_max = Room::find($id)->max_living;
        if ($student_max - $student_now >= 1) $this->status=true;
    }

    public function getStatus(){
        return $this->status;
    }
}
