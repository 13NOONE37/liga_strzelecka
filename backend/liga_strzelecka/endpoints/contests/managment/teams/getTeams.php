<?php
function getTeams($conn)
{
    if (isAuth()) {
        if (isset($_POST['contest_id'])) {
            $contest_id = $_POST['contest_id'];
            $query = "SELECT * FROM teams WHERE contest_id = ?";
            $stmt = mysqli_prepare($conn, $query);
            $stmt->bind_param('s', $contest_id);
            $stmt->execute();
            $result = $stmt->get_result();

            $data = array();

            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            handleResponse(200, 'Żądanie zostało wykonane pomyślnie.', $data);
        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }





    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}
?>