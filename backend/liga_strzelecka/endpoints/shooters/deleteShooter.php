<?php
function deleteShooter($conn)
{
    if (isAuth()) {
        if (isset($_POST['shooter_id'])) {
            $shooter_id = $_POST['shooter_id'];

            // Check if the user exists in the contesters table
            $queryCheckUser = "SELECT COUNT(*) FROM contesters WHERE shooter_id=?";
            $stmtCheckUser = mysqli_prepare($conn, $queryCheckUser);
            $stmtCheckUser->bind_param('s', $shooter_id);
            $stmtCheckUser->execute();
            $stmtCheckUser->bind_result($userCount);
            $stmtCheckUser->fetch();
            $stmtCheckUser->close();
            
            if ($userCount > 0) {
                handleResponse(405, 'Nie można usunąć użytkownika ponieważ jest przypisany do zawodów.');
            } else {
                $query = "DELETE FROM shooters WHERE shooter_id=?";
                $stmt = mysqli_prepare($conn, $query);
                $stmt->bind_param('s', $shooter_id);
                $stmt->execute();

                handleResponse(200, 'Usunięto pomyślnie');

            }


        } else {
            handleResponse(400, 'Żądanie jest niekompletne');
        }
    } else {
        handleResponse(401, 'Nie zalogowano');
    }
}

?>