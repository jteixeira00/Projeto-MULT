
function platformsDesign(game){

	var array = [];
	var output = []
	var platforms = game.physics.add.staticGroup();
	var mydata = JSON.parse(data);
	var plat = mydata.plat;
	var portals = mydata.portais;

	const platCount = Object.keys(plat).length;
	const portlCount = Object.keys(portals).length;

	for(var i = 0; i < platCount; i++){
		platforms.create(plat[i].x, plat[i].y, plat[i].sprite);
	}

	for(var i = 0; i < portlCount; i++){
		array.push([portals[i].x, portals[i].y]);
	}



	output[0] = platforms;
	output[1] = array;

    return output;
}