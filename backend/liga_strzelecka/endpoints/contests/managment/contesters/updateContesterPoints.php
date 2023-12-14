<?php
function updateContesterPoints($conn)
{
    if (isAuth()) {
        if (
            isset($_POST['team_id']) &&
            isset($_POST['shooter_id']) &&
            isset($_POST['pointName']) &&
            isset($_POST['value'])
        ) {
            try {
                $team_id = $_POST['team_id'];
                $shooter_id = $_POST['shooter_id'];
                $pointName = $_POST['pointName'];
                $value = $_POST['value'];

                // Validate pointName format
                if (preg_match('/^shoot_[1-9]|10$/', $pointName)) {
                    $query = "UPDATE contesters SET $pointName = ? WHERE shooter_id=? AND team_id=?";
                    $stmt = mysqli_prepare($conn, $query);
                    $stmt->bind_param('sss', $value, $shooter_id, $team_id);
                    $stmt->execute();

                    handleResponse(200, 'Żądanie zostało wykonane pomyślnie');

                } else {
                    handleResponse(400, 'Nieprawidłowy format pointName');
                }
            } catch (mysqli_sql_exception $e) {
                handleResponse(409, 'Wystąpił błąd', $e->getMessage());
            }
        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}
?>