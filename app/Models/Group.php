<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Group
 * @package App\Models
 * @mixin Builder
 */

class Group extends Model
{
    use HasFactory;
    protected $fillable = ['group_name','faculty','course_of_study','form_of_education','specialty'];
    public function student(){
        return $this->belongsTo(Student::class,'group_name','group');
    }
}
