
//home of SOM Dynamics
function som_home(){

  //Check how many simulation do you have
  var my_som = jQuery.jStorage.get('my_som');
  if(my_som===null){
    my_som={};
  }

  //if there are no sim create a new one
  if(Object.keys(my_som).length===0){
    var sim=create_som_sim();
    my_som[sim.guid]=sim;
    run_som_sim(sim);
  }
  // else if(Object.keys(my_som).length===1){
  //   run_som_sim(my_som[Object.keys(my_som)[0]]);
  // }
  else{
    //TODO: lancia la simulazione con il primo..

    // run_som_sim(my_som[Object.keys(my_som)[0]]);

    var table="<h3>List of available simulation</h3><table class='table'>";
    jQuery.each(my_som, function(k,v){

      var onl="<span class='label label-danger'>On the phone</span>";
      if(v.saved===true){
        onl="<span class='label label-success'>Online</span>";
      }
      table+="<tr><th>"+v.name+"</th><td>"+onl+"</td><th><button class='btn_som_edit btn btn-sm btn-default' data-som-pos="+k+">"+cap_t("Edit")+"</button></th>";
    });
    table+="</table>";
    table+="<a onClick='add_som_sim()' class=' btn btn-block btn-default'>"+cap_t("Add a simulation")+"</a>";
    table+="<a onClick='save_som_online(true)' class=' btn btn-block btn-default'>"+cap_t("Sincronizza")+"</a>";




    // var tools="<div class='row'><div class='col-xs-9'><select id='choose_som' class='form-control'>";
    //   jQuery.each(my_som, function(k,v){
    //     tools+="<option value='"+k+"'>"+v.name+"</option>";
    //   });
    //   tools+="</select></div>";
    //   tools+="<div class='col-xs-3 '><a onClick='add_som_sim()' class=' btn btn-sm btn-default'>"+cap_t("Add a simulation")+"</a></div>";
    // tools+="</div>";
    jQuery('#som_home').html(table);
    jQuery('.btn_som_edit').click(function(){
      var sel_guid=jQuery(this).attr('data-som-pos');
      var sim= get_sim_som(sel_guid);
      run_som_sim(sim);
    });
  }
  jQuery.jStorage.set('my_som',my_som);
}

function add_som_sim(){
  var sim=create_som_sim();
  //som_sim_save(sim);
  run_som_sim(sim);
}


//run a SOM simulation
function run_som_sim(sim){
  //manca il suolo

  if(!sim.soil.ok){
    som_sim_start(sim);
  }
  else{
    som_sim_manage(sim);
  }
}

//ask for soil data
function som_sim_start(sim){
  var html = '';
  html+="<h3>Location <span style='display:none' id='sh_location'>"+cap_t('Position not known')+"</span></h3>";
  // html+="<input type='hidden' id='namie' value=''/>";
  // html+="<input type='hidden' id='lat' value=''/>";
  // html+="<input type='hidden' id='lon' value=''/>";
  var sim_name="";
  var clay="10";
  var sand="60";
  var som="1.5";
  var bulk_density="1.2";
  if(typeof sim!=='undefined'){
    if(typeof sim.name!=='undefined'){
      sim_name=sim.name;
    }
    if(typeof sim.soil!=='undefined'){
      if(typeof sim.soil.clay!=='undefined'){
        clay=sim.soil.clay;
      }
      if(typeof sim.soil.sand!=='undefined'){
        sand=sim.soil.sand;
      }
      if(typeof sim.soil.som!=='undefined'){
        som=sim.soil.som;
      }
      if(typeof sim.soil.bulk_density!=='undefined'){
        bulk_density=sim.soil.bulk_density;
      }
    }

  }
  html+="<div class='form-group col-sm-12'><label for='sim_name'>"+cap_t("Simulation Name")+"</label><input id='sim_name' class='form-control' value='"+sim_name+"'/></div>";

//
//   'clay':jQuery('#clay_content').val(),
//   'sand':jQuery('#sand_content').val(),
//   'som':jQuery('#organic_content').val(),
//   'bulk_density':jQuery('#bulk_density').val()
// };
//
// sim.name=jQuery('#sim_name').val();

  html+="<h3>"+cap_t("Soil condition")+"</h3>";
  // html+="<div id='sh_wait_soil' class='alert alert-warning'>"+cap_t("We are loading the soil data from the SoilGrids database...")+"</div>";
  html+="<div class='row'>";
  html+="<div class='form-group col-sm-3'><label for='clay_content'>"+cap_t("Clay")+"</label><input id='clay_content' class='form-control' value='"+clay+"'/></div>";
  html+="<div class='form-group col-sm-3'><label for='sand_content'>"+cap_t("Sand")+"</label><input id='sand_content' class='form-control' value='"+sand+"'/></div>";
  html+="<div class='form-group col-sm-3'><label for='organic_content'>"+cap_t("Soil Organic Matter")+"</label><input id='organic_content' class='form-control' value='"+som+"'/></div>";
  html+="<div class='form-group col-sm-3'><label for='bulk_density'>"+cap_t("Bulk Density")+"</label><input id='bulk_density' class='form-control' value='"+bulk_density+"'/></div>";
  html+="</div>";

  html+="<div class='col-sm-12 text-center'><button id='start_som' class='btn btn-info btn-lg'>"+cap_t("Simulate Soil Organic Matter trend")+"</button></div>";

  jQuery('#som_home').html(html);

  jQuery('#start_som').click(function(){
    if(jQuery('#sim_name').val()!==''){
      sim=get_soil_data(sim);
      som_sim_save(sim);
      som_sim_manage(sim);
    }
    else{
      alert(cap_t("Please insert a valid name for the simulation"));
    }
  });
  // jQuery('#start_spade').click(function(){
  //   startSpade();
  // });
}


function get_soil_data(sim){

  var soil={
    // 'lat':jQuery('#lat').val(),
    // 'lon':jQuery('#lon').val(),
    // 'clay':jQuery('#clay_content').val(),
    'clay':jQuery('#clay_content').val(),
    'sand':jQuery('#sand_content').val(),
    'som':jQuery('#organic_content').val(),
    'bulk_density':jQuery('#bulk_density').val()
  };

  sim.name=jQuery('#sim_name').val();

  soil.ok=true;
  soil.depth=0.3;
  soil.soil_weight=(10000*soil.depth)*soil.bulk_density;
  soil.c_weight=soil.soil_weight*soil.som/100;
  soil.k2=2;

  sim.soil=soil;
  return sim;
}

//manage the SOM simulation (add SOM to the balance)
function  som_sim_manage(sim){

  if(sim.soil.ok){
    console.log('som');

    var html = '<div class="row"><h1>'+cap_t("SOM Simulation")+': '+sim.name+'</h1></div>';

    html+="<div id='balance'></div>";



    html+="<h3>"+cap_t("Add an Organic Matter input")+"</h3>";
    html+="<div class='form-group '><label for='year'>"+cap_t("Year")+"</label><input id='year' type='number' class='form-control' value=''/></div>";
    html+="<div class='form-group '><label for='presel_group'>"+cap_t("Organic Matter Input Type")+"</label><div class='row'><div class='col-xs-6'><select id='presel_group' class='col-xs-6 form-control'></select></div><div class='col-xs-6'><select id='presel' class='form-control'></select></div></div></div>";
    // html+="<div class='form-group '><label for='presel'>"+cap_t("Specific Type")+"</label></div>";
    html+="<div class='form-group '><label for='label'>"+cap_t("Description")+"</label><input id='label' class='form-control' value=''/></div>";
    html+="<div class='form-group '><label for='quantity'>"+cap_t("Quantity (t/ha)")+"</label><input type='number' id='quantity' class='form-control' value=''/></div>";
    html+="<div class='form-group '><label for='dry_matter'>"+cap_t("Organic Matter over total amount (%)")+"</label><input type='number' id='dry_matter' class='form-control' value=''/></div>";
    html+="<div class='form-group '><label for='humic_coeff'>"+cap_t("Iso-Humic Coefficient (%)")+"</label><input type='number' id='humic_coeff' class='form-control' value=''/></div>";
    html+="<a id='som_sim_add' class='btn btn-block btn-info'>"+cap_t("Add")+"</a>";

    html+="<div><h3>"+cap_t("Details")+"</h3>";
    html+="<b>"+cap_t("Soil Organic Matter")+" (%)</b>: "+sim.soil.som+"<br/>";
    html+="<b>"+cap_t("Bulk Density")+" (t/m3)</b>: "+sim.soil.bulk_density+"<br/>";
    html+="<b>"+cap_t("Soil Depth")+" (m)</b>: "+sim.soil.depth+"<br/>";
    html+="<b>"+cap_t("Soil Total Weigth")+" (t/ha)</b>: "+sim.soil.soil_weight+"<br/>";
    html+="<b>"+cap_t("SOM Total Weigth")+" (t/ha)</b>: "+parseFloat(sim.soil.c_weight).toFixed(2)+"<br/>";
    html+="<b>"+cap_t("K2 - annual mineralisation rate")+" (k2, %)</b>: "+sim.soil.k2+"<br/>";
    html+="<b>"+cap_t("Average annual SOM loss by minersalisation")+" (t)</b>: "+parseFloat(sim.soil.c_weight*sim.soil.k2/100).toFixed(2)+"<br/>";
    html+="<button id='som_sim_edit_soil' class='btn btn-block btn-info'>"+cap_t("Edit soil data")+"</button>";
    html+="</div>";

    jQuery('#som_home').html(html);
    jQuery('#som_sim_add').click(function(){
        som_sim_add(sim.guid);
    });

    jQuery('#som_sim_edit_soil').click(function(){
        som_sim_start(sim);
    });



    som_sim_balance(sim);
    loadPresel();
  }
  else{
    console.log(sim);
    alert(cap_t('Please enter soil data'));
  }
}

//Load the Preselected SOM types
function loadPresel(){
  var data={
    'fertil':[
      {'label':'Borlanda Fluida', 'quantity':3, 'dry_matter':30,'humic_coeff':5 },
      {'label':'Compost', 'quantity':6, 'dry_matter':20,'humic_coeff':20 }
    ],
    'cover_crop':[
      {'label':'Sovescio Sudan Grass (su secco)', 'quantity':5.6, 'dry_matter':100,'humic_coeff':15 },
      {'label':'Sovescio Veccia+Cereale (su secco)', 'quantity':5, 'dry_matter':100,'humic_coeff':15 },
      {'label':'Sovescio', 'quantity':5, 'dry_matter':15,'humic_coeff':30 },
    ],
    'residue':[
      {'label':'Residuo Ortive (t di residuo)', 'quantity':12, 'dry_matter':15,'humic_coeff':15 }
    ]
  };

  var optg='<option value="-1">'+cap_t("Choose")+'</option>';
  optg+='<option value="fertil">'+cap_t("Fertilizert")+'</option>';
  optg+='<option value="cover_crop">'+cap_t("Cover Crop")+'</option>';
  optg+='<option value="residue">'+cap_t("Residue")+'</option>';
  jQuery('#presel_group').html(optg).change(function(){

    jQuery('#label').val('');
    jQuery('#quantity').val("");
    jQuery('#dry_matter').val("");
    jQuery('#humic_coeff').val("");

    var group=jQuery(this).val();
    var dt=data[group];

    var opt='<option value="-1">'+cap_t("Choose")+'</option>';
    jQuery.each(dt, function(k,v){
      opt+="<option value='"+k+"'>"+v.label+"</option>";
    });

    jQuery('#presel').html(opt).change(function(){
      var key=jQuery('#presel').val();
      d=data[group][key];
      jQuery('#label').val(d.label);
      jQuery('#quantity').val(d.quantity);
      jQuery('#dry_matter').val(d.dry_matter);
      jQuery('#humic_coeff').val(d.humic_coeff);
    });


  });


}



//cancella un apporto e ricalcola
function som_sim_delete(guid, pos){
  var sim=get_sim_som(guid);
  sim.add.splice(pos,1);
  som_sim_save(sim);
  som_sim_balance(sim);
}


//add a value to a simulation
function som_sim_add(guid){

  if(jQuery('#label').val()!=='' && jQuery('#year').val()!==''&& jQuery('#quantity').val()!==''&& jQuery('#dry_matter').val()!==''&& jQuery('#humic_coeff').val()!==''){
    var data={
      'label':jQuery('#label').val(),
      'year':jQuery('#year').val(),
      'quantity':jQuery('#quantity').val(),
      'dry_matter':jQuery('#dry_matter').val(),
      'som':jQuery('#organic_content').val(),
      'humic_coeff':jQuery('#humic_coeff').val()
    };

    data.som_amount=data.quantity*(data.dry_matter/100)*(data.humic_coeff/100);
    var sim=get_sim_som(guid);
    sim.add.push(data);
    som_sim_save(sim);


    jQuery('#label').val('');
    jQuery('#year').val('');
    jQuery('#quantity').val('');
    jQuery('#dry_matter').val('');
    jQuery('#som').val('');

    som_sim_balance(sim);
  }
  else{
    alert(cap_t("Please, enter all the data."));
  }
}

//Run the Balance
function som_sim_balance(sim){

  if(typeof sim.add=='undefined'){
    sim.add=[];
    som_sim_save(sim);
  }
  var data=sim.add;

  var balance={};
  //raggruppa per anni
  jQuery.each(data, function(k,v){
    if(typeof balance[v.year]==='undefined'){
        balance[v.year]={som_add:0, add:[]};
    }
    v.pos=k;
    balance[v.year].add.push(v);
    balance[v.year].som_add=balance[v.year].som_add+v.som_amount;
  });

  var html='<h3>'+cap_t("Humic Balance")+'</h3><table class="table"><thead><tr><th>'+cap_t("Year")+'</th><th>'+cap_t("Start")+'</th><th>'+cap_t("Input")+'</th><th>'+cap_t("Loss")+'</th><th>'+cap_t("Balance")+'</th><th>'+cap_t("Input Description")+'</th></thead>';

  var som_balance=sim.soil.c_weight;
  var k2=sim.soil.k2;

  jQuery.each(balance, function(k,v){
    var detail="";
    jQuery.each(v.add, function(k2,v2){
      detail+=v2.label+": "+parseFloat(v2.som_amount).toFixed(2)+"<a data-guid='"+sim.guid+"' data-pos='"+v2.pos+"' class='som_sim_delete'><span class='delete glyphicon glyphicon-remove'></span></a><br/>";
    });
    var loss=som_balance*k2/100;
    var saldo=som_balance+v.som_add-loss;
    var classe='alert-danger';
    if((v.som_add-loss)>0){
      classe='alert-success';
    }

    html+="<tr><th>"+k+"</th><td>"+parseFloat(som_balance).toFixed(2)+"</td><td>"+parseFloat(v.som_add).toFixed(2)+"</td><td>"+parseFloat(loss).toFixed(2)+"</td><td class='"+classe+"'>"+parseFloat(saldo).toFixed(2)+"</th><td>"+detail+"</td></th>";
    som_balance=saldo;
  });
  html+='</table>';

  jQuery('#balance').html(html);

  jQuery('#balance .som_sim_delete').click(function(e){
    var el=jQuery(this);
    var guid=el.attr('data-guid');
    var pos=el.attr('data-pos');
    som_sim_delete(guid,pos);
  });
}

function get_sim_som(guid){
  var my_som = jQuery.jStorage.get('my_som');
  var ret=null;
  jQuery.each(my_som, function(k,v){
    if(k==guid){
      ret=v;
    }
  });
  return ret;
}

//Save the sim on jStorage
function som_sim_save(sim){
  var my_som = jQuery.jStorage.get('my_som');
  my_som[sim.guid]=sim;
  sim.saved=false;

  // var found=false;
  // jQuery.each(my_som, function(k,v){
  //   if(k==sim.guid){
  //     my_som[sim.guid]=sim;
  //     found=true;
  //   }
  // });
  // if(!found){
  //   my_som[sim.guid]=sim
  // }
  jQuery.jStorage.set('my_som',my_som);
}

//Create an empty som_sim
function create_som_sim(){
  var data={'guid':Guid.newGuid(), 'soil':{'ok':false}};
  return data;
}



function save_som_online(reinit){
  if(typeof reinit=='undefined'){
    reinit=true;
  }
  var my_som=jQuery.jStorage.get('my_som');
  jQuery('#loading_icon').html('<span class="glyphicon glyphicon-cloud-upload"></span>');

  jQuery('#save_spade_test_info').html(cap_t("We are uploading the SOM on the server"));
    jQuery.ajax({
      'url':global_opt.base_path+'api/som_batch/',
      'method': 'POST',
      'data': JSON.stringify(my_som),
      'dataType': 'JSON',
      'timeout': 10000, // sets timeout to 10 seconds
      'success': function(d){
        jQuery('#loading_icon').html('<span class="glyphicon glyphicon-thumbs-up"></span>');

        var saved=d.data;
        var my_som=jQuery.jStorage.get('my_som');
        jQuery.each(saved,function(k,v){
          console.log(k);
          if(v.ok===true){
            my_som[k].saved=true;
          }
        });
        jQuery.jStorage.set('my_som',my_som);
        jQuery('#save_som_info').html(cap_t("OK"));
        if(reinit){
          init_som_dyn();
        }
      },
      'error':function(e){
        console.log(e);
        jQuery('#loading_icon').html('<span class="glyphicon glyphicon-thumbs-down"></span>');
        if(reinit){
          var msg=cap_t("An error occurred during the data savings. Please check the connection and try again later.");
          alert(msg);
          jQuery('#save_som_info').html(msg);
        }
      }
    });
}
