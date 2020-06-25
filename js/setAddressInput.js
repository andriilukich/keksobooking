'use strict';

(function () {
  var mainPinEl = document.querySelector('.map__pin--main');

  window.setAddressInput = function (x, y) {
    var addressInput = document.querySelector('#address');
    addressInput.value = (x + mainPinEl.offsetWidth / 2) + ', ' + (y + mainPinEl.offsetHeight);
  };
  window.setAddressInput(mainPinEl.offsetLeft, mainPinEl.offsetTop);
}());
