<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin')->except('index', 'show');
    }

    public function index()
    {
        $group = Group::all();
        return response()->json(['data' => $group, 'message' => 'Success!'], 200);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        $request->validate([
            'group_name' => 'required|string|unique:groups|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'faculty' => 'required|string|starts_with:РТФ,РКФ,ФВС,ФСУ,ФЭТ,ЭФ,ФИТ,ГФ,ЮФ,ФБ,заочный',
            'course_of_study' => 'required|string|min:1|max:1',
            'form_of_education' => 'required|string|starts_with:очная,заочная',
            'specialty' => 'required|string|starts_with:бакалавриат,специалитет,магистратура,аспирантура'
        ]);
        $group = Group::create($request->input());
        return response()->json(['data' => $group, 'message' => 'created!'], 201);

    }

    public function show($id)
    {
        $group = Group::find($id);
        return response()->json(['data' => $group, 'message' => 'created!'], 200);
    }

    public function edit($id)
    {
        $group = Group::find($id);
        return response()->json(['data' => $group, 'message' => 'success'], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'group_name' => 'string|unique:groups|regex:/^([а-яА-ЯЁёa-zA-Z0-9 \-\']+)$/u',
            'faculty' => 'string|starts_with:РТФ,РКФ,ФВС,ФСУ,ФЭТ,ЭФ,ФИТ,ГФ,ЮФ,ФБ,заочный',
            'course_of_study' => 'string|min:1|max:1',
            'form_of_education' => 'required|string|starts_with:очная,заочная',
            'specialty' => 'required|string|starts_with:бакалавриат,специалитет,магистратура,аспирантура'
        ]);
        Group::find($id)->update($request->input());
        return response()->json(['message' => 'updated!'], 200);
    }

    public function destroy($id)
    {
        Group::find($id)->delete();
        return response()->json(['message' => 'deleted!'], 200);
    }
}
