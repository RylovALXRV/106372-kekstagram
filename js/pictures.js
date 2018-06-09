'use strict';

var templateAnchor = document.querySelector('#picture').content.querySelector('.picture__link');

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var desc = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomFeature = function (features) {
  return features[Math.floor(Math.random() * (features.length - 1))];
};


// Math.random() же возвращает [0; 1), т.е. от 0 до но не включая 1 (0,999999), а если я
// прибавлю 0.5 и если округлю значение в меньшую сторону, то войдет в промежуток и 0 и 1
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min + 0.5);
};

// а по комментарию мыслей нет больше на этот момент
var getRandomComments = function () {
  var arr = [];
  for (var i = 0; i < comments.length; i++) {
    if (getRandomInteger(1, 2) === 1) {
      arr.push(getRandomFeature(comments));
    } else {
      arr.push(getRandomFeature(comments) + ' ' + getRandomFeature(comments));
    }
  }
  return arr;
};

var createPicture = function (num) {
  return {
    url: 'photos/' + (num + 1) + '.jpg',
    likes: getRandomInteger(1, 25),
    comments: getRandomComments(),
    description: getRandomFeature(desc)
  };
};

var pictures = Array.apply(null, {length: 25}).map(Function.call, createPicture);

var renderPicture = function (picture) {
  var pictureElement = templateAnchor.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;
  return pictureElement;
};

var renderPictures = function (allPictures) {
  var fragment = document.createDocumentFragment();
  allPictures.forEach(function (item) {
    fragment.appendChild(renderPicture(item));
  });
  document.querySelector('.pictures').appendChild(fragment);
};

var renderBigPicture = function (bigPicture) {
  var socialComments = document.querySelectorAll('.social__comment');
  document.querySelector('.big-picture__img img').src = bigPicture.url;
  document.querySelector('.likes-count').textContent = bigPicture.likes;
  document.querySelector('.comments-count').textContent = bigPicture.comments.length;
  socialComments.forEach(function (item) {
    item.querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
    item.querySelector('.social__text').textContent = getRandomFeature(bigPicture.comments);
  });
  document.querySelector('.social__caption').textContent = bigPicture.description;
};

var hideString = function (parentElem, text) {
  parentElem.classList.add(text);
};

renderPictures(pictures);

document.querySelector('.big-picture').classList.remove('hidden');

renderBigPicture(pictures[0]);

hideString(document.querySelector('.social__comment-count'), 'visually-hidden');
hideString(document.querySelector('.social__loadmore'), 'visually-hidden');
