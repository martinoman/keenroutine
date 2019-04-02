function parseArrival(data){
    let parsed = [];
    for (var i = 0; i < data.length; i++) {
        parsed.push({
            displayTime: data[i].DisplayTime,
            lineNumber: data[i].LineNumber,
            destination: data[i].Destination,
            transportMode: data[i].TransportMode,
        });
    }
    return parsed
}

const modes = ['Buses', 'Metros', 'Ships', 'Trains', 'Trams'];

export function getTimes(data){
    let times = {};
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if(modes.indexOf(key) > -1){ //Is a travel thing :)
                let parsed = parseArrival(data[key])
                times[key] = parsed;
            }
        }
    }
    return times
}
