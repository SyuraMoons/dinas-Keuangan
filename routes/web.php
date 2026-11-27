<?php

use App\Http\Controllers\Auth\DummyLoginController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/ringkasan')->name('home');

// Placeholder routes: backend owners swap these for real controllers.
Route::inertia('/ringkasan', 'ringkasan/index')->name('ringkasan');
Route::inertia('/realisasi-anggaran', 'realisasi-anggaran/index')->name('realisasi-anggaran');
Route::inertia('/pajak-pbb', 'pajak-pbb/index')->name('pajak-pbb');
Route::inertia('/aset-daerah', 'aset-daerah/index')->name('aset-daerah');
Route::inertia('/admin/impor', 'admin/impor/index')->name('admin.impor');

// TEMPORARY dummy login (see DummyLoginController); replaced by `feat/auth-scope`.
Route::get('/login', [DummyLoginController::class, 'create'])->name('login');
Route::post('/login', [DummyLoginController::class, 'store'])->name('login.store');
