<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function allStudent(){
        return response()->json(Student::all(),200);
    }

    public function oneStudent($id){
        $student = Student::find("$id",'student_id');
        if (is_null($student)){
            return response()->json(['message'=>'student not found'],404);
        }
        return response()->json($student::find($id),200);
    }

    public function addStudent(Request $request){
        $student = Student::create($request->all());
        return response($student,201);
    }

    public function updateStudent($id, Request $request){
        $student = Student::find("$id",'student_id');
        if (is_null($student)){
            return response()->json(['message'=>'student not found'],404);
        }
        $student->update($request->all());
        return response($student,200);

    }

    public function deleteStudent($id, Request $request){
        $student = Student::find("$id",'student_id');
        if (is_null($student)){
            return response()->json(['message'=>'student not found'],404);
        }
        $student->delete();
        return response(null,200);

    }
}
