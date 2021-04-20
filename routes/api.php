<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function () {
    Route::post('login', [\App\Http\Controllers\AuthController::class,'login']);
    Route::post('logout', [\App\Http\Controllers\AuthController::class,'logout']);
    Route::post('refresh', [\App\Http\Controllers\AuthController::class,'refresh']);
    Route::post('me', [\App\Http\Controllers\AuthController::class,'me']);
    Route::post('register', [\App\Http\Controllers\AuthController::class,'register']);
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

Route::resource('room', \App\Http\Controllers\RoomsController::class);

