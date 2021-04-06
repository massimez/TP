<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// get all students
Route::get('/students',[\App\Http\Controllers\StudentController::class,'allStudent']);
// get one student
Route::get('/student/{id}',[\App\Http\Controllers\StudentController::class,'oneStudent']);
// add student
Route::post('/students/add',[\App\Http\Controllers\StudentController::class,'addStudent']);
// update student
Route::put('/student/{id}',[\App\Http\Controllers\StudentController::class,'updateStudent']);
// delete student
Route::delete('/student/{id}',[\App\Http\Controllers\StudentController::class,'deleteStudent']);
