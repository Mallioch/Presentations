var morphNode = document.getElementById('morph');

function toggleClass(className, node) {
    if (node.className.indexOf(className) > -1) {
        node.className = node.className.replace(className, '');
    }
    else if (node.className.length > 0) {
        node.className += ' ' + className;
    }
    else {
        node.className = className;
    }
}

var previouslySelectedNode;
function toggleSelection(node) {
    if (previouslySelectedNode) {
        toggleClass('selected', previouslySelectedNode);
        previouslySelectedNode = null;
    }

    toggleClass('selected', node);
    previouslySelectedNode = node;
}

function setMorphInfo(normalized, pos, parsing, lexical) {
    console.log('parsing', parsing);
    if (parsing === '????????') {
        morphNode.innerText = 'No parsing info available';
        return;
    }

    morphNode.innerText = normalized + ', ' + pos + ', ' + parsing + ' of ' + lexical;
}
    
function wordTapped(node) {
    var parsing = node.getAttribute('data-parsing');
    var lexical = node.getAttribute('data-lexical');
    var pos = node.getAttribute('data-pos');
    var ref = node.getAttribute('data-ref');
    var normalized = node.getAttribute('data-normalized');
    var text = node.innerText;

    console.log('parsing', parsing);
    console.log('lexical', lexical);
    console.log('pos', pos);
    console.log('ref', ref);
    console.log('normalized', normalized);

    toggleSelection(node);
    setMorphInfo(normalized, pos, parsing, lexical);
}

var spans = document.querySelectorAll('span');

for (var i = 0; i < spans.length; i++) {
    spans[i].addEventListener('click', function() { wordTapped(this); })
    spans[i].addEventListener('touchstart', function(evt) { evt.preventDefault(); wordTapped(this); })

}

morphNode.addEventListener('mousedown', morphMoveStart);
morphNode.addEventListener('mousemove', morphMoveChange);
morphNode.addEventListener('mouseup', morphMoveEnd);
morphNode.addEventListener('mouseout', morphMoveCancel);
morphNode.addEventListener('mouseleave', morphMoveCancel);

morphNode.addEventListener('touchstart', morphMoveStart);
morphNode.addEventListener('touchmove', morphMoveChange);
morphNode.addEventListener('touchend', morphMoveEnd);
morphNode.addEventListener('touchcancel', morphMoveCancel);

morphNode.addEventListener('MSPointerDown', morphMoveStart);
morphNode.addEventListener('MSPointerMove', morphMoveChange);
morphNode.addEventListener('MSPointerUp', morphMoveEnd);
morphNode.addEventListener('MSPointerOut', morphMoveCancel);

var resizeStarted = false;
var startY;
var supplementaryInfoNode = document.getElementById('supplementary-info');
var supplementaryInfoNodeHeight = supplementaryInfoNode.clientHeight;

function morphMoveStart(evt) {
    evt.preventDefault();
    resizeStarted = true;
    startY = evt.pageY
}

function morphMoveChange(evt) {
    if (!resizeStarted)
        return;

    var diff = startY - evt.pageY;

    supplementaryInfoNodeHeight += diff;
    startY = evt.pageY;
    updateSupplementaryInfoNodeHeight();
}

function updateSupplementaryInfoNodeHeight() {
    supplementaryInfoNode.style.height = supplementaryInfoNodeHeight + 'px';
}

function morphMoveEnd(evt) {
    if (!resizeStarted)
        return;
    else
        resizeStarted = false;
}

function morphMoveCancel(evt) {
    resizeStarted = false;
}

window.addEventListener('load', load);

function load() {
    var gesture = new CustomTouch.Tap(morphNode);

    morphNode.addEventListener('tap', tapped);
}

var savedSupplementaryInfoNodeHeight;
var isOpen = true;
function tapped() {

    if (isOpen) {
        isOpen = false;
        savedSupplementaryInfoNodeHeight = supplementaryInfoNodeHeight;
        supplementaryInfoNodeHeight = 50;
    }
    else {
        isOpen = true;
        supplementaryInfoNodeHeight = savedSupplementaryInfoNodeHeight;
    }
    updateSupplementaryInfoNodeHeight();
}
