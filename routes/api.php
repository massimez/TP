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
    Route::post('forget_password', [\App\Http\Controllers\AuthController::class,'forgetPassword']);
    Route::post('updatePassword', [\App\Http\Controllers\AuthController::class,'updatePassword']);
});
//Route::group(['middleware' => 'auth:api'], function () {
    Route::resource('student', \App\Http\Controllers\StudentController::class);
    Route::resource('room', \App\Http\Controllers\RoomsController::class);
    Route::get('floor',[\App\Http\Controllers\RoomsController::class,'getCountRoomAllFloor']);
    Route::resource('status', \App\Http\Controllers\StatusStudentsController::class);
    Route::resource('group', \App\Http\Controllers\GroupController::class);
//});
Route::get('createDoc/{id}',[\App\Http\Controllers\CreateDocxController::class,'getDocument']);
Route::resource('admin',\App\Http\Controllers\AdminController::class)->middleware(['api','admin']);
