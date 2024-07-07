<?php
function dmg_register_post_meta()
{
    register_post_meta('post', 'dmg-read-more', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ));
}
add_action('init', 'dmg_register_post_meta');
