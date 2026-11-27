<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

/**
 * TEMPORARY: lets the login page be built and reviewed before `feat/auth-scope`
 * lands. Accepts any email with the password "password"; no session, no DB.
 * The auth-scope owner replaces this controller (keep the route names
 * `login` / `login.store` and the fields `email`, `password`, `remember`).
 */
class DummyLoginController extends Controller
{
    public function create(): Response
    {
        return inertia('auth/login');
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        if ($request->string('password')->toString() !== 'password') {
            return back()->withErrors([
                'email' => 'Email atau kata sandi salah.',
            ])->onlyInput('email');
        }

        return redirect()->route('ringkasan');
    }
}
