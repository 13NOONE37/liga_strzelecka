<?php
function auth($conn)
{
    if (isset($_POST['login']) && isset($_POST['password'])) {
        $login = $_POST['login'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT * FROM admins WHERE login=?");
        $stmt->bind_param("s", $login);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $hash_password = $row['password'];

            if (password_verify($password, $hash_password)) {

                $_SESSION['admin_id'] = $row['admin_id'];
                $_SESSION['login'] = $row['login'];

                $data = new stdClass();
                $data->admin_id = $row['admin_id'];
                $data->login = $row['login'];

                handleResponse(200, 'Zalogowano pomyślnie', $data);
            } else {
                handleResponse(401, 'Błędny login lub hasło');
            }
        } else {
            handleResponse(401, 'Błędny login lub hasło');

        }
    } else {
        handleResponse(400, 'Żądanie jest niekompletne');
    }

}


?>