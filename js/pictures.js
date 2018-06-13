'use strict';

var templateAnchor = document.querySelector('#picture').content.querySelector('.picture__link');
var socialComments = document.querySelector('.social__comments');

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

/*
* удаление первых двух элементов
* */
var removeChildren = function (elem, length) {
  for (var i = 0; i < length; i++) {
    elem.removeChild(elem.children[0]);
  }
};

var getRandomElement = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

var getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var generateArray = function (length, fnGeneration) {
  return Array.apply(null, {length: length}).map(Function.call, fnGeneration);
};

var createRandomComment = function () {
  return generateArray(1 + Math.round(Math.random()), function () {
    return getRandomElement(exampleComments);
  }).join(' ');
};

var generateComments = function () {
  return generateArray(getRandomInteger(1, 7), createRandomComment);
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
  var fragmentPictures = document.createDocumentFragment();
  allPictures.forEach(function (item) {
    fragmentPictures.appendChild(renderPicture(item));
  });
  document.querySelector('.pictures').appendChild(fragmentPictures);
};

// получаю один комментарий
var renderComment = function (comment) {
  var socialComment = document.querySelector('.social__comment').cloneNode(true);
  socialComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
  socialComment.querySelector('.social__text').textContent = comment;
  return socialComment;
};

// получаю все комментарии и вывожу
var renderComments = function (allComments, elem) {
  var fragmentComments = document.createDocumentFragment();
  allComments.forEach(function (item) {
    fragmentComments.appendChild(renderComment(item));
  });
  elem.appendChild(fragmentComments);
};

var renderBigPicture = function (bigPicture) {
  document.querySelector('.big-picture__img img').src = bigPicture.url;
  document.querySelector('.likes-count').textContent = bigPicture.likes;
  document.querySelector('.comments-count').textContent = bigPicture.comments.length;
  document.querySelector('.social__caption').textContent = bigPicture.description;
  renderComments(bigPicture.comments, socialComments);
};

var pictures = Array.apply(null, {length: 25}).map(Function.call, createPicture);

renderPictures(pictures);
renderBigPicture(pictures[0]);

removeChildren(socialComments, 2);

document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');
