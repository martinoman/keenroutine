
export function filterWeirdWalks(trip){
    if(trip)
        return trip.filter( leg => !leg.travelMode.hide);
    return null;
}

export function formatLocationData(leg, i){
    let origin = leg.Origin;
    let destination = leg.Destination;
    return{
        leg: i,
        origin: {
            name: origin.name,
            type: origin.type
        },
        destination: {
            name: destination.name,
            type: destination.type
        },
    }
}

export function formatTravelData(leg){
    let depTime = leg.Origin.rtTime;
    depTime = depTime === undefined  ? leg.Origin.time : depTime;
    let arrTime = leg.Destination.rtTime;
    arrTime = arrTime === undefined  ? leg.Destination.time : arrTime;
    return{
        type: leg.type,
        distance: leg.dist,
        departure: depTime,
        arrival: arrTime,
        name: leg.name,
        direction: leg.direction,
        hide: leg.hide, //Shitty walks .i.e. ropsten -> ropsten 2 minutes
    }
}

export function findAndParseTrip(data, depLimit){
    for (var i = 0; i < data.Trip.length; i++) {
        let legs = data.Trip[i].LegList.Leg;
        let trip = [];
        for (var j = 0; j < legs.length; j++) {
            let leg = formatLocationData(legs[j],j)
            leg.travelMode = formatTravelData(legs[j]);
            trip.push(leg);
        }
        if(tripTimes(trip).timeUntilDeparture > depLimit)
            return trip;
    }
}

export function parseTimeString(string){
    let time = new Date(Date.now());
    let parts = string.split(":");
    time.setHours(parts[0]);
    time.setMinutes(parts[1]);
    time.setSeconds(parts[2]);
    return time;
}

export function tripTimes(trip){
    if(!trip)
        return null;
    let departureTime = parseTimeString(trip[0].travelMode.departure);
    let arrivalTime = parseTimeString(trip[trip.length-1].travelMode.arrival);
    let travelTime = (arrivalTime - departureTime)/60000; //Divided by millis in a minute
    let timeUntilDeparture = ((departureTime - (Date.now()))/60000);
    return ({
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        travelTime: travelTime,
        timeUntilDeparture: timeUntilDeparture,
    });
}
