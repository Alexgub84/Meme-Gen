'use strict'


var gImgs = [

    { id: 1, url: 'images/1.jpg', keywords: [] },
    { id: 2, url: 'images/2.jpg', keywords: [] },
    { id: 3, url: 'images/3.jpg', keywords: [] },
    { id: 4, url: 'images/4.jpg', keywords: [] },
    { id: 5, url: 'images/5.jpg', keywords: [] },
    { id: 6, url: 'images/6.jpg', keywords: [] },
    { id: 7, url: 'images/7.jpg', keywords: [] },
    { id: 8, url: 'images/8.jpg', keywords: [] },
    { id: 9, url: 'images/9.jpg', keywords: [] },
    { id: 10, url: 'images/10.jpg', keywords: [] },
    { id: 11, url: 'images/11.jpg', keywords: [] },
    { id: 12, url: 'images/12.jpg', keywords: [] },
    { id: 13, url: 'images/13.jpg', keywords: [] },
    { id: 14, url: 'images/14.jpg', keywords: [] },
    { id: 15, url: 'images/15.jpg', keywords: [] },
    { id: 16, url: 'images/16.jpg', keywords: [] },
    { id: 17, url: 'images/17.jpg', keywords: [] },
    { id: 18, url: 'images/18.jpg', keywords: [] },
    { id: 19, url: 'images/19.jpg', keywords: [] },
    { id: 20, url: 'images/20.jpg', keywords: [] },
    { id: 21, url: 'images/21.jpg', keywords: [] },
    { id: 22, url: 'images/22.jpg', keywords: [] },

];
var gMeme = {};

function creatNewLine(lineObj) {
    const { x, y, txt, font, size, align, color } = lineObj;
    gMeme.selectedLineIdx++;
    gMeme.lines.push({
        x: x,
        y: y,
        font: font,
        txt: txt,
        size: size,
        align: align,
        color: color
    })
}

function editLineAtIdxByKey(lineIdx, key, newValue) {
    gMeme.lines[lineIdx][key] = newValue;
}

function editCurrLineByKey(key, newValue) {
    gMeme.lines[gMeme.selectedLineIdx][key] = newValue;

}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx < gMeme.lines.length - 1) ? gMeme.selectedLineIdx + 1 : 0;

}

function deleteCurrLine() {
    if (gMeme.lines.length === 0) {
        //TODO - no lines to delete
        return;
    }
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx += (gMeme.selectedLineIdx < gMeme.lines.length - 2) ? 1 : -1;

}

function getCurrLineObj() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getLinesCount() {
    return gMeme.lines.length;
}

function getLines() {
    return gMeme.lines;
}

function createMeme(imgId) {
    if (!imgId) imgId = 1;
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: -1,
        lines: []
    }
}

function getImgById(id) {
    return gImgs.find(el => {
        return el.id === id
    });
}

function getImgs() {
    return gImgs;
}

function getImgUrl() {
    return getImgById(gMeme.selectedImgId).url;
}

function downloadImg() {

}