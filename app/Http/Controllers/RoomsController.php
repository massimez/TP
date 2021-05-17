<?php

namespace App\Http\Controllers;

use App\Events\CountRoomFloorEvent;
use App\Models\Floor;
use App\Models\Room;
use App\Models\Student;
use Illuminate\Http\Request;

class RoomsController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin',['expect'=>'index','show']);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $rooms = Room::select('room_id','status','number_of_living','max_living','floor')->get();
        $students = Student::all();
        $full_info_for_room = collect();
        foreach ($rooms as $key => $value){
            $student = $students->where('room_id','=',$value->room_id)->toArray();
            $student = $this->collectToArray($student);
            $room = collect($value);
            $room->put('student',$student);
            $full_info_for_room->put($key,$room);
        }

        return response()->json(['rooms' => $full_info_for_room],200);
    }

    private function collectToArray($collect){
        $students = [];
        foreach ($collect as $item){
            $students[]=$item;
        }
        return $students;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'room_id' => 'required|string|unique:rooms',
            'status' => 'required|string',
            'max_living' => 'required|integer|max:4',
            'floor' => 'required|integer',
        ]);
        $room = Room::create($request->input());
        event(new CountRoomFloorEvent($request->floor));
        return response()->json(['data' => $room],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $room = Room::find($id);
        if (is_null($room)) {
            return response()->json(['message' => 'room not found'], 404);
        }
        $students = $room->studentTable()->get(       );
        foreach ($students as $key =>$student){
            $faculty = $student->groupTable()->pluck('faculty');
            $course = $student->groupTable()->pluck('course_of_study');
            $form_education = $student->groupTable()->pluck('form_of_education');
            $students[$key] = collect($student)->put('faculty', $faculty[0])
                ->put('course_of_study', $course[0])
                ->put('form_of_education', $form_education[0]);
        }

        return response()->json(['rooms'=>$room->only('room_id','status','floor','number_of_living'),'students'=>$students],200);
    }

    public function getCountRoomAllFloor(){
        $count_room_on_all_floor = Floor::all();
        return response()->json(['floors'=>$count_room_on_all_floor],200);
    }


    public function edit($id)
    {
        $room = Room::find($id);
        if (is_null($room)) {
            return response()->json(['message' => 'room not found'], 404);
        }

        return response()->json(['rooms'=>$room],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'room_id' => 'required|string',
            'status' => 'required|string',
            'number_living' => 'required|string|min:1|max:4',
            'floor' => 'required|integer',
            'form_of_education' => 'required|string'
        ]);
        $room = Room::find($id);
        if (is_null($room)) {
            return response()->json(['message' => 'room not found'], 404);
        }

        $room->update($request->input());
        return response()->json(['message'=>'updated!'],200);
    }


    public function destroy($id)
    {
        $room = Room::find($id);
        if (is_null($room)) {
            return response()->json(['message' => 'room not found'], 404);
        }
        event(new CountRoomFloorEvent($room->floor,0));
        $room->delete();
        return response()->json(['message'=>'deleted!'],200);
    }
}
