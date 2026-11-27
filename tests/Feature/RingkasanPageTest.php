<?php

test('ringkasan renders the page component', function () {
    $this->get(route('ringkasan'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('ringkasan/index'));
});
