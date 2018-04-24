<?php
// require_once 'settings.php';


function getEmailOpt(){
  $register=true;
  if( isset($_REQUEST['do_reset_password'])){
    $register=false;
  }

  $email_opt=Array();
  $email_opt['subject']="Confirmation message";
  $email_opt['body']="<div>Welcome on <b>SOILapp and SOIL HEALTH</b> platform from CAPSELLA initiative.</div>";

  $msgmail="<div>";
  if($register){
    $msgmail.="By confirming your email, you will be able to access  your spade test observations. ";
    $msgmail.="From your account on the platform, you can manage your data, deciding which observations to publish on the online map and which to keep private. ";
    $msgmail.="Online you can access a document with detailed information about the <a href='https://soilhealth.capsella.eu/?sect=tos'>Terms of Use of this application</a>.";
    $email_opt['$click_here']="<h3>Click here to confirm your email and access your account.</h3>";
  }
  else{
    $msgmail.="If you click on the next link you will be able to reset the password of your account.";
    $email_opt['$click_here']="<h3>Click here to reset your password.</h3>";
  }
  $msgmail.=" For support on using the application or any other needed information, please contact <a href='mailto:soilhealth.capsella@santannapisa.it'>soilhealth.capsella@santannapisa.it</a></div>";

  $email_opt['body'].=$msgmail;
  return;
}


?>
