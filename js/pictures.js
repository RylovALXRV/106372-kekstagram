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

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');

// ------------------------- Задание №15 ----------------------------------

var bigPicture = document.querySelector('.big-picture');
var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
var imgUpload = document.querySelector('.img-upload');
var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__form .img-upload__overlay');

var ESC_CODE = 27;
var ENTER_CODE = 13;

var resetPropertiesUploadImg = function () {
  document.querySelector('.img-upload__form .img-upload__input').value = '';
  document.querySelector('.resize__control--value').value = '100%';
  document.querySelector('.scale__pin').style.left = '';
  document.querySelector('.scale__level').style.width = '';
  document.querySelector('.img-upload__preview img').className = '';
  document.querySelector('.img-upload__preview img').style.transform = 'scale(1)';
  document.querySelector('.img-upload__preview img').style.filter = '';
};


var closeModal = function (node) {
  node.classList.add('hidden');
  // про добавление этого класса пишется в задании...
  document.body.classList.remove('modal-open');
};

var openWindowImgUpload = function (node) {
  node.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.resize__control--value').value = '100%';
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_CODE &&
      !document.activeElement.classList.contains('text__hashtags') &&
      !document.activeElement.classList.contains('text__description')) {
      resetPropertiesUploadImg();
      closeModal(imgUploadOverlay);
    }
  });
};

var closeBigPicture = function (node) {
  node.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', function () {
    closeModal(bigPicture);
  });
};

var renderPictureByIndex = function (evt) {
  var target = evt.target;
  if (target.dataset.id) {
    renderBigPicture(pictures[target.dataset.id]);
  }
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

var setEffect = function (node, cls) {
  if (!node.classList.contains(cls)) {
    node.className = '';
    resetPropertiesUploadImg();
  }
  node.classList.add('effects__preview--' + cls);
};

var setDataId = function (arr) {
  arr.forEach(function (item, i) {
    item.dataset.id = i;
  });
};

imgUpload.querySelector('.img-upload__input').addEventListener('change', function () {
  // document.querySelector('.resize__control--value').value = '100%';
  openWindowImgUpload(imgUploadOverlay);
});

imgUploadCancel.addEventListener('click', function () {
  closeModal(imgUploadOverlay);
  resetPropertiesUploadImg();
});

imgUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closeModal(imgUploadOverlay);
    resetPropertiesUploadImg();
  }
});

bigPictureCancel.addEventListener('click', function () {
  closeBigPicture(bigPicture);
});

document.querySelector('.effects__list').addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.tagName !== 'INPUT') {
    return;
  }
  setEffect(document.querySelector('.img-upload__preview img'), target.value);
  if (target.value === 'none') {
    document.querySelector('.img-upload__scale').classList.add('hidden');
  } else {
    document.querySelector('.img-upload__scale').classList.remove('hidden');
  }
});

document.querySelectorAll('.pictures .picture__img').forEach(function (item) {
  setDataId(document.querySelectorAll('.pictures .picture__img'));
  item.addEventListener('click', function (evt) {
    renderPictureByIndex(evt);
    document.addEventListener('keydown', function (keydownEvt) {
      if (keydownEvt.keyCode === ESC_CODE) {
        closeModal(bigPicture);
      }
    });
  });
});

// ------------------------ Задание №16 ------------------------------------

var scaleLine = document.querySelector('.scale__line');
var scaleStyle = getComputedStyle(scaleLine);
var scaleLin = document.querySelector('.img-upload__scale');
var scalePin = scaleLin.querySelector('.scale__pin');
var scaleLevel = document.querySelector('.scale__level');
var scaleValue = document.querySelector('.scale__value');

var MIN_VALUE_BRIGHTNESS = 1;

var valueScale = {
  step: 25,
  minControl: 25,
  maxControl: 100,
  percent: 100
};

var MaxValue = {
  chromeFilter: 1,
  sepiaFilter: 1,
  marvinFilter: 100,
  phobosFilter: 5,
  heatFilter: 3,
  percent: 100,
  itemLength: 20
};

var filters = {
  none: function () {
    return 'none';
  },
  chrome: function () {
    return 'grayscale(' + ((scaleValue.value * MaxValue.chromeFilter) / MaxValue.percent) + ')';
  },
  sepia: function () {
    return 'sepia(' + ((scaleValue.value * MaxValue.sepiaFilter) / MaxValue.percent) + ')';
  },
  marvin: function () {
    return 'invert(' + ((scaleValue.value * MaxValue.marvinFilter) / MaxValue.percent) + '%)';
  },
  phobos: function () {
    return 'blur(' + ((scaleValue.value * MaxValue.phobosFilter) / MaxValue.percent) + 'px)';
  },
  heat: function () {
    var brightnessValue = (((scaleValue.value) * MaxValue.heatFilter) / MaxValue.percent);
    if (brightnessValue <= MIN_VALUE_BRIGHTNESS) {
      brightnessValue = 1;
    }
    return 'brightness(' + brightnessValue + ')';
  },
};

var getInputValue = function () {
  return parseFloat(document.querySelector('.resize__control--value').value);
};

var setValueFields = function (selector, newValue) {
  document.querySelector(selector).value = newValue + '%';
  document.querySelector('.img-upload__preview img').style.transform = 'scale(' + (getInputValue() / valueScale.percent) + ')';
};

var increaseScaleImg = function (control, step) {
  var inputValue = parseFloat(getInputValue());
  inputValue += step;
  if (inputValue >= control) {
    inputValue = control;
  }
  setValueFields('.resize__control--value', inputValue);
};

var reductionScaleImg = function (control, step) {
  var inputValue = parseFloat(getInputValue());
  inputValue -= step;
  if (inputValue <= control) {
    inputValue = control;
  }
  setValueFields('.resize__control--value', inputValue);
};

var imgUploadResizeClickHandler = function (evt) {
  evt.preventDefault();

  var target = evt.target;

  if (target.tagName !== 'BUTTON') {
    return;
  }

  if (target.classList.contains('resize__control--minus')) {
    reductionScaleImg(valueScale.minControl, valueScale.step);
  } else {
    increaseScaleImg(valueScale.maxControl, valueScale.step);
  }

};

var changeScale = function (coord) {
  scalePin.style.left = coord + 'px';
  scaleLevel.style.width = coord + 'px';
};

var calcValue = function (coord, maxWidth) {
  return Math.round(coord * 100 / maxWidth);
};

var setValueFilter = function (cls) {
  if (document.querySelector('.img-upload__preview img').classList.contains('effects__preview--' + cls) &&
    document.querySelector('.img-upload__preview img').className) {
    document.querySelector('.img-upload__preview img').style.filter = filters[cls]();
  }
};

document.querySelector('.text__hashtags').addEventListener('input', function (evt) {
  var target = evt.target;
  var hashtags = target.value.split(' ');

  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i].toLowerCase();
    if (hashtag.length > MaxValue.itemLength) {
      target.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку.');
    } else if (hashtag[0] !== '#') {
      target.setCustomValidity('первым символом хеш-тега должна быть решетка');
    } else if (hashtags.indexOf(hashtag) !== i) {
      target.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    } else if (hashtag.match(/#/ig).length > 1) {
      target.setCustomValidity('хэш-теги должны разделяться пробелами');
    } else {
      target.setCustomValidity('');
    }
  }

  if (hashtags.length > 5) {
    target.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  }
});

document.querySelector('.text__description').addEventListener('invalid', function (evt) {
  var target = evt.target;
  if (target.validity.tooLong) {
    target.setCustomValidity('длина комментария не может составлять больше 140 символов');
  }
});

document.querySelector('.img-upload__resize').addEventListener('click', imgUploadResizeClickHandler);

scalePin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var Scale = {
    startCoord: 0,
    width: parseFloat(scaleStyle.width)
  };

  var startCoords = {
    x: evt.clientX
  };

  scaleLevel.style.width = startCoords.x;

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    var coordsChange = scalePin.offsetLeft - shift.x;

    scaleValue.value = calcValue(coordsChange, Scale.width);

    if (coordsChange <= Scale.startCoord) {
      changeScale(Scale.startCoord);
    } else if (coordsChange >= Scale.width) {
      changeScale(Scale.width);
    } else {
      changeScale(coordsChange);
    }

    setValueFilter(document.querySelector('input:checked').value);

  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});
