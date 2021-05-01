<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminPanel
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $id = auth()->user()->getAuthIdentifier();
        $role = User::find($id)->role;
        if ($role != 'admin'){
            return response()->json(['message'=>'no access'],400);
        }

        return $next($request);

    }
}
