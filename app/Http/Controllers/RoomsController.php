<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'room_id' => 'required|integer',
            'status' => 'required|string',
            'number_living' => 'required|string',
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
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $find = Room::find($id);
        if (is_null($find)) {
            return response()->json(['message' => 'student not found'], 404);
        }
        $room = Room::select('room_id', 'status')->get();
        $student = Room::find($id)->studentTable()->select('name', 'surname', 'status_student', 'group')->get();
        return response()->json(['rooms' => $room, 'students' => $student]);
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'room_id' => 'required|integer',
            'status' => 'required|string',
            'number_living' => 'required|string',
            'floor' => 'required|integer',
        ]);
        $room = Room::find($id);
        if (is_null($room)) {
            return response()->json(['message' => 'student not found'], 404);
        }
        $room = $room->update($request->input());
        return response()->json(['message' => 'updated!']);
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
