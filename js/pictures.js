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
* удаление всех элементов
* */
var removeChildren = function (elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
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
  var socialComment = document.querySelector('.social__comments .social__comment').cloneNode(true);
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
  // сначала очищаю список ненужных элементов родителя
  removeChildren(elem);
  // затем вствляю нужные элементы
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
// renderBigPicture(pictures[0]);

// document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');

// ------------------------- Задание №15 ----------------------------------

var imgUpload = document.querySelector('.img-upload');
var imgUploadInput = imgUpload.querySelector('.img-upload__input');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__form .img-upload__overlay');
var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
var bigPicture = document.querySelector('.big-picture');
var picturesImg = document.querySelectorAll('.pictures .picture__img');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

var openImgUploadOverlay = function () {
  imgUploadOverlay.classList.remove('hidden');
};

imgUploadCancel.addEventListener('click', function () {
  closeImgUploadOverlay();
});

imgUploadInput.addEventListener('change', function () {
  openImgUploadOverlay();
});

var closeImgUploadOverlay = function () {
  imgUploadOverlay.classList.add('hidden');
};

var setClassName = function (node, cls) {
  if (!node.classList.contains(cls)) {
    node.className = '';
  }
  node.classList.add('effects__preview--' + cls);
};

imgUploadOverlay.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.tagName !== 'INPUT') {
    return;
  }
  setClassName(document.querySelector('.img-upload__preview img'), target.value);
}, true);

var setDataId = function (arr) {
  arr.forEach(function (item, i) {
    item.dataset.id = i;
  });
};

setDataId(picturesImg);

var renderPictureByIndex = function (evt) {
  var target = evt.target;
  if (target.dataset.id) {
    renderBigPicture(pictures[target.dataset.id]);
  }
  bigPicture.classList.remove('hidden');
};

picturesImg.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    renderPictureByIndex(evt);
  });
});

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
};

bigPictureClose.addEventListener('click', function () {
  closeBigPicture();
});
