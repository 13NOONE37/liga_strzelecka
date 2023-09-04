<?php
function isAuth()
{
    if (isset($_SESSION['admin_id'])) {
        return true;
    }
}
?>