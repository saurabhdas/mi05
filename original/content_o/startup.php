<?
	require 'db_connect.php';
	$create_table=$db_object->query("CREATE TABLE love_letter (ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(60) NOT NULL,email VARCHAR(60),w_time TIME NOT NULL,w_date DATE NOT NULL,ip VARCHAR(20) NOT NULL,letter TEXT);"); 
	if(DB::isError($create_table)){die($create_table->getMessage());}
	else{ echo "Table Successfully Created.";}
	?>