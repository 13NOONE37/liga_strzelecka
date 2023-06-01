<?php
session_start();
require('functions/handleResponse.php');
require('functions/clearSession.php');
require('functions/isAuth.php');

require('endpoints/checkSession.php');
require('endpoints/auth.php');
require('endpoints/logout.php');


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
            case 'checksession':
                checkSession();
                break;
            case 'auth':
                auth($conn);
                break;
            case 'logout':
                logout();

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