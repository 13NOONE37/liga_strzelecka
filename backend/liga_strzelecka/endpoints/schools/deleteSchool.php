<?php
function deleteSchool($conn)
{
    if (isAuth()) {
        if (isset($_POST['school_id'])) {
            $school_id = $_POST['school_id'];

            $query = "SELECT * FROM shooters WHERE school_id=?";
            $stmt = mysqli_prepare($conn, $query);
            $stmt->bind_param("s", $school_id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                $query = "DELETE FROM schools WHERE school_id=?";
                $stmt = mysqli_prepare($conn, $query);
                $stmt->bind_param('s', $school_id);
                $stmt->execute();

                if ($stmt->affected_rows > 0) {
                    handleResponse(200, 'Usunięto pomyślnie');
                } else {
                    handleResponse(404, 'Usuwanie nie powiodło się.');
                }
            } else {
                handleResponse(409, 'Usuwanie nie powiodło się. Do tej szkoły są przypisani strzelcy.');
            }
        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}

?>