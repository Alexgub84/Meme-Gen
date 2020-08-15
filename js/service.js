'use strict'


var gImgs = [

    { id: 1, url: 'images/1.jpg', keywords: ['politics', 'arrogant'] },
    { id: 2, url: 'images/2.jpg', keywords: ['nature'] },
    { id: 3, url: 'images/3.jpg', keywords: ['animals', 'cute', 'baby'] },
    { id: 4, url: 'images/4.jpg', keywords: ['animals'] },
    { id: 5, url: 'images/5.jpg', keywords: ['baby', 'success'] },
    { id: 6, url: 'images/6.jpg', keywords: ['stupid', 'funny'] },
    { id: 7, url: 'images/7.jpg', keywords: ['baby', 'funny'] },
    { id: 8, url: 'images/8.jpg', keywords: ['stupid'] },
    { id: 9, url: 'images/9.jpg', keywords: ['baby', 'laugh'] },
    { id: 10, url: 'images/10.jpg', keywords: ['success', 'laugh'] },
    { id: 11, url: 'images/11.jpg', keywords: ['sport', 'funny'] },
    { id: 12, url: 'images/12.jpg', keywords: ['demanding'] },
    { id: 13, url: 'images/13.jpg', keywords: ['success'] },
    { id: 14, url: 'images/14.jpg', keywords: ['enlightening'] },
    { id: 15, url: 'images/15.jpg', keywords: ['selfish'] },
    { id: 16, url: 'images/16.jpg', keywords: ['laugh', 'success'] },
    { id: 17, url: 'images/17.jpg', keywords: ['politics'] },
    { id: 18, url: 'images/18.jpg', keywords: ['cartoon', 'hero'] },
    { id: 19, url: 'images/19.jpg', keywords: ['funny', 'stupid'] },
    { id: 20, url: 'images/20.jpg', keywords: ['hero'] },
    { id: 21, url: 'images/21.jpg', keywords: ['funny', 'stupid', 'evil'] },
    { id: 22, url: 'images/22.jpg', keywords: ['baby', 'funny'] },

];
var gMeme = {};

var gSearchResults = { funny: 3, hero: 4, cartoon: 2 }


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

function getSearchResults() {
    return gSearchResults;
}

function updateSearchResults(key) {
    gSearchResults[key] = (gSearchResults[key]) ? gSearchResults[key] + 1 : 1;
}