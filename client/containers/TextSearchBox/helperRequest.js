import 'whatwg-fetch';
import * as _ from 'lodash';

export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => data);
  // .catch((err) => { throw err; });
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.ok) { // response.status >= 200 && response.status < 300
    return response;
  }
  return response.json().then((err) => {
    throw err;
  });
}
