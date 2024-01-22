<?php
function deleteContester($conn)
{
    if (isAuth()) {
        if (isset($_POST['team_id']) && isset($_POST['shooter_id'])) {
            try {
                $team_id = $_POST['team_id'];
                $shooter_id = $_POST['shooter_id'];

                $query = "DELETE FROM contesters WHERE team_id=? AND shooter_id=?";
                $stmt = mysqli_prepare($conn, $query);
                $stmt->bind_param("ss", $team_id, $shooter_id);
                $stmt->execute();

                handleResponse(200, 'Strzelec został usunięty');

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