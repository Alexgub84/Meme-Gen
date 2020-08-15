'use strict'

function downloadImg(elLink) {
    console.log('downloading');
    var imgContent = gCanvas.toDataURL('images/jpeg');
    elLink.href = imgContent;
    console.log(elLink);

}