<?php

namespace App\Http\Controllers;

use App\Mail\AccountAccept;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
        $request->validate([
            'name'                       => 'string|min:1|max:20|regex:/^([а-яА-ЯЁёa-zA-Z \-\']+)$/u}',
            'surname'                    => 'string|min:1|max:20|regex:/^([а-яА-ЯЁёa-zA-Z \-\']+)$/u}',
            'patronymic'                 => 'string|min:1|max:20|regex:/^([а-яА-ЯЁёa-zA-Z \-\']+)$/u}',
            'position'                   => 'string|max:30',
            'role'                       => 'string|start_with:admin,user,guest',
        ]);
        $user = User::find($id);
        $user->update($request->input());
        if ($request->role && $request->role!='Не подтверждена'){
            Mail::to($user->email)->send(new AccountAccept($user->role));
        }
        return response()->json(['message'=>'updated!'],200);
    }

    public function destroy($id){
        User::find($id)->delete();
        return response()->json(['message'=>'deleted!'],200);
    }
}
