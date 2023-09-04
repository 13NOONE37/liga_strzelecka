<?php
function updateSchool($conn)
{
    if (isAuth()) {
        if (isset($_POST['school_id']) && isset($_POST['name'])) {
            $school_id = $_POST['school_id'];
            $name = $_POST['name'];

            $query = "UPDATE schools SET name=? WHERE school_id=?";
            $stmt = mysqli_prepare($conn, $query);
            $stmt->bind_param('ss', $name, $school_id);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                handleResponse(200, 'Żądanie zostało wykonane pomyślnie.', );
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