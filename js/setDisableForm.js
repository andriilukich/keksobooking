'use strict';

(function() {
  window.setDisableForm = function (state) {
    var adForm = document.querySelector('.ad-form');
    var fieldsetList = adForm.querySelectorAll('fieldset');
    if (!state) {
      adForm.classList.remove('ad-form--disabled');
    }

    for (var i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].disabled = state;
    }
  };

  window.setDisableForm(true);
}());
