<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Status_student
 * @package App\Models
 * @mixin Builder
 */

class Status_student extends Model
{
    use HasFactory;
    protected $primaryKey = "status_id";
    public function student(){
        return $this->belongsTo(Student::class,'status_student','status_id');
    }
}
