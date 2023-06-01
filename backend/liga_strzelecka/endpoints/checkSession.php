<?php
function checkSession()
{
    if (IsAuth()) {
        $data = new stdClass();

        $data->id_admina = $_SESSION['id_admina'];
        $data->login = $_SESSION['login'];

        handleResponse(200, $data);
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}
?>