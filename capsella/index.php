<?php
  require_once 'vendor/autoload.php';
  require_once 'settings.php';
  require_once 'src/capsella.php';

	echo homePage($aSetting);

  function capsella_createmap(&$aPage, $app, $type, $aSetting){
    $bp=$aSetting['BASE_PATH'];
    $html ="<div class='col-xs-12' id='capsella_container'></div>";
    $script ="";
    if($type=='kb'){
      $topic="";
      if(isset($_REQUEST['topic'])){
        $topic=$_REQUEST['topic'];
      }

      $script.="<script>jQuery(function(){init_capsella('".$type."','".$topic."');});</script>";
    }
    else{
      $script.="<script>jQuery(function(){init_capsella('".$type."');});</script>";
    }

    // $script.='<link rel="stylesheet" href="//unpkg.com/leaflet@1.0.1/dist/leaflet.css" />';
    $script.="<link href='".$bp."/js/external/leaflet.css' rel='stylesheet' />";
    $script.="<script src='".$bp."/js/external/leaflet.js'></script>";
    $script.="<script src='".$bp."/js/external/jstorage.min.js'></script>";
    $script.="<script src='".$bp."/js/external/d3.v4.min.js'></script>";

    // $script.='<script src="//unpkg.com/leaflet@1.0.1/dist/leaflet.js"></script>';
    // $script.='<script src="//cdnjs.cloudflare.com/ajax/libs/jStorage/0.4.12/jstorage.min.js"></script>';

    $aPage['content'].=$html;
    $aPage['script'].=$script;
  }

  function homePage( $aSetting )
  {
    session_start();
    $db  = Dbmng\Db::createDb($aSetting['DB']['DB_DSN'], $aSetting['DB']['DB_USER'], $aSetting['DB']['DB_PASSWD'] );
    $app = new Dbmng\App($db, $aSetting);


    $bp=$aSetting['BASE_PATH'];

    $aPage = Array();

    $login = new Dbmng\Login($db);
    if( isset($_REQUEST['do_logout']) )
      {
        $login->doLogout();
      }
    $login_res = $login->auth();

    $aPage['project']        = "Soil health";
    $aPage['title']          = "CAPSELLA Soil Health";
    $aPage['bootstrap_path'] = $bp."/vendor/twbs/bootstrap/dist/";
    $aPage['jquery_path']    = $bp."/vendor/components/jquery/";
    $aPage['container_type'] = "container";
    $aPage['home_page_link'] = $bp;


    if(false){
      $footer="<table  align='center'><tr>";
      $footer.="<td colspan=2><span class='footer_eu'>Capsella has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 688813</span></td></tr>";

      $footer.="<tr><td colspan=2><div id='footer_partner'></div></td></tr>";
      $footer.="<tr><td colspan=2><div class='footer_images'>";
      $footer.="<img class='img-responsive img_eu imgs_footer' src='".$bp."/res/img/logo_partners.png'></img>";
      // $footer.="<img class='img-responsive img_eu imgs_footer' src='".$bp."/res/img/Logo_Horizon2020.png'></img><img class='imgs_footer' src='".$bp."/res/img/general/scuola_esp.png' />";
      // $footer.="<img class='img-responsive imgs_footer' src='".$bp."/res/img/general/esapoda.jpg' />";
      // $footer.="<img class='img-responsive imgs_footer' src='".$bp."/res/img/general/isv.jpg' />";
      // $footer.="<img class='img-responsive imgs_footer' src='".$bp."/res/img/general/aegilops.jpg' />";
      $footer.="</div></td></tr>";
      $footer.="</table>";
    }
    else{
      $footer="";
      $footer.="<div id='footer1'>Capsella has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 688813</div>";
      $footer.="<div id='footer_partner'></div>";
      $footer.="<div class='footer_images'>";
      $footer.="<img class='img-responsive img_eu imgs_footer' src='".$bp."/res/img/logo_partners_bw.png'></img><br/><a class='credits' href='?sect=credits'>Credits</a>";
      // $footer.="<img class='img-responsive img_eu imgs_footer' src='".$bp."/res/img/Logo_Horizon2020.png'></img><img class='imgs_footer' src='".$bp."/res/img/general/scuola_esp.png' />";
      // $footer.="<img class='img-responsive imgs_footer' src='".$bp."/res/img/general/esapoda.jpg' />";
      // $footer.="<img class='img-responsive imgs_footer' src='".$bp."/res/img/general/isv.jpg' />";
      // $footer.="<img class='img-responsive imgs_footer' src='".$bp."/res/img/general/aegilops.jpg' />";
      $footer.="</div>";

    }
    $aPage['footer'] = $footer;




    $script="<script src='".$bp."/js/capsella.js?v=3.2'></script>";
    $script.="<script src='".$bp."/js/capsella_i18n.js?v=3.2'></script>";
    $script.="<script src='".$bp."/js/external/jquery.datetimepicker.full.min.js'></script>";
    $aPage['script']  = $script;


    $styles="<link href='".$bp."/css/capsella.css' rel='stylesheet' />";
    $styles.="<link href='".$bp."/js/external/jquery.datetimepicker.css' rel='stylesheet' />";
    $aPage['stylesheet']     = $styles;

    $logged_in = $login_res['ok'];
    $isAdmin = false;

    $body    = "";
    $sidebar = "";

    if( !$logged_in )
      {
        if( isset($_REQUEST['dbmng_user_id']) && isset($login_res['message']) )
          {
            $body .= '<div class="alert alert-warning">' . $login_res['message'] . '</div>';
          }

        $aPage['navRight'][0]['title'] = 'EN';
        $aPage['navRight'][0]['link']  = $bp.'/?setLang=en';
        $aPage['navRight'][1]['title'] = 'GR';
        $aPage['navRight'][1]['link']  = $bp.'/?setLang=gr';
        $aPage['navRight'][2]['title'] = 'IT';
        $aPage['navRight'][2]['link']  = $bp.'/?setLang=it';

        $aPage['navRight'][3]['title'] = 'Login';
        $aPage['navRight'][3]['link']  = $bp.'/?do_login=true';
        $aPage['navRight'][4]['title'] = 'Register';
        $aPage['navRight'][4]['link']  = $bp.'/?do_register=true';


        if(isset($_REQUEST['setLang'])){
          $_SESSION['lang']=$_REQUEST['setLang'];
        }


        if( isset($_REQUEST['do_login']) )
          {
            $body .= '<form>';
            $body .= '<input class="form-control" name="dbmng_user_id" placeholder="user ID" />';
            $body .= '<input type="password" class="form-control" name="dbmng_password" placeholder="password" />';
            $body .= '<input class="form-control" type="submit" value="login"></form>';
          }
        else
          {
            ;
          }
      }
    else
      {
        $acc = $login_res['user'];

        if( $acc )
          {
            $aPage['navRight'][3]['title'] = 'Hi '.$acc['name'];
            if( isset($acc['roles']) )
              {
                if (in_array("administrator", $acc['roles']) )
                  {
                    $isAdmin = true;
                  }
              }
          }

        $aPage['navRight'][4]['title'] = 'Logout';
        $aPage['navRight'][4]['link']  = $bp.'?do_logout=true';
    }

    $body .= '<script>var global_opt={};';
    if( $logged_in )
      {
        // hide the password if exist!!!!
        $acc['pass'] = 'xxxxxxxxxxxxxxxxxxx';
        $body .= 'global_opt.user=' . json_encode($acc) . ';';
      }

    $capsella_lang="en";
    if(isset( $_SESSION["lang"])){
      $capsella_lang=$_SESSION["lang"];
    }

    $body.= "jQuery('.navbar-right li:contains(".$capsella_lang.")').addClass('active');";
    $body .= 'global_opt.lang=' . json_encode($capsella_lang) . ';';
    $body .= 'global_opt.base_path=' . json_encode($bp) . ';';


    $body .= '</script>';
    $body .="<script src='".$bp."/js/spade_structure.js?v=3.2'></script>";



    /***************************************************************************
    START CUSTOM AREA
    ****************************************************************************/
    $aPage['nav'][1]['title'] = 'Spade test';
    $aPage['nav'][1]['link']  = $bp.'/?sect=spade_test';

    $aPage['nav'][2]['title'] = 'SOM dynamics';
    $aPage['nav'][2]['link']  = $bp.'/?sect=som_dyn';

    $aPage['nav'][3]['title'] = 'Knowledge base';
    $aPage['nav'][3]['link']  = $bp.'/kb/';

    // $aPage['nav'][2]['title'] = 'Capsella platform';
    // $aPage['nav'][2]['link']  = '?sect=caps_plat';

    if( isset($_REQUEST['do_login']) )
      {
        $aPage['content']=$body;
      }
    else if( isset($_REQUEST['do_register']) )
      {
        $body .= '<div class="alert alert-info">Please enter your email and a password to register to the Spade test app. You will receive an email to confirm the validity of your email address.</div><form>';
        $body .= '<input class="form-control" name="dbmng_user_id" placeholder="Insert your email" />';
        $body .= '<input type="password" class="form-control" name="dbmng_password" placeholder="password" />';
        $body .= '<input class="form-control" type="submit" value="register"></form>';
        $aPage['content']=$body;
      }
    else if( isset($_REQUEST['sect']) )
      {
        $sect = $_REQUEST['sect'];
        if(  $sect=="kb" || $sect=="esdb" || $sect=="som_dyn" || $sect=="kb"  || $sect=="caps_plat" || $sect=="spade_test")
          {
            $aPage['content']=$body;
            $aPage['sidebar']=NULL;
            capsella_createmap($aPage,$app, $sect, $aSetting);
          }
      }
    else
      {
        $aPage['content']=$body;
        $aPage['sidebar']=NULL;
        capsella_createmap($aPage,$app,"home", $aSetting);
      }


    /***************************************************************************
    END CUSTOM AREA
    ****************************************************************************/


    $layout = new Dbmng\Layout($aPage);

    $html = $layout->getLayout();

    return $html;
  }

?>
