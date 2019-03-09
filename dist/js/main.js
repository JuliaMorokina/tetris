"use strict";

window.addEventListener('DOMContentLoaded', function () {
  var overlay = document.querySelector('.overlay'),
      modal = document.querySelector('.modal'),
      speed = 0;
  modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('easy')) {
      speed = 1000;
    } else if (e.target.classList.contains('normal')) {
      speed = 500;
    } else if (e.target.classList.contains('hard')) {
      speed = 200;
    }

    if (e.target.classList.contains('button')) {
      modal.style.display = 'none';
      overlay.style.display = 'none';
      startGame();
    }
  });

  function startGame() {
    var tetris = document.createElement('div');
    tetris.classList.add('tetris');

    for (var _i = 1; _i < 181; _i++) {
      var excel = document.createElement('div');
      excel.classList.add('excel');
      tetris.appendChild(excel);
    }

    var main = document.querySelector('.main');
    main.appendChild(tetris);
    var excelItems = document.getElementsByClassName('excel'),
        i = 0;

    for (var _y = 18; _y > 0; _y--) {
      for (var _x = 1; _x < 11; _x++) {
        excelItems[i].setAttribute('posX', _x);
        excelItems[i].setAttribute('posY', _y);
        i++;
      }
    }

    var x = 5,
        y = 15;
    var mainArr = [[// палка
    [0, 1], [0, 2], [0, 3], // поворот на 90 градусов
    [[-1, 1], [0, 0], [1, -1], [2, -2]], // поворот на 180 градусов
    [[1, -1], [0, 0], [-1, 1], [-2, 2]], // поворот на 270 градусов
    [[-1, 1], [0, 0], [1, -1], [2, -2]], // поворот на 360 градусов
    [[1, -1], [0, 0], [-1, 1], [-2, 2]]], [//квадрат
    [1, 0], [0, 1], [1, 1], // поворот на 90 градусов
    [[0, 0], [0, 0], [0, 0], [0, 0]], // поворот на 180 градусов
    [[0, 0], [0, 0], [0, 0], [0, 0]], // поворот на 270 градусов
    [[0, 0], [0, 0], [0, 0], [0, 0]], // поворот на 360 градусов
    [[0, 0], [0, 0], [0, 0], [0, 0]]], // буква L
    [[1, 0], [0, 1], [0, 2], // поворот на 90 градусов
    [[0, 0], [-1, 1], [1, 0], [2, -1]], // поворот на 180 градусов
    [[1, -1], [1, -1], [-1, 0], [-1, 0]], // поворот на 270 градусов
    [[-1, 0], [0, -1], [2, -2], [1, -1]], // поворот на 360 градусов
    [[0, -1], [0, -1], [-2, 0], [-2, 0]]], // зеркальная L
    [[1, 0], [1, 1], [1, 2], // поворот на 90 градусов
    [[0, 0], [0, 0], [1, -1], [-1, -1]], // поворот на 180 градусов
    [[0, -1], [-1, 0], [-2, 1], [1, 0]], // поворот на 270 градусов
    [[2, 0], [0, 0], [1, -1], [1, -1]], // поворот на 360 градусов
    [[-2, 0], [1, -1], [0, 0], [-1, 1]]], // молния вправо
    [[1, 0], [-1, 1], [0, 1], // поворот на 90 градусов
    [[0, -1], [-1, 0], [2, -1], [1, 0]], // поворот на 180 градусов
    [[0, 0], [1, -1], [-2, 0], [-1, -1]], // поворот на 270 градусов
    [[0, -1], [-1, 0], [2, -1], [1, 0]], // поворот на 360 градусов
    [[0, 0], [1, -1], [-2, 0], [-1, -1]]], // молния влево
    [[1, 0], [1, 1], [2, 1], // поворот на 90 градусов
    [[2, -1], [0, 0], [1, -1], [-1, 0]], // поворот на 180 градусов
    [[-2, 0], [0, -1], [-1, 0], [1, -1]], // поворот на 270 градусов
    [[2, -1], [0, 0], [1, -1], [-1, 0]], // поворот на 360 градусов
    [[-2, 0], [0, -1], [-1, 0], [1, -1]]], // lego
    [[1, 0], [2, 0], [1, 1], // поворот на 90 градусов
    [[1, -1], [0, 0], [0, 0], [0, 0]], // поворот на 180 градусов
    [[0, 0], [-1, 0], [-1, 0], [1, -1]], // поворот на 270 градусов
    [[1, -1], [1, -1], [1, -1], [0, 0]], // поворот на 360 градусов
    [[-2, 0], [0, -1], [0, -1], [-1, -1]]]];
    var currentFigure = 0,
        figureBody = 0,
        rotate = 1;

    function createFigure() {
      function getRandom() {
        return Math.round(Math.random() * (mainArr.length - 1));
      }

      rotate = 1;
      currentFigure = getRandom();
      figureBody = [document.querySelector("[posX = \"".concat(x, "\"][posY = \"").concat(y, "\"]")), document.querySelector("[posX = \"".concat(x + mainArr[currentFigure][0][0], "\"][posY = \"").concat(y + mainArr[currentFigure][0][1], "\"]")), document.querySelector("[posX = \"".concat(x + mainArr[currentFigure][1][0], "\"][posY = \"").concat(y + mainArr[currentFigure][1][1], "\"]")), document.querySelector("[posX = \"".concat(x + mainArr[currentFigure][2][0], "\"][posY = \"").concat(y + mainArr[currentFigure][2][1], "\"]"))];

      for (var _i2 = 0; _i2 < figureBody.length; _i2++) {
        figureBody[_i2].classList.add('figure');
      }
    }

    createFigure();
    var score = 0,
        input = document.getElementsByTagName('input')[0];
    input.value = "\u0412\u0430\u0448\u0438 \u043E\u0447\u043A\u0438: ".concat(score);

    function moveFigure() {
      var moveFlag = true,
          coordinate = [[figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')], [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')], [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')], [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]];

      for (var _i3 = 0; _i3 < coordinate.length; _i3++) {
        if (coordinate[_i3][1] == 1 || document.querySelector("[posX = \"".concat(coordinate[_i3][0], "\"][posY = \"").concat(coordinate[_i3][1] - 1, "\"]")).classList.contains('set')) {
          moveFlag = false;
          break;
        }
      }

      if (moveFlag) {
        for (var _i4 = 0; _i4 < figureBody.length; _i4++) {
          figureBody[_i4].classList.remove('figure');
        }

        figureBody = [document.querySelector("[posX = \"".concat(coordinate[0][0], "\"][posY = \"").concat(coordinate[0][1] - 1, "\"]")), document.querySelector("[posX = \"".concat(coordinate[1][0], "\"][posY = \"").concat(coordinate[1][1] - 1, "\"]")), document.querySelector("[posX = \"".concat(coordinate[2][0], "\"][posY = \"").concat(coordinate[2][1] - 1, "\"]")), document.querySelector("[posX = \"".concat(coordinate[3][0], "\"][posY = \"").concat(coordinate[3][1] - 1, "\"]"))];

        for (var _i5 = 0; _i5 < figureBody.length; _i5++) {
          figureBody[_i5].classList.add('figure');
        }
      } else {
        for (var _i6 = 0; _i6 < figureBody.length; _i6++) {
          figureBody[_i6].classList.remove('figure');

          figureBody[_i6].classList.add('set');
        }

        for (var _i7 = 1; _i7 < 15; _i7++) {
          var count = 0;

          for (var j = 1; j < 11; j++) {
            if (document.querySelector("[posX = \"".concat(j, "\"][posY = \"").concat(_i7, "\"]")).classList.contains('set')) {
              count++;

              if (count == 10) {
                score += 10;
                input.value = "\u0412\u0430\u0448\u0438 \u043E\u0447\u043A\u0438: ".concat(score);

                for (var k = 1; k < 11; k++) {
                  document.querySelector("[posX = \"".concat(k, "\"][posY = \"").concat(_i7, "\"]")).classList.remove('set');
                }

                var set = document.querySelectorAll('.set'),
                    newSet = [];

                for (var s = 0; s < set.length; s++) {
                  var setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];

                  if (setCoordinates[1] > _i7) {
                    set[s].classList.remove('set');
                    newSet.push(document.querySelector("[posX = \"".concat(setCoordinates[0], "\"][posY = \"").concat(setCoordinates[1] - 1, "\"]")));
                  }
                }

                for (var a = 0; a < newSet.length; a++) {
                  newSet[a].classList.add('set');
                }

                _i7--;
              }
            }
          }
        }

        for (var _i8 = 1; _i8 < 11; _i8++) {
          if (document.querySelector("[posX = \"".concat(_i8, "\"][posY = \"15\"]")).classList.contains('set')) {
            clearInterval(interval);
            alert("\u0418\u0433\u0440\u0430 \u043E\u043A\u043E\u043D\u0447\u0435\u043D\u0430! \u0412\u0430\u0448\u0438 \u043E\u0447\u043A\u0438: ".concat(score));
            break;
          }
        }

        createFigure();
      }
    }

    var interval = setInterval(function () {
      moveFigure();
    }, speed);
    var flag = true;
    window.addEventListener('keydown', function (e) {
      var coordinate1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
          coordinate2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
          coordinate3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
          coordinate4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

      function getNewState(a) {
        flag = true;
        var figureNew = [document.querySelector("[posX = \"".concat(+coordinate1[0] + a, "\"][posY = \"").concat(coordinate1[1], "\"]")), document.querySelector("[posX = \"".concat(+coordinate2[0] + a, "\"][posY = \"").concat(coordinate2[1], "\"]")), document.querySelector("[posX = \"".concat(+coordinate3[0] + a, "\"][posY = \"").concat(coordinate3[1], "\"]")), document.querySelector("[posX = \"".concat(+coordinate4[0] + a, "\"][posY = \"").concat(coordinate4[1], "\"]"))];

        for (var _i9 = 0; _i9 < figureNew.length; _i9++) {
          if (!figureNew[_i9] || figureNew[_i9].classList.contains('set')) {
            flag = false;
          }
        }

        if (flag) {
          for (var _i10 = 0; _i10 < figureBody.length; _i10++) {
            figureBody[_i10].classList.remove('figure');
          }

          figureBody = figureNew;

          for (var _i11 = 0; _i11 < figureBody.length; _i11++) {
            figureBody[_i11].classList.add('figure');
          }
        }
      }

      if (e.keyCode == 37) {
        // нажатие стрелки влево
        getNewState(-1);
      } else if (e.keyCode == 39) {
        // нажатие стрелки вправо
        getNewState(1);
      } else if (e.keyCode == 40) {
        // нажатие стрелки вниз
        moveFigure();
      } else if (e.keyCode == 38) {
        // нажатие стрелки вниз
        flag = true;
        var figureNew = [document.querySelector("[posX = \"".concat(+coordinate1[0] + mainArr[currentFigure][rotate + 2][0][0], "\"][posY = \"").concat(+coordinate1[1] + mainArr[currentFigure][rotate + 2][0][1], "\"]")), document.querySelector("[posX = \"".concat(+coordinate2[0] + mainArr[currentFigure][rotate + 2][1][0], "\"][posY = \"").concat(+coordinate2[1] + mainArr[currentFigure][rotate + 2][1][1], "\"]")), document.querySelector("[posX = \"".concat(+coordinate3[0] + mainArr[currentFigure][rotate + 2][2][0], "\"][posY = \"").concat(+coordinate3[1] + mainArr[currentFigure][rotate + 2][2][1], "\"]")), document.querySelector("[posX = \"".concat(+coordinate4[0] + mainArr[currentFigure][rotate + 2][3][0], "\"][posY = \"").concat(+coordinate4[1] + mainArr[currentFigure][rotate + 2][3][1], "\"]"))];

        for (var _i12 = 0; _i12 < figureNew.length; _i12++) {
          if (!figureNew[_i12] || figureNew[_i12].classList.contains('set')) {
            flag = false;
          }
        }

        if (flag) {
          for (var _i13 = 0; _i13 < figureBody.length; _i13++) {
            figureBody[_i13].classList.remove('figure');
          }

          figureBody = figureNew;

          for (var _i14 = 0; _i14 < figureBody.length; _i14++) {
            figureBody[_i14].classList.add('figure');
          }

          if (rotate < 4) {
            rotate++;
          } else {
            rotate = 1;
          }
        }
      }
    });
  }
});