"use strict";
var fetch_1 = require("./fetch");
var elem = document.querySelector('.flickr-box');
new fetch_1.Flickr({
    elem: elem,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: 'df05722919e95bb8904ef25378484604'
});
//# sourceMappingURL=main.js.map