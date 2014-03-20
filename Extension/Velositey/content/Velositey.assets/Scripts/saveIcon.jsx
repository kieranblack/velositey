﻿#target photoshopvar docRef = app.activeDocument;var activeLay = docRef.activeLayer;var psdName = activeLay.name;// vars for centerBothcTID = function(s) { return app.charIDToTypeID(s); };sTID = function(s) { return app.stringIDToTypeID(s); };// get width or heightvar tempWidth = activeLay.bounds[2] - activeLay.bounds[0];var tempHeight = activeLay.bounds[3] - activeLay.bounds[1];// create newDocvar newDoc = app.documents.add(tempWidth,tempHeight,72,psdName, NewDocumentMode.RGB,DocumentFill.TRANSPARENT);app.activeDocument = docRef;//dupLayers(newDocName);dupLayers(psdName);app.activeDocument = newDoc;// centerBothcenterBoth();// savesaveWebPNG();//close docs without savingnewDoc.close (SaveOptions.DONOTSAVECHANGES);docRef.close (SaveOptions.DONOTSAVECHANGES);function centerBoth() {  // Set  function step1(enabled, withDialog) {    if (enabled != undefined && !enabled)      return;    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();    ref1.putProperty(cTID('Chnl'), sTID("selection"));    desc1.putReference(cTID('null'), ref1);    desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('Al  '));    executeAction(cTID('setd'), desc1, dialogMode);  };  // Align  function step2(enabled, withDialog) {    if (enabled != undefined && !enabled)      return;    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));    desc1.putReference(cTID('null'), ref1);    desc1.putEnumerated(cTID('Usng'), cTID('ADSt'), sTID("ADSCentersV"));    executeAction(cTID('Algn'), desc1, dialogMode);  };  // Align  function step3(enabled, withDialog) {    if (enabled != undefined && !enabled)      return;    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));    desc1.putReference(cTID('null'), ref1);    desc1.putEnumerated(cTID('Usng'), cTID('ADSt'), sTID("ADSCentersH"));    executeAction(cTID('Algn'), desc1, dialogMode);  };  // Set  function step4(enabled, withDialog) {    if (enabled != undefined && !enabled)      return;    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);    var desc1 = new ActionDescriptor();    var ref1 = new ActionReference();    ref1.putProperty(cTID('Chnl'), sTID("selection"));    desc1.putReference(cTID('null'), ref1);    desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('None'));    executeAction(cTID('setd'), desc1, dialogMode);  };  step1();      // Set  step2();      // Align  step3();      // Align  step4();      // Set};function dupLayers(aDoc) {  function cTID(s) { return app.charIDToTypeID(s); };    var desc153 = new ActionDescriptor();        var ref61 = new ActionReference();        ref61.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );    desc153.putReference( cTID('null'), ref61 );        var ref62 = new ActionReference();        ref62.putName( cTID('Dcmn'), aDoc );    desc153.putReference( cTID('T   '), ref62 );    desc153.putInteger( cTID('Vrsn'), 2 );    executeAction( cTID('Dplc'), desc153, DialogModes.NO );};function saveWebPNG(){var dialogMode = (DialogModes.ALL);    var desc1 = new ActionDescriptor();    var desc2 = new ActionDescriptor();    desc2.putEnumerated(cTID('Op  '), cTID('SWOp'), cTID('OpSa'));    desc2.putBoolean(cTID('DIDr'), true);    desc2.putPath(cTID('In  '), new File("~/Desktop/File or Folder not found"));    desc2.putEnumerated(cTID('Fmt '), cTID('IRFm'), cTID('PN24'));    desc2.putBoolean(cTID('Intr'), false);    desc2.putBoolean(cTID('Trns'), true);    desc2.putBoolean(cTID('Mtt '), true);    desc2.putInteger(cTID('MttR'), 255);    desc2.putInteger(cTID('MttG'), 255);    desc2.putInteger(cTID('MttB'), 255);    desc2.putBoolean(cTID('SHTM'), false);    desc2.putBoolean(cTID('SImg'), true);    desc2.putEnumerated(cTID('SWsl'), cTID('STsl'), cTID('SLAl'));    desc2.putEnumerated(cTID('SWch'), cTID('STch'), cTID('CHsR'));    desc2.putEnumerated(cTID('SWmd'), cTID('STmd'), cTID('MDCC'));    desc2.putBoolean(cTID('ohXH'), false);    desc2.putBoolean(cTID('ohIC'), true);    desc2.putBoolean(cTID('ohAA'), true);    desc2.putBoolean(cTID('ohQA'), true);    desc2.putBoolean(cTID('ohCA'), false);    desc2.putBoolean(cTID('ohIZ'), true);    desc2.putEnumerated(cTID('ohTC'), cTID('SToc'), cTID('OC03'));    desc2.putEnumerated(cTID('ohAC'), cTID('SToc'), cTID('OC03'));    desc2.putInteger(cTID('ohIn'), -1);    desc2.putEnumerated(cTID('ohLE'), cTID('STle'), cTID('LE03'));    desc2.putEnumerated(cTID('ohEn'), cTID('STen'), cTID('EN00'));    desc2.putBoolean(cTID('olCS'), false);    desc2.putEnumerated(cTID('olEC'), cTID('STst'), cTID('ST00'));    desc2.putEnumerated(cTID('olWH'), cTID('STwh'), cTID('WH01'));    desc2.putEnumerated(cTID('olSV'), cTID('STsp'), cTID('SP04'));    desc2.putEnumerated(cTID('olSH'), cTID('STsp'), cTID('SP04'));    var list1 = new ActionList();    var desc3 = new ActionDescriptor();    desc3.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC00'));    list1.putObject(cTID('SCnc'), desc3);    var desc4 = new ActionDescriptor();    desc4.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));    list1.putObject(cTID('SCnc'), desc4);    var desc5 = new ActionDescriptor();    desc5.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC28'));    list1.putObject(cTID('SCnc'), desc5);    var desc6 = new ActionDescriptor();    desc6.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));    list1.putObject(cTID('SCnc'), desc6);    var desc7 = new ActionDescriptor();    desc7.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));    list1.putObject(cTID('SCnc'), desc7);    var desc8 = new ActionDescriptor();    desc8.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));    list1.putObject(cTID('SCnc'), desc8);    desc2.putList(cTID('olNC'), list1);    desc2.putBoolean(cTID('obIA'), false);    desc2.putString(cTID('obIP'), "");    desc2.putEnumerated(cTID('obCS'), cTID('STcs'), cTID('CS01'));    var list2 = new ActionList();    var desc9 = new ActionDescriptor();    desc9.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC01'));    list2.putObject(cTID('SCnc'), desc9);    var desc10 = new ActionDescriptor();    desc10.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC20'));    list2.putObject(cTID('SCnc'), desc10);    var desc11 = new ActionDescriptor();    desc11.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC02'));    list2.putObject(cTID('SCnc'), desc11);    var desc12 = new ActionDescriptor();    desc12.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));    list2.putObject(cTID('SCnc'), desc12);    var desc13 = new ActionDescriptor();    desc13.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC06'));    list2.putObject(cTID('SCnc'), desc13);    var desc14 = new ActionDescriptor();    desc14.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));    list2.putObject(cTID('SCnc'), desc14);    var desc15 = new ActionDescriptor();    desc15.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));    list2.putObject(cTID('SCnc'), desc15);    var desc16 = new ActionDescriptor();    desc16.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));    list2.putObject(cTID('SCnc'), desc16);    var desc17 = new ActionDescriptor();    desc17.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC22'));    list2.putObject(cTID('SCnc'), desc17);    desc2.putList(cTID('ovNC'), list2);    desc2.putBoolean(cTID('ovCM'), false);    desc2.putBoolean(cTID('ovCW'), false);    desc2.putBoolean(cTID('ovCU'), true);    desc2.putBoolean(cTID('ovSF'), true);    desc2.putBoolean(cTID('ovCB'), true);    desc2.putString(cTID('ovSN'), "images");    desc1.putObject(cTID('Usng'), sTID("SaveForWeb"), desc2);    executeAction(cTID('Expr'), desc1, dialogMode);};