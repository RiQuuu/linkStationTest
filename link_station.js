/* 
* 
* 4 laitetta jotka ottavat yhteyttä asemiin. 
* x: x-koordinaatti
* y: y-koordinaatti
* p1: teho 1. asemalle
* p2: teho 2. asemalle
* p3: teho 3. asemalle
* station: paras asema laitteelle (x, y -koordinaatteina)
*
*/

var devices = {
	device: [
		{ x: 0, y: 0, p1: 0, p2: 0, p3: 0, station: 0 },
		{ x: 100, y: 100, p1: 0, p2: 0, p3: 0, station: 0 },
		{ x: 15, y: 10, p1: 0, p2: 0, p3: 0, station: 0 },
		{ x: 18, y: 18, p1: 0, p2: 0, p3: 0, station: 0 }
	]
};

/* 
* 
* 3 asemaa joihin laitteet ottavat yhteyttä. 
* x: x-koordinaatti
* y: y-koordinaatti
* r: aseman kantama
*
*/

var stations = {
	station: [
		{ x: 0, y: 0, r: 10 },
		{ x: 20, y: 20, r: 5 },
		{ x: 10, y: 0, r: 12 }
	]
};

/* Laiteet ottavat yksikerrallaan yhteyttä jokaiseen asemaan. */

for (var i = 0, len = devices.device.length; i < len; i++) {

	for (var index = 0, length = stations.station.length; index < length; index++) {

		/* Lasketaan laitteen etäisyys asemaan. */

		var xDistance = devices.device[i].x - stations.station[index].x;
		var yDistance = devices.device[i].y - stations.station[index].y;
		var deviceStationDistance = Math.sqrt( xDistance*xDistance + yDistance*yDistance );
		var power;

		/* Lasketaan laitteen teho asemaan. */

		if(deviceStationDistance > stations.station[index].r) {
			power = 0;
		} else {
			var distance = stations.station[0].r - deviceStationDistance;
			power = Math.pow(distance, 2);
		}

		/* Syötetään jokaisesta asemasta saatu teho laitteen tietoihin */

		switch(index) {
			case 0:
				devices.device[i].p1 = power;
				break;
			case 1:
				devices.device[i].p2 = power;
				break;
			case 2:
				devices.device[i].p3 = power;
				break;
			default:
				break;
		}

	}

	/* Vertaillaan laitteen tehoja asemiin ja valitaan paras */

	var largestPower = Math.max(devices.device[i].p1, devices.device[i].p2, devices.device[i].p3);

	/* Syötetään parhaan aseman koordinaatit laitteen tietoihin */

	if(largestPower == devices.device[i].p1) {
		devices.device[i].station = stations.station[0].x + ", " + stations.station[0].y;
	} else if(largestPower == devices.device[i].p2) {
		devices.device[i].station = stations.station[1].x + ", " + stations.station[1].y;
	} else if(largestPower == devices.device[i].p3) {
		devices.device[i].station = stations.station[2].x + ", " + stations.station[2].y;
	}

	/* Tulostetaan lopputulokset */

	if(largestPower > 0) {
		console.log("Best link station for point " + devices.device[i].x + ", " + devices.device[i].y + " is " + devices.device[i].station + " with power " + largestPower);
	} else {
		console.log("No link station within reach for point " + devices.device[i].x + ", " + devices.device[i].y);
	}

}