'use strict';
(function () {

  window.renderCards = function (data) {
    var cardTemplate = document.querySelector('#card').content;
    var cardElement = cardTemplate.cloneNode(true);
    var featureList = cardElement.querySelector('.popup__features');
    var photosContainer = cardElement.querySelector('.popup__photos');
    var photo = cardElement.querySelector('.popup__photo');

    var type;
    switch (data.offer.type) {
      case 'bungalo':
        type = 'Бунгало';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'palace':
        type = 'Дворец';
        break;
      default:
        type = 'Квартира';
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

}());
