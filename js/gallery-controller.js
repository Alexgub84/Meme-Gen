'use strict'

function init() {
    renderGallery();
}

function imgClicked(img) {
    document.querySelector('.main-gallery').style.display = 'none';
    const elDiv = document.querySelector('.main-canvas');
    elDiv.style.display = 'flex';
    renderCanvas(+img.dataset.id);
}

function renderGallery() {
    // TODO
    var id;

    var HTMLStr = '';
    var images = getImgs();
    for (let i = 0; i < images.length; i++) {
        let image = images[i];
        let imgHtml = `<img src="images/${image.id}.jpg" alt="meme" data-id="${image.id}" onclick="imgClicked(this)">`;
        HTMLStr += imgHtml;
    }
    document.querySelector('.gallery-grid').innerHTML = HTMLStr;
}

function openGallery() {
    document.querySelector('.main-gallery').style.display = 'inline';
    document.querySelector('.main-canvas').style.display = 'none';
    document.querySelector('.main-about').style.display = 'none';
}

function openMemes() {
    document.querySelector('.main-gallery').style.display = 'none';
    document.querySelector('.main-about').style.display = 'none';
    const elDiv = document.querySelector('.main-canvas');
    elDiv.style.display = 'flex';
    renderCanvas(elDiv.dataset.id);
}

function openAbout() {
    document.querySelector('.main-gallery').style.display = 'none';
    document.querySelector('.main-memes').style.display = 'none';
    document.querySelector('.main-about').style.display = 'inline';
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}