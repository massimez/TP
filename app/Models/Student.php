<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Student
 * @package App\Models
 * @mixin Builder
 */

class Student extends Model
{
    use HasFactory;
    protected $primaryKey = "student_id";

    protected $fillable = ['name','surname','patronymic','status_student','status_accommodation','email','phone_number','group','sex','number_contract'
    ,'date_of_conclusion','date_of_ended_registration','citizenship','birthday','place_of_birth','number_passport','info_passport',
        'registration','note','room_id','student_payment'];

    public function userTable(){
        return $this->hasOne(User::class,'id','student_id');
    }

    public function statusTable(){
        return $this->hasMany(Status_student::class,'status_student','status_student');
    }

    public function roomTable(){
        return $this->hasMany(Room::class,'room_id','room_id');
    }

    public function groupTable(){
        return $this->hasMany(Group::class,'group_name','group');
    }
}
