<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<title></title>
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
</head>
<body>
<nav class="white" role="navigation">
    <div class="nav-wrapper container">
        <!--                <a href="#" data-activates="slide-out" class="button-collapse show-on-large"><i class="material-icons">menu</i></a>-->
        <a id="logo-container" href="#" class="brand-logo teal-text">PHẦN MỀM QUẢN LÝ BÁN HÀNG</a>

        <ul class="right hide-on-med-and-down">
            <li><a href="init.php" class="teal-text">Upload</a></li>
            <li><a class="waves-effect waves-light btn">Sign in</a></li>
        </ul>
        <ul class="right hide-on-large">
            <li><a href="#"><i class="material-icons teal-text">search</i></a></li>
            <li><a href="#"><i class="material-icons teal-text">view_module</i></a></li>
            <li><a href="#"><i class="material-icons teal-text">more_vert</i></a></li>
        </ul>
    </div>
</nav>

<div class="container">
    <?php
        require_once('connect_db.php');
        $sql = "SELECT * FROM anime";
        $productArray = array();
        while($row = mysqli_fetch_assoc($result))
        {
            $productArray[] = $row;
        }

            echo json_encode($productArray);
            mysqli_close($db);
    ?>
</div>

<ul id="slide-out" class="side-nav">
    <li><a href="#!">First Sidebar Link</a></li>
    <li><a href="#!">Second Sidebar Link</a></li>
    <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
            <li>
                <a class="collapsible-header">Dropdown<i class="mdi-navigation-arrow-drop-down"></i></a>
                <div class="collapsible-body">
                    <ul>
                        <li><a href="#!">First</a></li>
                        <li><a href="#!">Second</a></li>
                        <li><a href="#!">Third</a></li>
                        <li><a href="#!">Fourth</a></li>
                    </ul>
                </div>
            </li>
        </ul>
    </li>
</ul>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/materialize.min.js"></script>
<script type="text/javascript" src="js/index.js"></script>
</body>
</html>