<?php
ReadData();

function OpenConnection(){
    try {
        $serverName = "tcp:phuanh004.database.windows.net,1433";
        $connectionOptions = array("Database"=>"AdventureWorks",
            "Uid"=>"phuanh004", "PWD"=>"Anhpham123");
        $conn = sqlsrv_connect($serverName, $connectionOptions);
        if($conn == false)
            die(FormatErrors(sqlsrv_errors()));
    }
    catch(Exception $e){
        echo("Error!");
    }
}
function ReadData(){
    try {
//        $conn = OpenConnection();
        echo 'success';
//        $tsql = "SELECT [CompanyName] FROM SalesLT.Customer";
//        $getProducts = sqlsrv_query($conn, $tsql);
//        if ($getProducts == FALSE)
//            die(FormatErrors(sqlsrv_errors()));
//        $productCount = 0;
//        while($row = sqlsrv_fetch_array($getProducts, SQLSRV_FETCH_ASSOC))
//        {
//            echo($row['CompanyName']);
//            echo("<br/>");
//            $productCount++;
//        }
//        sqlsrv_free_stmt($getProducts);
//        sqlsrv_close($conn);
    }
    catch(Exception $e)
    {
        echo("Error!");
    }
}