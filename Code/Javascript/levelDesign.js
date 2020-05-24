function platformsDesign(game,level){

	var array = [];
	var output = [];
	var platforms = [];
	if(level == 1)
		var mydata = JSON.parse(lvl1);
	else if(level == 2)
		var mydata = JSON.parse(lvl2);
	var plat = mydata.plat;
	var portals = mydata.portais;

	const platCount = Object.keys(plat).length;
	const portlCount = Object.keys(portals).length;

	for(var i = 0; i < platCount; i++){
		platforms.push([plat[i].x, plat[i].y, plat[i].sprite]);
	}

	for(var i = 0; i < portlCount; i++){
		array.push([portals[i].x, portals[i].y]);
	}



	output[0] = platforms;
	output[1] = array;
	output[2] = mydata.dStart;
	output[3] = mydata.dGrowth;
	output[4] = mydata.waveNumber;
	output[5] = mydata.Objx;
	output[6] = mydata.Objy;
	output[7] = mydata.Objw;
	output[8] = mydata.Objh;
	output[9] = mydata.background;

	

    return output;
}