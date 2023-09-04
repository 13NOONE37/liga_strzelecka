<?php
function getContests($conn)
{
    if (isAuth()) {
        $stmt = $conn->prepare("SELECT * FROM contests");
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