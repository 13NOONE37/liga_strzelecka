<?php
function createTeam($conn)
{
    if (isAuth()) {
        if (isset($_POST['contest_id']) && isset($_POST['school_id']) && isset($_POST['team_id'])) {
            $contest_id = $_POST['contest_id'];
            $team_id = $_POST['team_id'];
            $school_id = $_POST['school_id'];

            $query = "SELECT * FROM teams WHERE contest_id=? AND team_id=? AND school_id=?";
            $stmt = mysqli_prepare($conn, $query);
            $stmt->bind_param('sss', $contest_id, $team_id, $school_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                try {
                    $query = "INSERT INTO teams (`team_id`,`school_id`, `contest_id`) VALUES (?,?,?);";
                    $stmt = mysqli_prepare($conn, $query);
                    $stmt->bind_param('sss', $team_id, $school_id, $contest_id);
                    $stmt->execute();

                    handleResponse(200, 'Drużyna została dodana', $stmt->affected_rows);

                } catch (mysqli_sql_exception $e) {
                    handleResponse(409, 'Wystąpił błąd', $e->getMessage());

                }
            } else {
                handleResponse(409, 'Drużyna już istnieje');
            }
        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}

?>