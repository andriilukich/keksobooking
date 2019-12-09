var MAP = document.querySelector('.map');
MAP.classList.remove('map--faded');
var CARD_TEMPLATE = document.querySelector('#card').content;
var PIN_TEMPLATE  = document.querySelector('#pin').content;

var offers =
[
  {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },
    'offer': {
      'title': 'Большая уютная квартира',
      'address': '600, 350',
      'price': 11001,
      'type': 'flat',
      'rooms': 4,
      'guests': 12,
      'checkin': '12:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location':{
      x : 900,
      y: 631
    }
 },
 {
    'author': {
      'avatar': 'img/avatars/user02.png'
      },
    'offer': {
      'title': 'Маленькая неуютная квартира',
      'address': '650, 250',
      'price': 1502,
      'type': 'flat',
      'rooms': 2,
      'guests': 3,
      'checkin': '14:00',
      'checkout': '14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg']
        },
    'location':{
      x : 700,
      y: 452
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user03.png'
      },
    'offer': {
      'title': 'Огромный прекрасный дворец',
      'address': '350, 150',
      'price': 900502,
      'type': 'palace',
      'rooms': 5,
      'guests': 30,
      'checkin': '14:00',
      'checkout': '14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'],
      },
    'location':{
      x : 550,
      y: 452
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user04.png'
      },
    'offer': {
      'title': 'Маленький ужасный дворец',
      'address': '150, 100',
      'price': 500502,
      'type': 'palace',
      'rooms': 5,
      'guests': 15,
      'checkin': '12:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'],
      },
    'location':{
      x : 225,
      y: 452
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user05.png'
      },
    'offer': {
      'title': 'Красивый гостевой домик',
      'address': '120, 180',
      'price': 250502,
      'type': 'house',
      'rooms': 3,
      'guests': 10,
      'checkin': '12:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg']
      },
      'location':{
        x : 725,
        y: 600
      }
  },
  {
    'author': {
      'avatar': 'img/avatars/user06.png'
      },
    'offer': {
      'title': 'Некрасивый негостеприимный домик',
      'address': '170, 138',
      'price': 150502,
      'type': 'house',
      'rooms': 4,
      'guests': 8,
      'checkin': '13:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg']
      },
      'location':{
        x : 275,
        y: 550
      }
  },
  {
    'author': {
      'avatar': 'img/avatars/user07.png'
      },
    'offer': {
      'title': 'Уютное бунгало далеко от моря',
      'address': '90, 180',
      'price': 50502,
      'type': 'bungalo',
      'rooms': 2,
      'guests': 5,
      'checkin': '14:00',
      'checkout': '13:00',
      'features': ['wifi', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg']
      },
      'location':{
        x : 195,
        y: 385
      }
  },
  {
    'author': {
      'avatar': 'img/avatars/user08.png'
      },
    'offer': {
      'title': 'Неуютное бунгало по колено в воде',
      'address': '90, 180',
      'price': 508,
      'type': 'bungalo',
      'rooms': 1,
      'guests': 3,
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg']
      },
      'location':{
        x : 395,
        y: 401
      }
  },
];

// render Pins
var renderPin = function(hotels) {
  var pinElement = PIN_TEMPLATE.cloneNode(true);
  var containerElemet = pinElement.querySelector('.map__pin');
  var avatarImage = pinElement.querySelector('img');

  containerElemet.style.left = hotels.location.x - 21 + 'px';
  containerElemet.style.top = hotels.location.y - 64 + 'px';
  avatarImage.src = hotels.author.avatar;
  avatarImage.alt = hotels.offer.title;

  return pinElement;
};

var pinFragment = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
  pinFragment.appendChild(renderPin(offers[i]));
}

MAP.querySelector('.map__pins').appendChild(pinFragment);

// render card

var renderCard = function(hotels) {
  var cardElement = CARD_TEMPLATE.cloneNode(true);
};
