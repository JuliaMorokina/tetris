window.addEventListener('DOMContentLoaded', function() {

    let overlay = document.querySelector('.overlay'),
        modal = document.querySelector('.modal'),
        speed = 0;

    modal.addEventListener('click', function(e) {
        if(e.target.classList.contains('easy')) {
            speed = 1000;
        } else if(e.target.classList.contains('normal')) {
            speed = 500;
        } else if(e.target.classList.contains('hard')) {
            speed = 200;
        }

        if(e.target.classList.contains('button')) {
            modal.style.display = 'none';
            overlay.style.display = 'none';
            startGame();
        }
    });

    function startGame() {
        let tetris = document.createElement('div');

        tetris.classList.add('tetris');

        for(let i = 1; i < 181; i++) {
            let excel = document.createElement('div');

            excel.classList.add('excel');
            tetris.appendChild(excel);
        }

        let main = document.querySelector('.main');
        main.appendChild(tetris);

        let excelItems = document.getElementsByClassName('excel'),
            i = 0;

        for(let y = 18; y > 0; y--) {
            for(let x = 1; x < 11; x++) {
                excelItems[i].setAttribute('posX', x);
                excelItems[i].setAttribute('posY', y);
                i++;

            }
        }

        let x = 5,
            y = 15;

        let mainArr = [
            [ // палка
                [0, 1],
                [0, 2],
                [0, 3],
                // поворот на 90 градусов
                [
                    [-1, 1],
                    [0, 0],
                    [1, -1],
                    [2, -2]
                ],
                // поворот на 180 градусов
                [
                    [1, -1],
                    [0, 0],
                    [-1, 1],
                    [-2, 2]
                ],
                // поворот на 270 градусов
                [
                    [-1, 1],
                    [0, 0],
                    [1, -1],
                    [2, -2]
                ],
                // поворот на 360 градусов
                [
                    [1, -1],
                    [0, 0],
                    [-1, 1],
                    [-2, 2]
                ]
            ],
            [ //квадрат
                [1, 0],
                [0, 1],
                [1, 1],
                // поворот на 90 градусов
                [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0]
                ],
                // поворот на 180 градусов
                [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0]
                ],
                // поворот на 270 градусов
                [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0]
                ],
                // поворот на 360 градусов
                [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0]
                ]
            ],
            // буква L
            [
                [1, 0],
                [0, 1],
                [0, 2],
                // поворот на 90 градусов
                [
                    [0, 0],
                    [-1, 1],
                    [1, 0],
                    [2, -1]
                ],
                // поворот на 180 градусов
                [
                    [1, -1],
                    [1, -1],
                    [-1, 0],
                    [-1, 0]
                ],
                // поворот на 270 градусов
                [
                    [-1, 0],
                    [0, -1],
                    [2, -2],
                    [1, -1]
                ],
                // поворот на 360 градусов
                [
                    [0, -1],
                    [0, -1],
                    [-2, 0],
                    [-2, 0]
                ]
            ],
            // зеркальная L
            [
                [1, 0],
                [1, 1],
                [1, 2],
                // поворот на 90 градусов
                [
                    [0, 0],
                    [0, 0],
                    [1, -1],
                    [-1, -1]
                ],
                // поворот на 180 градусов
                [
                    [0, -1],
                    [-1, 0],
                    [-2, 1],
                    [1, 0]
                ],
                // поворот на 270 градусов
                [
                    [2, 0],
                    [0, 0],
                    [1, -1],
                    [1, -1]
                ],
                // поворот на 360 градусов
                [
                    [-2, 0],
                    [1, -1],
                    [0, 0],
                    [-1, 1]
                ]
            ],
            // молния вправо
            [
                [1, 0],
                [-1, 1],
                [0, 1],
                // поворот на 90 градусов
                [
                    [0, -1],
                    [-1, 0],
                    [2, -1],
                    [1, 0]
                ],
                // поворот на 180 градусов
                [
                    [0, 0],
                    [1, -1],
                    [-2, 0],
                    [-1, -1]
                ],
                // поворот на 270 градусов
                [
                    [0, -1],
                    [-1, 0],
                    [2, -1],
                    [1, 0]
                ],
                // поворот на 360 градусов
                [
                    [0, 0],
                    [1, -1],
                    [-2, 0],
                    [-1, -1]
                ]
            ],
            // молния влево
            [
                [1, 0],
                [1, 1],
                [2, 1],
                // поворот на 90 градусов
                [
                    [2, -1],
                    [0, 0],
                    [1, -1],
                    [-1, 0]
                ],
                // поворот на 180 градусов
                [
                    [-2, 0],
                    [0, -1],
                    [-1, 0],
                    [1, -1]
                ],
                // поворот на 270 градусов
                [
                    [2, -1],
                    [0, 0],
                    [1, -1],
                    [-1, 0]
                ],
                // поворот на 360 градусов
                [
                    [-2, 0],
                    [0, -1],
                    [-1, 0],
                    [1, -1]
                ]
            ],
            // lego
            [
                [1, 0],
                [2, 0],
                [1, 1],
                // поворот на 90 градусов
                [
                    [1, -1],
                    [0, 0],
                    [0, 0],
                    [0, 0]
                ],
                // поворот на 180 градусов
                [
                    [0, 0],
                    [-1, 0],
                    [-1, 0],
                    [1, -1]
                ],
                // поворот на 270 градусов
                [
                    [1, -1],
                    [1, -1],
                    [1, -1],
                    [0, 0]
                ],
                // поворот на 360 градусов
                [
                    [-2, 0],
                    [0, -1],
                    [0, -1],
                    [-1, -1]
                ]
            ]
        ];

        let currentFigure = 0,
            figureBody = 0,
            rotate = 1;

        function createFigure() {
            function getRandom() {
                return Math.round(Math.random() * (mainArr.length - 1));
            }

            rotate = 1;
            currentFigure = getRandom();

            figureBody = [
                document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
                document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
                document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
                document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
            ];

            for(let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        }

        createFigure();

        let score = 0,
            input = document.getElementsByTagName('input')[0];

        input.value = `Ваши очки: ${score}`;

        function moveFigure() {
            let moveFlag = true,
                coordinate = [
                    [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
                    [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
                    [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
                    [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
                ];


            for(let i = 0; i < coordinate.length; i++) {
                if(coordinate[i][1] == 1 || document.querySelector(`[posX = "${coordinate[i][0]}"][posY = "${coordinate[i][1] - 1}"]`).classList.contains('set')) {
                    moveFlag = false;
                    break;
                }
            }

            if(moveFlag) {
                for(let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }
                figureBody = [
                    document.querySelector(`[posX = "${coordinate[0][0]}"][posY = "${coordinate[0][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinate[1][0]}"][posY = "${coordinate[1][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinate[2][0]}"][posY = "${coordinate[2][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinate[3][0]}"][posY = "${coordinate[3][1] - 1}"]`)
                ];
                for(let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }
            } else {
                for(let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                    figureBody[i].classList.add('set');
                }

                for(let i = 1; i < 15; i++) {
                    let count = 0;
                    for(let j = 1; j < 11; j++) {
                        if(document.querySelector(`[posX = "${j}"][posY = "${i}"]`).classList.contains('set')) {
                            count++;
                            
                            if(count == 10) {
                                score +=10;
                                input.value = `Ваши очки: ${score}`;
                                for(let k = 1; k < 11; k++) {
                                    document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.remove('set');
                                }

                                let set = document.querySelectorAll('.set'),
                                    newSet = [];

                                for(let s = 0; s < set.length; s++) {
                                    let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                                    if(setCoordinates[1] > i) {
                                        set[s].classList.remove('set');
                                        newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`));
                                    }
                                }
                                for(let a = 0; a < newSet.length; a++) {
                                    newSet[a].classList.add('set');
                                }
                                i--;
                            }
                        }
                    }
                }       
                for(let i = 1; i < 11; i++) {
                    if(document.querySelector(`[posX = "${i}"][posY = "15"]`).classList.contains('set')) {
                        clearInterval(interval);
                        alert(`Игра окончена! Ваши очки: ${score}`);
                        break;
                    }
                }
                createFigure();
            }
        }

        let interval = setInterval(() => {
            moveFigure();
        }, speed);

        let flag = true;

        window.addEventListener('keydown', e => {
            let coordinate1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
                coordinate2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
                coordinate3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
                coordinate4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

            function getNewState(a) {
                flag = true;

                let figureNew = [
                    document.querySelector(`[posX = "${+coordinate1[0] + a}"][posY = "${coordinate1[1]}"]`),
                    document.querySelector(`[posX = "${+coordinate2[0] + a}"][posY = "${coordinate2[1]}"]`),
                    document.querySelector(`[posX = "${+coordinate3[0] + a}"][posY = "${coordinate3[1]}"]`),
                    document.querySelector(`[posX = "${+coordinate4[0] + a}"][posY = "${coordinate4[1]}"]`)
                ];

                for(let i = 0; i < figureNew.length; i++) {
                    if(!figureNew[i] || figureNew[i].classList.contains('set')) {
                        flag = false;

                    }
                }

                if(flag) {
                    for(let i = 0; i < figureBody.length; i++) {
                        figureBody[i].classList.remove('figure');
                    }

                    figureBody = figureNew;

                    for(let i = 0; i < figureBody.length; i++) {
                        figureBody[i].classList.add('figure');
                    }
                }
            }

            
            if(e.keyCode == 37) { // нажатие стрелки влево
                getNewState(-1);
            } else if(e.keyCode == 39) { // нажатие стрелки вправо
                getNewState(1);
            } else if(e.keyCode == 40) { // нажатие стрелки вниз
                moveFigure();
            } else if(e.keyCode == 38) { // нажатие стрелки вниз
                flag = true;

                let figureNew = [
                    document.querySelector(`[posX = "${+coordinate1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinate1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
                    document.querySelector(`[posX = "${+coordinate2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinate2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
                    document.querySelector(`[posX = "${+coordinate3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinate3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
                    document.querySelector(`[posX = "${+coordinate4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinate4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`)
                ];

                for(let i = 0; i < figureNew.length; i++) {
                    if(!figureNew[i] || figureNew[i].classList.contains('set')) {
                        flag = false;

                    }
                }

                if(flag) {
                    for(let i = 0; i < figureBody.length; i++) {
                        figureBody[i].classList.remove('figure');
                    }

                    figureBody = figureNew;

                    for(let i = 0; i < figureBody.length; i++) {
                        figureBody[i].classList.add('figure');
                    }

                    if(rotate < 4) {
                        rotate++;
                    } else {
                        rotate = 1;
                    }
                }
            } 

        });
    }
});

