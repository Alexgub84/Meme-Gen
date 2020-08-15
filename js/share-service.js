'use strict'

function downloadImg(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;

}