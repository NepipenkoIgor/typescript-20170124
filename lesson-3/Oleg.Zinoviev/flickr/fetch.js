var Flickr = (function () {
    function Flickr(opt) {
        var _this = this;
        this.elem = opt.elem;
        this.uri = opt.uri;
        this.apiKey = opt.apiKey;
        this.queryMethod = opt.queryMethod;
        this.input = document.querySelector('.flickr-search-input');
        this.imagesBox = document.querySelector('.image-area');
        this.searchButton = document.querySelector('.flickr-search-button');
        this.debounceDuration = opt.debounceDuration || 300;
        this.perPage = opt.perPage || 10;
        this.sortBy = opt.sortBy || 'date-posted-asc';
        // click
        this.searchButton.addEventListener('click', _.debounce(function () {
            _this.search()
                .then(_this.render.bind(_this));
        }, this.debounceDuration).bind(this));
        // keydown
        this.input.addEventListener('keydown', _.debounce(function (e) {
            var keyCodeEnter = 13;
            if (e.keyCode === keyCodeEnter) {
                _this.search()
                    .then(_this.render.bind(_this));
            }
        }, this.debounceDuration).bind(this));
    }
    Flickr.prototype.render = function (body) {
        this.photos = body.photos.photo;
        var content = "";
        for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
            var photo = _a[_i];
            content += "<div class=\"image-box\">\n                  <img src=\"https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg\" />\n                  <p>" + photo.title + "</p>\n                  <p>Author: " + photo.owner + "</p>\n                  </div>";
        }
        this.imagesBox.innerHTML = content;
    };
    Flickr.prototype.search = function () {
        var text = this.input.value;
        var url = new Request(this.uri + "method=" + this.queryMethod + "&api_key=" + this.apiKey + "&text=" + text + "&sort=" + this.sortBy + "&per_page=" + this.perPage + "&page=1&format=json&nojsoncallback=1");
        return fetch(url)
            .then(function (res) { return res.json(); });
    };
    return Flickr;
}());
var elem = document.querySelector('.flickr-box');
new Flickr({
    elem: elem,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: 'df05722919e95bb8904ef25378484604',
    debounceDuration: 500,
    perPage: 3,
    sortBy: 'date-posted-asc'
});
//# sourceMappingURL=fetch.js.map