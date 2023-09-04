<?php
function deleteTeam($conn)
{
    if (isAuth()) {
        if (isset($_POST['contest_id']) && isset($_POST['team_id'])) {
            $contest_id = $_POST['contest_id'];
            $team_id = $_POST['team_id'];

            $query1 = "DELETE FROM contesters WHERE team_id=?";
            $stmt1 = mysqli_prepare($conn, $query1);
            $stmt1->bind_param('s', $team_id);
            $stmt1->execute();

            $query2 = "DELETE FROM teams WHERE contest_id=? AND team_id=?";
            $stmt2 = mysqli_prepare($conn, $query2);
            $stmt2->bind_param('ss', $contest_id, $team_id);
            $stmt2->execute();

            if ($stmt1->affected_rows > 0 || $stmt2->affected_rows > 0) {
                handleResponse(200, 'Usunięto pomyślnie');
            } else {
                handleResponse(404, 'Usuwanie nie powiodło się.');
            }
        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}


?>