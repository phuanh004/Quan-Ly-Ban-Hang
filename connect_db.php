<?php
try
{
    $serverName = "tcp:phuanh004.database.windows.net,1433";
    $connectionOptions = array("Database"=>"AdventureWorks",
        "Uid"=>"phuanh004", "PWD"=>"Anhpham123");
    $conn = sqlsrv_connect($serverName, $connectionOptions);
    if($conn == false)
        die(FormatErrors(sqlsrv_errors()));
}
catch(Exception $e)
{
    echo("Error!");
}