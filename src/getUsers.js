function getUsers(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api');

  xhr.onload = function () {
    callback(xhr.response);
  };

  xhr.send();
}
