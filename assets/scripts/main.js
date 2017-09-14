//tabIDString should be 'tab#' where # is the number of the tab
var allTabs = document.getElementsByClassName("project-tab");

var tabOrderObj = {};
var tabOrderArr = [];
var tabOpenedToObj = {};

for (let i = 0; i < allTabs.length; i++) {
  tabOrderObj[allTabs[i].id] = i;
  tabOrderArr.push(allTabs[i].id);
}

function convertPxString (pixelString) {
  if (pixelString.includes('.')) {
    return parseFloat(pixelString.slice(0, pixelString.length - 2));
  } else {
    return parseInt(pixelString.slice(0, pixelString.length - 2));
  }
}

function openTab (tabIDString, amountToOpenPx = 2000, tabOpenedToPxObj = tabOpenedToObj, pxPer = 5, intervalLength = 5) {
  let tabStyle = document.getElementById(tabIDString).style;
  let offset = 0;
  let pastVal = 0;
  let open = setInterval(moveDown, intervalLength);
  function moveDown () {
    console.log(offset);
    if (convertPxString(tabStyle.bottom) <= -amountToOpenPx) {
      clearInterval(open);
    } else {
      offset -= pxPer;
      pastVal = offset;
      tabStyle.bottom = offset.toString() + 'px';
    }
    tabOpenedToPxObj[tabIDString] = offset;
  }
}

function closeTab (tabIDString, tabOpenedToPxObj = tabOpenedToObj, pxPer = 5, intervalLength = 5) {
  let tabStyle = document.getElementById(tabIDString).style;
  let offset = tabOpenedToPxObj[tabIDString];
  let close = setInterval(moveUp, intervalLength);
  function moveUp () {
    if (convertPxString(tabStyle.bottom) >= 0) {
      offset = 0;
      clearInterval(close);
    } else {
      offset += pxPer;
      tabStyle.bottom = offset.toString() + 'px';
    }
    tabOpenedToPxObj[tabIDString] = offset;
  }
}
