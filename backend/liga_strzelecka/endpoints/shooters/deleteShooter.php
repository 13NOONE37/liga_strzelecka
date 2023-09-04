<?php
function deleteShooter($conn)
{
    if (isAuth()) {
        if (isset($_POST['shooter_id'])) {
            $shooter_id = $_POST['shooter_id'];

            $query = "DELETE FROM shooters WHERE shooter_id=?";
            $stmt = mysqli_prepare($conn, $query);
            $stmt->bind_param('s', $shooter_id);
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