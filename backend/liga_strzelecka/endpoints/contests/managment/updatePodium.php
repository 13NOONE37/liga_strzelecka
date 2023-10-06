<?php
function updatePodium($conn)
{
    if (isAuth()) {
        if (isset($_POST['contest_id'])) {
            $contest_id = $_POST['contest_id'];
            $fieldsToUpdate = array();
            $params = array();
            $paramTypes = '';

            if (isset($_POST['man_first_place_shooter_id'])) {
                $fieldsToUpdate[] = 'man_first_place_shooter_id = ?';
                $params[] = $_POST['man_first_place_shooter_id'];
                $paramTypes .= 's';
            }
            if (isset($_POST['man_second_place_shooter_id'])) {
                $fieldsToUpdate[] = 'man_second_place_shooter_id = ?';
                $params[] = $_POST['man_second_place_shooter_id'];
                $paramTypes .= 's';
            }
            if (isset($_POST['man_third_place_shooter_id'])) {
                $fieldsToUpdate[] = 'man_third_place_shooter_id = ?';
                $params[] = $_POST['man_third_place_shooter_id'];
                $paramTypes .= 's';
            }
            if (isset($_POST['woman_first_place_shooter_id'])) {
                $fieldsToUpdate[] = 'woman_first_place_shooter_id = ?';
                $params[] = $_POST['woman_first_place_shooter_id'];
                $paramTypes .= 's';
            }
            if (isset($_POST['woman_second_place_shooter_id'])) {
                $fieldsToUpdate[] = 'woman_second_place_shooter_id = ?';
                $params[] = $_POST['woman_second_place_shooter_id'];
                $paramTypes .= 's';
            }
            if (isset($_POST['woman_third_place_shooter_id'])) {
                $fieldsToUpdate[] = 'woman_third_place_shooter_id = ?';
                $params[] = $_POST['woman_third_place_shooter_id'];
                $paramTypes .= 's';
            }
            if (isset($_POST['first_place_team_id'])) {
                $fieldsToUpdate[] = 'first_place_team_id = ?';
                $params[] = $_POST['first_place_team_id'];
                $paramTypes .= 's';
            }
            if (isset($_POST['second_place_team_id'])) {
                $fieldsToUpdate[] = 'second_place_team_id = ?';
                $params[] = $_POST['second_place_team_id'];
                $paramTypes .= 's';
            }
            if (isset($_POST['third_place_team_id'])) {
                $fieldsToUpdate[] = 'third_place_team_id = ?';
                $params[] = $_POST['third_place_team_id'];
                $paramTypes .= 's';
            }


            if (count($fieldsToUpdate) > 0) {
                $query = "UPDATE contests SET " . implode(', ', $fieldsToUpdate) . " WHERE contest_id=?";
                $stmt = mysqli_prepare($conn, $query);

                $params[] = $contest_id;
                $boundParams = [];
                foreach ($params as $param) {
                    if ($param === '') {
                        $boundParams[] = null; // Replace empty string with NULL
                    } else {
                        $boundParams[] = $param; // Keep the parameter as is
                    }
                }

                // Bind the parameters
                $stmt->bind_param($paramTypes . 's', ...$boundParams);
                $stmt->execute();
                handleResponse(200, 'Żądanie zostało wykonane pomyślnie');

            } else {
                handleResponse(404, 'Brak pól do zaktualizowania');
            }

        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}
?>