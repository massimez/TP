<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Hash;

class AccountAccept extends Mailable
{
    use Queueable, SerializesModels;
    private $role;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($role)
    {
        $this->role = $role;
    }

    public function build()
    {
        return $this->view('accept-account',['role' => $this->role]);
    }
}
