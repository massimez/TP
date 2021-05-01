<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin',['expect'=>'index','show']);

    }

    public function index()
    {
        $group = Group::all();
        return response()->json(['data'=>$group,'message'=>'Success!'],200);
    }

    public function create()
    {
    }


    public function store(Request $request)
    {
        $request->validate([
           'group_name'=>'required|string|unique:groups',
            'faculty'=>'required|string',
            'course_of_study'=>'required|string',
            'form_of_education'=>'required|string',
        ]);
        $group = Group::create($request->input());
        return response()->json(['data'=>$group,'message'=>'created!'],201);

    }


    public function show($id)
    {
        $group = Group::find($id);
        return response()->json(['data'=>$group,'message'=>'created!'],200);
    }


    public function edit($id)
    {
        $group = Group::find($id);
        return response()->json(['data'=>$group,'message'=>'success'],200);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'group_name'=>'required|integer|unique:groups',
            'faculty'=>'required|string',
            'course_of_study'=>'required|string',
            'form_of_education'=>'required|string'
        ]);
        Group::find($id)->update($request->input());
        return response()->json(['message'=>'updated!'],200);
    }

    public function destroy($id)
    {
        Group::find($id)->delete();
        return response()->json(['message'=>'deleted!'],200);
    }
}
