<?php
function isAuth()
{
    if (isset($_SESSION['id_admina'])) {
        return true;
    }
}
?>