<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Hash;

class ForgetPassword extends Mailable
{
    use Queueable, SerializesModels;
    private $id;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($id)
    {
        $this->id=$id;
    }

    public function generateNewPassword($length = 8){
        $chars = 'qazxswedcvfrtgbnhyujmkiolp1234567890QAZXSWEDCVFRTGBNHYUJMKIOLP';
        $size = strlen($chars) - 1;
        $password = '';
        while($length--) {
            $password .= $chars[rand(0, $size)];
        }
        return $password;
    }


    public function build()
    {
        $password = $this->generateNewPassword();
        User::find($this->id)->update([
            'password' => Hash::make($password)
        ]);
        return $this->view('password',['password'=>$password]);
    }
}
