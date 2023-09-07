<?php
function getArchivedShooters($conn)
{
    if (isAuth()) {
        $stmt = $conn->prepare("SELECT * FROM shooters WHERE isArchived = 1");
        $stmt->execute();
        $result = $stmt->get_result();

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        handleResponse(200, 'Żądanie zostało wykonane pomyślnie.', $data);


    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}
?>