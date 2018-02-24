<?php
  require_once 'vendor/autoload.php';
  require_once 'settings.php';

    session_start();
    $db  = Dbmng\Db::createDb($aSetting['DB']['DB_DSN'], $aSetting['DB']['DB_USER'], $aSetting['DB']['DB_PASSWD'] );
    $app = new Dbmng\App($db, $aSetting);

    $db->setDebug($aSetting['DB']['DEBUG']);

/*

Query per utenti
select u.email, count(*), min(time_ref), max(time_ref) from (
select lower(trim(email)) as email, user_id, count(*) from caps_spade
WHERE email is not null
 GROUP BY lower(trim(email)), user_id

) u RIGHT JOIN caps_spade c
ON u.user_id=c.user_id
group by  u.email
order by max(time_ref) desc
*/

    $base_path = $aSetting['BASE_PATH'];
    $router = new \Respect\Rest\Router($base_path);

    $login = new Dbmng\Login($app);
    $login_res = $login->auth();
    $isAdmin = false;

    $user=$login_res['user'];

    $interset = array_intersect(["administrator"], $login_res['user']['roles']);
    if( count($interset) > 0 )
      {
        $isAdmin=true;
      }
    $user['isAdmin']=$isAdmin;


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

    $router->post('/api/spade_test_batch/', function() use ($db, $user) {

      $body = file_get_contents("php://input");
      $ret=Array('ok'=>true,'data'=>Array());
      $obj=json_decode($body);

      foreach ($obj as $key => $value) {
        $ret['data'][$key]=saveSingleSpadeTest($db, $user, $value);
      }

      // if(true){
      // }
      // else{
      //   $ret['message']="Missing GUID variable";
      // }
      // $ret['obj']=$obj;

      echo(json_encode($ret));
    });

    $router->get('/api/get_image/*', function($guid) use ($db, $user) {

      $body = file_get_contents("php://input");
      $q="select * from caps_image WHERE guid=:guid;";
      $ret=$db->select($q,array(':guid'=>$guid));

      echo ($ret['data'][0]['base64']);
    });

    $router->post('/api/spade_test_image/*', function($guid) use ($db, $user) {

      $body = file_get_contents("php://input");
      $ret=Array('ok'=>true,'data'=>Array());
      $base64=($body);
      $ret=saveSingleSpadeImage($db, $user, $base64, $guid);

      echo(json_encode($ret));
    });


    $router->post('/api/spade_test/', function() use ($db, $user) {

      $body = file_get_contents("php://input");
      $ret=Array('ok'=>false);
      $obj=json_decode($body);

      if(true){
        $ret=saveSingleSpadeTest($db, $user, $obj);
      }
      else{
        $ret['message']="Missing GUID variable";
      }
      $ret['obj']=$obj;

      echo(json_encode($ret));
    });

    $router->get('/api/spade_test_all/', function() use ($db, $user) {

      if($user['uid']>0){
        $q="select s.*, u.name as user_name from caps_spade s LEFT JOIN dbmng_users u ON s.uid=u.uid  ";
        $a=array();
        if($user['isAdmin']){
          ;//show all
        }
        else{
          $q.=" WHERE s.uid=:uid ";
          $a[':uid']=$user['uid'];
        }
        $q.=" order  by time_ref desc";
        $ret=$db->select($q,$a);
        $json_string=json_encode($ret);
        echo ($json_string);
      }
      else{
        return json_encode(Array('ok'=>false,'msg'=>'Unauthorize'));
      }
    });

  //$router->post('/api/spade_test_image/*', function($guid)     use ($db, $user) {
    $router->post('/api/spade_test_admin/*', function($id_caps_spade) use ($db, $user) {




      if($user['uid']>0){
        $body = file_get_contents("php://input");
        $ret=Array('ok'=>false);
        $obj=json_decode($body);



        $array=array(
          ":lat"=>$obj->lat,
          ":lon"=>$obj->lon,
          ":flag"=>$obj->flag,
          ":json"=>json_encode($obj->json),
          ":id_caps_spade"=>$id_caps_spade
        );
        $ins="update caps_spade set lat=:lat, lon=:lon, json=:json, flag=:flag  WHERE id_caps_spade=:id_caps_spade ";
        if($user['isAdmin']){
          $ins.=" AND uid=:uid ";
          $array[':uid']=$user['uid'];
        }
        else{

        }

        $ret=$db->update($ins,$array);
      }
      else{
          return json_encode(Array('ok'=>false,'msg'=>'Unauthorize'));
      }
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
      $call='https://capsella-services.madgik.di.uoa.gr:8443/capsella_authentication_service/authenticate?username='.$username.'&password='.$password;
      echo (fetchUrl($call));
    });

    $router->any('/api/caps_login_and_save', function() use ($db, $user,$aSetting) {

      if($user['isAdmin']){

        $username=$aSetting['CAPSELLA_USERID'];//$_REQUEST['username'];
        $password=$aSetting['CAPSELLA_PASSWORD'];
        $call='https://capsella-services.madgik.di.uoa.gr:8443/capsella_authentication_service/authenticate?username='.$username.'&password='.$password;
        $tok=json_decode(fetchUrl($call,'POST',null,false));

        if(isset($tok->token)){
          $token=($tok->token);




          $id_dataset=$aSetting['CAPSELLA_DATASET_PUBLIC'];#"70693a29-9b30-4fab-818a-64af1e043f43";

          $id_group="soil_app";
          $call2="https://capsella-services.madgik.di.uoa.gr:8443/data-manager-service/datasets/".$id_dataset;

          //echo $call2."<br/>";

          $sel="select json from caps_spade WHERE flag=10;";
          $json=Array();
          $ret=$db->select($sel,Array());
          foreach ($ret['data'] as $key => $value) {
            array_push($json, json_decode($value['json']));
            # code...
          }

          uploadfile($call2, $token, json_encode($json));
          echo(json_encode(Array('ok'=>true,'msg'=>'Public data has been uploaded')));
          //echo fetchUrl($call2,'POST',array('Accept: */*','Content-Type:multipart/form-data','Authorization: Bearer '.$token, 'group:'.$id_group),false,'AAAA');


          //https://capsella-services.madgik.di.uoa.gr:8443/data-manager-service/datasets/70693a29-9b30-4fab-818a-64af1e043f43
        }
        else{
          echo(json_encode(Array('ok'=>false,'msg'=>'Wrong authentication')));
        }
      }
      else{
        echo(json_encode(Array('ok'=>false,'msg'=>'You have not the right to do this.')));
      }

    });

    $router->any('/api/caps_get_group_datasets/*', function($id_group) use ($db, $user) {
      $token=$_REQUEST['token'];
             https://capsella-services.madgik.di.uoa.gr:8443/data-manager-service/datasets/getPublicDatasets

      //$call='https://capsella-services.madgik.di.uoa.gr:8443/data-manager-service/datasets/getGroupDatasets';
      $call='https://capsella-services.madgik.di.uoa.gr:8443/data-manager-service/datasets/getPublicDatasets';
      echo (fetchUrl($call,'GET',array('Authorization: Bearer '.$token, 'group:'.$id_group)));
    });

    $router->any('/api/caps_get_dataset/*', function($uuid) use ($db, $user) {
      $token=$_REQUEST['token'];
      $id_group=$_REQUEST['group'];
           //https://capsella-services.madgik.di.uoa.gr:8443/data-manager-service/datasets/getDataset/b87e2bb8-3936-4a47-8aa8-f40a3b833133
      $call='https://capsella-services.madgik.di.uoa.gr:8443/data-manager-service/datasets/getDataset/'.$uuid.'';
      echo (fetchUrl($call,'GET',array('Authorization: Bearer '.$token, 'group:'.$id_group)));
    });



    $router->any('/api/**', function() use ($db, $user) {
      $ret['ok'] = false;
      $ret['message'] = 'Function not found';
      $json_string=json_encode($ret);
      echo ($json_string);
    });

    function saveSingleSpadeTest($db, $user, $obj){
      $q="select * from caps_spade WHERE guid=:guid;";

      $look = $db->select($q,array(":guid"=>$obj->guid));

      $array=array(
        ":guid"=>$obj->guid,
        ":date_mon"=>$obj->date,
        ":lat"=>$obj->lat,
        ":lon"=>$obj->lon,
        ":user_id"=>$obj->user_id,
        ":email"=>$obj->email,
        ":json"=>json_encode($obj),
        ":uid"=>$user['uid']
      );

      if(count($look['data'])==0){

        $ins="insert into caps_spade (guid, date_mon, lat, lon, json, user_id, email, uid) ";
        $ins.="VALUES (:guid, :date_mon, :lat, :lon, :json, :user_id, :email, :uid);";
        $ret=$db->update($ins,$array);
      }
      else{
        //TODO: update other user's spade test
        $ins="update caps_spade set date_mon=:date_mon, lat=:lat, lon=:lon, json=:json, user_id=:user_id, email=:email WHERE guid=:guid;";
        $ret=$db->update($ins,$array);
      }
      return $ret;
    }

    function saveSingleSpadeImage($db, $user, $base64, $guid){
      $q="select * from caps_image WHERE guid=:guid;";
      $look = $db->select($q,array(":guid"=>$guid));

      $array=array(
        ":guid"=>$guid,
        ":base64"=>$base64
      );

      if(count($look['data'])==0){
        $ins="insert into caps_image (guid, base64) ";
        $ins.="VALUES (:guid, :base64);";
        $ret=$db->update($ins,$array);
      }
      else{
        $ins="update caps_image set base64=:base64 WHERE guid=:guid;";
        $ret=$db->update($ins,$array);
      }
      //return Array('ok'=>$ret['ok']);
      return $ret;
    }


    function uploadfile($url, $token, $content){

      $temp_file = tempnam(sys_get_temp_dir(), 'test.json');
      $handle = fopen($temp_file, "w");
      fwrite($handle, $content);
      fclose($handle);


      exec("curl   -F 'uploadfile=@".$temp_file."'  -H 'Group: soil_app' -H 'Authorization: Bearer ".$token."'  '".$url."'");
      unlink($temp_file);

    }


    function fetchUrl($url, $method='POST',$h=null,$doEcho=true, $file=null){

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

      if($file!=null){
        echo $file;
        $cfile = curl_file_create('/home/guidotti/capsella/sample.json','application/json','sample.json');
        $data = array('uploadfile' => $cfile);

        $ch = curl_init();
        $options = array(
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => $data
            //,CURLOPT_INFILESIZE => $filesize
        );
        curl_setopt_array($curl,$options);

      }


      $response = curl_exec($curl);
      $err = curl_error($curl);

      curl_close($curl);

      if($doEcho){
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
          echo $response;
        }
      }
      else{
        return $response;
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
