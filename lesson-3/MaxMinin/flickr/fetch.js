// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
var Flickr = (function () {
    function Flickr(opt) {
        this.elem = opt.elem;
        this.uri = opt.uri;
        this.apiKey = opt.apiKey;
        this.queryMethod = opt.queryMethod;
        this.input = document.querySelector('.flickr-search-input');
        this.imagesBox = document.querySelector('.image-area');
        this.searchButton = document.querySelector('.flickr-search-button');
        this.searchButton.addEventListener('click', this.search.bind(this, _.debounce(this.render.bind(this), 500)));
    }
    Flickr.prototype.render = function (body) {
        this.photos = _.sortBy(body.photos.photo, ['title']);
        var content = "";
        for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
            var photo = _a[_i];
            content += "<br>\n        <div class=\"image-box\">\n            <img src=\"https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg\" />\n            <p>\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A: " + photo.title + "</p>\n            <p>\u0412\u043B\u0430\u0434\u0435\u043B\u0435\u0446: " + photo.owner + "</p>\n        </div>";
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
        fetch(input).then(function (res) {
            return res.json();
        })
            .then(cb);
    };
    return Flickr;
}());
var elem = document.querySelector('.flickr-box');
new Flickr({
    elem: elem,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: 'df05722919e95bb8904ef25378484604'
});
//# sourceMappingURL=fetch.js.map