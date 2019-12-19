'use strict';

var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content;
var pinTemplate = document.querySelector('#pin').content;
var MAX_OFFERS = 8;
var TITLE_LIST = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var LOCATION_X = 21;
var LOCATION_Y = {
  MIN: 130 + 64,
  MAX: 600 + 30
};
var PRICE_RANGE = {
  MIN: 1000,
  MAX: 1000000
};
var MAX_ROOMS = 5;
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
      x: getRandomNumber(0, map.offsetWidth) + LOCATION_X,
      y: getRandomNumber(LOCATION_Y.MIN, LOCATION_Y.MAX)
    }
  };
  return newOffer;
};

var offers = [];
for (var i = 0; i < MAX_OFFERS; i++) {
  var offerClone = createOffer(i);
  offerClone.address = offerClone.location.x + ', ' + offerClone.location.y;
  offerClone.gursts = getRandomNumber(2, offerClone.offer.rooms * 2);
  offers.push(offerClone);
}

// Generate Pin
var renderPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  var containerElemet = pinElement.querySelector('.map__pin');
  var avatarImage = pinElement.querySelector('img');

  containerElemet.style.left = data.location.x + 'px';
  containerElemet.style.top = data.location.y + 'px';
  avatarImage.src = data.author.avatar;
  avatarImage.alt = data.offer.title;

  return pinElement;
};

var pinFragment = document.createDocumentFragment();
for (var ind = 0; i < offers.length; ind++) {
  pinFragment.appendChild(renderPin(offers[ind]));
}

// map.querySelector('.map__pins').appendChild(pinFragment);

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
  for (var index = 0; index < data.offer.features.length; index++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + data.offer.features[index]);
    featureList.appendChild(featureItem);
  }
  cardElement.querySelector('.popup__description').textContent = data.offer.description;

  photosContainer.innerHTML = '';
  for (var p = 0; p < data.offer.photos.length; p++) {
    var newPhoto = photo.cloneNode();
    newPhoto.src = data.offer.photos[p];
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
var PIN_SIZE = {
  PIN_CENTER: 37,
  ARROW_HEIGHT: 87
};

addressInput.setAttribute('placeholder', (mainPin.offsetLeft + PIN_SIZE.PIN_CENTER) + ', ' + (mainPin.offsetTop + PIN_SIZE.PIN_CENTER));

var setAddressInput = function (left, top) {
  addressInput.setAttribute('placeholder', left + ', ' + top);
};

mainPin.addEventListener('mouseup', function (evt) {
  var pinWidthCenter = evt.pageX + PIN_SIZE.PIN_CENTER;
  var pinHeightArrow = evt.pageY + PIN_SIZE.ARROW_HEIGHT;
  activatePage();
  setAddressInput(pinWidthCenter, pinHeightArrow);
});
