// addEventListener() fallback for IE <= 8
function registerEventListener(el, type, listener, ctx) {
  if (el.addEventListener) {
    el.addEventListener(type, listener);
  } else {
    el.attachEvent('on' + type, function () {
      listener.call(ctx, window.event);
    });
  }
}

// removeEventListener() fallback for IE <= 8
function unregisterEventListener(el, type, listener) {
  if (el.removeEventListener) {
    el.removeEventListener(type, listener);
  } else {
    el.detachEvent('on' + type, listener);
  }
}

// eventTarget fallback for IE <= 8
function getEventTarget(event) {
  return event ? event.target : window.event.srcElement;
}
