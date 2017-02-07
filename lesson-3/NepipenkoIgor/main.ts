import {Flickr} from './fetch';

let elem = document.querySelector('.flickr-box') as HTMLDivElement;

new Flickr({
  elem,
  uri: 'https://api.flickr.com/services/rest/?',
  queryMethod: 'flickr.photos.search',
  apiKey: 'df05722919e95bb8904ef25378484604'
});
