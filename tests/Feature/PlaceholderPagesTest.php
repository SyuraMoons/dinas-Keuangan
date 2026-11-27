<?php

test('placeholder page renders its Inertia component', function (string $route, string $component) {
    $this->get(route($route))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component($component));
})->with([
    'ringkasan' => ['ringkasan', 'ringkasan/index'],
    'realisasi anggaran' => ['realisasi-anggaran', 'realisasi-anggaran/index'],
    'pajak pbb' => ['pajak-pbb', 'pajak-pbb/index'],
    'aset daerah' => ['aset-daerah', 'aset-daerah/index'],
    'impor data' => ['admin.impor', 'admin/impor/index'],
]);

test('guest shares a null auth user', function () {
    $this->get(route('ringkasan'))
        ->assertInertia(fn ($page) => $page->where('auth.user', null));
});
