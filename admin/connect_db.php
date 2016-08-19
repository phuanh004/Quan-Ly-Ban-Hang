<?php
    $servername = "http://phuanh004.southeastasia.cloudapp.azure.com";
    $username = "root";
    $password = "113113";
    $database = "vietanime";
    $dbport = 3306;
    //
    //    // Create connection
    $db = new mysqli($servername, $username, $password, $database, $dbport);
    $db->query("SET NAMES 'utf8'");
    //    $db = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
        exit();
    }
?>