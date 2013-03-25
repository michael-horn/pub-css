/*
 * pub-css
 *
 * Created by: Michael S. Horn (michael-horn@northwestern.edu)
 * Updated: March 21, 2013
 */
    
// Map linking reference id to enumeration
var REFERENCES = { };


/*
 * Show article citation
 */
function showHideFullCitation() {
   var el = document.getElementById("citation");
   if (el) {
      if (el.style.opacity == "0.9") {
         el.style.opacity = "0";
      } else {
         el.style.opacity = "0.9";
      }
   }
}


/*
 * Show inline reference popup
 */
function showRef(e) {
   var id = e.target.attributes['ref'].value;
   var ref = document.getElementById(id);
   var details = document.getElementById("reference-details");
   if (ref && details) {
      details.innerHTML = ref.innerHTML;
      details.style.opacity = "0.9";
   }
   e.target.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
}


/*
 * Hide inline reference popup
 */
function hideRef(e) {
   var details = document.getElementById("reference-details");
   if (details) details.style.opacity = "0";
   e.target.style.backgroundColor = "rgba(255, 255, 255, 0)";
}


/*
 * Populate references enumeration and insert reference numbers into
 * <cite> tags.
 */
function generateReferenceList() {
   var lists = document.getElementsByClassName("references");
   var index = 0;
   for (var l=0; l < lists.length; l++) {
      var list = lists[l];
      if (!list) return;
      var items = list.childNodes;
      for (var i=0; i < items.length; i++) {
         if (items[i].nodeName == "LI") {
            index++;
            if (items[i].id) {
               REFERENCES[items[i].id] = index;
            }
         }
      }
   }
   var cites = document.getElementsByTagName("cite");
   for (var j=0; j < cites.length; j++) {
      var cite = cites[j];
      var tag = cite.attributes['ref'].value;
      if (REFERENCES[tag]) {
         cite.innerHTML = REFERENCES[tag];
      }
      cite.onmouseover = showRef;
      cite.onmouseout = hideRef;
   }
}
