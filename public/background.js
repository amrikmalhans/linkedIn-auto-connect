"use strict";
var color = "#000000";
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: color });
    console.log("Default background color set to %cgreen", "color: " + color);
});
