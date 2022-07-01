// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
// Runs this code if the plugin is run in Figma
if (figma.editorType === "figma") {
    // Skip over invisible nodes and their descendants inside instances for faster performance
    figma.skipInvisibleInstanceChildren = true;
    // Finds all instance nodes
    const components = figma.currentPage.findAllWithCriteria({
        types: ['INSTANCE']
    });
    // Finds all instance nodes with the name ~spacer
    for (const component of components) {
        if (component.removed === false && component.name.includes("~spacer") && (component.variantProperties)) {
            if (component.variantProperties["Visible"] === "On") {
                component.setProperties({ "Visible": "Off" });
            }
            else {
                component.setProperties({ "Visible": "On" });
            }
        }
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
}
