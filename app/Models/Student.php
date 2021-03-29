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

    public function userTable(){
        return $this->hasOne(User::class,'id','student_id');
    }

    public function statusTable(){
        return $this->hasMany(Status_student::class,'status_id','status_student');
    }

    public function roomTable(){
        return $this->hasMany(Room::class,'room_id','room_id');
    }

    public function groupTable(){
        return $this->hasMany(Group::class,'group_id','group');
    }
}
