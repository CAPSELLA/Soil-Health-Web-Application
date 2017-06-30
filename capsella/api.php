<?php
  require_once 'vendor/autoload.php';
  require_once 'settings.php';

    session_start();
    $db  = Dbmng\Db::createDb($aSetting['DB']['DB_DSN'], $aSetting['DB']['DB_USER'], $aSetting['DB']['DB_PASSWD'] );
    $app = new Dbmng\App($db, $aSetting);
    $db->setDebug($aSetting['DB']['DEBUG']);
    $login = new Dbmng\Login($db);
    $user = $login->auth();

    $base_path = $aSetting['BASE_PATH'];
    $router = new \Respect\Rest\Router($base_path);

    /***************************************************************************/
    /* S T A R T  C U S T O M  A R E A                                          /
    /***************************************************************************/
    $router->any('/api/get_themes', function() use ($db, $user) {
      $q="select * from caps_themes order by theme_order;";
      $ret=$db->select($q,array());
      $json_string=json_encode($ret);
      echo ($json_string);
    });

    $router->any('/api/get_data/*/*', function($lat, $lon) use ($db, $user) {
      $q="select *, random() as value from caps_themes order by theme_order;";
      $ret=$db->select($q,array());
      $json_string=json_encode($ret);
      echo ($json_string);
    });

    $router->get('/api/spade_test/', function() use ($db, $user) {
      $q="select * from caps_spade WHERE flag>0 ";
      $a=array();
      if(isset($_REQUEST['filter_user'])){
        $q.=" OR user_id=:user_id";
        $a=array(':user_id'=>$_REQUEST['filter_user']);
      }


      $ret=$db->select($q,$a);
      $json_string=json_encode($ret);
      echo ($json_string);
    });

    $router->post('/api/spade_test/', function() use ($db, $user) {

      $body = file_get_contents("php://input");
      $ret=Array('ok'=>false);
      $obj=json_decode($body);

      if(true){
          $q="select * from caps_spade WHERE guid=:guid;";

          $look = $db->select($q,array(":guid"=>$obj->guid));

          $array=array(
            ":guid"=>$obj->guid,
            ":date_mon"=>$obj->date,
            ":lat"=>$obj->lat,
            ":lon"=>$obj->lon,
            ":user_id"=>$obj->user_id,
            ":email"=>$obj->email,
            ":json"=>json_encode($obj)
          );

          if(count($look['data'])==0){
            $ins="insert into caps_spade (guid, date_mon, lat, lon, json, user_id, email) ";
            $ins.="VALUES (:guid, :date_mon, :lat, :lon, :json, :user_id, :email);";
            $ret=$db->update($ins,$array);
          }
          else{
            $ins="update caps_spade set date_mon=:date_mon, lat=:lat, lon=:lon, json=:json, user_id=:user_id, email=:email WHERE guid=:guid;";
            $ret=$db->update($ins,$array);
          }
      }
      else{
        $ret['message']="Missing GUID variable";
      }
      $ret['obj']=$obj;

      echo(json_encode($ret));
    });

    $router->get('/api/spade_test/*', function($guid) use ($db, $user) {
      $q="select * from caps_spade WHERE guid=:guid;";
      $ret=$db->select($q,array(":guid"=>$guid));
      $json_string=json_encode($ret);
      echo ($json_string);
    });

    $router->get('/api/get_kb0/', function() use ($db, $user) {
      $q="select * from caps_topic order by topic_order;";
      $ret=$db->select($q,array());
      $json_string=json_encode($ret);
      echo ($json_string);
    });

    $router->get('/api/get_kb1/*', function($caps_path) use ($db, $user) {
      $q="select * from caps_topic WHERE caps_path=:path;";
      $ret_base=$db->select($q,array(":path"=>$caps_path));
      if(count($ret_base['data']>0)){
        $q2="select id_caps_kb, caps_path, caps_title as title from caps_kb WHERE  id_caps_topic=:id_caps_topic;";
        $ret=$db->select($q2,array(":id_caps_topic"=>$ret_base['data'][0]['id_caps_topic']));
        $ret['topic']=$ret_base['data'][0];
      }
      else{
        $ret=Array();
      }
      $json_string=json_encode($ret);
      echo ($json_string);
    });

    $router->get('/api/get_kb2/*/*', function($caps_path, $topic_path) use ($db, $user) {
      $q="select * from caps_topic WHERE caps_path=:caps_path;";
      $ret_base=$db->select($q,array(":caps_path"=>$caps_path));
      // print_r($ret_base);
      if(count($ret_base['data']>0)){
        $q2="select id_caps_kb, caps_path, caps_title as title, caps_description as description from caps_kb WHERE  id_caps_topic=:id_caps_topic AND caps_path=:caps_path;";
        $ret=$db->select($q2,array(
          ":id_caps_topic"=>$ret_base['data'][0]['id_caps_topic'],
          ":caps_path"=>$topic_path
        ));
        $ret['topic']=$ret_base['data'][0];
      }
      else{
        $ret=Array();
      }
      $json_string=json_encode($ret);
      echo ($json_string);
    });


        // insert into caps_spade (date_mon, lat, lon, json)
        // values (Now(),43,11,'{"b":1}');



    $router->any('/api/caps_login', function() use ($db, $user) {

      $username=$_REQUEST['username'];
      $password=$_REQUEST['password'];
      $call='https://capsella-services.madgik.di.uoa.gr:8443/capsella_authentication_service-dev/authenticate?username='.$username.'&password='.$password;
      echo (fetchUrl($call));
    });

    $router->any('/api/caps_get_group_datasets/*', function($id_group) use ($db, $user) {
      $token=$_REQUEST['token'];
      $call='https://capsella-services.madgik.di.uoa.gr:8443/data-manager-service/datasets/getGroupDatasets';
      echo (fetchUrl($call,'GET',array('Authorization: Bearer '.$token, 'group:'.$id_group)));
    });

    $router->any('/api/caps_get_dataset/*', function($uuid) use ($db, $user) {
      $token=$_REQUEST['token'];
      $id_group=$_REQUEST['group'];
      $call='https://capsella-services.madgik.di.uoa.gr:8443/data-manager-service/datasets/'.$uuid.'/getDataset';
      echo (fetchUrl($call,'GET',array('Authorization: Bearer '.$token, 'group:'.$id_group)));
    });



    $router->any('/api/**', function() use ($db, $user) {
      $ret['ok'] = false;
      $ret['message'] = 'Function not found';
      $json_string=json_encode($ret);
      echo ($json_string);
    });


    function fetchUrl($url, $method='POST',$h=null){

      $curl = curl_init();
      $headers=array(
        "accept: application/json",
        "cache-control: no-cache",
        "content-type: application/json",
      );
      if($h!==null){
        $headers=array_merge( $headers, $h );
        // print_r($headers);
      }

      curl_setopt_array($curl, array(
        CURLOPT_PORT => "8443",
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_HTTPHEADER => $headers
      ));


      $response = curl_exec($curl);
      $err = curl_error($curl);

      curl_close($curl);

      if ($err) {
        echo "cURL Error #:" . $err;
      } else {
        echo $response;
      }

			// $ret_dbg="";
      //
      //
      //
    	// $ch = curl_init();
			// curl_setopt($ch, CURLOPT_URL,$url);
			// curl_setopt($ch, CURLOPT_USERAGENT, 'cURL Request');
			// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      //
			// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			// curl_setopt($ch, CURLOPT_VERBOSE, 1);
			// curl_setopt($ch, CURLOPT_HEADER, 1);
      //
			// $headers = array();
			// //$headers[] = 'X-Auth-Token: '.$accessToken;
			// $headers[] = 'Content-Type: application/json';
			// $headers[] = 'Accept: application/json';
      // if($accessToken!==null){
      //   $headers[] = 'Authorization: Bearer '.$accessToken;
      // }
      //
      //
			// curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
			// $response = curl_exec ($ch);
      //
			// // Then, after your curl_exec call:
			// $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
			// $header = substr($response, 0, $header_size);
			// $body = substr($response, $header_size);
      //
			// curl_close ($ch);
			// if($debug){
      //
			// 	$ret_dbg.='<h3>URL</h3>'.$url;
			// 	$ret_dbg.='<h3>Token</h3>'.$accessToken;
			// 	$ret_dbg.='<h3>Header</h3><pre>'.$header.'</pre>';
			// 	$ret_dbg.='<h3>Body</h3><pre>'.$body.'</pre>';
			// 	return $ret_dbg;
			// }
			// else{
			// 	return  json_decode($body);
			// }
    }

?>
