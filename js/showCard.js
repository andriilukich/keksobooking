'use strict';

(function (offers) {
  var map = document.querySelector('.map');

  var clearInfo = function () {
    var cardInfo = map.querySelector('.map__card');
    if (cardInfo) {
      map.removeChild(cardInfo);
    }
  };

  var checkAddress = function (evt, offers) {
    var target = evt.target;
    var targetTop, targetLeft;

    if (target.tagName === "IMG") {
      target = target.offsetParent;
    }

    targetTop = target.offsetTop;
    targetLeft = target.offsetLeft;

    for (var i = 0; i < offers.length; i++) {
      var pinLeft = offers[i].location.x;
      var pinTop = offers[i].location.y;
      if (pinLeft === targetLeft && pinTop === targetTop) {
        map.insertBefore(window.renderCards(offers[i]), map.querySelector('.map__filters-container'));
      }
    }
  };

  document.addEventListener('click', function (evt) {
    clearInfo();
    checkAddress(evt, offers);
  });
}(window.generateOffers));
