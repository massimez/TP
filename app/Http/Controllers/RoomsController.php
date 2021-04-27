<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomsController extends Controller
{

<<<<<<< HEAD
=======
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
>>>>>>> 1e9d16c0dedcbf7768085e2b7af0365730b77884

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $room = Room::select('room_id', 'status', 'number_of_living', 'floor')->get();
        return response()->json(['rooms' => $room]);
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
            'number_of_living' => 'required|integer',
            'floor' => 'required|integer',
        ]);
        $room = Room::create($request->input());
        if (is_null($room)) {
            return response()->json(['message' => 'student not found'], 404);
        }
        return response()->json(['data' => $room]);
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
            return response()->json(['message' => 'student not found'], 404);
        }
<<<<<<< HEAD
        $student = $room->studentTable()->select('name','surname','status_student','group')->get();
        return response()->json(['rooms'=>$room->only('room_id','status','floor'),'students'=>$student]);
=======
        $room = Room::select('room_id', 'status')->get();
        $student = Room::find($id)->studentTable()->select('name', 'surname', 'status_student', 'group')->get();
        return response()->json(['rooms' => $room, 'students' => $student]);
>>>>>>> 1e9d16c0dedcbf7768085e2b7af0365730b77884
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

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
        ]);
        $room = Room::find($id);
        if (is_null($room)) {
            return response()->json(['message' => 'student not found'], 404);
        }
<<<<<<< HEAD
        $room->update($request->input());
        return response()->json(['message'=>'updated!']);
=======
        $room = $room->update($request->input());
        return response()->json(['message' => 'updated!']);
>>>>>>> 1e9d16c0dedcbf7768085e2b7af0365730b77884
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

    }
}
