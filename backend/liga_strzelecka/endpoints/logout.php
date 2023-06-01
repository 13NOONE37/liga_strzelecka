<?php
    function logout(){
        clearSession();
        handleResponse(200,'Wylogowano pomyślnie');
    }    
?>