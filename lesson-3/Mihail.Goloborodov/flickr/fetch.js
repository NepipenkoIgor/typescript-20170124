// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
// `${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`
// https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg
// uri: 'https://api.flickr.com/services/rest/?',
//     queryMethod: 'flickr.photos.search',
//     apiKey: 'df05722919e95bb8904ef25378484604'
// Q , lodash
var DEBOUNCE_INTERVAL = 300;
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
        this.owners = {};
        this.searchButton.addEventListener('click', _.debounce(function () {
            _this.search()
                .then(_this.render.bind(_this));
        }, DEBOUNCE_INTERVAL));
    }
    Flickr.prototype.render = function (photos) {
        this.photos = Flickr.sort(photos.photo);
        var content = "";
        for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
            var photo = _a[_i];
            content += "<div class=\"image-box\">\n<img src=\"https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg\" />\n<p>" + (photo.title + ' (owner: ' + this.getPhotoOwnerName(photo) + ')') + "</p>\n</div>";
        }
        this.imagesBox.innerHTML = content;
    };
    Flickr.prototype.search = function () {
        var _this = this;
        var promises = [], response;
        if (!this.input.value) {
            return Q.reject('No search query');
        }
        var text = this.input.value;
        var url = new Request(this.uri + "method=" + this.queryMethod + "&api_key=" + this.apiKey + "&text=" + text + "&page=1&format=json&nojsoncallback=1");
        return this.getPhotos(url)
            .then(function (res) {
            response = res;
            _.forEach(response.photo, function (photo) {
                promises.push(_this.getOwnerInfo(photo));
            });
            return Q.all(promises);
        })
            .then(function () { return response; });
    };
    Flickr.sort = function (photos) {
        return _.sortBy(photos, 'title');
    };
    Flickr.prototype.getPhotos = function (input) {
        return fetch(input)
            .then(function (res) { return res.json(); })
            .then(function (res) {
            return res.photos;
        });
    };
    Flickr.prototype.getOwnerInfo = function (photo) {
        var _this = this;
        if (this.owners[photo.owner]) {
            return Q.resolve(this.owners[photo.owner]);
        }
        var url = new Request(this.uri + "method=flickr.people.getInfo&api_key=" + this.apiKey + "&user_id=" + photo.owner + "&format=json&nojsoncallback=1");
        return fetch(url)
            .then(function (res) { return res.json(); })
            .then(function (res) {
            return _this.owners[photo.owner] = res.person;
        });
    };
    Flickr.prototype.getPhotoOwnerName = function (photo) {
        var owner = this.owners[photo.owner];
        return _.get(owner, 'username._content', '');
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