<?php
function updateContest($conn)
{
    if (isAuth()) {
        if (isset($_POST['contest_id']) && isset($_POST['date']) && isset($_POST['location'])) {
            $contest_id = $_POST['contest_id'];
            $date = $_POST['date'];
            $location = $_POST['location'];

            $query = "UPDATE contests SET `date` = ?, `location` = ? WHERE contest_id=?";
            $stmt = mysqli_prepare($conn, $query);
            $stmt->bind_param('sss', $date, $location, $contest_id);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                handleResponse(200, 'Żądanie zostało wykonane pomyślnie.');
            } else {
                handleResponse(409, 'Aktualizacja nie powiodła się.');
            }

        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}
?>