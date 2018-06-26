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

var setClassName = function (node, cls) {
  if (!node.classList.contains(cls)) {
    node.className = '';
  }
  node.classList.add('effects__preview--' + cls);
};

var setDataId = function (arr) {
  arr.forEach(function (item, i) {
    item.dataset.id = i;
  });
};

imgUpload.querySelector('.img-upload__input').addEventListener('change', function () {
  openWindowImgUpload(imgUploadOverlay);
  resetPropertiesUploadImg();
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
  resetPropertiesUploadImg();
  setClassName(document.querySelector('.img-upload__preview img'), target.value);
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

(function () {

  document.querySelector('.text__hashtags').addEventListener('input', function (evt) {
    var target = evt.target;
    var arrTargets = target.value.split(' ');
    var cloneArrTargets = [];

    arrTargets.forEach(function (item) {
      var itemMaxLength = 20;
      item = item.toLowerCase();
      if (item.length > itemMaxLength) {
        target.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку.');
      } else if (item.indexOf('#') !== 0) {
        target.setCustomValidity('первым символом хеш-тега должна быть решетка');
      } else if (item.length === 1) {
        target.setCustomValidity('хеш-тег не может состоять только из одной решетки');
      } else if (cloneArrTargets.indexOf(item) !== -1) {
        target.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      } else if (item.match(/#/ig).length > 1) {
        target.setCustomValidity('хэш-теги должны разделяться пробелами');
      } else {
        target.setCustomValidity('');
      }
      cloneArrTargets.push(item);
    });

    if (arrTargets.length > 5) {
      target.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    }
  });

  document.querySelector('.text__description').addEventListener('invalid', function (evt) {
    var target = evt.target;
    if (document.querySelector('.text__description').validity.tooLong) {
      target.setCustomValidity('длина комментария не может составлять больше 140 символов');
    }
  });
})();

(function () {
  window.scaleValue = document.querySelector('.scale__value');

  window.filters = {
    none: function () {
      return 'none';
    },
    chrome: function () {
      return 'grayscale(' + ((window.scaleValue.value * 1) / 100) + ')';
    },
    sepia: function () {
      return 'sepia(' + ((window.scaleValue.value * 1) / 100) + ')';
    },
    marvin: function () {
      return 'invert(' + ((window.scaleValue.value * 100) / 100) + '%)';
    },
    phobos: function () {
      return 'blur(' + ((window.scaleValue.value * 5) / 100) + 'px)';
    },
    heat: function () {
      var min = (((window.scaleValue.value) * 3) / 100);
      if (min <= 1) {
        min = 1;
      }
      return 'brightness(' + min + ')';
    },
  };
})();

(function () {
  var scaleLine = document.querySelector('.img-upload__scale');
  var scalePin = scaleLine.querySelector('.scale__pin');
  var coordsScaleLine = scaleLine.getBoundingClientRect();
  var scaleLevel = document.querySelector('.scale__level');

  var result = function (selector) {
    document.querySelector(selector).value = changeValueScale.inputValue + '%';
    document.querySelector('.img-upload__preview img').style.transform = 'scale(' + changeValueScale.scaleImg() + ')';
  };

  var changeValueScale = {
    step: 25,
    minControl: 25,
    maxControl: 100,
    inputValue: 100,
    scaleImg: function () {
      return changeValueScale.inputValue / 100;
    },
    increase: function (control, step, selector) {
      changeValueScale.inputValue -= step;
      if (changeValueScale.inputValue <= control) {
        changeValueScale.inputValue = control;
      }
      result(selector);
    },
    reduction: function (control, step, selector) {
      changeValueScale.inputValue += step;
      if (changeValueScale.inputValue >= control) {
        changeValueScale.inputValue = control;
      }
      result(selector);
    }
  };

  var imgUploadResizeClickHandler = function (evt) {
    evt.preventDefault();

    var target = evt.target;

    if (target.tagName !== 'BUTTON') {
      return;
    }

    if (target.classList.contains('resize__control--minus')) {
      changeValueScale.increase(changeValueScale.minControl, changeValueScale.step, 'input[name=scale]');
    } else {
      changeValueScale.reduction(changeValueScale.maxControl, changeValueScale.step, 'input[name=scale]');
    }

  };

  var changeScale = function (change) {
    scalePin.style.left = change + 'px';
    scaleLevel.style.width = change + 'px';
  };

  var calcValue = function (scaleValue, maxWidth) {
    return Math.round(scaleValue * 100 / maxWidth);
  };

  var setValueFilter = function (cls) {
    if (document.querySelector('.img-upload__preview img').classList.contains('effects__preview--' + cls) &&
      document.querySelector('.img-upload__preview img').className) {
      document.querySelector('.img-upload__preview img').style.filter = window.filters[cls]();
    }
  };

  document.querySelector('.img-upload__resize').addEventListener('click', imgUploadResizeClickHandler);

  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var SCALE_START_COORD = coordsScaleLine.left;
    var SCALE_WIDTH = scaleLine.offsetWidth - 40;

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
      window.scaleValue.value = calcValue(coordsChange, SCALE_WIDTH);

      if (coordsChange <= SCALE_START_COORD) {
        changeScale(SCALE_START_COORD);
      } else if (coordsChange >= SCALE_WIDTH) {
        changeScale(SCALE_WIDTH);
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
})();
