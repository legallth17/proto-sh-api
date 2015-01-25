var catalog = require("../catalog");

describe("catalog", function() {
describe("createDevice", function () {
  it("should create motion device", function () {
    var device = catalog.createDevice('motion');
    expect(device).toEqual( {
        type: 'motion', 
        name: '',
        features: [
            {type: 'motion',      security: true, armed: false, alarm: false },
            {type: 'temperature', temperature: 0 },
            {type: 'luminosity',  luminosity:  0 }]
        });
  });
  it("should create smoke device", function () {
    var device = catalog.createDevice('smoke');
    expect(device).toEqual( {
        type: 'smoke', 
        name: '',
        features: [
            {type: 'smoke',       security: true, armed: false, alarm: false },
            {type: 'temperature', temperature: 0 }]
        });
  });
  it("should return undefined for unknown type", function () {
    var device = catalog.createDevice('unknown type');
    expect(device).toBe(undefined);
  });
  it("should return undefined when type is not specified", function () {
    var device = catalog.createDevice();
    expect(device).toBe(undefined);
  });
});    
});
