<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
  <title>Mood Indigo 05 Dive In!</title>
  <meta name="GENERATOR" content="Quanta Plus">
  <meta name="AUTHOR" content="Anirudh Patil">
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body bgcolor="#82CDFF">
<?php 
	require 'db_connect.php';
	if(!$_POST['name'] | !$_POST['letter']) {
		die('You didn\'t fill in a required field.');
	}
	else{
	$name  =addslashes($_POST["name"]);
	$email =addslashes($_POST["email"]);
	$ip    =addslashes($_SERVER["REMOTE_ADDR"]);
	$letter=addslashes($_POST["letter"]);
	
	$add_letter=$db_object->query("INSERT INTO love_letter (name,email,w_time,w_date,ip,letter) VALUES ('$name','$email',CURTIME(),CURDATE(),'$ip','$letter');");
	
	if(DB::isError($add_letter)){
	die($add_letter->getmessage());}
	else {echo "Letter successfully added.";}}
	?>

<a href="o_sep10_1.php">&lt;&nbsp;Back</a><br />
</body>
</html>
