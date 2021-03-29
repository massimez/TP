<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    public function user(){
        return $this->hasOne(Student::class);
    }

    public function status(){
        return $this->hasMany(Status_student::class);
    }

    public function room(){
        return $this->hasMany(Room::class);
    }

    public function group(){
        return $this->hasMany(Group::class);
    }
}
