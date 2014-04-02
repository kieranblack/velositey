// Array Generator - Adobe Photoshop Script
// Description: generates a two-dimensional array by cloning the selected layer; user defines number of rows and columns, as well as the horizontal and vertical spacing
// Requirements: Adobe Photoshop CS, or higher
// Version: 1.0.0, 9/July/2009
// Author: Trevor Morris (trevor@morris-photographics.com)
// Website: http://morris-photographics.com/
// ============================================================================
// Installation:
// 1. Place script in 'C:\Program Files\Adobe\Adobe Photoshop CS#\Presets\Scripts\'
// 2. Restart Photoshop
// 3. Choose File > Scripts > Array Generator
// ============================================================================

// enable double-clicking from Mac Finder or Windows Explorer
// this command only works in Photoshop CS2 and higher
#target photoshop

// bring application forward for double-click events
app.bringToFront();

///////////////////////////////////////////////////////////////////////////////
// main - main function
///////////////////////////////////////////////////////////////////////////////
function main() {
	// initial dialog values
	var dlgValues = new Object();
	dlgValues.numRows = 3; // number of rows in array
	dlgValues.numCols = 3; // number of columns in array
	dlgValues.gapRows = 10; // space between rows
	dlgValues.gapCols = 10; // space between columns

	// declare local variables
	var doc = activeDocument;
	var layer = doc.activeLayer;
	var name = layer.name;
	var bounds = layer.bounds;

	// check if Background layer is selected
	if (layer.isBackgroundLayer) {
		alert("The Background layer can't be used to create an array.", 'Background Layer', false);
		return;
	}
	
	// check if current layer contains artwork
	if (bounds[0] == bounds[2]) {
		alert('The current layer contains no artwork.\n' +
			'Please select another layer and try again.', 'Empty Layer', false);
		return;
	}
	
	// check if a group (layer set) is selected; prompt to use entire group
	if (layer.typename == 'LayerSet' && !confirm('Are you sure you wish to create an array from the selected layer group?', false, 'Center Entire Group?')) {
		return;
	}
	
	// remember layer lock state
	var allLock = layer.allLocked; 
	var posLock = layer.positionLocked;

	// unlock layer
	layer.allLocked = false;
	layer.positionLocked = false;

	// get layer dimensions
	// BUG: both width and height will be off by +2 px for shape layers
	var width = Number(bounds[2] - bounds[0]);
	var height = Number(bounds[3] - bounds[1]);

	// display dialog; continues on OK or Enter key press (OK = 1, Cancel = 2)
	var win = getDialog(dlgValues);
	if (win.show() == 1) {
		// handle rows
		for (var row = 1; row <= dlgValues.numRows; row++) {
			// duplicate across (columns)
			for (var col = 1; col < dlgValues.numCols; col++) {
				var duplicate = doc.activeLayer.duplicate();
				doc.activeLayer = duplicate;
				duplicate.name = name + ' [R' + row + 'C' + (col + 1) + ']';
				duplicate.translate(width + dlgValues.gapCols);
			}

			// duplicate down (rows)
			if (row < dlgValues.numRows) {
				duplicate = layer.duplicate(doc.activeLayer, ElementPlacement.PLACEBEFORE);
				doc.activeLayer = duplicate;
				duplicate.name = name + ' [R' + (row + 1) + 'C1]';
				duplicate.translate(0, row * (height + dlgValues.gapRows));
			}
		}
		// name initial layer
		layer.name = name + ' [R1C1]';
	}

	// restore original lock state
	layer.allLocked = allLock;
	layer.positionLocked = posLock;
}

///////////////////////////////////////////////////////////////////////////////
// getDialog - build Array Generator dialog
///////////////////////////////////////////////////////////////////////////////
function getDialog(dlgValues) {
	// define dialog for Photoshop CS3 (and higher)
	if (parseInt(version, 10) >= 10) {
		var dlg = "dialog {text: 'Array Generator', alignChildren: 'fill', \
			dims: Panel {orientation: 'column', \
				text: 'Array Dimensions', alignChildren: 'right', \
				numRows: Group {orientation: 'row', \
					st: StaticText {text: '&Rows:'}, \
					et: EditText {text: " + dlgValues.numRows + ", characters: 4} \
				}, \
				numCols: Group {orientation: 'row', \
					st: StaticText {text: '&Columns:'}, \
					et: EditText {text: " + dlgValues.numCols + ", characters: 4} \
				} \
			}, \
			gaps: Panel {orientation: 'column', \
				text: 'Array Spacing', alignChildren: 'right', \
				gapRows: Group {orientation: 'row', \
					st: StaticText {text: 'Ro&w Spacing:'}, \
					et: EditText {text: " + dlgValues.gapRows + ", characters: 4} \
				}, \
				gapCols: Group {orientation: 'row', \
					st: StaticText {text: 'Column &Spacing:'}, \
					et: EditText {text: " + dlgValues.gapCols + ", characters: 4} \
				} \
			}, \
			buttons: Group {orientation: 'row', \
				okBtn: Button {text: 'OK', properties: {name: 'ok'}}, \
				cancelBtn: Button {text: 'Cancel', properties: {name: 'cancel'}} \
			} \
		}";
	}
	// define dialog for Photoshop CS2
	else {
		var dlg = "dialog {text: 'Array Generator', alignChildren: 'fill', \
			dims: Panel {orientation: 'column', \
				text: 'Array Dimensions', alignChildren: 'right', \
				numRows: Group {orientation: 'row', \
					st: StaticText {text: 'Rows:'}, \
					et: EditText {text: " + dlgValues.numRows + ", preferredSize: [40, et.preferredSize.height]} \
				}, \
				numCols: Group {orientation: 'row', \
					st: StaticText {text: 'Columns:'}, \
					et: EditText {text: " + dlgValues.numCols + ", preferredSize: [40, et.preferredSize.height]} \
				} \
			}, \
			gaps: Panel {orientation: 'column', \
				text: 'Array Spacing', alignChildren: 'right', \
				gapRows: Group {orientation: 'row', \
					st: StaticText {text: 'Row Spacing:'}, \
					et: EditText {text: " + dlgValues.gapRows + ", preferredSize: [40, et.preferredSize.height]} \
				}, \
				gapCols: Group {orientation: 'row', \
					st: StaticText {text: 'Column Spacing:'}, \
					et: EditText {text: " + dlgValues.gapCols + ", preferredSize: [40, et.preferredSize.height]} \
				} \
			}, \
			buttons: Group {orientation: 'row', \
				okBtn: Button {text: 'OK', properties: {name: 'ok'}}, \
				cancelBtn: Button {text: 'Cancel', properties: {name: 'cancel'}} \
			} \
		}";
	}

	// create dialog
	var win = new Window(dlg);
	win.center();

	// check dialog values
	with (win) {
		// make first field active
		dims.numRows.et.active = true;

		// check number of rows
		dims.numRows.et.onChange = function() {
			this.text = checkValue(this.text, 1, 20);
			dlgValues.numRows = Number(this.text);

			// disable row spacing for a single row
			if (dlgValues.numRows == 1) {
				gaps.gapRows.et.enabled = false;
			}
			// (re)enable row spacing for mulitple rows
			else {
				gaps.gapRows.et.enabled = true;
			}
		}

		// check number of columns
		dims.numCols.et.onChange = function() {
			this.text = checkValue(this.text, 1, 20);
			dlgValues.numCols = Number(this.text);

			// disable column spacing for a single column
			if (dlgValues.numCols == 1) {
				gaps.gapCols.et.enabled = false;
			}
			// (re)enable column spacing for mulitple columns
			else {
				gaps.gapCols.et.enabled = true;
			}
		}

		// check row spacing
		gaps.gapRows.et.onChange = function() {
			this.text = checkValue(this.text, 0, 100);
			dlgValues.gapRows = Number(this.text);
		}

		// check column spacing
		gaps.gapCols.et.onChange = function() {
			this.text = checkValue(this.text, 0, 100);
			dlgValues.gapCols = Number(this.text);
		}
	}
	return win;
}

///////////////////////////////////////////////////////////////////////////////
// checkValue - error-check value on change
///////////////////////////////////////////////////////////////////////////////
function checkValue(dlgValue, min, max) {
	// declare local variables
	var value = Number(dlgValue);

	// ensure value is a valid number greater than or equal to min
	if (isNaN(value) || value < min) {
		value = min;
	}
	// ensure value is less than max
	else if (value > max) {
		value = max;
	}
	// ensure value is an integer
	else if (Math.round(value) != value) {
		value = Math.round(value);
	}
	// value is fine
	else {
		return dlgValue;
	}

	// show error and return correct value
	alert('Please enter an integer between ' + min + ' and ' + max + '.', 'Integer Required', true);
	return value.toString();
}

///////////////////////////////////////////////////////////////////////////////
// isCorrectVersion - check for Adobe Photoshop CS2 (v9) or higher
///////////////////////////////////////////////////////////////////////////////
function isCorrectVersion() {
	if (parseInt(version, 10) >= 9) {
		return true;
	}
	else {
		alert('This script requires Adobe Photoshop CS2 or higher.', 'Wrong Version', false);
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
// isOpenDocs - ensure at least one document is open
///////////////////////////////////////////////////////////////////////////////
function isOpenDocs() {
	if (documents.length) {
		return true;
	}
	else {
		alert('There are no documents open.', 'No Documents Open', false);
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
// showError - display error message if something goes wrong
///////////////////////////////////////////////////////////////////////////////
function showError(err) {
	if (confirm('An unknown error has occurred.\n' +
		'Would you like to see more information?', true, 'Unknown Error')) {
			alert(err + ': on line ' + err.line, 'Script Error', true);
	}
}


// test initial conditions prior to running main function
if (isCorrectVersion() && isOpenDocs()) {
	// remember unit settings; switch to pixels
	var originalRulerUnits = preferences.rulerUnits;
	preferences.rulerUnits = Units.PIXELS;

	try {
		// suspend history for CS3 (v10) or higher
		if (parseInt(version, 10) >= 10) {
			activeDocument.suspendHistory('Array Generator', 'main()');
		}
		// just run main for CS2 (v9)
		else {
			main();
		}
	}
	catch(e) {
		// don't report error on user cancel
		if (e.number != 8007) {
			showError(e);
		}
	}

	// restore original unit setting
	preferences.rulerUnits = originalRulerUnits;
}
