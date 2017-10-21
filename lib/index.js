'use strict';

var Cesium = require('cesium');
var cesiumTerrainProviderUrl = 'http://assets.agi.com/stk-terrain/world/';




function sample(data, callback) {



  var positions = []


  data.map(function (pix) {
    positions.push(pix.coor);


  })


  var tp = new Cesium.CesiumTerrainProvider({
    url: cesiumTerrainProviderUrl
  });

  
  var sampleTerrain = Cesium.sampleTerrainMostDetailed(tp, positions);

  sampleTerrain.then(function () {


    data.map(function (i) {
      data.coor = positions[i];


    })

    positions = null;
    return callback(null, data);
  }).otherwise(function (e) {
    return callback(e);
  });
}

module.exports = {
  sample: sample
};