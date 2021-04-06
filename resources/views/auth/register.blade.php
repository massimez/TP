@extends('layouts.app')

@section('content')

    <div class="d-flex align-items-center flex-column ">
        <h1 class="my-5">Регистрация</h1>
            <form method="POST" action="{{ route('register') }}">
                @csrf
                <div class="form-group row">
                    <input id="name" type="text" class="form-control login-input  @error('name') is-invalid @enderror"
                        name="name" value="{{ old('name') }}" required autocomplete="name" placeholder="Имя" autofocus>

                    @error('name')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="form-group row">
                    <input id="email" type="email" class="form-control login-input  @error('email') is-invalid @enderror"
                        name="email" value="{{ old('email') }}" placeholder="Электро́нная по́чта" required
                        autocomplete="email">

                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="form-group row">
                    <input id="password" type="password"
                        class="form-control login-input  @error('password') is-invalid @enderror" placeholder="Пароль"
                        name="password" required autocomplete="new-password">

                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror

                </div>
                <div class="form-group row">
                    <input id="password-confirm" type="password" class="form-control login-input "
                        name="password_confirmation" placeholder="Подтверждение пароля" required
                        autocomplete="new-password">

                </div>
                <div class="form-group row">
                    <button type="submit" class="btn-login-submit">
                        Завершить регистрацию
                    </button>
                </div>
        </div>
        </form>
    </div>
@endsection
