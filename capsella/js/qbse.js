function init_qbse(){

  var html="<h1>QBSe</h1>";
  html+="<div id='button_containers'></div>";

  jQuery('#capsella_container').html(html);


    buttons=[
      {'label':cap_t("Epigeic"), 'field_name':'epigeic', 'value':0,'icon':'epigeic.jpg'},
      {'label':cap_t("Endogeic"), 'field_name':'endogeic', 'value':0, 'icon':'endogeic.jpg'},
      {'label':cap_t("Anecic"), 'field_name':'anecic', 'value':0,'icon':'anecic.jpg'},
      {'label':cap_t("Coprophagic"), 'field_name':'coprophagic', 'value':0,'icon':'coprophagic.jpg'},
      {'label':cap_t("Hydrophilic"), 'field_name':'hydrophilic', 'value':0,'icon':'hydrophilic.jpg'}
    ];


    jQuery.each(buttons, function(k,v){
      //Assegna il valore
      // if(res.plus[v.field_name]){
      //   v.value=res.plus[v.field_name];
      // }
      var st='';
      if(v.icon){
        st='background-image:url('+global_opt.base_path+"res/img/qbse/"+v.icon+')';
      }
      var h="<div class='col-sm-6 col-xs-12 qbs-tile'><div class='qbs-tile-int' style='"+st+"'><div class='index_button' id='field_"+v.field_name+"'><div class='tile_title'><h5>"+v.label+"</h5></div></div>";
      h+="<div class='index_field'>";
      h+="<div class='row'>";
      h+="<div class='col-xs-6'><div class='row'><div class='col-xs-3'><button class='btn btn-sm btn-default'>-</button></div><div class='col-xs-6'><input   id='input_"+v.field_name+"' class='form-control' type='number' value='"+v.value+"'></input></div><div class='col-xs-3'><button class='btn btn-sm btn-default'>+</button></div></div><h4>"+cap_t("Juvenile")+"</h4></div>";
      h+="<div class='col-xs-6'><div class='row'><div class='col-xs-3'><button class='btn btn-sm btn-default'>-</button></div><div class='col-xs-6'><input   id='input_"+v.field_name+"' class='form-control' type='number' value='"+v.value+"'></input></div><div class='col-xs-3'><button class='btn btn-sm btn-default'>+</button></div></div><h4>"+cap_t("Adult")+"</h4></div>";
      // h+="<div class='col-xs-6'><input disabled='true' id='input_"+v.field_name+"' class='form-control' type='number' value='"+v.value+"'></input></div>";
      h+="</div>";
      h+="</div></div></div>";
      jQuery('#button_containers').append(h);

      jQuery('#button_containers #field_'+v.field_name).click(function(){
        input=jQuery('#button_containers #input_'+v.field_name);
        var numero = parseInt(input.val());
        var new_numero=numero+1;
        jQuery(input).val(new_numero);
        //updateText();
        //storeValue(1,v.field_name, new_numero);
        //pushInsetto(1);
      });
  });

  jQuery('#button_containers').append("<div style='text-align:center;' class='col-sm-6 col-xs-12'><button id='qbs_classify'class='btn btn-info btn-block' onClick='qbsGuide(0)'>"+cap_t("Guided recognition")+"</button></div>");
}

function qbsGuide(step){

  var html="";;
  var info="";
  var title;
  var ans=[];
  if(typeof step=="string"){
    html="<h1>The eartworm is "+step+"</h1>";
    html+="<button onClick='init_qbse()'>Goes back to the test</button>";
    jQuery('#capsella_container').html(html);
  }
  else{
    if(step===0){
      title=cap_t("What is the shape of the body?");
      ans=[
        {'answer':cap_t("Cylindrical"),'result':2},
        {'answer':cap_t("With a dorsal furrow"),'result':'hydrophilic'},
      ];
      info="The shape of the body is important to distinguish... The earthworm with a dorsal furrow are ..."
    }
    else if (step===2){
      title=cap_t("What is the type of soil surface?");
      ans=[
        {'answer':cap_t("Inside the soil"),'result':4},
        {'answer':cap_t("On the soil surface"),'result':3},
      ];
    }
    else if (step===3){
      title=cap_t("What is the Habitat of recovery?");
      ans=[
        {'answer':cap_t("The soil is soaked with water"),'result':'hydrophilic'},
        {'answer':cap_t("There are a lot of fresh organic matter"),'result':'coprophafic'},
      ];
    }
    else if (step===4){
      title=cap_t("What is the depth recovery?");
      ans=[
        {'answer':cap_t("first 5-10 cm"),'result':5},
        {'answer':cap_t("first 30-40 cm"),'result':6}
      ];
    }

    html+="<h1>"+title+"</h1><div id='qbs_answers'></div><div style='padding:50px;' class='col-xs-12'><div class='alert alert-info'>"+info+"</div></div><p/><p/>";
    jQuery('#capsella_container').html(html);

    jQuery.each(ans, function(k,v){
      var button=jQuery("<div class='col-xs-6'><button class='btn btn-success btn-block'>"+v.answer+"</button></div>");
      jQuery('#qbs_answers').append(button);
      button.find('button').click(function(){
        qbsGuide(v.result);
      });

    });
  }

}
