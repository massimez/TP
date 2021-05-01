<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(){
        return response()->json(['users'=>User::all()],200);
    }

    public function show($id){
        $user = User::find($id);
        return response()->json(['user'=>$user],200);
    }

    public function edit($id){
        $user = User::find($id);
        return response()->json(['user'=>$user],200);
    }

    public function update(Request $request,$id){
        User::find($id)->update($request->input());
        return response()->json(['message'=>'updated!'],200);
    }

    public function destroy($id){
        User::find($id)->delete();
        return response()->json(['message'=>'deleted!'],200);
    }
}
