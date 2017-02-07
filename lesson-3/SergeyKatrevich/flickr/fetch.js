// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
var Flickr = (function () {
    function Flickr(opt) {
        var _this = this;
        this.clsPerson = 'person';
        this.elem = opt.elem;
        this.uri = opt.uri;
        this.apiKey = opt.apiKey;
        this.queryMethod = opt.queryMethod;
        this.input = document.querySelector('.flickr-search-input');
        this.imagesBox = document.querySelector('.image-area');
        this.searchButton = document.querySelector('.flickr-search-button');
        this.searchButton.addEventListener('click', this.search.bind(this, this.render.bind(this)));
        var enterKeyCode = 13;
        this.input.addEventListener('keydown', function (ev) {
            if (ev.keyCode === enterKeyCode) {
                var evClick = new Event('click');
                _this.searchButton.dispatchEvent(evClick);
            }
        });
    }
    Flickr.prototype.findPersonEltById = function (id) {
        var sel = "." + this.clsPerson + "[data-photo-id=\"" + id + "\"";
        return document.querySelector(sel);
    };
    Flickr.prototype.renderPerson = function (id, person) {
        var elPerson = this.findPersonEltById(id);
        if (elPerson !== null && typeof person.realname !== 'undefined') {
            elPerson.innerHTML = person.realname._content;
        }
    };
    Flickr.prototype.render = function (body) {
        var _this = this;
        this.photos = body.photos.photo.sort(function (leftPhoto, rightPhoto) {
            return leftPhoto.title === rightPhoto.title ? 0 : leftPhoto.title > rightPhoto.title ? 1 : -1;
        });
        var content = "";
        var _loop_1 = function (photo) {
            this_1.getUserName(photo).then(function (responsePersonBody) {
                _this.renderPerson(photo.id, responsePersonBody.person);
            });
            content += "<div class=\"image-box\">\n<img src=\"https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg\" />\n<div>\n  <strong>Owner's name: </strong>\n  <span class=\"person\" data-photo-id=\"" + photo.id + "\"></span>\n</div>\n<p>" + photo.title + "</p>\n</div>";
        };
        var this_1 = this;
        for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
            var photo = _a[_i];
            _loop_1(photo);
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
    Flickr.prototype.getUserName = function (photo) {
        var url = this.uri + "method=flickr.people.getInfo&api_key=" + this.apiKey + "&user_id=" + photo.owner + "&format=json&nojsoncallback=1";
        return fetch(url).then(function (res) { return res.json(); });
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