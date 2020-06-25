'use strict';

(function () {
  var roomsInput = document.querySelector('#room_number');
  var guestsInput = document.querySelector('#capacity');

  var guestRatioValidation = function (rooms, guests) {
    var message = '';
    if (rooms === '100' && guests !== '0') {
      message = 'Этот дворец не для гостей.';
    } else if (rooms !== '100' && guests === '0') {
      message = 'Укажите количество гостей.';
    } else if (rooms < guests) {
      message = 'Количество гостей не должно превышать количество комнат.';
    }
    return message;
  };

  guestsInput.addEventListener('input', function (evt) {
    var message = guestRatioValidation(roomsInput.value, guestsInput.value);

    evt.target.setCustomValidity(message);
    guestsInput.reportValidity();
  });

  roomsInput.addEventListener('input', function (evt) {
    var message = guestRatioValidation(roomsInput.value, guestsInput.value);

    evt.target.setCustomValidity(message);
    roomsInput.reportValidity();
  });
}());
