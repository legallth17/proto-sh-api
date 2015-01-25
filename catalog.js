exports.createDevice = function (type) {
    if( type == 'motion' ) {
        console.log ('creating motion device');
        return {
            type: 'motion', 
            name: '',
            features: [
                {type: 'motion',      security: true, armed: false, alarm: false },
                {type: 'temperature', temperature: 0 },
                {type: 'luminosity',  luminosity:  0 }]
        };
    }
    if( type == 'smoke' ) {
        console.log ('creating smoke device');
        return {
            type: 'smoke', 
            name: '',
            features: [
                {type: 'smoke',       security: true, armed: false, alarm: false },
                {type: 'temperature', temperature: 0 }]
        };
    }
    return undefined;
};
