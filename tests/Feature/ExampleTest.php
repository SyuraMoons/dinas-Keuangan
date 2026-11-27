<?php

test('home redirects to ringkasan', function () {
    $this->get(route('home'))->assertRedirect(route('ringkasan'));
});
