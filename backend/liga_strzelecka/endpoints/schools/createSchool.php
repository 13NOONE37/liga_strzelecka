<?php
function createSchool($conn)
{
    if (isAuth()) {
        if (isset($_POST['school_id']) && isset($_POST['name'])) {
            $school_id = $_POST['school_id'];
            $name = $_POST['name'];

            $query = "SELECT * FROM schools WHERE school_id=? OR name=?";
            $stmt = mysqli_prepare($conn, $query);
            $stmt->bind_param("ss", $school_id, $name);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                $query = "INSERT INTO schools (school_id, name) VALUES(?, ?)";
                $stmt = mysqli_prepare($conn, $query);
                $stmt->bind_param('ss', $school_id, $name);
                $stmt->execute();
                $result = $stmt->get_result();

                handleResponse(200, 'Szkoła została utworzona');
            } else {
                handleResponse(409, 'Taka szkoła już istnieje');
            }
        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}

?>