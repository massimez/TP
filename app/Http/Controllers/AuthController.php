<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\ForgetPassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register','forgetPassword']]);
    }

    public function register(Request $request)
    {
        $this->validate($request,[
            'email'    => 'required|unique:users|email',
            'password' => 'required|confirmed|min:8',
            'name'     => 'required',
        ]);
        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            //для безопасности хэшируем пароль
        ]);
        return response()->json(['message' => 'Registered!'], 201);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $this->validate($request,[
            'email'    => 'required|email',
            'password' => 'required',
        ]);
        $role = User::where('email','=',$request->email)->get('role')[0]['role'];
        $credentials = $request->only('email', 'password');
        if ((!$token = auth()->attempt($credentials)) || $role=='Не подтверждена') {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function forgetPassword(Request $request)
    {
        $email = $request->email;
        Mail::to($email)->send(new ForgetPassword($email));
        return response()->json(['message' => "Сообщение с новым паролем успешно отправлено на вашу эл.почту"]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:8|confirmed'
        ]);
        $user_id = \auth()->user()->getAuthIdentifier();
        $user = User::find($user_id);
        $user_password = $user->password;
        if (Hash::check($request->old_password, $user_password)) {
            $user->update([
                'password' => Hash::make($request->new_password)
            ]);
            return response()->json(['message' => 'Password updated!'], 200);
        }
        return response()->json(['message' => 'Password wrong!'], 405);
    }


        /**
         * Refresh a token.
         *
         * @return \Illuminate\Http\JsonResponse
         */
        public
        function refresh()
        {
            return $this->respondWithToken(auth()->refresh());
        }

        /**
         * Get the token array structure.
         *
         * @param  string  $token
         *
         * @return \Illuminate\Http\JsonResponse
         */
        protected
        function respondWithToken($token)
        {
            return response()->json([
                'access_token' => $token,
                'token_type'   => 'bearer',
                'expires_in'   => auth()->factory()->getTTL() * 60,
                'user'         => auth()->user(),
            ]);
        }
    }
