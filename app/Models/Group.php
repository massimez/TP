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
    protected $primaryKey = "group_id";
    public function student(){
        return $this->belongsTo(Student::class,'group','group_id');
    }
}
