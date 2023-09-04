<?php
function deleteContest($conn)
{
    if (isAuth()) {
        if (isset($_POST['contest_id'])) {
            $contest_id = $_POST['contest_id'];

            $query = "DELETE FROM contests WHERE contest_id=?";
            $stmt = mysqli_prepare($conn, $query);
            $stmt->bind_param('s', $contest_id);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
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