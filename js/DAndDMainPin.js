'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPinEl = map.querySelector('.map__pin--main');
  var mapBorders = {
    X_MIN: 0,
    X_MAX: map.offsetWidth,
    Y_MIN: 130,
    Y_MAX: map.offsetHeight - 120
  };
  var mainPin = {
    WIDTH: mainPinEl.offsetWidth,
    HEIGHT: mainPinEl.offsetHeight,
  };

  mainPinEl.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var topShift = mainPinEl.offsetTop - shiftCoords.y;
      var leftShift = mainPinEl.offsetLeft - shiftCoords.x;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (
        topShift + mainPin.HEIGHT > mapBorders.Y_MIN &&
        topShift < mapBorders.Y_MAX
      ) {
        mainPinEl.style.top = topShift + 'px';
      }
      if (
        leftShift + mainPin.WIDTH < mapBorders.X_MAX &&
        leftShift > mapBorders.X_MIN
      ) {
        mainPinEl.style.left = leftShift + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.setAddressInput(upEvt.pageX, upEvt.pageY);
    };

    map.classList.remove('map--faded');
    window.setDisableForm(false);
    document.querySelector('.map__pins').appendChild(window.generatePin(window.generateOffers));
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}());
