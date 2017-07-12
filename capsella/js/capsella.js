
//select flag, json->'name', json->'step_done', email, * from caps_spade order by id_caps_spade desc

var overlayMaps;
var controlMaps;
var pluvio_layer;

var map, marker;

// var custom_icon = L.Icon.extend({
//     options: {
//         shadowUrl: 'leaf-shadow.png',
//         iconSize:     [38, 95],
//         shadowSize:   [50, 64],
//         iconAnchor:   [22, 94],
//         shadowAnchor: [4, 62],
//         popupAnchor:  [-3, -76]
//     }
// });
// var base_icon = new custom_icon({iconUrl: global_opt.base_path+'/res/img/marker/green_marker.png'});
// var my_icon = new custom_icon({iconUrl: global_opt.base_path+'/res/img/marker/green_marker.png'});
// var my_icon = new L.Icon({
//   iconUrl: global_opt.base_path+'/res/img/marker/green_marker.png'
// });





function init_capsella(type, topic){

  global_opt.offline=true;

  var settings=jQuery.jStorage.get('capsella_settings');
  if(settings==null){
    settings={'user_id': Guid.newGuid(),'email':''};
    jQuery.jStorage.set('capsella_settings', settings);
  }


  init_spade_question();
  global_opt['mapserver_path']='http://78.46.198.147/cgi-bin/mapserv?';
  //jQuery('.navbar-brand').html("Capsella - "+cap_t("Soil Health"));
  jQuery('.navbar-brand').html('<div style="float:left; margin-right:20px;"><img style="height:30px;" src="'+global_opt.base_path+'/res/img/capsella.png"/></div>'+cap_t("Soil Health"));

  //Translate the interface
  jQuery('.navbar-fixed-top .navbar-nav a').each(function(k,v){
    jQuery(v).html(cap_t(jQuery(v).html()));
  });
  jQuery('#footer_partner').html(cap_t('footer_partner'));



  //basic structure
  var html='';
  if(type=="home" || type=="kb"){
    html+='<div class="col-xs-12" id="capsella_home"></div>';
    jQuery('#capsella_container').html(html);
  }
  else{
    html+='<div class="col-xs-12" id="capsella_tools"></div>';
    html+='<div class="col-sm-6 col-sm-push-6" id="capsella_info"></div>';
    html+='<div class="col-sm-6 col-sm-pull-6" id="capsella_map"><div id="map_label">Label</div></div>';
    jQuery('#capsella_container').html(html);
    //map setup
    map = L.map('capsella_map').setView([44.6,10.6], 4);
    updateControlsMap();
  }


  if(type=="esdb"){
    init_esdb();
  }
  if(type=="caps_plat"){
    init_caps_plat();
  }
  else if(type=="spade_test"){
    init_spade_test();
  }
  else if(type=="som_dyn"){
    init_som_dyn();
  }
  else if(type=="kb"){
    init_kb(topic);
  }
  else{
    init_home();
  }


  if(jQuery('.navbar-fixed-top').height()>60){
    jQuery('#capsella_container').css('margin-top','60px');
  }

}

function init_home(){

  var html="<h1>"+cap_t("Capsella soil health platform")+"</h1>";
  html+="<div id='frame_container'></div>";

  jQuery('#capsella_home').html(html);
  drawFrame(cap_t("Spade test"), "", function(){init_capsella('spade_test');});
  drawFrame(cap_t("Knowledge base"), "", function(){init_kb();});
  drawFrame(cap_t("SOM Dynamics"), "", function(){init_capsella('som_dyn');});
  // drawFrame(cap_t("Soil threats"), "", function(){init_capsella('esdb');});

}

function drawFrame(title, content, fun){
  if(typeof fun !=='function'){
   fun=function(){alert('aa');};
  }

  var html="<div class='col-sm-6'><div class='sh_box'>";
    html+="<div class='sh_header'><h3>"+title+"</h3></div>";
    html+="<div class='sh_frame_content'>"+content+"</div>";
    html+="<div class='sh_frame_buttons'><a class='btn btn-info sh_frame_button'>"+cap_t('start')+"</a></div>";
  html+="</div></div>";
  var res=jQuery(html);

  res.find("a.sh_frame_button").click(fun);
  jQuery('#frame_container').append(res);
}


function init_kb(topic){

  var base_url=global_opt.base_path+'/api/get_kb';
  var url="";
  var level=0;
  var pages=[topic];
  if(typeof topic ==='undefined' || topic ==='kb/'){
    level=0;
    url=base_url+level;
  }
  else{
    level=1;
    pages=topic.split("/");
    url=base_url+level+'/'+pages[1];
    if(pages.length>2){
      level=2;
      url=base_url+level+'/'+pages[1]+'/'+pages[2];
    }
  }


  if(true){
    var html='';
    jQuery.ajax({
      'url':url,
      'method': 'GET',
      'dataType': 'JSON',
      'success': function(d){

        var html='';
        if(d.data.length===0){
          html+="There are no content associated!";
        }
        else if(level==2){
          html+="<h1>"+d.data[0].title+"</h1>";
          html+="<div>"+d.data[0].description+"</div>";

          html+='<div id="disqus_thread"></div>';
          var disqus_config = function () {
            this.page.url = 'localhost/'+topic;  // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = topic; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
          };
          (function() { // DON'T EDIT BELOW THIS LINE
          var d = document, s = d.createElement('script');
          s.src = 'https://capsella-sh.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
          })();

        }
        else{
          jQuery.each(d.data, function(k,v){


            var cls=6;
            if(level===0 && k==2){
              cls=12;
            }
            html+="<div class='col-sm-"+cls+"'><div class='sh_box'>";
              html+="<div class='sh_header'><h3>"+v.title+"</h3></div>";
              html+="<div class='sh_frame_content'></div>";
              var path="";
              if(level===0){
                path=v.caps_path;
              }
              else {
                path=pages[1]+"/"+v.caps_path;
              }

              html+="<div class='sh_frame_buttons'><a class='sh_frame_button' href='"+global_opt.base_path+"/kb/"+path+"'>"+cap_t('view')+"</a></div>";
            html+="</div></div>";

          });
          html+='';
        }
        jQuery('#capsella_home').html(html);

      }
    });
  }
  else{
    jQuery('#capsella_home').html("KB!!!!"+topic);

  }
}

function init_som_dyn(){
  jQuery('#capsella_info').html("<div class='alert alert-info'><h3>"+cap_t("Soil Organic Matter - Dynamics")+"</h3>"+cap_t("In this section you will be able to run simple simulation to estimate the Soil Organic Matter dynamics of the next years in your soil. Please check again this website in the next weeks to see progress.")+"</div>");
}

function init_esdb(){
  jQuery('#capsella_info').html("<div class='alert alert-info'><h3>"+cap_t("What can i do?")+"</h3><ul><li>"+cap_t("Click on a soil threat to show the threat map")+"</li><li>"+cap_t("Click on the map to get all local values")+".</li></ul></div>");
  //Tool setup
  var tool='';
  jQuery('#capsella_tools').html(tool);
  loadThemes();
  var popup = L.popup();
  map.on('click', function(e){
    popup.setLatLng(e.latlng).setContent(cap_t("Selected point")).openOn(map);

    jQuery.ajax({
      'url':global_opt.base_path+'/api/get_data/'+e.latlng.lat+"/"+e.latlng.lng,
      'method': 'GET',
      'dataType': 'JSON',
      'success': function(d){
          var res=d.data;
          jQuery('#capsella_info').html("<table class='table'><thead><tr><th>"+cap_t("Soil threat")+"</th><th>"+cap_t("Local value")+"</th><th>"+cap_t("Your evaluation")+"</th></thead><tbody></tbody></table>");
          jQuery.each(d.data, function(k,v){
              jQuery('#capsella_info table tbody').append("<tr id='res_"+v.id_caps_themes+"'><th>"+cap_t(v.theme_name)+"</th>"+getValueCell(v.value)+"<td><select class='form-control'><option></option><option value='high'>"+cap_t("High")+"</option><option value='medium'>"+cap_t("Medium")+"</option><option value='low'>"+cap_t("Low")+"</option></select></td></tr>");
            });
          console.log(available_tools);
        }
    });
  });
}


function getValueCell(val){

  var cl='#FFF';
	if(val<0.01){
		cl='#FFFFFF';
	}
	else if(val<0.1){
		cl='#9999FF';
	}
	else if(val<0.3){
		cl='#11FF11';
	}
	else if(val<0.6){
		cl='#FFFF00';
	}
	else if(val<0.8){
		cl='#ffa500';
	}
	else{
		cl='#FF0000';
	}
	//
  var html="<td style='background-color:"+cl+"'>"+(val*100).toFixed(1)+"</td>";
  return html;
}

function updateControlsMap(){

  var base=L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var baseMaps = {
      "Base Map": base
  };

  var overlayMaps={};
  controlMaps=L.control.layers(baseMaps, overlayMaps).addTo(map);
}

//la funzione aggiorna la mappa di base delle piogge
function updateMainMap(v){


  if(pluvio_layer){
    map.removeLayer(pluvio_layer);
  }
  var mapfile='/opt/capsella/capsella.map';
  var layer_name=v.layer_name;

  jQuery('#map_label').html(cap_t("Map on")+" "+v.theme_name);

  var raster_name=v.raster_theme;
  if(raster_name=='organic_matter_decline.tif'){
    mapfile='/opt/capsella/capsella_som.map';

  }

  console.log(v);
  var layer='data';

  pluvio_layer=getWMSMapfile(mapfile,raster_name, layer);
  pluvio_layer.on('tileerror', function(error, tile) {
      jQuery('#map_label').html(cap_t("Error during map loading")+": "+raster_name);
  });
  pluvio_layer.addTo(map);
}

function loadThemes(){
  jQuery.ajax({
    'url':global_opt.base_path+'/api/get_themes',
    'method': 'GET',
    'dataType': 'JSON',
    'success': function(d){
        available_tools=d;
        jQuery('#capsella_tools').html("");
        jQuery.each(d.data, function(k,v){
          console.log(v);
          jQuery('#capsella_tools').append("<button class='btn btn-warning' id='theme_"+v.id_caps_themes+"'>"+cap_t(v.theme_name)+"</button>");

          jQuery('#theme_'+v.id_caps_themes).click(function(){
               jQuery('#capsella_tools button').removeClass("btn_selected");
               jQuery('#theme_'+v.id_caps_themes).addClass("btn_selected");
               updateMainMap(v);
          });

        });
        console.log(available_tools);
     }
  });
}


function printDate(temp) {
    var dateStr = padStr(temp.getFullYear()) + "-" +
                  padStr(1 + temp.getMonth()) + "-" +
                  padStr(temp.getDate()) + " "+
                  padStr(temp.getHours()) + ":" +
                  padStr(temp.getMinutes()) + ":" +
                  padStr(temp.getSeconds());
    return (dateStr );
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function getWMSMapfile(mapfile, raster_theme, layer){
  var url=global_opt['mapserver_path'];
  url+='map='+mapfile;
  url+='&VERSION=1.1.1&raster_theme='+raster_theme;

  var wmsLayer = L.tileLayer.wms(url,
      {
        layers: layer,
        transparent: true,
        format: 'image/png',
        opacity: 0.6
      }
  );
  return wmsLayer;
}

/************************************
   SPADE TEST
************************************/

function reset_spade_view(){
  var html="";
  html+="<div style='display:none' id='my_spade_tests'><h3>"+cap_t("My spade tests")+"</h3></div>";
  html+='<div id="spade_test_welcome" class="alert alert-info">'+cap_t('spade_test_welcome')+'</div><div id="spade_test_insert"><a onClick="add_spade()" class="form-control btn btn-info">'+cap_t("Enter a new spade test")+'</a></div>';
  html+="<div style='display:none' id='public_spade_tests'><h3>"+cap_t("Public spade tests")+"</h3></div>";

  html+="<div class='alert alert-info'>";
  html+='<div>'+cap_t('spade_test_before')+'</div>';
  html+="<p/><div class='row'><div class=col-xs-4><img class='img-responsive' src='res/img/general/spade.jpg'/></div>";
  html+="<div class=col-xs-4><img class='img-responsive' src='res/img/general/knife.jpg'/></div>";
  html+="<div class=col-xs-4><img class='img-responsive' src='res/img/general/tray.jpg'/></div></div>";
  html+="</div>";

  html+='<div id="spade_test_result"></div>';
  jQuery('#capsella_info').html(html);

}
function init_spade_test(){

  var user_id=jQuery.jStorage.get('capsella_settings').user_id;

  reset_spade_view();
  if(global_opt.offline===true){
    var my_spade_tests=jQuery.jStorage.get('my_spade_tests');
    if(my_spade_tests===null){
      my_spade_tests={};
    }
    renderSpadesList(my_spade_tests);
  }
  else{
    jQuery.ajax({
      'url':global_opt.base_path+'/api/spade_test/?filter_user='+user_id,
      'method': 'GET',
      'dataType': 'JSON',
      'success': function(d){
        renderSpadesList(d.data);
       }
    });
  }
}


function renderSpadesList(spades_list){
  var user_id=jQuery.jStorage.get('capsella_settings').user_id;
  jQuery.each(spades_list, function(k,v){
    var data;
    if(typeof v.json!=='undefined'){
      data=JSON.parse(v.json);
    }
    else{
      data=v;
    }
    var type='public';
    // var i=base_icon;
    var icon = new L.Icon({
      iconUrl: global_opt.base_path+'/res/img/marker/blue_marker.png',
      iconSize:     [25, 41],
      iconAnchor:   [12, 41],
    });
    if(data.user_id===user_id){
      jQuery("#spade_test_welcome").hide();
      type='my';
      icon = new L.Icon({
        iconUrl: global_opt.base_path+'/res/img/marker/green_marker.png',
        iconSize:     [25, 41],
        iconAnchor:   [12, 41],
      });
      // i=my_icon;
    }
    // L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);

    var marker = L.marker([data.lat, data.lon], {icon: icon}).addTo(map);

      var el="<li>";
      if(data.step_done<24){
        el+="<button class='btn btn-sm btn-warning'>"+cap_t("Resume")+"</button>";
      }
      else{
        el+="<button class='btn btn-sm btn-info'>"+cap_t("View")+"</button>";
      }
      el+=data.date+" "+encodeHtml(data.name)+" ";
      //
      el+="</li>";

      var el2=jQuery(el);
      el2.find('button').click(function(){
        jQuery('#capsella_info').html('<button id="spade_test_back">'+cap_t("Back")+'</button><div id="spade_test_result"></div>');
        jQuery('#spade_test_back').click(function(){
          init_capsella('spade_test');
        });
        spade_test_result(data);
        map.flyTo([data.lat,data.lon],14);
      });
      jQuery('#'+type+'_spade_tests').show().append(el2);



    marker.on('click', function(){
            spade_test_result(data);

      // jQuery.ajax({
      //     'url':global_opt.base_path+'/api/spade_test/'+data.guid,
      //     'method': 'GET',
      //     'dataType': 'JSON',
      //     'success': function(d2){
      //       jQuery('#capsella_info').html('<div id="spade_test_result"></div>');
      //       var data=JSON.parse(d2.data[0].json);
      //       data.flag=d2.data[0].flag;
      //       spade_test_result(data);
      //     }
      // });
    });
  });
}

//Clean the page to start a data entry (new or existing)
function resetSpade(){
  jQuery('#capsella_container').html('<div class="col-xs-12" id="spade_test_insert"></div>');
}

function add_spade(){
  resetSpade();

  // jQuery('#spade_test_result').html('');
  var html='<h3>'+cap_t("Enter a new spade test")+'</h3>';
  html+='<div style="height:300px;" id="capsella_map2"></div>';
  html+='<div class="alert alert-info">'+cap_t('Click on the map to move the spade test location')+'</div>';

  html+='<input type="hidden"   id="spade_lat" />';
  html+='<input type="hidden"   id="spade_lon" />';
  html+='<label>'+cap_t('Sample code')+'</label><input class="form-control" id="spade_name" />';
  html+='<label>'+cap_t('Date')+'</label><input class="form-control" value="'+new Date().toJSON().slice(0,10)+'" type="date" id="spade_date" />';
  // html+='<label>'+cap_t('Picture')+'</label><input class="form-control" type="file" accept="image/*;capture=camera"  id="spade_img" />';
  html+='<button id="spade_next" onClick="spade_test1()" class="btn btn-success">'+cap_t("Next")+'</button>';
  jQuery('#spade_test_insert').html(html);



  map = L.map('capsella_map2').setView([43.6,10.6], 6);
  updateControlsMap();



  get_location();
  map.on('click', function(e){
    position = {'coords':{'latitude':e.latlng.lat, 'longitude':e.latlng.lng}};
    createPoint(position);
  });


}

//get the gps location
function get_location(){
  navigator.geolocation.getCurrentPosition(
    function(position) {
        createPoint(position);
    },
    function(error) {alert(error.message);}
  );
}

//decode the address to get a position
function geocode_address(){
  var loc=jQuery('#farm_address').val();
  if(loc!==''){
    urladdr = 'http://nominatim.openstreetmap.org/search?format=json&q='+loc+'';
    jQuery.ajax({
      type: 'POST',
      url: urladdr,
      dataType: "jsonp",
      jsonp:'json_callback',
      success: function(osm){
        console.log(osm);
        if(osm.length>0){
          position = {'coords':{'latitude':osm[0].lat, 'longitude':osm[0].lon}};
          createPoint(position);
        }
        else{
          alert(cap_t('We did not find the address'));
        }
      }
    });
  }
  else{
    alert(cap_t('Please insert an address'));
  }
}


function createPoint(position){
  var lat=position.coords.latitude;
  var lon=position.coords.longitude;
  if(marker){
    map.removeLayer(marker);
  }
  marker = L.marker([lat,lon]).addTo(map);
  map.flyTo([lat,lon],14);
  jQuery('#spade_lat').val(lat);
  jQuery('#spade_lon').val(lon);
}

//save the data and exe the function on success, move to the next question (move=1) or back (move=-1)
function caps_save(data, fun, move){
  if(typeof move=='undefined'){
    move=1;
  }
  console.log(data);

  //if moving back do not save
  if(global_opt.offline===true){
    var my_spade_tests=jQuery.jStorage.get('my_spade_tests');
    if(my_spade_tests===null){
      my_spade_tests={};
    }
    my_spade_tests[data.guid]=data;
    jQuery.jStorage.set('my_spade_tests', my_spade_tests);
    move_next(data,fun, move);
  }
  else{
    jQuery.ajax({
      'url':global_opt.base_path+'/api/spade_test/',
      'method': 'POST',
      'data': JSON.stringify(data),
      'dataType': 'JSON',
      'success': function(d){
        console.log(d);
        move_next(data,fun, move);
       }
    });
  }
}


//move to the next question (move=1) or to the previous one (move=-1)
function move_next(data, fun, move){
  global_opt.spade_step=global_opt.spade_step+move;
  fun(data, move);
}

//create a spade test
function spade_test1(){
  map.off('click');
  var data={'guid':Guid.newGuid()};
  data.lat=jQuery('#spade_lat').val();
  data.lon=jQuery('#spade_lon').val();
  data.date=jQuery('#spade_date').val();
  data.name=jQuery('#spade_name').val();
  var settings=jQuery.jStorage.get('capsella_settings');
  data.user_id=settings.user_id;
  data.email=settings.email;
  if(data.lat && data.lon && data.date && data.name){
    global_opt.spade_step=-1;
    caps_save(data, spade_test_draw, 1);
  }
  else{
    alert(cap_t("Please fill all the required data"));
  }
}

//Draw the spade test next question (using global_opt.spade_step to define the question)
function spade_test_draw(data, move){

  var question=spade_question[global_opt.spade_step];
  if(typeof question.code=='undefined'){
    question_code='';
  }
  else{
    question_code=question.code.toLowerCase();
  }

  if(typeof question.check_question!== 'undefined' && question.check_question===true){
    //Skip a question
    var skip_question=false;
    if(question_code=='decor'){
      //all the answers should be no residues to skip
      skip_question=true;
      jQuery.each(data.typor, function(k,v){
        if(!(v.length==1 && v[0]=="No residues")){
          skip_question=false;
        }
      });
    }
    if(question_code=='roott'){
      skip_question=true;
      if(data.leg=='yes'){
        skip_question=false;
      }
    }

    if(skip_question){
      if(move==1){ //if the user is movng forward skip the question
        global_opt.spade_step++;
      }
      else{//if the user is moving backward skip the question
        global_opt.spade_step--;
      }
      question=spade_question[global_opt.spade_step];
    }
  }

  if(typeof question.code=='undefined'){
    question_code='';
  }
  else{
    question_code=question.code.toLowerCase();
  }
  // jQuery('#spade_test_result').html();

  var html='<h3 id="spade_question_title">'+cap_t(question_code+"_question")+'</h3>';
  if(question.help!=='' && question.help!=='no'){

    html+='<div class="alert alert-info">'+cap_t(question.help);
      var img="";
      if(question.help=='ressli_info'){
        img="RESSLI/ressli.jpeg";
        html+="<div style='text-align:center'><img style='height:200px;' src='"+global_opt.base_path+"/res/img/spade_test/"+img+"'></div>";
      }
      else if(question.help=='laynum_info'){
        img="LAYNUM/laynum.jpeg";
        html+="<figure style='text-align:center'><img style='height:300px;' src='"+global_opt.base_path+"/res/img/spade_test/"+img+"'><figcaption>"+cap_t("Sample with three layers")+"</figcaption></figure>";
      }
      else if(question.help=='roott_info'){
        img1="ROOTT/root1.jpeg";
        img2="ROOTT/root2.jpeg";
        html+="<div style='text-align:center'><figure><img style='height:200px;' src='"+global_opt.base_path+"/res/img/spade_test/"+img1+"'><figcaption>"+cap_t("legume with root nodules")+"</figcaption></figure>";
        html+="<figure><img style='height:200px;' src='"+global_opt.base_path+"/res/img/spade_test/"+img2+"'><figcaption>"+cap_t("open root nodule (red inside)")+"</figcaption></figure></div>";

      }
      else if(question.help=='earthw_info'){
        img1="EARTHW/17.jpeg";
        img2="EARTHW/18.jpeg";
        html+="<div style='text-align:center'><figure><img style='height:200px;' src='"+global_opt.base_path+"/res/img/spade_test/"+img1+"'/><figcaption>"+cap_t("casts")+"</figcaption></figure>";
        html+="<figure><img style='height:200px;' src='"+global_opt.base_path+"/res/img/spade_test/"+img2+"' /><figcaption>"+cap_t("holes")+"</figcaption></figure></div>";

      }
      else if(question.help=='biodivoth_info'){
        img="BIODIVOTH/19.jpeg";
        html+="<div style='text-align:center'><img style='height:200px;' src='"+global_opt.base_path+"/res/img/spade_test/"+img+"'></div>";
      }



    html+="</div>";
  }

  var layers=1;
  var multi_layers=false;
  if(question.how_many=='by_layer'){
    if(typeof data.laynum !=='undefined'){
      layers=data.laynum;
      multi_layers=true;
    }
  }

  var placeholder='';
  if(typeof question.placeholder!=='undefined'){
    placeholder=cap_t(question.placeholder);
  }
  var existing_data=data[question_code];
  if(typeof existing_data=='undefined'){
    existing_data="";
  }
  // html+='<pre>'+JSON.stringify(data[question_code])+'</pre>';

  for (var n=0; n<layers; n++){

    value="";
    if(multi_layers){
      if(existing_data.length>n){
        value=existing_data[n];
      }
    }
    else{
      value=existing_data;
    }

    field_name=question_code;
    if(layers>1){
      html+="<h4>"+cap_t("Layer num. ")+(n+1)+"</h4>";
      field_name=question_code+"_"+n;
    }
    if(question.data_type=='info'){
      //No answers, move on...
    }
    else if(question.data_type=='integer'){

      html+='<input class="form-control" placeholder="'+placeholder+'" name="'+field_name+'" type="number" value="'+value+'"/>';
    }
    else if(question.data_type=='text'){
      html+='<textarea class="form-control" name="'+field_name+'" >'+value+'</textarea>';
    }
    else{
      html+="";
      var answers=[];

      if(typeof question.answers !=='undefined'){
        answers=question.answers;
      }
      else if(question.data_type=='boolean'){
          answers=[
            {'answer':'yes'},
            {'answer':'no'}
          ];
      }
      if(answers.length>0){

        var type='radio';
        if(question.data_type=='select_multi'){
          type='checkbox';
        }
        var images=false;

        if(typeof question.images!=='undefined'){
          images=question.images;
        }

        html+='<div class="row spade_tile_answers">';
        jQuery.each(answers, function(k,v){
          var checked=false;
          var answer_code=v.answer_code;
          var answer_label=cap_t(v.answer);
          if(typeof answer_code=='undefined'){
            answer_code=v.answer;
          }
          else{
            answer_label=cap_t(question_code+"_"+v.answer_code);
          }



          if(question.data_type=='select_multi'){

            if(jQuery.inArray(answer_code, value)>-1){
              checked=true;
            }
          }
          else{
            if(answer_code==value){
              checked=true;
            }
          }

          var chk="";
          var clsckd="";
          if(checked){
            chk=' checked="true" ';
            clsckd="answer_box_selected";
          }

          html+="<div class='col-sm-6'>";
          html+='<input class="spade_input" '+chk+' id="answer_'+k+'_'+n+'"  type="'+type+'" name="'+field_name+'" value="'+answer_code+'" />';

          html+="<div onclick='triggerAns("+k+","+n+")' class='answer_box "+clsckd+"' id='answer_box_"+k+"_"+n+"'>";
          if(images){
            var styl="background-image: url("+global_opt.base_path+"/res/img/spade_test"+v.image+")";
            html+="<div  style='"+styl+"' id='answer_tile_"+k+"_"+n+"' class='type_"+type+" spade_tile_answer'>";
            html+="</div>";
          }
          html+="<div class='spade_tile_answer_sub'>"; //onclick="selectAns('+k+','+n+')"
              html+='<div class="spade_answer_title" >'+answer_label+'</div>';
          html+='</div></div></div>';
        });
        html+="</div>";
      }
      else{
        html+='<div class="alert alert-warning">'+cap_t("There are no answers!")+'</div>';
      }
    }
  }

  if(global_opt.spade_step>0){
    html+='<button id="spade_before" class="btn btn-success">'+cap_t("Back")+'</button>';
  }
  html+='<button id="spade_next" class="btn btn-success">'+cap_t("Next")+'</button>';
  jQuery('#spade_test_insert').html(html);
  jQuery(document).scrollTop( jQuery("#spade_question_title").offset().top-jQuery('.navbar-fixed-top').height() );

  jQuery("#spade_before").click(function(){
    update_data(data, -1);
  });
  jQuery("#spade_next").click(function(){
    update_data(data, +1);
  });
}



function triggerAns(k,n){
  console.log(k+" "+n);
  jQuery('input#answer_'+k+"_"+n).trigger('click');
  jQuery('#answer_box_'+k+"_"+n).addClass('answer_box_selected');
  jQuery('.spade_input').each(function(k,v){
    if(!jQuery(v).is(':checked')){
      jQuery(v).parent().find('.answer_box').removeClass('answer_box_selected');
    }
  });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Main function to get all the fields value, update the data object and ater checking the mandatory data save the data (caps_save)
function update_data(data, move){
  var multi_layers=false;
  var ok=true;
  var message='';

  var do_update_data=true;
  if(do_update_data){
    var question=spade_question[global_opt.spade_step];
    var question_code=question.code.toLocaleLowerCase();
    data.step_done=global_opt.spade_step;

    var layers=1;
    if(question.how_many=='by_layer'){
      if(typeof data.laynum !=='undefined'){
        layers=data.laynum;
        multi_layers=true;
      }
    }

    var values=[];

    for (var n=0; n<layers; n++){
      field_name=question_code;
      if(layers>1){
        field_name=question_code+"_"+n;
      }
      if(question.data_type!=='info'){
        var value;
        if(question.data_type=='select_multi'){
          value=[];

          jQuery("input[name="+field_name+"]").each(function(k,v){
            if(jQuery(v).is(':checked')){
              value.push(jQuery(v).val());
            }
          });

          if(value.length===0){
            value=undefined;
          }
        }
        else if(question.data_type=='integer'){
          value=jQuery("input[name="+field_name+"]").val();
          if(value!==''){
            value=parseFloat(value);
          }
          else{
            value=undefined;
          }
        }
        else if(question.data_type=='text'){
          value=jQuery("textarea[name="+field_name+"]").val();
        }
        else{
          value=jQuery("input[name="+field_name+"]:checked").val();
        }
        values[n]=value;
      }
    }

    var mandatory=true;
    if(typeof question.mandatory!=='undefined'){
      mandatory=question.mandatory;
    }


    //Check if data is ok and save it
    if(question.data_type=='info'){
      var a=1;
    }
    else if(!multi_layers){
      var value_ok=values[0];

      if(mandatory && typeof value_ok=='undefined'){
        ok=false;
        message=cap_t('Please select an answer');
      }
      else{
        data[question_code]=value_ok;
      }
    }
    else{
      var is_ok=true;
      if(mandatory){
        jQuery.each(values, function(k,v){
          if(typeof v=='undefined'){
            is_ok=false;
          }
        });
      }



      if(is_ok){
        if(question_code=='laydep'){
          var last_val=0;
          jQuery.each(values, function(k,v){
            var current_val=v+0;
            if(current_val<=last_val){
              ok=false;
              message=cap_t("The layer depths are not correct.");
            }
            last_val=current_val;
          });
          if(ok){
            data[question_code]=values;
          }
        }
        else{
          data[question_code]=values;
        }
      }
      else{
        ok=false;
        message=cap_t('Please fill all the answers');
      }
    }
  }

  if(ok){
    var ret_function=spade_test_draw;
    if(global_opt.spade_step>=spade_question.length-1){
      ret_function=spade_save_email;
    }
    caps_save(data, ret_function, move);
  }
  else{
    alert(message);
  }
}

function encodeHtml(rawStr){
  var encodedStr = rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
    return '&#' + i.charCodeAt(0) + ';';
  });
  return encodedStr;
}

function spade_save_email(data){
  var settings=jQuery.jStorage.get('capsella_settings');
  var html='';
  html+=cap_t("Thank you, you have finished the Spade test.");
  var saved_email=settings.email;

  html+='<label for="caps_email">'+cap_t("Please insert your email to see the spade test result and save the data.")+'</label><input class="form-control" id="caps_email" value="'+saved_email+'"></input>';
  html+='<button id="save_email" class="btn btn-info">'+cap_t("Save")+'</button>';
  jQuery('#spade_test_insert').html(html);

  jQuery("#save_email").click(function(){
    var email=jQuery('#caps_email').val();
    if(validateEmail(email)){

      data.email=email;
      settings.email=email;
      jQuery.jStorage.set('capsella_settings',settings);

      jQuery.ajax({
        'url':global_opt.base_path+'/api/spade_test/',
        'method': 'POST',
        'data': JSON.stringify(data),
        'dataType': 'JSON',
        'success': function(d){
            var html="";
            html="<div id='spade_test_result'></div>";
            html+="<div id='back_map'><button class='btn btn-info'>"+cap_t("Go back to the map")+"</button></div>";
            jQuery('#spade_test_insert').html(html);
            spade_test_result(data);

            jQuery("#back_map").click(function(){
              init_capsella('spade_test');
            });
         }
      });
    }
    else{
      alert(cap_t("Please insert a valid email"));
    }
  });
}

function spade_resume(data){
  resetSpade();
  global_opt.spade_step=data.step_done;
  if(typeof global_opt.spade_step =='undefined'){
    global_opt.spade_step=0;
  }
  spade_test_draw(data);
}

// function spade_back(data){
//   resetSpade();
//   global_opt.spade_step=global_opt.spade_step-1;
//   spade_test_draw(data);
// }


function spade_test_result(data){

    var html="<h3>"+cap_t("Spade test")+" "+encodeHtml(data.name)+"</h3>";
    if(typeof data.step_done =='undefined'){
      html+="<div class='alert alert-warning'>"+cap_t("the test has just started.")+'</div>';

      html+="<button id='spade_resume' class='btn btn-info'>"+cap_t("Resume the test")+"</button>";
    }
    else{
      html+="<div class='col-xs-12'>"+cap_t("Collected on")+" "+data.date+" ";
      if(typeof data.fcov!=='undefined'){
        html+=" "+cap_t("on a field with")+" <b>"+cap_t(data.fcov)+"</b>";
      }
      if(typeof data.fslo!=='undefined'){
        html+=" - <b>"+cap_t(data.fslo)+"</b>. ";
      }
      if(typeof data.pcov!=='undefined'){
        html+=" "+cap_t("On the spot there is")+" <b>"+cap_t(data.pcov)+"</b>.";
      }
      if(typeof data.sois!='undefined' && data.sois.length>0){
        var ss=data.sois.map(function(v){return cap_t(v);});
        html+="<p/>"+cap_t("On the surface we have seen")+" <b>"+ss.join("</b>, <b>");
      }
      if(typeof data.wilpla!='undefined' && data.wilpla.length>0){
        var ww=data.wilpla.map(function(v){return cap_t(v);});
        html+="<p/>"+cap_t("We have seen the following plants")+":  <b>"+ww.join("</b>, <b>");
      }

      html+="</div>";

      if(data.step_done<24){
        html+="<div class='alert alert-warning'>"+cap_t("the test is not concluded.")+' '+data.step_done+'/'+spade_question.length+'</div>';
        html+="<button id='spade_resume' class='btn btn-info'>"+cap_t("Resume the test")+"</button>";
      }
      else{
        var sum_sq=0;
        for (lay=0; lay<data.laynum; lay++){
          sum_sq+=parseInt(data.sq[lay].slice(0,1));
        }
        var score=Math.round(sum_sq/data.laynum);
        html+="<div class='col-xs-12 soil_sq_"+score+"'><p/>"+cap_t("Average SQ score")+": <b>"+(sum_sq/data.laynum).toFixed(1)+"</b></div>";

        html+="<div class='col-xs-12'><p/><h4>"+cap_t("Soil Profile")+"</h4>";
        var start_dep=0;
        var final_depth=0;
        for (var lay=0; lay<data.laynum; lay++){
          if(data.laydep[lay]===null){
            data.laydep[lay]=10;
          }
          final_depth+=data.laydep[lay];
        }

        for (lay=0; lay<data.laynum; lay++){


          var end_dep=data.laydep[lay];
          var sq=parseInt(data.sq[lay].slice(0,1));
          var shp=data.agshp[lay];
          var comp=data.comp[lay];
          var agdim=data.agdim[lay];
          if(data.laynum==1){
            end_dep=data.laydep;
            sq=parseInt(data.sq.slice(0,1));
            shp=data.agshp;
            comp=data.comp;
            agdim=data.agdim;
          }


          var hh=(550/final_depth)*(end_dep-start_dep);
          lay_des=""+start_dep+"-"+end_dep+"cm,";
          lay_des+=" "+cap_t(comp)+", "+cap_t(shp)+" "+cap_t("aggregates of")+" "+agdim+"mm ";


          html+="<div style='height:"+hh+"px' class='soil_layer soil_sq_"+sq+"'>"+lay_des+"</div>";
          start_dep=end_dep;
        }
      }
    }
    html+="</div>";

      html+="<div class='col-xs-12'><p/><button data-toggle='collapse' data-target='#spade_raw_result' class='btn btn-info btn-sm'>"+cap_t("More")+"</button>";
        if(data.flag===0){
          html+="<button data-toggle='collapse' id='spade_edit' class='btn btn-info btn-sm'>"+cap_t("Edit")+"</button>";
        }
        html+="<div id='spade_raw_result' class='collapse'>";
        html+="<h3>"+cap_t("Spade test raw data")+"</h3><pre>"+JSON.stringify(data,null,2)+"</pre>";
        html+="</div>";

        html+='<a onclick="add_spade()" class="form-control btn btn-info">'+cap_t("Enter a new spade test")+'</a>';


        jQuery("#spade_test_result").html(html);
        jQuery('#spade_resume').click(function(){
          spade_resume(data);
        });
        jQuery('#spade_edit').click(function(){
          console.log("Edit");
          global_opt.spade_step=21;
          spade_resume(data);
        });
    html+="</div>";

}


/************************************
   CAPSELLA PLATFORM test
************************************/
function init_caps_plat(){

  var html="<div class='row'><label for='caps_user'>UserID</label><input class='form-control' id='caps_user' value=''/>";
  html+="<label for='caps_pswd'>Password</label><input class='form-control' type='password' id='caps_pswd' value='' />";
  html+="<a id='caps_login' class='btn btn-info'>Login</a>";
  html+="<div id='loading'></div>";
  html+="</div>";
  jQuery('#capsella_info').html(html);

  jQuery('#caps_login').click(function(){
    jQuery('#loading').html("Please wait...");
    caps_login(jQuery('#caps_user').val(), jQuery('#caps_pswd').val(), function(aut){
      if(typeof aut.token !=='undefined'){
        if(aut.token !==null){
          global_opt.token=aut.token;
          caps_home();
        }
        else{
          jQuery('#loading').html("Wrong user_id/password");
        }
      }
    });
  });

}

function caps_home(){
  jQuery('#capsella_info').html("You have login in Capsella Platform.<h3>Datasets</h3><div id='caps_datasets'>Load datasets</div><h3>Values</h3><div id='caps_values'></div>");
  var group='capsella';

  jQuery.ajax({
    'url':global_opt.base_path+'/api/caps_get_group_datasets/'+group,
    'method': 'POST',
    'data':{
      'token':global_opt.token,
    },
    'dataType': 'JSON',
    'success': function(d){
        var html='<ul>';
        jQuery.each(d, function(k,v){
          console.log(v);
          html+='<li data-content-type="'+v.contentType+'" data-uuid="'+v.uuid+'"><a>'+v.datasetName+'</a></li>';
        });
        html+='<ul>';
        jQuery('#caps_datasets').html(html);
        jQuery('#caps_datasets li').click(function(){
          var uuid=jQuery(this).attr('data-uuid');
          var ct=jQuery(this).attr('data-content-type');
          caps_show_dataset(uuid,group,ct)
        });
     }
  });

}

function caps_show_dataset(uuid,group,ct){
  jQuery('#caps_values').html("Loading...");

  jQuery.ajax({
    'url':global_opt.base_path+'/api/caps_get_dataset/'+uuid,
    'method': 'POST',
    'data':{
      'token':global_opt.token,
      'group':group
    },
    'dataType': 'text',
    'success': function(d){
        console.log(d);
        var html='<ul>';

        if(ct=='json'){
          try{
            d=JSON.parse(d); //.slice(1, -1)
            console.log(d);
          }
          catch(e){
            html+='<li>The JSON file is not well formatted!</li>';
            html+='<pre>'+d+'</pre>';
            d=[];
          }
        }
        else{
          d=
          d=d.split(/\r\n|\n/);
        }

        jQuery.each(d, function(k,v){
          console.log(v);
          html+="<li>"+v+"</li>";
        });
        html+='<ul>';
        jQuery('#caps_values').html(html);
     }
  });

}

function caps_login(user, pswd, success){
  jQuery.ajax({
    'url':global_opt.base_path+'/api/caps_login?username='+user+'&password='+pswd,
    'method': 'POST',
    'dataType': 'JSON',
    'success': function(d){
        success(d);
     }
  });
}


//Creat an object for unique identifier
var Guid = Guid || (function () {

var EMPTY = '00000000-0000-0000-0000-000000000000';

var _padLeft = function (paddingString, width, replacementChar) {
	return paddingString.length >= width ? paddingString : _padLeft(replacementChar + paddingString, width, replacementChar || ' ');
};

var _s4 = function (number) {
	var hexadecimalResult = number.toString(16);
	return _padLeft(hexadecimalResult, 4, '0');
};

var _cryptoGuid = function () {
  var buffer = new window.Uint16Array(8);
  window.crypto.getRandomValues(buffer);
  return [_s4(buffer[0]) + _s4(buffer[1]), _s4(buffer[2]), _s4(buffer[3]), _s4(buffer[4]), _s4(buffer[5]) + _s4(buffer[6]) + _s4(buffer[7])].join('-');
};

var _guid = function () {
  var currentDateMilliseconds = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (currentChar) {
    var randomChar = (currentDateMilliseconds + Math.random() * 16) % 16 | 0;
    currentDateMilliseconds = Math.floor(currentDateMilliseconds / 16);
    return (currentChar === 'x' ? randomChar : (randomChar & 0x7 | 0x8)).toString(16);
  });
};

var create = function () {
  var hasCrypto = typeof (window.crypto) != 'undefined';
	var hasRandomValues=false;
	if(hasCrypto){
	  hasRandomValues = typeof (window.crypto.getRandomValues) != 'undefined';
	}
  return (hasCrypto && hasRandomValues) ? _cryptoGuid() : _guid();
};

return {
  newGuid: create,
  empty: EMPTY
};})();
