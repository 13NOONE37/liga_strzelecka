<?php
function checkSession()
{
    if (IsAuth()) {
        $data = new stdClass();

        $data->admin_id = $_SESSION['admin_id'];
        $data->login = $_SESSION['login'];

        handleResponse(200, 'Zalogowano pomyślnie', $data);
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}
?>