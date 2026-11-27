<?php

test('login page renders', function () {
    $this->get(route('login'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('auth/login'));
});

test('empty submit returns Indonesian validation errors', function () {
    $this->from(route('login'))
        ->post(route('login.store'), [])
        ->assertRedirect(route('login'))
        ->assertSessionHasErrors([
            'email' => 'Email wajib diisi.',
            'password' => 'Kata sandi wajib diisi.',
        ]);
});

test('invalid email format is rejected', function () {
    $this->post(route('login.store'), ['email' => 'bukan-email', 'password' => 'x'])
        ->assertSessionHasErrors(['email' => 'Format email tidak valid.']);
});

test('wrong credentials show an error', function () {
    $this->post(route('login.store'), ['email' => 'a@b.test', 'password' => 'salah'])
        ->assertSessionHasErrors(['email' => 'Email atau kata sandi salah.']);
});

test('dummy credentials redirect to ringkasan', function () {
    $this->post(route('login.store'), ['email' => 'a@b.test', 'password' => 'password'])
        ->assertRedirect(route('ringkasan'));
});
