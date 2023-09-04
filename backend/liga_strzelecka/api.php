<?php
session_start();
require('functions/handleResponse.php');
require('functions/clearSession.php');
require('functions/isAuth.php');

require('endpoints/checkSession.php');
require('endpoints/auth.php');
require('endpoints/logout.php');
require('endpoints/schools/getSchools.php');
require('endpoints/schools/createSchool.php');
require('endpoints/schools/updateSchool.php');
require('endpoints/schools/deleteSchool.php');
require('endpoints/shooters/getShooters.php');
require('endpoints/shooters/createShooter.php');
require('endpoints/shooters/updateShooter.php');
require('endpoints/shooters/deleteShooter.php');
require('endpoints/contests/getContests.php');
require('endpoints/contests/createContest.php');
require('endpoints/contests/updateContest.php');
require('endpoints/contests/deleteContest.php');
require('endpoints/contests/managment/updatePodium.php');
require('endpoints/contests/managment/teams/getTeams.php');
require('endpoints/contests/managment/teams/createTeam.php');
require('endpoints/contests/managment/teams/deleteTeam.php');
require('endpoints/contests/managment/contesters/getContesters.php');
require('endpoints/contests/managment/contesters/createContester.php');
require('endpoints/contests/managment/contesters/updateContesterPoints.php');


$host = 'localhost'; //zmienić w zależności od ustawień bazy
$username = 'root'; //zmienić w zależności od ustawień bazy
$password = ''; //zmienić w zależności od ustawień bazy
$database = 'liga_strzelecka'; //zmienić w zależności od ustawień bazy
$url = 'http://localhost:5173'; //zmienić w zależności od serwera

$conn = mysqli_connect($host, $username, $password, $database);
mysqli_set_charset($conn, 'utf8');

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


header('Content-Type: application/json');
header("Access-Control-Allow-Origin: $url");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'checkSession':
                checkSession();
                break;
            case 'auth':
                auth($conn);
                break;
            case 'logout':
                logout();
                break;

            case 'getSchools':
                getSchools($conn);
                break;
            case 'createSchool':
                createSchool($conn);
                break;
            case 'updateSchool':
                updateSchool($conn);
                break;
            case 'deleteSchool':
                deleteSchool($conn);
                break;


            case 'getShooters':
                getShooters($conn);
                break;
            case 'createShooter':
                createShooter($conn);
                break;
            case 'updateShooter':
                updateShooter($conn);
                break;
            case 'deleteShooter':
                deleteShooter($conn);
                break;

            case 'getContests':
                getContests($conn);
                break;
            case 'createContest':
                createContest($conn);
                break;
            case 'updateContest':
                updateContest($conn);
                break;
            case 'deleteContest':
                deleteContest($conn);
                break;

            case 'updatePodium':
                updatePodium($conn);
                break;


            case 'getTeams':
                getTeams($conn);
                break;
            case 'createTeam':
                createTeam($conn);
                break;
            case 'deleteTeam':
                deleteTeam($conn);
                break;

            case 'getContesters':
                getContesters($conn);
                break;
            case 'createContester':
                createContester($conn);
                break;
            case 'updateContesterPoints':
                updateContesterPoints($conn);
                break;

            default:
                handleResponse(404, 'Żądanie nieznane');
                break;

        }
    } else {
        handleResponse(400, 'Żądanie jest niekompletne');
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    header('Location: index.html');
} else {
    handleResponse(405, 'Nieprawidłowa metoda żądania');
}
// ?>