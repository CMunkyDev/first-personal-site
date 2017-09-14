//tabIDString should be 'tab#' where # is the number of the tab
var allTabs = document.getElementsByClassName("project-tab");
var allHeaders = document.getElementsByClassName("tab-header");

// for (let i  = 0; i < allTabs.length; i++) {
//   allHeaders[i] = allTabs[i].querySelector('.tab-header');
// }

var tabOrderObj = {};
var tabOrderArr = [];
var tabOpenedToObj = {};
var tabHeightObj = {};
var open;
var close;

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

function tabBottomPos (tabIDString, tabOpenedToPxObj = tabOpenedToObj) {
  let returnVal = tabOpenedToPxObj[tabIDString];
  if (returnVal === undefined) {
    return 0;
  } else {
    return returnVal;
  }
}

function openTab (tabIDString, amountToOpenPx = 2000, tabOpenedToPxObj = tabOpenedToObj, pxPer = 10, intervalLength = 10) {
  clearInterval(close);
  clearInterval(open);
  let tabStyle = document.getElementById(tabIDString).style;
  let offset = tabBottomPos(tabIDString, tabOpenedToPxObj);
  open = setInterval(moveDown, intervalLength);
  function moveDown () {
    if (convertPxString(tabStyle.bottom) <= -amountToOpenPx) {
      let offset = 0;
      clearInterval(open);
    } else {
      offset -= pxPer;
      tabStyle.bottom = offset.toString() + 'px';
    }
    tabOpenedToPxObj[tabIDString] = offset;
  }
}

function closeTab (tabIDString, tabOpenedToPxObj = tabOpenedToObj, pxPer = 10, intervalLength = 10) {
  clearInterval(open);
  clearInterval(close);
  let tabStyle = document.getElementById(tabIDString).style;
  let offset = tabBottomPos(tabIDString, tabOpenedToPxObj);
  close = setInterval(moveUp, intervalLength);
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

function openCloseDecide (tabIDString, tabOpenedToPxObj = tabOpenedToObj) {
  tabBottomPos(tabIDString, tabOpenedToPxObj) ? closeTab(tabIDString) : openTab(tabIDString);
}

for (let i = 0; i < allHeaders.length; i++) {
  allHeaders[i].addEventListener('click', function (event) {
    openCloseDecide(event.target.parentNode.id, tabOpenedToObj);
  })
}
