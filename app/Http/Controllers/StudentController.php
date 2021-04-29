<?php

namespace App\Http\Controllers;

use App\Events\Room;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $filter_student_table = (new FilterStudent($request))->apply()->get();
        return response()->json( $filter_student_table,200);
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
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'room_id'                    => 'required|integer',
            'name'                       => 'required|string',
            'surname'                    => 'required|string',
            'patronymic'                 => 'required|string',
            'status_student'             => 'required|string',
            'email'                      => 'required|email|unique:students',
            'phone_number'               => 'required|integer',
            'group'                      => 'required|string',
            'sex'                        => 'required|string',
            'number_contract'            => 'required|integer',
            'date_of_conclusion'         => 'string',
            'date_of_ended_registration' => 'required',
            'citizenship'                => 'required|string',
            'birthday'                   => 'required',
            'place_of_birth'             => 'required|string',
            'number_passport'            => 'required|string',
            'info_passport'              => 'required|string',
            'registration'               => 'required|string',
            'note'                       => 'string',
            "status_accommodation"       => 'required'
        ]);
        $check = (new CheckRoom($request))->getStatus();
        if (!$check) {
            return response()->json(['message' => 'Нет свободных мест'], 405);
        }
        $student = Student::create($request->input());
        return response()->json(["data" => $student, 'message' => "Created!"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $student = Student::find($id);
        $faculty = $student->groupTable()->pluck('faculty');
        $course = $student->groupTable()->pluck('course_of_study');
        $student = collect($student)->put('faculty', $faculty[0])
            ->put('course_of_study', $course[0]);

        if (is_null($student)) {
            return response()->json(['message' => 'student not found'], 422);
        }
        return response()->json(['data' => $student, 'message' => "Success!"],
            201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        $student = Student::find("$id", 'student_id');
        if (is_null($student)) {
            return response()->json(['message' => 'student not found'], 404);
        }
        return response()->json(['data'    => $student::find($id),
                                 'message' => "Success!"
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $check = (new CheckRoom($request))->getStatus();
        $student = Student::find("$id", 'student_id');
        if (is_null($student) || !$check) {
            return response()->json(['message' => 'Error in request'], 405);
        }
        $student->update($request->all());
        return response()->json(['message' => 'updated!'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $student = Student::find("$id", 'student_id');
        if (is_null($student)) {
            return response()->json(['message' => 'student not found'], 404);
        }
        $student->delete();
        return response()->json(['message' => 'deleted!'], 200);
    }
}
