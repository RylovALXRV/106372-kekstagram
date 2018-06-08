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

var pictures = [];

var getRandomFeature = function (features) {
  return features[Math.floor(Math.random() * (features.length - 1))];
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min + 0.5);
};

var createPicture = function (num) {
  return {
    url: 'photos/' + (num + 1) + '.jpg',
    likes: getRandomInteger(1, 25),
    comments: function () {
      return (getRandomInteger(1, 2) === 1) ?
        getRandomFeature(comments) :
        getRandomFeature(comments) + ' ' + getRandomFeature(comments);
    },
    description: getRandomFeature(desc)
  };
};

for (var i = 0; i < 25; i++) {
  pictures.push(createPicture(i));
}

var renderPicture = function (picture) {
  var pictureElement = templateAnchor.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = Math.floor(Math.random() * comments.length);
  return pictureElement;
};

var renderPictures = function (allPictures) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < allPictures.length; j++) {
    fragment.appendChild(renderPicture(allPictures[j]));
  }
  document.querySelector('.pictures').appendChild(fragment);
};

renderPictures(pictures);

document.querySelector('.big-picture').classList.remove('hidden');

var renderBigPicture = function (bigPicture) {
  var socialComments = document.querySelectorAll('.social__comment');
  document.querySelector('.big-picture__img img').src = bigPicture.url;
  document.querySelector('.likes-count').textContent = bigPicture.likes;
  document.querySelector('.comments-count').textContent = getRandomInteger(1, 2);
  for (var k = 0; k < socialComments.length; k++) {
    socialComments[k].querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
    socialComments[k].querySelector('.social__text').textContent = bigPicture.comments();
  }
  document.querySelector('.social__caption').textContent = bigPicture.description;
};
renderBigPicture(pictures[0]);

var hideOrShowString = function (parentElem, text) {
  parentElem.classList.toggle(text);
};

hideOrShowString(document.querySelector('.social__comment-count'), 'visually-hidden');
hideOrShowString(document.querySelector('.social__loadmore'), 'visually-hidden');
