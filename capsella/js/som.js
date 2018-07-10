
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
  else{
    //TODO: lancia la simulazione con il primo..
    run_som_sim(my_som[Object.keys(my_som)[0]]);

    var tools="<div class='row'><div class='col-xs-9'><select id='choose_som' class='form-control'>";
      jQuery.each(my_som, function(k,v){
        tools+="<option value='"+k+"'>"+v.name+"</option>";
      });
      tools+="</select></div>";
      tools+="<div class='col-xs-3 '><a onClick='add_som_sim()' class=' btn btn-sm btn-default'>"+cap_t("Add a simulation")+"</a></div>";
    tools+="</div>";
    jQuery('#som_tools').html(tools);
    jQuery('#som_tools #choose_som').change(function(){
      var sel_guid=jQuery(this).val();
      var sim= get_sim_som(sel_guid);
      run_som_sim(sim);
    });

  }
  jQuery.jStorage.set('my_som',my_som);
}

function add_som_sim(){
  var sim=create_som_sim();
  som_sim_save(sim);
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
  html+="<div class='form-group col-sm-12'><label for='sim_name'>"+cap_t("Simulation Name")+"</label><input id='sim_name' class='form-control' value=''/></div>";

  html+="<h3>"+cap_t("Soil condition")+"</h3>";
  // html+="<div id='sh_wait_soil' class='alert alert-warning'>"+cap_t("We are loading the soil data from the SoilGrids database...")+"</div>";
  html+="<div class='row'>";
  html+="<div class='form-group col-sm-3'><label for='clay_content'>"+cap_t("Clay")+"</label><input id='clay_content' class='form-control' value=''/></div>";
  html+="<div class='form-group col-sm-3'><label for='sand_content'>"+cap_t("Sand")+"</label><input id='sand_content' class='form-control' value=''/></div>";
  html+="<div class='form-group col-sm-3'><label for='organic_content'>"+cap_t("Soil Organic Matter")+"</label><input id='organic_content' class='form-control' value=''/></div>";
  html+="<div class='form-group col-sm-3'><label for='bulk_density'>"+cap_t("Bulk Density")+"</label><input id='bulk_density' class='form-control' value=''/></div>";
  html+="</div>";

  html+="<div class='col-sm-12 text-center'><button id='start_som' class='btn btn-info btn-lg'>"+cap_t("Simulate Soil Organic Matter trend")+"</button></div>";

  jQuery('#som_home').html(html);

  jQuery('#start_som').click(function(){
    sim=get_soil_data(sim);
    som_sim_save(sim);
    som_sim_manage(sim);
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
    html+="<div><h3>Dettaglio</h3>";
    html+="<b>Sostanza Organica (%)</>: "+sim.soil.som+"<br/>";
    html+="<b>Densità (m3/m3)</>: "+sim.soil.bulk_density+"<br/>";
    html+="<b>Profondità (m)</>: "+sim.soil.depth+"<br/>";
    html+="<b>Peso terreno(t/ha)</>: "+sim.soil.soil_weight+"<br/>";
    html+="<b>Peso SOM(t/ha)</>: "+parseFloat(sim.soil.c_weight).toFixed(2)+"<br/>";
    html+="<b>K2 Tasso di mineralizzazione (k2, %)</>: "+sim.soil.k2+"<br/>";
    html+="<b>Perdita per mineralizzazione</>: "+parseFloat(sim.soil.c_weight*sim.soil.k2/100).toFixed(2)+"<br/>";
    html+="</div>";

    html+="<div id='balance'></div>";



    html+="<h3>Aggiungi un apporto</h3>";
    html+="<div class='form-group '><label for='presel_group'>"+cap_t("Group of Organic Matter")+"</label><select id='presel_group' class='form-control'></select></div>";
    html+="<div class='form-group '><label for='presel'>"+cap_t("Specific Type")+"</label><select id='presel' class='form-control'></select></div>";
    html+="<div class='form-group '><label for='label'>"+cap_t("Description")+"</label><input id='label' class='form-control' value=''/></div>";
    html+="<div class='form-group '><label for='year'>"+cap_t("Year")+"</label><input id='year' type='number' class='form-control' value=''/></div>";
    html+="<div class='form-group '><label for='quantity'>"+cap_t("Quantity (t/ha)")+"</label><input type='number' id='quantity' class='form-control' value=''/></div>";
    html+="<div class='form-group '><label for='dry_matter'>"+cap_t("Organic Matter over total amount (%)")+"</label><input type='number' id='dry_matter' class='form-control' value=''/></div>";
    html+="<div class='form-group '><label for='humic_coeff'>"+cap_t("Iso-Humic Coefficient (%)")+"</label><input type='number' id='humic_coeff' class='form-control' value=''/></div>";
    html+="<a id='som_sim_add' class='btn btn-block btn-default'>"+cap_t("Add")+"</a>";


    jQuery('#som_home').html(html);
    jQuery('#som_sim_add').click(function(){
        som_sim_add(sim.guid);
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

  var html='<h3>Bilancio</h3><table class="table"><thead><tr><th>Anno</th><th>Inizio</th><th>Apporti</th><th>Perdite</th><th>Saldo</th><th>Apporto descrizione</th></thead>';

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
