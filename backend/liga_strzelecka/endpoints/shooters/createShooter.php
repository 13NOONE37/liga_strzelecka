<?php
function createShooter($conn)
{
    if (isAuth()) {
        if (isset($_POST['shooter_id']) && isset($_POST['school_id']) && isset($_POST['firstName']) && isset($_POST['secondName']) && isset($_POST['isMan'])) {
            $shooter_id = $_POST['shooter_id'];
            $school_id = $_POST['school_id'];
            $firstName = $_POST['firstName'];
            $secondName = $_POST['secondName'];
            $isMan = $_POST['isMan'];

            try {
                $query = "INSERT INTO shooters (shooter_id, school_id, firstName, secondName, isMan) VALUES(?, ?, ?, ?, ?)";
                $stmt = mysqli_prepare($conn, $query);
                $stmt->bind_param('ssssi', $shooter_id, $school_id, $firstName, $secondName, $isMan);
                $stmt->execute();

                handleResponse(200, 'Strzelec został dodany', $stmt->affected_rows);

            } catch (mysqli_sql_exception $e) {
                handleResponse(409, 'Wystąpił błąd', $e->getMessage());

            }

        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}

?>