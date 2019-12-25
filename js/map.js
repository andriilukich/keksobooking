'use strict';

var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content;
var pinTemplate = document.querySelector('#pin').content;
var MAX_OFFERS = 8;
var TITLE_LIST = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_Y = {
  MIN: 130,
  MAX: 630
};
var PRICE_RANGE = {
  MIN: 1000,
  MAX: 1000000
};
var MAX_ROOMS = 5;
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinSizes = {
  usersPin: {
    PIN_CENTER: 25,
    PIN_HEIGHT: 70
  },
  mainPin: {
    PIN_CENTER: 31,
    PIN_HEIGHT: 84
  }
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomItem = function (data) {
  return data[Math.floor(Math.random() * (data.length - 1))];
};

// Generate offer
var creatFeaturesList = function (data) {
  var maxIter = getRandomNumber(1, data.length);
  var newFeaturesList = [];
  for (var i = 0; i < maxIter; i++) {
    var randomNumber = getRandomNumber(1, data.length);
    if (!newFeaturesList.includes(data[randomNumber])) {
      newFeaturesList.push(data[randomNumber]);
    }
  }
  return newFeaturesList;
};

var createLinksList = function (data) {
  var newLinksList = [];
  for (var i = 0; i < data.length; i++) {
    var randomNumber = getRandomNumber(0, data.length);
    if (!newLinksList.includes(data[randomNumber])) {
      newLinksList.push(data[randomNumber]);
    } else {
      --i;
    }
  }
  return newLinksList;
};

var createOffer = function () {
  var newOffer = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'offer': {
      'title': getRandomItem(TITLE_LIST),
      'address': '',
      'price': getRandomNumber(PRICE_RANGE.MIN, PRICE_RANGE.MAX),
      'type': getRandomItem(TYPE_LIST),
      'rooms': getRandomNumber(1, MAX_ROOMS),
      'guests': 0,
      'checkin': getRandomItem(CHECK_IN_OUT),
      'checkout': getRandomItem(CHECK_IN_OUT),
      'features': creatFeaturesList(FEATURES_LIST),
      'description': '',
      'photos': createLinksList(PHOTOS_LIST)
    },
    'location': {
      x: getRandomNumber(0, map.offsetWidth),
      y: getRandomNumber(LOCATION_Y.MIN, LOCATION_Y.MAX)
    }
  };
  return newOffer;
};

var offers = [];
for (var i = 0; i < MAX_OFFERS; i++) {
  var offerClone = createOffer(i);
  // debugger;
  offerClone.offer.address = offerClone.location.x + ', ' + offerClone.location.y;
  offerClone.offer.guests = getRandomNumber(2, offerClone.offer.rooms * 2);
  offers.push(offerClone);
}

// Generate Pin
var renderPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  var containerElem = pinElement.querySelector('.map__pin');
  var avatarImage = pinElement.querySelector('img');

  containerElem.style.left = (data.location.x - pinSizes.usersPin.PIN_CENTER) + 'px';
  containerElem.style.top = (data.location.y - pinSizes.usersPin.PIN_HEIGHT) + 'px';
  avatarImage.src = data.author.avatar;
  avatarImage.alt = data.offer.title;

  return pinElement;
};

var pinFragment = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
  pinFragment.appendChild(renderPin(offers[i]));
}

// Generate Card
var renderCard = function (data) {
  var cardElement = cardTemplate.cloneNode(true);
  var featureList = cardElement.querySelector('.popup__features');
  var photosContainer = cardElement.querySelector('.popup__photos');
  var photo = cardElement.querySelector('.popup__photo');

  var type;
  switch (data.offer.type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'palace':
      type = 'Дворец';
      break;
  }

  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = type;
  cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

  featureList.innerHTML = '';
  for (var i = 0; i < data.offer.features.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + data.offer.features[i]);
    featureList.appendChild(featureItem);
  }
  cardElement.querySelector('.popup__description').textContent = data.offer.description;

  photosContainer.innerHTML = '';
  for (var i = 0; i < data.offer.photos.length; i++) {
    var newPhoto = photo.cloneNode();
    newPhoto.src = data.offer.photos[i];
    photosContainer.appendChild(newPhoto);
  }

  cardElement.querySelector('.popup__avatar').src = data.author.avatar;

  return cardElement;
};

// map.insertBefore(renderCard(offers[0]), map.querySelector('.map__filters-container'));

// Not active state of form's elements
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');


for (var i = 0; i < fieldsets.length; i++) {
  fieldsets[i].setAttribute('disabled', '');
}

// Activate the page with an Event of dragging the main Pin
var mainPin = map.querySelector('.map__pin--main');

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled', '');
  }
};

// The initial address of the pin, user address when moving the pin
var addressInput = adForm.querySelector('#address');

addressInput.setAttribute('placeholder', (mainPin.offsetLeft + pinSizes.mainPin.PIN_CENTER) + ', ' + (mainPin.offsetTop + pinSizes.mainPin.PIN_HEIGHT));

var setAddressInput = function (left, top) {
  addressInput.setAttribute('placeholder', left + ', ' + top);
};

// Render pins of offers and get info about clicked pin
// and close the info after closing btn
mainPin.addEventListener('mouseup', function (evt) {
  var pinWidthCenter = evt.pageX + pinSizes.mainPin.PIN_CENTER;
  var pinHeightArrow = evt.pageY + pinSizes.mainPin.PIN_HEIGHT;
  activatePage();
  setAddressInput(pinWidthCenter, pinHeightArrow);
  map.querySelector('.map__pins').appendChild(pinFragment);
});

var clearInfo = function () {
  var cardInfo = map.querySelector('.map__card');
  if (cardInfo) {
    map.removeChild(cardInfo);
  }
};

var checkAddress = function (evt) {
  var target = evt.target;
  var targetLeft = pinSizes.usersPin.PIN_CENTER;
  var targetTop = pinSizes.usersPin.PIN_HEIGHT;

  if (target.type === 'button') {
    targetLeft += target.offsetLeft;
    targetTop += target.offsetTop;
  } else if (target.tagName === 'IMG') {
    targetLeft += target.offsetParent.offsetLeft;
    targetTop += target.offsetParent.offsetTop;
  }

  for (var i = 0; i < offers.length; i++) {
    var pinLeft = offers[i].location.x;
    var pinTop = offers[i].location.y;
    if (pinLeft === targetLeft && pinTop === targetTop) {
      map.insertBefore(renderCard(offers[i]), map.querySelector('.map__filters-container'));
    }
  }
};

document.addEventListener('click', function (evt) {
  clearInfo();
  checkAddress(evt);
});

// Validator of Guests and Rooms
var roomsInput = adForm.querySelector('#room_number');
var guestsInput = adForm.querySelector('#capacity');

var isInvalidRoomsInput = function (rooms, guests) {
  var message = '';
  if (rooms === '100' && guests !== '0') {
    message = 'Этот дворец не для гостей.';
  } else if (rooms !== '100' && guests === '0') {
    message = 'Не для гостей только дворец.';
  }
  return message;
};

var isInvalidGuestsInput = function (rooms, guests) {
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
  var message = isInvalidGuestsInput(roomsInput.value, guestsInput.value);

  evt.target.setCustomValidity(message);
  guestsInput.reportValidity();
});

roomsInput.addEventListener('input', function (evt) {
  var message = isInvalidRoomsInput(roomsInput.value, guestsInput.value);

  evt.target.setCustomValidity(message);
  roomsInput.reportValidity();
});
