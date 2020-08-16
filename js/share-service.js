'use strict'

function downloadImg(elLink) {

    const data = gCanvas.toDataURL();
    console.log(data);
    elLink.href = 'data:image/png;base64,' + data;
}