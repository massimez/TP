<?php

namespace App\Http\Controllers;

use App\Models\Status_student;
use Illuminate\Http\Request;

class StatusStudentsController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin')->except('index','show');
    }


    public function index()
    {
        return response()->json(['data'=>Status_student::all(),'message'=>'success'],200);
    }


    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'status_student' => 'required|string',
            'neighbors' => 'required|integer',
        ]);
        Status_student::create($request->input());
        return response()->json(['message' => 'success'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $status = Status_student::find($id);
        return response()->json(['data' => $status], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $status = Status_student::find($id);
        return response()->json(['data' => $status], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $update = $request->input();
        Status_student::find($id)->update($update);
        return response()->json(['message' => 'success'], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Status_student::find($id)->delete();
        return response()->json(['message' => 'deleted!'], 200);
    }
}
