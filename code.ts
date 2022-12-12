// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

// Runs this code if the plugin is run in Figma
if (figma.editorType === "figma") {

  //Skip over invisible nodes and their descendants inside instances for faster performance
  figma.skipInvisibleInstanceChildren = true;

const spacers = []
const selection = figma.currentPage.selection.filter(
  node => node.children
);
selection.forEach(node => {
spacers.push(...node.findAllWithCriteria({types: ['INSTANCE']}).filter(node => node.name.includes("~spacer")))
});

  // create arrays for on and off spacers
  const spacersOn = [];
  const spacersOff = [];

  // for each spacer in spacers array
  for (const spacer of spacers) {
    // check if "Visible" === "On"
    if (spacer.variantProperties["Visible"] === "On") {
      // if true, send to spacersOn array
      spacersOn.push(spacer);
    } 
    // else, send to spacersOff array
    else {
      spacersOff.push(spacer);
    }
    // if spacersOff array length === 0, run through each node in spacersOn and turn Visible to Off
    if (spacersOff.length === 0) {
      for (const onSpacer of spacersOn) {
        onSpacer.setProperties({"Visible" : "Off"});
      }
    }
    // else, run through each node in spacersOff and turn Visible to On
    else {
      for (const offSpacer of spacersOff) {
        offSpacer.setProperties({"Visible" : "On"});
      }
    }
  }
  
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
}