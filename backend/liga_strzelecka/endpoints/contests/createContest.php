<?php
function createContest($conn)
{
    if (isAuth()) {
        if (isset($_POST['contest_id']) && isset($_POST['date']) && isset($_POST['location'])) {
            $contest_id = $_POST['contest_id'];
            $date = $_POST['date'];
            $location = $_POST['location'];


            try {
                $query = "INSERT INTO `contests` (`contest_id`, `date`, `location`, `man_first_place_shooter_id`, `man_second_place_shooter_id`, `man_third_place_shooter_id`, `woman_first_place_shooter_id`, `woman_second_place_shooter_id`, `woman_third_place_shooter_id`, `first_place_team_id`, `second_place_team_id`, `third_place_team_id`) VALUES (?,?,?, null, null, null, null, null, null, null, null, null);";
                $stmt = mysqli_prepare($conn, $query);
                $stmt->bind_param('sss', $contest_id, $date, $location);
                $stmt->execute();

                handleResponse(200, 'Zawody zostały dodane', $stmt->affected_rows);

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