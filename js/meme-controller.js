'use strict'

const LINE_WIDTH = '2';
const LINE_MOVE_SPEED = 2;
const LINE_BACKGROUND_COLOR = '#e3e3e3';


var gCanvas;
var gCtx;
var gImg;
var gUserTextPref = { font: 'IMPACT', size: 30, align: 'center', color: 'white' };
var gDefaultLine = {
    x: 0,
    y: 0,
    font: gUserTextPref.font,
    txt: ' ',
    size: gUserTextPref.size,
    align: gUserTextPref.align,
    color: gUserTextPref.color
}
var gInterval;
var gIsMousePrOnLine = false;
var gLineForDragIdx;

function openMemePage(id) {
    renderCanvas(id);
}

function renderCanvas(id) {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    createMeme(id);
    gImg = new Image();
    gImg.src = getImgUrl();
    drawImg();
}

function drawImg() {
    gImg.onload = () => {
        //gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        _scaleToFill(gImg)
    }
}

function onTextInput() {
    _scaleToFill(gImg);
    const linesCount = getLinesCount();

    if (linesCount === 0) {
        const txt = document.querySelector('#text-input').value;
        gDefaultLine.txt = txt;
        gDefaultLine.x = gCanvas.width / 2;
        gDefaultLine.y = gCanvas.height / 10;
        creatNewLine(gDefaultLine);
        drawAllLinesOnCanvas();
        return;
    }
    const txt = document.querySelector('#text-input').value;
    editCurrLineByKey('txt', txt);
    drawAllLinesOnCanvas();
}

function onAddLine() {

    let startCoord = {};
    const linesCount = getLinesCount();
    switch (linesCount) {
        case 1:
            startCoord.x = gCanvas.width / 2;
            startCoord.y = (gCanvas.height / 10) * 9;
            break;
        default:
            startCoord.x = gCanvas.width / 2;
            startCoord.y = gCanvas.height / 2;
            break;
    }
    let lineObj = gDefaultLine;
    lineObj.x = startCoord.x;
    lineObj.y = startCoord.y;
    creatNewLine(lineObj);
    document.querySelector('#text-input').value = '';
}

function onDeleteLine() {
    deleteCurrLine();
    drawAllLinesOnCanvas();
    document.querySelector('#text-input').value = (getCurrLineObj()) ? getCurrLineObj().txt : '';
}

function drawAllLinesOnCanvas() {
    _scaleToFill(gImg);
    const lines = getLines();
    drawBackGround();
    for (let i = 0; i < lines.length; i++) {
        const lineObj = lines[i];
        gCtx.lineWidth = LINE_WIDTH;
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = lineObj.color;
        gCtx.font = `${lineObj.size}px ${lineObj.font}`;
        gCtx.textAlign = lineObj.align;
        gCtx.fillText(lineObj.txt, lineObj.x, lineObj.y);
        gCtx.strokeText(lineObj.txt, lineObj.x, lineObj.y);
    }
}


function drawBackGround() {

    const lineObj = getCurrLineObj();
    if (!lineObj || lineObj.txt.length === 0) return
    gCtx.font = `${lineObj.size}px ${lineObj.font}`;
    const lineTextMetr = gCtx.measureText(lineObj.txt);
    switch (lineObj.align) {
        case 'left':
            var x = lineObj.x - 5;
            break;
        case 'center':
            var x = lineObj.x - lineTextMetr.width / 2 - 5;
            break;
        case 'right':
            var x = lineObj.x - lineTextMetr.width - 5;
            break;

        default:
            break;
    }
    let y = lineObj.y - lineTextMetr.actualBoundingBoxAscent - 5;
    let width = lineTextMetr.width + 10;
    let height = lineTextMetr.actualBoundingBoxAscent + 10;
    gCtx.beginPath();
    gCtx.rect(x, y, width, height);
    gCtx.strokeStyle = LINE_BACKGROUND_COLOR;
    gCtx.stroke();
    gCtx.fillStyle = LINE_BACKGROUND_COLOR;
    gCtx.globalAlpha = 0.2;
    gCtx.fillRect(x, y, width, height);
    gCtx.globalAlpha = 1.0;
}

function onFontSizeChange(delta) {
    changeFont(delta);
    gInterval = setInterval(changeFont, 100, delta)
}

function onFontSizeChangeStop() {
    clearInterval(gInterval);
}


function changeFont(delta) {
    const lineObj = getCurrLineObj();
    editCurrLineByKey('size', lineObj.size + delta);
    _scaleToFill(gImg);
    drawAllLinesOnCanvas();
    //TODO - stop then off canvas
}


function onMoveLine(delta) {
    delta *= LINE_MOVE_SPEED;
    moveLine(delta);
    gInterval = setInterval(moveLine, 100, delta)

}

function moveLine(delta) {
    const lineObj = getCurrLineObj();
    editCurrLineByKey('y', lineObj.y + delta);
    _scaleToFill(gImg);
    drawAllLinesOnCanvas();
    gUserTextPref.y + delta;
}

function onMoveLineStop() {
    clearInterval(gInterval);

}

function onTouchStart(ev) {
    const lines = getLines();
    if (lines.length === 0) return;

    const { offsetX, offsetY } = ev;

    const touchedLine = lines.findIndex(element => {
        const lineObj = element;
        gCtx.font = `${lineObj.size}px ${lineObj.font}`;
        const lineTextMetr = gCtx.measureText(lineObj.txt);
        switch (lineObj.align) {
            case 'left':
                var x = lineObj.x - 5;
                break;
            case 'center':
                var x = lineObj.x - lineTextMetr.width / 2 - 5;
                break;
            case 'right':
                var x = lineObj.x - lineTextMetr.width - 5;
                break;

            default:
                break;
        }
        let y = lineObj.y - lineTextMetr.actualBoundingBoxAscent - 5;
        let width = lineTextMetr.width + 10;
        let height = lineTextMetr.actualBoundingBoxAscent + 10;
        return ((offsetX >= x && offsetX <= (x + width)) && (offsetY >= y && offsetY <= (y + height)))
    })
    if (touchedLine !== -1) {
        gIsMousePrOnLine = true;
        gLineForDragIdx = touchedLine;
        editLineAtIdxByKey(gLineForDragIdx, 'align', 'center')
    }

}

function onTouchMove(ev) {
    if (gIsMousePrOnLine) {
        const { offsetX, offsetY } = ev;
        const lines = getLines();
        editLineAtIdxByKey(gLineForDragIdx, 'x', offsetX);
        editLineAtIdxByKey(gLineForDragIdx, 'y', offsetY);
        drawAllLinesOnCanvas();
    }

}

function onTouchEnd(ev) {

    gIsMousePrOnLine = false;
}

function onChangeAlign(alignment) {
    const lineObj = getCurrLineObj();
    gCtx.font = `${lineObj.size}px ${lineObj.font}`;
    const txtWidth = gCtx.measureText(lineObj.txt).width;
    switch (alignment) {
        case 'left':
            editCurrLineByKey('x', 20);
            editCurrLineByKey('align', 'left');
            break;
        case 'center':
            editCurrLineByKey('x', gCanvas.width / 2);
            editCurrLineByKey('align', 'center');
            break;
        case 'right':
            editCurrLineByKey('x', gCanvas.width - 20);
            editCurrLineByKey('align', 'right');
            break;
        default:
            break;
    }
    drawAllLinesOnCanvas();
}

function onSwitchLine() {
    switchLine();
    drawAllLinesOnCanvas();
    document.querySelector('#text-input').value = getCurrLineObj().txt;
}

function _scaleToFill(img) {
    // get the scale
    var scale = Math.max(gCanvas.width / img.width, gCanvas.height / img.height);
    // get the top left position of the image
    var x = (gCanvas.width / 2) - (img.width / 2) * scale;
    var y = (gCanvas.height / 2) - (img.height / 2) * scale;
    gCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
}