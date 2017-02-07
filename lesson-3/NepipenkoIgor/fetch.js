// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
"use strict";
// `${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`
// https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg
// uri: 'https://api.flickr.com/services/rest/?',
//     queryMethod: 'flickr.photos.search',
//     apiKey: 'df05722919e95bb8904ef25378484604'
// Q , lodash
require("whatwg-fetch");
var Flickr = (function () {
    function Flickr(opt) {
        this.elem = opt.elem;
        this.uri = opt.uri;
        this.apiKey = opt.apiKey;
        this.queryMethod = opt.queryMethod;
        this.input = document.querySelector('.flickr-search-input');
        this.imagesBox = document.querySelector('.image-area');
        this.searchButton = document.querySelector('.flickr-search-button');
        this.searchButton.addEventListener('click', this.search.bind(this, this.render.bind(this)));
    }
    Flickr.prototype.render = function (body) {
        this.photos = body.photos.photo;
        var content = "";
        for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
            var photo = _a[_i];
            content += "<div class=\"image-box\">\n<img src=\"https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg\" />\n<p>" + photo.title + "</p>\n</div>";
        }
        this.imagesBox.innerHTML = content;
    };
    Flickr.prototype.search = function (cb) {
        if (!this.input.value) {
            return;
        }
        var text = this.input.value;
        var url = new Request(this.uri + "method=" + this.queryMethod + "&api_key=" + this.apiKey + "&text=" + text + "&page=1&format=json&nojsoncallback=1");
        this.getPhotos(url, cb);
    };
    Flickr.prototype.getPhotos = function (input, cb) {
        fetch(input).then(function (res) { return res.json(); })
            .then(cb);
    };
    return Flickr;
}());
exports.Flickr = Flickr;
//# sourceMappingURL=fetch.js.map