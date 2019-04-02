
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
    return{
        type: leg.type,
        distance: leg.dist,
        departure: leg.Origin.time,
        arrival: leg.Destination.time,
        name: leg.name,
        direction: leg.direction
    }
}

export function formatData(data){
    let legs = data.Trip[0].LegList.Leg;
    let trip = [];
    for (var i = 0; i < legs.length; i++) {
        let leg = formatLocationData(legs[i],i)
        leg.travelMode = formatTravelData(legs[i]);
        trip.push(leg);
    }
    return trip;
}
