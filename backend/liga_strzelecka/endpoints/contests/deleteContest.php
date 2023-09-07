<?php
function deleteContest($conn)
{
    if (isAuth()) {
        if (isset($_POST['contest_id'])) {
            $contest_id = $_POST['contest_id'];

            //Delete contesters
            try {

                $queryContester = "DELETE FROM contesters WHERE team_id IN (
                SELECT team_id FROM teams WHERE contest_id = ?
            )";
                $stmtContester = mysqli_prepare($conn, $queryContester);
                $stmtContester->bind_param('s', $contest_id);
                $stmtContester->execute();
                // $stmtContester->close();

                //Delete teams
                $queryTeam = "DELETE FROM teams WHERE contest_id = ?";
                $stmtTeam = mysqli_prepare($conn, $queryTeam);
                $stmtTeam->bind_param('s', $contest_id);
                $stmtTeam->execute();
                // $stmtTeam->close();

                //Delete contests
                $query = "DELETE FROM contests WHERE contest_id=?";
                $stmt = mysqli_prepare($conn, $query);
                $stmt->bind_param('s', $contest_id);
                $stmt->execute();

                handleResponse(200, 'Usunięto pomyślnie');
            } catch (error) {
                handleResponse(404, 'Wystąpił błąd');

            }

        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}