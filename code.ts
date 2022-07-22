// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

// Runs this code if the plugin is run in Figma
if (figma.editorType === "figma") {

   // Gets array of all spacer Ids
   
   const savedIds = JSON.parse(figma.root.getPluginData('allSpacerIds'))

  if (figma.command === "find") {

    // Skip over invisible nodes and their descendants inside instances for faster performance
    figma.skipInvisibleInstanceChildren = true

    // Gets all instance nodes
    const components = figma.root.findAllWithCriteria({
      types: ['INSTANCE']
    })

    // Filters in only nodes which include '~spacer' in name
    const spacers = components.filter(style => style.name.includes('~spacer'));

    // Creates array of just the spacer IDs
    const spacerIds = spacers.map(style => style.id);

    // Saves all spacer Ids to plugin data
    figma.root.setPluginData('allSpacerIds', JSON.stringify(spacerIds))

  }
  //————————————————————————————————————————————————————————————————————————

  if (figma.command === "toggle") {

    const allNodes = savedIds.map(spacerIds => figma.getNodeById(spacerIds))

    for (const oneNode of allNodes as InstanceNode[]) {

      let makeVisible;
      if (oneNode.variantProperties["Visible"] === "Off") {
        makeVisible = "On"
      } else {
        makeVisible = "Off"
      }
      oneNode.setProperties({"Visible":`${makeVisible}`})
  }
  } 

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
}