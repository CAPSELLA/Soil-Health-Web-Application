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

    $login = new Dbmng\Login($app);
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
      $footer.="<img class='img-responsive img_eu imgs_footer' src='".$bp."/res/img/logo_partners_bw.png'></img><br/><a class='credits' href='?sect=credits'>Credits</a> - <a class='tos' href='?sect=tos'>Term of Service</a>";
      // $footer.="<img class='img-responsive img_eu imgs_footer' src='".$bp."/res/img/Logo_Horizon2020.png'></img><img class='imgs_footer' src='".$bp."/res/img/general/scuola_esp.png' />";
      // $footer.="<img class='img-responsive imgs_footer' src='".$bp."/res/img/general/esapoda.jpg' />";
      // $footer.="<img class='img-responsive imgs_footer' src='".$bp."/res/img/general/isv.jpg' />";
      // $footer.="<img class='img-responsive imgs_footer' src='".$bp."/res/img/general/aegilops.jpg' />";
      $footer.="</div>";

    }
    $aPage['footer'] = $footer;


    $version="3.5";

    $script="<script src='".$bp."/js/capsella.js?v=".$version."'></script>";
    $script.="<script src='".$bp."/js/capsella_i18n.js?v=".$version."'></script>";
    $script.="<script src='".$bp."/js/qbse.js?v=".$version."'></script>";
    $script.="<script src='".$bp."/js/som.js?v=".$version."'></script>";
    $script.="<script src='".$bp."/js/external/jquery.datetimepicker.full.min.js'></script>";
    $aPage['script']  = $script;


    $styles="<link href='".$bp."/css/capsella.css' rel='stylesheet' />";
    $styles.="<link href='".$bp."/js/external/jquery.datetimepicker.css' rel='stylesheet' />";
    $aPage['stylesheet']     = $styles;

    $logged_in = $login_res['ok'];
    $isAdmin = false;
    $interset = array_intersect(["administrator"], $login_res['user']['roles']);
    if( count($interset) > 0 )
      {
        $isAdmin=true;
      }

    $body    = "";
    $sidebar = "";

    if( !$logged_in )
      {
        if( isset($_REQUEST['dbmng_user_id']) && isset($login_res['message']) )
          {
            $body .= '<div style="margin-top:50px;" class="alert alert-warning">' . $login_res['message'] . '</div>';
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
            // $body .= '<form method="POST" action="?">';
            // $body .= '<input class="form-control" name="dbmng_user_id" placeholder="user ID" />';
            // $body .= '<input type="password" class="form-control" name="dbmng_password" placeholder="password" />';
            // $body .= '<input class="form-control" type="submit" value="login"></form>';

              $body.="<h1>Login</h1>";
              $body.='<div class="panel-body" ><form method="POST" action="?" id="signupform" class="form-horizontal" role="form">';

                $body.='<div id="signupalert" style="display:none" class="alert alert-danger">
                    <p>Error:</p>
                    <span></span>
                </div>';

                      $body.='
                        <div class="form-group">
                            <label for="dbmng_user_id" class="col-md-3 control-label">Email</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" name="dbmng_user_id" placeholder="Email Address">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="dbmng_password" class="col-md-3 control-label">Password</label>
                            <div class="col-md-9">
                                <input type="password" class="form-control" name="dbmng_password" placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group">
                          <div class="col-md-3"></div>
                            <div class="col-md-9">
                                If you have not a login go to the <a href="?do_register=true">registration page</a>.<br/>
                                If you have do not remember the password <a href="?do_reset_password=true">click here to reset it</a>.<br/>
                                </br/>
                            </div>
                        </div>
                        ';
                      $body.='
                        <div class="form-group">
                            <!-- Button -->
                            <div class="col-md-offset-3 col-md-9">
                                <button id="btn-signup"  type="submit" class="btn-block btn btn-info"><i class="icon-hand-right"></i>Login</button>
                            </div>
                        </div>';

                      $body.="  </form></div></div>";
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
            if($acc['mail']!==''){
              $update_spade= $db->select(
                "UPDATE caps_spade set uid=:uid WHERE (uid=0 OR uid is null) AND user_id in (select distinct user_id from caps_spade WHERE lower(trim(email))=:mail)",
                Array(':uid'=>$acc['uid'],':mail'=>$acc['mail'])
              );
            }

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
    $bp2=$bp."/";
    $body .= 'global_opt.base_path=' . json_encode($bp2) . ';';
    $body .= 'global_opt.offline=false;global_opt.version="2.0";';


    $body .= '</script>';
    $body .="<script src='".$bp."/js/spade_structure.js?v=3.6'></script>";



    /***************************************************************************
    START CUSTOM AREA
    ****************************************************************************/
    $aPage['nav'][1]['title'] = 'Spade test';
    $aPage['nav'][1]['link']  = $bp.'/?sect=spade_test';

    // $aPage['nav'][3]['title'] = 'Knowledge base';
    // $aPage['nav'][3]['link']  = $bp.'/kb/';
    //
    // $aPage['nav'][4]['title'] = 'Maps';
    // $aPage['nav'][4]['link']  = $bp.'/?sect=esdb';


    if( $logged_in ){
      $aPage['nav'][2]['title'] = 'SOM dynamics';
      $aPage['nav'][2]['link']  = $bp.'/?sect=som_dyn';

      $aPage['nav'][3]['title'] = 'My Data';
      $aPage['nav'][3]['link']  = $bp.'/?sect=my_data';
    }
    if(  $isAdmin ){
      $aPage['nav'][5]['title'] = 'Admin';
      $aPage['nav'][5]['link']  = $bp.'/?sect=admin';
    }

    // $aPage['nav'][2]['title'] = 'Capsella platform';
    // $aPage['nav'][2]['link']  = '?sect=caps_plat';

    if( isset($_REQUEST['do_login'])  )
      {
        $aPage['content']=$body;
      }
      else if( isset($_REQUEST['check_email']) ){

        $token=$_REQUEST['check_email'];
        $reg = $login->check_email($token, Array());
        if($reg['ok']){
          $body .= '<div class="alert alert-info">'.$reg['message'].'</div>';

        }
        else{
          if($reg['register']){
            $body .= '<div class="alert alert-danger">'.$reg['message'].'</div>';
          }
          else{
            $body .= '<div class="">'.$reg['message'].'</div>';
          }
        }
        $aPage['content']=$body;
      }
    else if( isset($_REQUEST['do_register']) || isset($_REQUEST['do_reset_password']) )
      {
        $reg=Array('ok'=>false, 'message'=>'');
        $register=true;
        if( isset($_REQUEST['do_reset_password'])){
          $register=false;
        }


        $email_opt=getEmailOpt();

        if(isset($_REQUEST['dbmng_user_id_register'])){
          $email=$_REQUEST['dbmng_user_id_register'];
          if($register){
            $password=$_REQUEST['dbmng_password_register'];
            $reg = $login->register($email, $password, $email_opt);
          }
          else{
            $email_opt['reset_password']=true;
            $reg = $login->register($email, "",$email_opt);
          }
        }

        if(!$reg['ok']){
          if($register){
            $body.="<h1>Register to the SoilHealth Capsella Platform</h1>";
          }
          else{
            $body.="<h1>Reset the password</h1>";
          }
          if($reg['message']==''){
            $body .= '<div class="alert alert-info">Please enter your email and a password to register to the Spade test app. You will receive an email to confirm the validity of your email address.</div>';
          }
          else{
            $body .= '<div class="alert alert-danger">'.$reg['message'].'</div>';
          }

          $body.='<div class="panel-body" ><form method="POST" id="signupform" class="form-horizontal" role="form">';

          $body.='<div id="signupalert" style="display:none" class="alert alert-danger">
              <p>Error:</p>
              <span></span>
          </div>';

          $body.='
            <div class="form-group">
                <label for="dbmng_user_id_register" class="col-md-3 control-label">Email</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" name="dbmng_user_id_register" placeholder="Email Address">
                </div>
            </div>';


            if($register){
              $body.='
              <div class="form-group">
                  <label for="dbmng_password_register" class="col-md-3 control-label">Password</label>
                  <div class="col-md-9">
                      <input type="password" class="form-control" name="dbmng_password_register" placeholder="Password">
                  </div>
              </div>
              <div class="form-group">
                <div class="col-md-3"></div>
                  <div class="col-md-9">
                      <input type="checkbox" name="dbmng_password_accept"/>I agree with the <a target="_NEW" href="?sect=tos">Term of service</a>
                  </div>
              </div>
              ';
            }
          $body.='
            <div class="form-group">
                <!-- Button -->
                <div class="col-md-offset-3 col-md-9">
                    <button id="btn-signup" onClick="do_register('.$register.')" type="button" class="btn-block btn btn-info"><i class="icon-hand-right"></i>Register</button>
                </div>
            </div>';

          $body.="  </form></div></div>";

        }
        else{
          $body .= '<div class="alert alert-info">'.$reg['message'].'</div>';

        }
        $aPage['content']=$body;
      }
    else if( isset($_REQUEST['sect']) )
      {
        $sect = $_REQUEST['sect'];
        if(  $sect=="kb" || $sect=="esdb" || $sect=="som_dyn" || $sect=="kb"  || $sect=="caps_plat" || $sect=="spade_test"|| $sect=="admin"|| $sect=="my_data")
          {
            $aPage['content']=$body;
            $aPage['sidebar']=NULL;
            capsella_createmap($aPage,$app, $sect, $aSetting);
          }
        else if($sect=='credits'){
          $credits="
            <h1>Credits</h1>
            Paolo Bàrberi, Diego Guidotti and Mariateresa Lazzaro for Institute of Life Sciences, Scuola Superiore Sant’Anna (Pisa)<p/>
            Panagiotis Zervas, Agroknow<p/>
            Eleni Toli and  Panagiota Koltsida for ATHENA (Research and Innovation Center in Information, Communication and Knowledge Technologies)<p/>
            Luca Conte for Scuola Esperienziale Itinerante di Agricoltura Biologica and ESAPODA association<p/>
            Christina Vakali for AEGILOPS - The Greek Network for Biodiversity and Ecology in Agriculture";
            $aPage['title']="Credits";
          $aPage['content']=$credits;
        }
        else if($sect=='tos'){

          $link=$aSetting['BASE_PATH']."/res/docs/capsella_tos.pdf";

          $tos="<h1>Term of Service</h1>";
          $tos.="<p style='text-align:center'>You can download CASPELLA Soil Health <a href='".$link."'>Term of Service</a>

          </p/>";
          $tos.='
            <div class="col-xs-12">
              <div class="embed-responsive" style="padding-bottom:150%">
                  <object data="'.$link.'" type="application/pdf" width="100%" height="100%"></object>
              </div>
            </div>';

          $aPage['content']=$tos;
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
