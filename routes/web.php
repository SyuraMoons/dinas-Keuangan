<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/ringkasan')->name('home');

// Placeholder routes: backend owners swap these for real controllers.
Route::inertia('/ringkasan', 'ringkasan/index')->name('ringkasan');
Route::inertia('/realisasi-anggaran', 'realisasi-anggaran/index')->name('realisasi-anggaran');
Route::inertia('/pajak-pbb', 'pajak-pbb/index')->name('pajak-pbb');
Route::inertia('/aset-daerah', 'aset-daerah/index')->name('aset-daerah');
Route::inertia('/admin/impor', 'admin/impor/index')->name('admin.impor');
