(function(targetedNode) {
  function isOlUl(node) {
    let nType = ["OL", "UL"];
    return nType.indexOf(node.nodeName) > -1;
  }

  function filterNodesByType(node) {
    var counter = isOlUl(node) ? 1 : 0;
    var loop = function(element) {
      do {
        if (isOlUl(element)) {
          // console.log(element.nodeName, 'found', node);
          counter++;
        }
        if (element.hasChildNodes()) {
          loop(element.firstChild);
        }
      } while ((element = element.nextSibling));
    };
    loop(node);
    return {
      node: node,
      target: isOlUl(node.parentNode),
      counter: counter
    };
  }

  function traverseDome(start_element) {
    var arr = [],
      filtered = []; // we can gather elements here
    var loop = function(element) {
      do {
        // we can do something with element
        if (element.nodeType == 1)
          // do not include text nodes
          arr.push({
            element: element,
            nodes: element.hasChildNodes ? element.childNodes.length : 0,
            nodeOfInterest: 0
          });
        if (element.hasChildNodes()) {
          let nestedNode = element.firstChild;
          loop(nestedNode);
          if (isOlUl) {
            filtered.push(filterNodesByType(nestedNode));
          }
        }
      } while ((element = element.nextSibling));
    };
    loop(start_element);

    //loop(start_elem.firstChild); // do not include siblings of start element
    return {
      arr: arr, //debug only
      filtered: filtered
    };
  }
  var max = 0;
  var targetNode = null;
  traverseDome(targetedNode)
    .filtered.filter(n => {
      return n.target;
    })
    .map(t => {
      if (max < t.counter) {
        max = t.counter;
        targetNode = t.node.parentNode;
      }
    });
  max = max > 0 ? max + 1 : max;
  console.log("max is", max, "for ", targetedNode);
  return max;
})(document.getElementById("x"));
