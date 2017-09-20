
library(jsonlite)
library("SoilR")

rothc <- function(obj){
  opt=fromJSON(obj);

  clay=opt$clay                #Percent clay
  num_year=opt$num_year        #Number of Year for the simulation
  if(is.null(num_year)){
    num_year=20;
  }
  SOM=opt$SOM        #Stating SOM
  if(is.null(SOM)){
    SOM=0.02;
  }
  Cinputs=opt$Cinputs          #Annual C inputs to soil in Mg/ha/yr
  if(is.null(Cinputs)){
    Cinputs=0;
  }
  bulk_density=opt$bulk_density #needed to calcolate the SOC in Mg/ha
  if(is.null(bulk_density)){
    bulk_density=1.5;
  }
  soil_thick=opt$soil_thick #Soil thickness (organic layer topsoil), in cm
  if(is.null(soil_thick)){
    soil_thick=25;
  }

  SOC=opt$SOC #SOIL CARBON in ton/ha (if exists)
  weight_soil=(10000*(soil_thick/100))*bulk_density
  if(is.null(SOC)){
    #parameters
    SOC=SOM*weight_soil;
  }

  #load the weather data


  temp_or=opt$temp #Montly temperature (°C)
  if(is.null(temp_or)){
    temp_or=c(-0.4, 0.3, 4.2, 8.3, 13.0, 15.9,18.0, 17.5, 13.4, 8.7, 3.9,  0.6);
  }
  precip_or=opt$precip #Montly precipitation (mm)
  if(is.null(precip_or)){
    precip_or=c(49, 39, 44, 41, 61, 58, 71, 58, 51,48, 50, 58);
  }
  evap_or=opt$evap #Evapotraspiration (mm)
  if(is.null(evap_or)){
    evap_or=c(12, 18, 35, 58, 82, 90, 97, 84, 54, 31,14, 10);
  }

  Temp=data.frame(Month=1:12, Temp=temp_or)
  Precip=data.frame(Month=1:12, Precip=precip_or)
  Evp=data.frame(Month=1:12, Evp=evap_or)

  #years in the future
  years=seq(1/12,num_year,by=1/12)


  #calculate the climatic effects for temperature and humidity
  fT=fT.RothC(Temp[,2]) #Temperature effects per month
  fW=fW.RothC(P=(Precip[,2]), E=(Evp[,2]),
                S.Thick = soil_thick, pClay = clay,
                pE = 1.0, bare = FALSE)$b #Moisture effects per month
  xi.frame=data.frame(years,rep(fT*fW,length.out=length(years)))


  #Calculate Inert Organic Matter
  FallIOM=0.049*SOC^(1.139) #IOM using Falloon method

  #we need the initial carbon pool (distribution of carbon)

  #"Empty" carbon pool -> to run a 500 years simulation to calculate the equilibrium condition
  carbonPool=c(DPM=0, RPM=0, BIO=0, HUM=0, IOM=FallIOM)

  #use the pedotransfer function Weihermueller et al. (2013)
  RPMptf=(0.184*SOC + 0.1555) *(clay + 1.275)^(-0.1158)
  HUMptf=(0.7148*SOC + 0.5069)*(clay + 0.3421)^(0.0184)
  BIOptf=(0.014*SOC + 0.0075) *(clay + 8.8473)^(0.0567)
  DPMptf=SOC-FallIOM-RPMptf-HUMptf-BIOptf
  carbonPool=c(DPM=DPMptf, RPM=RPMptf, BIO=BIOptf, HUM=HUMptf, IOM=FallIOM)
  #print("PoolSize START")
  #print(carbonPool)


  #Run the model
  Model1=RothCModel(t=years,C0=carbonPool, In=Cinputs, clay=clay, xi=xi.frame) #Loads the model
  Ct1=getC(Model1) #Calculates stocks for each pool per month

  #Chart IT
  #matplot(years, Ct1, type="l", lty=1, col=1:5, xlab="Time (years)", ylab="C stocks (Mg/ha)")
  #legend("topleft", c("DPM", "RPM", "BIO", "HUM", "IOM"), lty=1, col=1:5, bty="n")


  #get the result
  poolSize1=as.numeric(tail(Ct1,1))
  names(poolSize1)<-c("DPM", "RPM", "BIO", "HUM", "IOM")
  SOC_end=sum(poolSize1);

  #print(paste("THE starting SOM is ",(100*SOM),"% the SOC is ",SOC,"q/ha",sep=""))
  #print(paste("After ",num_year,"year using ",Cinputs,"t/ha year of organic matter the SOM is ",100*(SOC_end/weight_soil),"% the SOC is ",SOC_end,"q/ha",sep=""))

  res=paste('{"SOC":',SOC_end, sep="");
  res=addJSON(res,"SOM",100*(SOC_end/weight_soil));
  res=addJSON(res,"poolSize",poolSize1);
  res=addJSON(res,"hist",Ct1);



  res=paste(res,'}',sep="");
  #res='{}'
  return(res)
}


addJSON <- function(res,var, val){
  res=paste(res,',"',var,'":',toJSON(val,auto_unbox=TRUE),'',sep="");
  return(res);
}
