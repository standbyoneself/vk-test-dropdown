function debounce(callback, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    var context = this;
    var args = arguments;
    timeout = setTimeout(function () {
      callback.apply(context, args);
    }, wait);
  };
}
