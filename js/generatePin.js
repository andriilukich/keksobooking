'use strict';

(function () {
  window.generatePin = function (offers) {
    var pinTemplate = document.querySelector('#pin').content;

    var renderPin = function (data) {
      var pinElement = pinTemplate.cloneNode(true);
      var containerElem = pinElement.querySelector('.map__pin');
      var avatarImage = pinElement.querySelector('img');

      containerElem.style.left = (data.location.x - containerElem.offsetWidth / 2) + 'px';
      containerElem.style.top = (data.location.y - containerElem.offsetHeight) + 'px';
      avatarImage.src = data.author.avatar;
      avatarImage.alt = data.offer.title;

      return pinElement;
    };

    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      pinFragment.appendChild(renderPin(offers[i]));
    }

    return pinFragment;
  };
}());
