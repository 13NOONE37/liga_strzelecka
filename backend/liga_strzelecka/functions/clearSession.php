<?php
function clearSession()
{
    session_unset();
    session_destroy();
    setcookie('session_id', '', time() - 3600, '/', 'example.com', false, true);
}
?>