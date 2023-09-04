<?php
function getShooters($conn)
{
    if (isAuth()) {
        $stmt = $conn->prepare("SELECT * FROM shooters");
        $stmt->execute();
        $result = $stmt->get_result();

        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // if (!empty($data)) {
        handleResponse(200, 'Żądanie zostało wykonane pomyślnie.', $data);
        // } else {
        //     handleResponse(404, 'Nie znaleziono żadnych danych.');
        // }

    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}
?>