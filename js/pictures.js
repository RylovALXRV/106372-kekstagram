'use strict';

var templateAnchor = document.querySelector('#picture').content.querySelector('.picture__link');

var exampleComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var exampleDescriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomElement = function (element) {
  return element[Math.floor(Math.random() * (element.length - 1))];
};

var getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var createRandomComment = function () {
  return (Math.round(Math.random()) === 0) ?
    getRandomElement(exampleComments) :
    getRandomElement(exampleComments) + ' ' + getRandomElement(exampleComments);
};

var generateComments = function () {
  var comments = [];
  for (var i = 0; i < exampleComments.length; i++) {
    comments.push(createRandomComment());
  }
  return comments;
};

var createPicture = function (num) {
  return {
    url: 'photos/' + (num + 1) + '.jpg',
    likes: getRandomInteger(1, 25),
    comments: generateComments(),
    description: getRandomElement(exampleDescriptions)
  };
};

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
    item.querySelector('.social__text').textContent = getRandomElement(bigPicture.comments);
  });
  document.querySelector('.social__caption').textContent = bigPicture.description;
};

var pictures = Array.apply(null, {length: 25}).map(Function.call, createPicture);

renderPictures(pictures);

document.querySelector('.big-picture').classList.remove('hidden');

renderBigPicture(pictures[0]);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');
