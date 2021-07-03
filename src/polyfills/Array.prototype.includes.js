if (!Array.prototype.includes) {
  Array.prototype.includes = function (element) {
    var array = this;
    var length = array.length;
    var includes = false;
    for (var i = 0; i < length; i++) {
      if (array[i] === element) {
        includes = true;
        break;
      }
    }
    return includes;
  };
}
