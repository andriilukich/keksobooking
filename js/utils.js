'use strict';

(function () {
  window.utils = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomItem: function (data) {
      return data[Math.floor(Math.random() * (data.length - 1))];
    },
  };
}());

