<?php
function createContester($conn)
{
    if (isAuth()) {
        if (isset($_POST['team_id']) && isset($_POST['shooter_id']) && isset($_POST['isInTeam'])) {
            try {
                $team_id = $_POST['team_id'];
                $shooter_id = $_POST['shooter_id'];
                $isInTeam = $_POST['isInTeam'];

                $query = "SELECT * FROM contesters WHERE team_id=? AND shooter_id=?";
                $stmt = mysqli_prepare($conn, $query);
                $stmt->bind_param("ss", $team_id, $shooter_id);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows === 0) {
                    try {
                        $team_id = $_POST['team_id'];
                        $shooter_id = $_POST['shooter_id'];
                        $isInTeam = $_POST['isInTeam'];

                        $query = "INSERT INTO contesters (`team_id`,`shooter_id`, `isInTeam`, `shoot_1`, `shoot_2`, `shoot_3`, `shoot_4`, `shoot_5`, `shoot_6`, `shoot_7`, `shoot_8`, `shoot_9`, `shoot_10`) VALUES (?,?,?, null, null, null, null, null,null, null, null, null, null);";
                        $stmt = mysqli_prepare($conn, $query);
                        $stmt->bind_param('sss', $team_id, $shooter_id, $isInTeam);
                        $stmt->execute();

                        handleResponse(200, 'Strzelec został dodany', $stmt->affected_rows);

                    } catch (mysqli_sql_exception $e) {
                        handleResponse(409, 'Wystąpił błąd', $e->getMessage());
                    }
                } else {
                    handleResponse(409, 'Taki strzelec został już dodany');
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