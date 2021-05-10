<?php

namespace App\Http\Controllers;

use App\Events\CountLivingRoomEvent;
use App\Listeners\CountLivingRoomListener;
use App\Models\Group;
use App\Models\Student;
use Illuminate\Http\Request;
use mysql_xdevapi\Exception;

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
        $fuil_info_student = [];
        foreach ($filter_student_table as $key => $value) {
            $group_table = $value->groupTable();
            $faculty = $group_table->pluck('faculty');
            $course = $group_table->pluck('course_of_study');
            $form_education = $group_table->pluck('form_of_education');
            $student = collect($value)->put('faculty', $faculty[0])
                ->put('course_of_study', $course[0])
                ->put('form_of_education', $form_education[0]);
            $fuil_info_student[] = $student;
        }
        return response()->json($fuil_info_student, 200);
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
            'status_student'             => 'string',
            'email'                      => 'required|email|unique:students',
            'phone_number'               => 'required|integer',
            'group'                      => 'required|string',
            'sex'                        => 'required|string',
            'number_contract'            => 'integer',
            'date_of_conclusion'         => 'string',
            'date_of_ended_registration' => 'string',
            'citizenship'                => 'required|string',
            'birthday'                   => 'required',
            'place_of_birth'             => 'required|string',
            'number_passport'            => 'required|string',
            'info_passport'              => 'required|string',
            'registration'               => 'required|string',
            'note'                       => 'string',
            "status_accommodation"       => 'string'
        ]);
        $check = $this->callCheckRoom($request);
        if (!$check) {
            return response()->json(['message' => 'Нет свободных мест'], 405);
        }
        $this->updateRoomID($request);
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
        $form_education = $student->groupTable()->pluck('form_of_education');
        $student = collect($student)->put('faculty', $faculty[0])
            ->put('course_of_study', $course[0])
            ->put('form_of_education', $form_education[0]);

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
        return response()->json([
            'data'    => $student::find($id),
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
        $student = Student::find("$id");
        $check = $this->callCheckRoom($request);
        if (is_null($student) || !$check) {
            return response()->json(['message' => 'Студент не найдет или нет мест'],
                405);
        }
        $this->updateRoomID($request, $student);
        $student->update($request->all());
        return response()->json(['message' => 'updated!'], 200);
    }



    private function updateRoomID($request, $student=['room_id'=>0])
    {
        if ($request->only('room_id')) {
            $room_id_new = $request->only('room_id');
            $room_id_old = $student;
            event(new CountLivingRoomEvent($room_id_new, $room_id_old));
        }
    }

    private function callCheckRoom($request){
        $check = (new CheckRoom($request->only('room_id')['room_id']))->getStatus();
        if (!$check) {
            return false;
        }
        return true;
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
