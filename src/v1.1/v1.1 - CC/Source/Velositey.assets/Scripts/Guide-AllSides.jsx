﻿#include AddGuide.jsxvar activeLay = activeDocument.activeLayer;var guideHorizontalArray = new Array(activeLay.bounds[1],activeLay.bounds[3]);createHorizontalGuides();var guideVerticalArray = new Array(activeLay.bounds[0],activeLay.bounds[2]);createVerticalGuides();