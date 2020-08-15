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

function renderGallery(filter) {

    var HTMLStr = '';
    var images = getImgs();

    if (filter && filter !== '') {
        images = images.filter(element => {
            return element.keywords.some(element =>
                element === filter);
        })
        if (images.length > 0) updateSearchResults(filter);
    }
    for (let i = 0; i < images.length; i++) {
        let image = images[i];
        let imgHtml = `<img src="images/${image.id}.jpg" alt="meme" data-id="${image.id}" onclick="imgClicked(this)">`;
        HTMLStr += imgHtml;
    }

    document.querySelector('.gallery-grid').innerHTML = HTMLStr;
    renderSearchResults();
}

function renderSearchResults() {
    const searchResults = getSearchResults();
    var htmlStr = '';
    for (const key in searchResults) {
        const str = ` <span style="font-size:${searchResults[key]*10}px;">${key}</span>`;
        htmlStr += str;
    }
    document.querySelector('.keywords-box').innerHTML = htmlStr;
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

function onSearchInput() {
    const txt = document.querySelector('#search-input').value;
    console.log();
    renderGallery(txt);

}

function openAbout() {
    document.querySelector('.main-gallery').style.display = 'none';
    document.querySelector('.main-memes').style.display = 'none';
    document.querySelector('.main-about').style.display = 'inline';
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}