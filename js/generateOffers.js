'use strict';

(function () {
  var TITLE_LIST = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var PRICE_RANGE = {
    MIN: 1000,
    MAX: 1000000
  };
  var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
  var MAX_ROOMS = 5;
  var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MAX_OFFERS = 8;

  var map = document.querySelector('.map');
  var getRandomItem = window.utils.getRandomItem;
  var getRandomNumber = window.utils.getRandomNumber;

  var LOCATION_Y = {
    MIN: 130,
    MAX: map.offsetHeight - 120
  };

  var createRandomArr = function (data, iter) {
    var newArr = [];
    for (var i = 0; i < iter; i++) {
      var randomNum = getRandomNumber(0,data.length);
      if (!newArr.includes(data[randomNum])) {
        newArr.push(data[randomNum]);
      } else {
        --i;
      }
    }

    return newArr;
  };

  var createOffer = function (i) {
    var featureNum = getRandomNumber(1, FEATURES_LIST);
    var rooms = getRandomNumber(1, MAX_ROOMS);
    var guests = getRandomNumber(2, rooms * 2);
    var xLocation = getRandomNumber(0, map.offsetWidth);
    var yLocation = getRandomNumber(LOCATION_Y.MIN, LOCATION_Y.MAX);
    var address = xLocation + ', ' + yLocation;
    var newOffer = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': getRandomItem(TITLE_LIST),
        'address': address,
        'price': getRandomNumber(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
        'type': getRandomItem(TYPE_LIST),
        'rooms': rooms,
        'guests': guests,
        'checkin': getRandomItem(CHECK_IN_OUT),
        'checkout': getRandomItem(CHECK_IN_OUT),
        'features': createRandomArr(FEATURES_LIST, featureNum),
        'description': '',
        'photos': createRandomArr(PHOTOS_LIST, PHOTOS_LIST.length)
      },
      'location': {
        x: xLocation,
        y: yLocation
      }
    };
    return newOffer;
  };

  var offers = [];
  for (var i = 0; i < MAX_OFFERS; i++) {
    var offerClone = createOffer(i);
    offers.push(offerClone);
  }

  window.generateOffers = offers;
}());
