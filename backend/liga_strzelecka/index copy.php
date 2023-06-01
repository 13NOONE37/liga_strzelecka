<?php
session_start();
require('functions/isAdmin.php');
require('functions/clearSession.php');

$host = 'localhost'; //zmienić w zależności od ustawień bazy
$username = 'root'; //zmienić w zależności od ustawień bazy
$password = ''; //zmienić w zależności od ustawień bazy
$database = 'liga_strzelecka'; //zmienić w zależności od ustawień bazy
$url = 'http://localhost:5173'; //zmienić w zależności od serwera

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


header('Content-Type: application/json');
header("Access-Control-Allow-Origin: $url");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");



function missingFieldsError()
{
    echo json_encode(array('message' => 'Żądanie jest niekompletne.', 'code' => '400'));
}

function authRequiredError()
{
    echo json_encode(array('message' => 'Żądanie wymaga autoryzacji.', 'code' => '401'));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];

        switch ($action) {

            case 'auth':
                if (isset($_POST['email']) && isset($_POST['password'])) {
                    $email = $_POST['email'];
                    $password = $_POST['password'];

                    $stmt = $conn->prepare("SELECT * FROM uzytkownicy WHERE email=?");
                    $stmt->bind_param("s", $email);
                    $stmt->execute();
                    $result = $stmt->get_result();

                    if ($result->num_rows === 1) {
                        $row = $result->fetch_assoc();
                        $hash_password = $row['haslo'];

                        if (password_verify($password, $hash_password)) {

                            $_SESSION['id_uzytkownika'] = $row['id_uzytkownika'];
                            $_SESSION['imie'] = $row['imie'];
                            $_SESSION['nazwisko'] = $row['nazwisko'];
                            $_SESSION['email'] = $row['email'];
                            $_SESSION['czyAdmin'] = $row['czyAdmin'];

                            $data = new stdClass();
                            $data->id_uzytkownika = $row['id_uzytkownika'];
                            $data->imie = $row['imie'];
                            $data->nazwisko = $row['nazwisko'];
                            $data->email = $row['email'];
                            $data->czyAdmin = $row['czyAdmin'];
                            $data->code = '200';


                            echo json_encode($data);
                        } else {
                            echo json_encode(array('message' => 'Błędny email lub hasło', 'code' => '401'));
                        }
                    } else {
                        echo json_encode(array('message' => 'Błędny email lub hasło', 'code' => '401'));
                    }
                } else {
                    echo json_encode(array('message' => 'Żądanie jest niekompletne.', 'code' => '400'));
                }
                break;

            case 'logout':
                clearSession();
                echo json_encode(array('messsage' => 'Wylogowano pomyślnie', 'code' => '200'));
                break;

            case 'checksession':
                if (IsAuth()) {
                    $data = new stdClass();

                    $data->id_uzytkownika = $_SESSION['id_uzytkownika'];
                    $data->imie = $_SESSION['imie'];
                    $data->nazwisko = $_SESSION['nazwisko'];
                    $data->email = $_SESSION['email'];
                    $data->czyAdmin = $_SESSION['czyAdmin'];
                    $data->code = '200';


                    echo json_encode($data);
                } else {
                    echo json_encode(array('message' => 'Nie zalogowano', 'code' => '401', ));
                }
                break;


            case 'getranking':
                if (isAuth()) {
                    if (isset($_POST['start_date']) && isset($_POST['end_date'])) {
                        //format daty '2023-04-22'
                        $start_date = $_POST['start_date'];
                        $end_date = $_POST['end_date'];

                        $stmt = $conn->prepare("SELECT  uzytkownicy.id_uzytkownika, 
                                            AVG(CASE WHEN wyniki.punkty > 0 THEN wyniki.punkty END) AS AvgPunkty, 
                                            AVG(CASE WHEN wyniki.dziesiatki > 0 THEN wyniki.dziesiatki END) AS AvgDziesiatki, 
                                            uzytkownicy.imie, 
                                            uzytkownicy.nazwisko
                                        FROM 
                                            treningi 
                                            INNER JOIN (uzytkownicy INNER JOIN wyniki ON uzytkownicy.id_uzytkownika = wyniki.id_uzytkownika) 
                                                ON treningi.id_treningu = wyniki.id_treningu
                                        WHERE 
                                            (((treningi.data_treningu) >= ? AND (treningi.data_treningu) <= ?))
                                        GROUP BY 
                                            uzytkownicy.id_uzytkownika, uzytkownicy.imie, uzytkownicy.nazwisko
                                        ORDER BY 
                                            AvgPunkty DESC;");
                        $stmt->bind_param("ss", $start_date, $end_date);
                        $stmt->execute();
                        $result = $stmt->get_result();

                        $data = array();

                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $data[] = $row;
                            }
                            echo json_encode($data);
                        } else {
                            echo json_encode(array('message' => 'Brak wyników.', 'code' => '204'));
                        }
                    } else {
                        missingFieldsError();
                    }
                } else {
                    authRequiredError();
                }
                break;


            case 'gettrainings':
                if (isAuth()) {
                    if (isset($_POST['start_date']) && isset($_POST['end_date'])) {
                        //format daty '2023-04-22'
                        $start_date = $_POST['start_date'];
                        $end_date = $_POST['end_date'];

                        $stmt = $conn->prepare("SELECT treningi.data_treningu, treningi.id_treningu
                                                    FROM treningi
                                                    WHERE treningi.data_treningu BETWEEN ? AND ?
                                                    ORDER BY treningi.data_treningu DESC;");
                        $stmt->bind_param("ss", $start_date, $end_date);
                        $stmt->execute();
                        $result = $stmt->get_result();

                        $data = array();
                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $data[] = $row;
                            }
                            echo json_encode($data);
                        } else {
                            echo json_encode(array('message' => 'Brak wyników.', 'code' => '204'));
                        }
                        $stmt->close();
                    } else {
                        missingFieldsError();
                    }
                } else {
                    authRequiredError();
                }
                break;

            case 'getuserslist':
                if (isAuth() && isAdmin()) {
                    $sql = "SELECT id_uzytkownika, imie, nazwisko FROM uzytkownicy WHERE czyAdmin = 0";
                    $stmt = mysqli_prepare($conn, $sql);
                    mysqli_stmt_execute($stmt);
                    $result = mysqli_stmt_get_result($stmt);

                    $data = array();

                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            $data[] = $row;
                        }
                        echo json_encode($data);
                    } else {
                        echo json_encode(array('message' => 'Brak wyników.', 'code' => '204'));
                    }
                } else {
                    authRequiredError();
                }
                break;

            case 'getusertrainings':
                if (isAuth()) {
                    if (isset($_POST['user_id']) && isset($_POST['start_date']) && isset($_POST['end_date'])) {
                        $start_date = $_POST['start_date'];
                        $end_date = $_POST['end_date'];
                        $user_id = $_POST['user_id'];
                        if ($_SESSION['czyAdmin'] == 0) {
                            $user_id = $_SESSION['id_uzytkownika'];
                        }

                        $sql = "SELECT treningi.data_treningu, wyniki.punkty, wyniki.dziesiatki, wyniki.uwagi
                                FROM treningi
                                INNER JOIN (uzytkownicy INNER JOIN wyniki ON uzytkownicy.id_uzytkownika = wyniki.id_uzytkownika) ON treningi.id_treningu = wyniki.id_treningu
                                WHERE uzytkownicy.id_uzytkownika=?
                                AND treningi.data_treningu BETWEEN ? AND ?
                                ORDER BY treningi.data_treningu DESC";

                        $stmt = mysqli_prepare($conn, $sql);
                        mysqli_stmt_bind_param($stmt, "iss", $user_id, $start_date, $end_date);
                        mysqli_stmt_execute($stmt);
                        $result = mysqli_stmt_get_result($stmt);

                        $data = array();

                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $data[] = $row;
                            }
                            echo json_encode($data);
                        } else {
                            echo json_encode(array('message' => 'Brak wyników.', 'code' => '204'));
                        }

                    } else {
                        missingFieldsError();

                    }
                } else {
                    authRequiredError();
                }
                break;


            case 'gettraininginfo':
                if (isAuth()) {
                    if (isset($_POST['training_id']) && isset($_POST['user_id'])) {
                        $training_id = $_POST['training_id'];
                        $user_id = $_POST['user_id'];

                        $stmt = mysqli_prepare($conn, "SELECT wyniki.punkty, wyniki.dziesiatki, wyniki.uwagi
                            FROM uzytkownicy INNER JOIN (treningi INNER JOIN wyniki ON treningi.id_treningu = wyniki.id_treningu) ON uzytkownicy.id_uzytkownika = wyniki.id_uzytkownika
                            WHERE treningi.id_treningu = ? AND uzytkownicy.id_uzytkownika=?");

                        mysqli_stmt_bind_param($stmt, "ii", $training_id, $user_id);
                        mysqli_stmt_execute($stmt);

                        $result = mysqli_stmt_get_result($stmt);

                        $data = array();

                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                                $data[] = $row;
                            }
                            echo json_encode($data);
                        } else {
                            echo json_encode(array('message' => 'Brak wyników.', 'code' => '204'));
                        }

                        mysqli_stmt_close($stmt);

                    } else {
                        missingFieldsError();

                    }
                } else {
                    authRequiredError();
                }
                break;


            case 'createtraining':
                if (isAuth() && isAdmin()) {
                    if (isset($_POST['date'])) {
                        //format daty '2023-04-22'  
                        $date = $_POST['date'];

                        $stmt = mysqli_prepare($conn, "INSERT INTO treningi VALUES (null, ?)");

                        mysqli_stmt_bind_param($stmt, "s", $date);
                        mysqli_stmt_execute($stmt);

                        if (mysqli_affected_rows($conn) > 0) {
                            echo json_encode(array('message' => 'Trening utworzony pomyślnie.', 'code' => '200'));
                        } else {
                            echo json_encode(array('message' => 'Nie udało się stworzyć treningu.', 'code' => '400'));
                        }

                        mysqli_stmt_close($stmt);

                    } else {
                        missingFieldsError();

                    }
                } else {
                    authRequiredError();
                }
                break;

            case 'updateresult':
                if (isAuth() && isAdmin()) {
                    if (isset($_POST['training_id']) && isset($_POST['user_id']) && isset($_POST['points']) && isset($_POST['tens']) && isset($_POST['note'])) {
                        $training_id = $_POST['training_id'];
                        $user_id = $_POST['user_id'];
                        $points = $_POST['points'];
                        $tens = $_POST['tens'];
                        $note = $_POST['note'];

                        if ($points >= 0 && $points <= 100 && $tens >= 0 && $tens <= 10) {


                            $query = "SELECT * FROM `wyniki` WHERE id_treningu=? AND id_uzytkownika=?";
                            $stmt = mysqli_prepare($conn, $query);
                            mysqli_stmt_bind_param($stmt, "ii", $training_id, $user_id);
                            mysqli_stmt_execute($stmt);
                            $result = mysqli_stmt_get_result($stmt);

                            if ($row = mysqli_fetch_assoc($result)) {
                                //update
                                $query = "UPDATE wyniki SET punkty=?, dziesiatki=?, uwagi='$note' WHERE id_treningu=? AND id_uzytkownika=?";
                                $stmt = mysqli_prepare($conn, $query);
                                mysqli_stmt_bind_param($stmt, "iisi", $points, $tens, $training_id, $user_id);
                                $res = mysqli_stmt_execute($stmt);

                                echo json_encode(array('info' => $res, 'message' => 'Zaaktualizowano wyniki.', 'code' => '200'));

                            } else {
                                //create
                                $query = "INSERT INTO wyniki (id_treningu, id_uzytkownika, punkty, dziesiatki, uwagi) 
                                         VALUES (?,?,?,?,?)";
                                $stmt = mysqli_prepare($conn, $query);
                                mysqli_stmt_bind_param($stmt, "iiiss", $training_id, $user_id, $points, $tens, $note);
                                $res = mysqli_stmt_execute($stmt);

                                echo json_encode(array('info' => $res, 'message' => 'Dodano wyniki.', 'code' => '200'));

                            }
                        } else {
                            echo json_encode(array('info' => false, 'message' => 'Niepoprawna wartość punktów lub dziesiątek.', 'code' => '400'));
                        }

                    } else {
                        missingFieldsError();

                    }
                } else {
                    authRequiredError();
                }
                break;
            case 'deletetraining':
                if (isAuth() && isAdmin()) {
                    if (isset($_POST['training_id'])) {
                        $training_id = $_POST['training_id'];
                        $query1 = "DELETE FROM treningi WHERE id_treningu = ?";
                        $query2 = "DELETE FROM wyniki WHERE id_treningu = ?";
                        $stmt1 = mysqli_prepare($conn, $query1);
                        $stmt2 = mysqli_prepare($conn, $query2);

                        mysqli_stmt_bind_param($stmt1, "i", $training_id);
                        mysqli_stmt_bind_param($stmt2, "i", $training_id);

                        mysqli_stmt_execute($stmt1);
                        mysqli_stmt_execute($stmt2);


                        echo json_encode(array('info' => mysqli_affected_rows($conn), 'message' => 'Trening usunięty pomyślnie.', 'code' => '200'));

                    } else {
                        missingFieldsError();

                    }
                } else {
                    authRequiredError();
                }
                break;


            default:
                echo json_encode(array('message' => 'Nieznane żądanie.', 'code' => '404'));
                break;
        }
    } else {
        missingFieldsError();
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    header('Location: index.html');
} else {
    echo json_encode(array('message' => 'Nieprawidłowa metoda żądania.', 'code' => '405'));
}
?>