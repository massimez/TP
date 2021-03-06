<?php

namespace App\Http\Controllers;

use App\Events\CountLivingRoomEvent;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission')->except('index','show');
    }
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
            $specialty = $group_table->pluck('specialty');
            $student = collect($value)
                ->put('faculty', $faculty[0])
                ->put('course_of_study', $course[0])
                ->put('form_of_education', $form_education[0])
                ->put('specialty', $specialty[0]);
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
            'room_id'                    => 'required|integer|exists:rooms,room_id',
            'name'                       => 'required|string|min:1|max:20|regex:/^([а-яА-ЯЁёa-zA-Z \-\']+)$/u',
            'surname'                    => 'required|string|min:1|max:20|regex:/^([а-яА-ЯЁёa-zA-Z \-\']+)$/u',
            'patronymic'                 => 'required|string|min:1|max:20|regex:/^([а-яА-ЯЁёa-zA-Z \-\']+)$/u',
            'status_student'             => 'string|exists:status_students,status_student',
            'email'                      => 'required|email|unique:students',
            'phone_number'               => 'required|integer',
            'group'                      => 'required|string|exists:groups,group_name',
            'sex'                        => 'required|string|starts_with:МУЖСКОЙ,ЖЕНСКИЙ',
            'number_contract'            => 'string|max:20',
            'date_of_conclusion'         => 'date',
            'date_of_ended_registration' => 'date',
            'citizenship'                => 'required|string|min:1|max:200|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'birthday'                   => 'required|date',
            'place_of_birth'             => 'required|string|min:1|max:200|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'number_passport'            => 'required|string|min:1|max:200|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'info_passport'              => 'required|string|min:1|max:200|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'registration'               => 'required|string|min:1|max:200|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'note'                       => 'string|max:2000',
            "status_accommodation"       => 'string|starts_with:Процесс оформления документов,Проживает,Выселен'
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
        $group_table = $student->groupTable();
        $faculty = $group_table->pluck('faculty');
        $course = $group_table->pluck('course_of_study');
        $form_education = $group_table->pluck('form_of_education');
        $specialty = $group_table->pluck('specialty');
        $student = collect($student)
            ->put('faculty', $faculty[0])
            ->put('course_of_study', $course[0])
            ->put('form_of_education', $form_education[0])
            ->put('specialty', $specialty[0]);

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
        $request->validate([
            'room_id'                    => 'integer|exists:rooms,room_id',
            'name'                       => 'string|min:1|max:20|regex:/^([а-яА-ЯЁёa-zA-Z \-\']+)$/u',
            'surname'                    => 'string|min:1|max:20|regex:/^([а-яА-ЯЁёa-zA-Z \-\']+)$/u',
            'patronymic'                 => 'string|min:1|max:20|regex:/^([а-яА-ЯЁёa-zA-Z \-\']+)$/u',
            'status_student'             => 'string|exists:status_students,status_student',
            'email'                      => 'email|unique:students',
            'phone_number'               => 'integer',
            'group'                      => 'string|exists:groups,group_name',
            'sex'                        => 'string|starts_with:Мужской,Женский',
            'number_contract'            => 'string|max:20',
            'date_of_conclusion'         => 'date',
            'date_of_ended_registration' => 'date',
            'citizenship'                => 'string|min:1|max:200|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'birthday'                   => 'date',
            'place_of_birth'             => 'string|min:1|max:200|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'number_passport'            => 'string|min:1|max:200|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'info_passport'              => 'string|min:1|max:200|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'registration'               => 'string|min:1|max:200|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'note'                       => 'string|max:2000',
            "status_accommodation"       => 'string|starts_with:Процесс оформления документов,Проживает,Выселен'
        ]);

        $student = Student::find($id);
        if ($request->room_id){
            $check = $this->callCheckRoom($request,$student);
        }

        if (is_null($student)) {
            return response()->json(['message' => 'Студент не найден'],
                400);
        }
        if (isset($check) && !$check) {
            return response()->json(['message' => 'В комнате нет свободных мест'],
                400);
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

    private function callCheckRoom($request, $student = null){
        $check = true;

        if($request->only('room_id')['room_id'] != $student->room_id || $student === null){
            $check = (new CheckRoom($request->only('room_id')['room_id']))->getStatus();
        }
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
