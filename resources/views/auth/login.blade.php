@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="d-flex align-items-center flex-column ">
            <h1 class="my-5">Авторизация</h1>
            <form method="POST" action="{{ route('login') }}">
                @csrf
                <div class="form-group row">

                    <div class="col-md-6">
                        <input id="email" type="email" class="login-input form-control @error('email') is-invalid @enderror"
                            name="email" placeholder="Логин" value="{{ old('email') }}" required autocomplete="email"
                            autofocus>

                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">


                    <div class="col-md-6">
                        <input id="password" type="password" class="login-input   @error('password') is-invalid @enderror"
                            name="password" placeholder="Пароль" required autocomplete="current-password">

                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-md-6 offset-md-8">
                        <div class="">
                            @if (Route::has('password.request'))
                                <a class="btn btn-link text-white" href="{{ route('password.request') }}">
                                    Забыли пароль?
                                </a>
                            @endif

                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-md-6">
                        <button type="submit" class="btn-login-submit">
                            Войти
                        </button>


                    </div>
                </div>
            </form>
        </div>
    </div>

@endsection
