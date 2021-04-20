<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function __construct()
    {
       // $this->middleware('auth:api', ['except' => ['login','register']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Student::all(),200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'name' => 'required|string',
            'surname'=> 'required|string',
            'patronymic'=>'required|string',
            'status_student'=>'required|string',
            'email'=>'required|email|unique:students',
            'phone_number'=>'required|integer',
            'group'=>'required|string',
            'sex'=>'required|string',
            'number_contract'=>'required|integer',
            'date_of_conclusion'=>'required',
            'date_of_ended_registration'=>'required',
            'citizenship'=>'required|string',
            'birthday'=>'required',
            'place_of_birth'=>'required|string',
            'number_passport'=>'required|string',
            'info_passport'=>'required|string',
            'registration'=>'required|string',
            'note'=>'string',
            "status_accommodation" => 'required'
        ]);
        $student = Student::create($request->all());
        return response()->json(["data"=>$student,'message'=>"Created!"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $student = Student::find("$id",'student_id');
        if (is_null($student)){
            return response()->json(['message'=>'student not found'],404);
        }
        return response()->json(['data'=>$student::find($id),'message'=>"Success!"],201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $student = Student::find("$id",'student_id');
        if (is_null($student)){
            return response()->json(['message'=>'student not found'],404);
        }
        return response()->json(['data'=>$student::find($id),'message'=>"Success!"],201);
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
            'name' => 'required|string',
            'surname'=> 'required|string',
            'patronymic'=>'required|string',
            'status_student'=>'required|string',
            'email'=>'required|email|unique:students',
            'phone_number'=>'required|integer',
            'group'=>'required|string',
            'sex'=>'required|string',
            'number_contract'=>'required|integer',
            'date_of_conclusion'=>'required',
            'date_of_ended_registration'=>'required',
            'citizenship'=>'required|string',
            'birthday'=>'required',
            'place_of_birth'=>'required|string',
            'number_passport'=>'required|string',
            'info_passport'=>'required|string',
            'registration'=>'required|string',
            'note'=>'string',
            "status_accommodation" => 'required'
        ]);
        $student = Student::find("$id",'student_id');
        if (is_null($student)){
            return response()->json(['message'=>'student not found'],404);
        }
        $student->update($request->all());
        return response()->json(['message'=>'updated!'],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student = Student::find("$id",'student_id');
        if (is_null($student)){
            return response()->json(['message'=>'student not found'],404);
        }
        $student->delete();
        return response()->json(['message'=>'deleted!'],200);
    }
}
