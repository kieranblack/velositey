﻿var doc = app.activeDocument;Stdlib = {};var allFonts = new Array();Stdlib.traverseLayers = function(doc, ftn, reverse, layerSets) {  function _traverse(doc, layers, ftn, reverse, layerSets) {    var ok = true;    for (var i = 1; i <= layers.length && ok != false; i++) {      var index = (reverse == true) ? layers.length-i : i - 1;      var layer = layers[index];      if (layer.typename == "LayerSet") {        if (layerSets) {          ok = ftn(doc, layer);        }        if (ok) {          ok = _traverse(doc, layer.layers, ftn, reverse, layerSets);        }      } else {        ok = ftn(doc, layer);        try {          if (app.activeDocument != doc) {            app.activeDocument = doc;          }        } catch (e) {        }      }    }    return ok;  };  return _traverse(doc, doc.layers, ftn, reverse, layerSets);};Stdlib.getLayersList = function(doc, reverse, layerSets) {  function _ftn(doc, layer) {    _ftn.list.push(layer);    return true;  };  _ftn.list = [];  Stdlib.traverseLayers(doc, _ftn, reverse, layerSets);  var lst = _ftn.list;  _ftn.list = undefined;  return lst;};var layers = Stdlib.getLayersList(doc, false, true);for(var i = 0; i < layers.length; i++) {   var layer = layers[i];    if(layer.kind == LayerKind.TEXT){        allFonts.push(layer.textItem.font);    }}var cleanFonts = unique(allFonts);////////var listAllFonts = new Array ();//listAllFonts.push("All fonts\n");for(i=0;i<layers.length;i++){    app[cleanFonts[i]] = new Array();    app[cleanFonts[i]].push("Font Name:\t" + cleanFonts[i]);    for(j=0;j<layers.length;j++){        if(layers[j].kind == LayerKind.TEXT){            if(layers[j].textItem.font==cleanFonts[i]){                app[cleanFonts[i]].push("Layer Name:\t" + layers[j].name);            }        }    }     listAllFonts.push(app[cleanFonts[i]].join('\n') + "\n\n");}if(cleanFonts.length >= 5){    alert("There are " + cleanFonts.length + " fonts. That's too many, brah!\n" + listAllFonts.slice(0,cleanFonts.length).join(''));}else{    alert("You're all sweet, brah!")}function unique(origArr) {    var newArr = [],        origLen = origArr.length,        found,        x, y;     for ( x = 0; x < origLen; x++ ) {        found = undefined;        for ( y = 0; y < newArr.length; y++ ) {            if ( origArr[x] === newArr[y] ) {               found = true;              break;            }        }        if ( !found) newArr.push( origArr[x] );        }   return newArr;}