<?php
function updateShooter($conn)
{
    if (isAuth()) {
        if (isset($_POST['shooter_id'])) {
            $shooter_id = $_POST['shooter_id'];
            $fieldsToUpdate = array();
            $params = array();
            $paramTypes = '';

            if (isset($_POST['school_id'])) {
                $fieldsToUpdate[] = 'school_id = ?';
                $params[] = $_POST['school_id'];
                $paramTypes .= 's';
            }
            if (isset($_POST['firstName'])) {
                $fieldsToUpdate[] = 'firstName = ?';
                $params[] = $_POST['firstName'];
                $paramTypes .= 's';
            }
            if (isset($_POST['secondName'])) {
                $fieldsToUpdate[] = 'secondName = ?';
                $params[] = $_POST['secondName'];
                $paramTypes .= 's';
            }
            if (isset($_POST['isMan'])) {
                $fieldsToUpdate[] = 'isMan = ?';
                $params[] = $_POST['isMan'];
                $paramTypes .= 'i';
            }
            if (isset($_POST['isArchived'])) {
                $fieldsToUpdate[] = 'isArchived = ?';
                $params[] = $_POST['isArchived'];
                $paramTypes .= 'i';
            }

            if (count($fieldsToUpdate) > 0) {
                $query = "UPDATE shooters SET " . implode(', ', $fieldsToUpdate) . " WHERE shooter_id=?";
                $stmt = mysqli_prepare($conn, $query);

                $params[] = $shooter_id;
                $stmt->bind_param($paramTypes . 's', ...$params);
                $stmt->execute();

                if ($stmt->affected_rows > 0) {
                    handleResponse(200, 'Żądanie zostało wykonane pomyślnie');
                } else {
                    handleResponse(404, 'Aktualizacja nie powiodła się');
                }
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