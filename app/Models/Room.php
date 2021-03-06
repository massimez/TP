<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * Class Room
 * @package App\Models
 * @mixin Builder
 */
class Room extends Model
{
    use HasFactory;
    protected $primaryKey = "room_id";
    protected $fillable = ['status','max_living','room_id','floor','number_of_living'];
    public $incrementing = false;
    public function studentTable(){
        return $this->belongsTo(Student::class,'room_id','room_id');
    }
}
