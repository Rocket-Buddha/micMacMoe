var Action = function (_y, _x) {

    var xMovePosition = _x;
    var yMovePosition = _y;
    var minimaxVal = 0;

    this.applyTo = function (_state) {
        var array = [[], [], []];
        array[0][0] = _state.getState()[0][0];
        array[0][1] = _state.getState()[0][1];
        array[0][2] = _state.getState()[0][2];
        array[1][0] = _state.getState()[1][0];
        array[1][1] = _state.getState()[1][1];
        array[1][2] = _state.getState()[1][2];
        array[2][0] = _state.getState()[2][0];
        array[2][1] = _state.getState()[2][1];
        array[2][2] = _state.getState()[2][2];

        var next = new BoardState(_state.getNextTurn(),
                _state.getXCounts(),
                _state.getOCounts(),
                array,
                _state.getResult(),
                _state.getGameState());
        next.setAction(this);
        return next;
    };

    this.setMiniMaxValue = function (_minimaxVal) {
        minimaxVal = _minimaxVal;
    };

    this.getX = function () {
        return xMovePosition;
    };

    this.getY = function () {
        return yMovePosition;
    };
    this.getMiniMaxValue = function () {
        return minimaxVal;
    };
};

var BoardState = function (_nextTurn,
        _xMovesCount,
        _oMovesCount,
        _state,
        _result,
        _gameState) {

    var nextTurn = _nextTurn;
    var xMovesCount = _xMovesCount;
    var oMovesCount = _oMovesCount;
    var state = _state;
    var result = _result;
    var gameState = _gameState;

    this.isTerminal = function () {

        if ((state[0][0] === state[0][1]
                && state[0][0] === state[0][2])
                && (state[0][0] === AVATARTYPE.X
                        || state[0][0] === AVATARTYPE.O)) {

            if (state[0][0] === gameState.getPlayerAvatar()) {
                result = RESULTTYPE.HUMANWINS;
                return true;
            } else if (state[0][0] === gameState.getAIAvatar()) {
                result = RESULTTYPE.IAWINS;
                return true;
            }
        }
        if ((state[1][0] === state[1][1]
                && state[1][0] === state[1][2])
                && (state[1][0] === AVATARTYPE.X
                        || state[1][0] === AVATARTYPE.O)) {

            if (state[1][0] === gameState.getPlayerAvatar()) {
                result = RESULTTYPE.HUMANWINS;
                return true;
            } else if (state[1][0] === gameState.getAIAvatar()) {
                result = RESULTTYPE.IAWINS;
                return true;
            }
        }
        if ((state[2][0] === state[2][1]
                && state[2][0] === state[2][2])
                && (state[2][0] === AVATARTYPE.X
                        || state[2][0] === AVATARTYPE.O)) {

            if (state[2][0] === gameState.getPlayerAvatar()) {
                result = RESULTTYPE.HUMANWINS;
                return true;
            } else if (state[2][0] === gameState.getAIAvatar()) {
                result = RESULTTYPE.IAWINS;
                return true;
            }
        }
        if ((state[0][0] === state[1][0]
                && state[0][0] === state[2][0])
                && (state[0][0] === AVATARTYPE.X
                        || state[0][0] === AVATARTYPE.O)) {

            if (state[0][0] === gameState.getPlayerAvatar()) {
                result = RESULTTYPE.HUMANWINS;
                return true;
            } else if (state[0][0] === gameState.getAIAvatar()) {
                result = RESULTTYPE.IAWINS;
                return true;
            }
        }
        if ((state[0][1] === state[1][1]
                && state[0][1] === state[2][1])
                && (state[0][1] === AVATARTYPE.X
                        || state[0][1] === AVATARTYPE.O)) {

            if (state[0][1] === gameState.getPlayerAvatar()) {
                result = RESULTTYPE.HUMANWINS;
                return true;
            } else if (state[0][1] === gameState.getAIAvatar()) {
                result = RESULTTYPE.IAWINS;
                return true;
            }
        }
        if ((state[0][2] === state[1][2]
                && state[0][2] === state[2][2])
                && (state[0][2] === AVATARTYPE.X
                        || state[0][2] === AVATARTYPE.O)) {

            if (state[0][2] === gameState.getPlayerAvatar()) {
                result = RESULTTYPE.HUMANWINS;
                return true;
            } else if (state[0][2] === gameState.getAIAvatar()) {
                result = RESULTTYPE.IAWINS;
                return true;
            }
        }
        if ((state[0][0] === state[1][1]
                && state[0][0] === state[2][2])
                && (state[0][0] === AVATARTYPE.X
                        || state[0][0] === AVATARTYPE.O)) {

            if (state[0][0] === gameState.getPlayerAvatar()) {
                result = RESULTTYPE.HUMANWINS;
                return true;
            } else if (state[0][0] === gameState.getAIAvatar()) {
                result = RESULTTYPE.IAWINS;
                return true;
            }
        }
        if ((state[2][0] === state[1][1]
                && state[2][0] === state[0][2])
                && (state[2][0] === AVATARTYPE.X
                        || state[2][0] === AVATARTYPE.O)) {

            if (state[2][0] === gameState.getPlayerAvatar()) {
                result = RESULTTYPE.HUMANWINS;
                return true;
            } else if (state[2][0] === gameState.getAIAvatar()) {
                result = RESULTTYPE.IAWINS;
                return true;
            }
        }
        var available = emptyCells();
        if (available.length === 0) {
            result = RESULTTYPE.TIE;
            return true;
        } else {
            return false;
        }
        return undefined;
    };

    this.setAction = function (_action) {
        if (result !== RESULTTYPE.HUMANWINS
                && result !== RESULTTYPE.IAWINS
                && result !== RESULTTYPE.TIE) {
            if (state[_action.getY()][_action.getX()] !== AVATARTYPE.X
                    && state[_action.getY()][_action.getX()] !== AVATARTYPE.O) {
                state[_action.getY()][_action.getX()] = nextTurn;
                if (nextTurn === AVATARTYPE.X) {
                    xMovesCount++;
                    nextTurn = AVATARTYPE.O;
                } else if (nextTurn === AVATARTYPE.O) {
                    oMovesCount++;
                    nextTurn = AVATARTYPE.X;
                }
                this.isTerminal();
            }
            ;
        }
    };

    this.reset = function (_firstTurn) {
        nextTurn = _firstTurn;
        xMovesCount = 0;
        oMovesCount = 0;
        state = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
        result = '';
    };

    this.isPlayable = function (y, x) {
        return state[y][x] !== AVATARTYPE.X
                && state[y][x] !== AVATARTYPE.O;
    };

    var emptyCells = function () {
        var arrIndex = [];
        if (state[0][0] !== AVATARTYPE.X
                && state[0][0] !== AVATARTYPE.O)
            arrIndex.push([0, 0]);
        if (state[0][1] !== AVATARTYPE.X
                && state[0][1] !== AVATARTYPE.O)
            arrIndex.push([0, 1]);
        if (state[0][2] !== AVATARTYPE.X
                && state[0][2] !== AVATARTYPE.O)
            arrIndex.push([0, 2]);
        if (state[1][0] !== AVATARTYPE.X
                && state[1][0] !== AVATARTYPE.O)
            arrIndex.push([1, 0]);
        if (state[1][1] !== AVATARTYPE.X
                && state[1][1] !== AVATARTYPE.O)
            arrIndex.push([1, 1]);
        if (state[1][2] !== AVATARTYPE.X
                && state[1][2] !== AVATARTYPE.O)
            arrIndex.push([1, 2]);
        if (state[2][0] !== AVATARTYPE.X
                && state[2][0] !== AVATARTYPE.O)
            arrIndex.push([2, 0]);
        if (state[2][1] !== AVATARTYPE.X
                && state[2][1] !== AVATARTYPE.O)
            arrIndex.push([2, 1]);
        if (state[2][2] !== AVATARTYPE.X
                && state[2][2] !== AVATARTYPE.O)
            arrIndex.push([2, 2]);
        return arrIndex;
    };

    this.getGameState = function () {
        return gameState;
    };

    this.getState = function () {
        return state;
    };

    this.getResult = function () {
        return result;
    };

    this.getOCounts = function () {
        return oMovesCount;
    };

    this.getXCounts = function () {
        return xMovesCount;
    };

    this.getNextTurn = function () {
        return nextTurn;
    };

    this.emptyCells = function () {
        return emptyCells();
    };
};

var GAMESTATETYPE = {
    NOTSTARTED: 'NOTSTARTED',
    IATURN: 'IATURN',
    HUMANTURN: 'HUMANTURN',
    WAITNEXTGAME: 'WAITNEXTGAME'
};

var FIRSTTURNTYPE = {
    AI: 'AI',
    HUMAN: 'HUMAN'
};

var RESULTTYPE = {
    IAWINS: 'IAWINS',
    HUMANWINS: 'HUMANWINS',
    TIE: 'TIE'
};

var GameState = function () {

    var gameState = GAMESTATETYPE.NOTSTARTED;
    var actualGameFirstTurn;
    var AIWins = '-';
    var humanWins = '-';
    var ties = '-';
    var playerAvatar = AVATARTYPE.X;
    var AIAvatar = AVATARTYPE.O;

    this.getStatus = function () {
        return gameState;
    };

    this.getIAWins = function () {
        return AIWins;
    };

    this.getHumanWins = function () {
        return humanWins;
    };

    this.getTies = function () {
        return ties;
    };

    this.getPlayerAvatar = function () {
        return playerAvatar;
    };

    this.getAIAvatar = function () {
        return AIAvatar;
    };

    this.getActualGameFirstTurn = function () {
        return actualGameFirstTurn;
    };

    this.startGame = function (_firstTurn) {
        if (gameState === GAMESTATETYPE.NOTSTARTED) {
            actualGameFirstTurn = _firstTurn;
            AIWins = 0;
            humanWins = 0;
            ties = 0;
            if (actualGameFirstTurn === FIRSTTURNTYPE.HUMAN)
                gameState = GAMESTATETYPE.HUMANTURN;
            else if (actualGameFirstTurn === FIRSTTURNTYPE.AI)
                gameState = GAMESTATETYPE.IATURN;
        } else
            throw 'error de estado';
    };

    this.advanceTurn = function () {
        if (gameState === GAMESTATETYPE.HUMANTURN) {
            gameState = GAMESTATETYPE.IATURN;
        } else if (gameState === GAMESTATETYPE.IATURN) {
            gameState = GAMESTATETYPE.HUMANTURN;
        }
    };

    this.waitGame = function (_result) {
        if (gameState === GAMESTATETYPE.IATURN
                || gameState === GAMESTATETYPE.HUMANTURN) {
            gameState = GAMESTATETYPE.WAITNEXTGAME;
            if (_result === RESULTTYPE.HUMANWINS)
                humanWins++;
            else if (_result === RESULTTYPE.IAWINS)
                AIWins++;
            else if (_result === RESULTTYPE.TIE)
                ties++;
        } else
            throw 'error de estado';
    };

    this.nextGame = function () {
        if (gameState === GAMESTATETYPE.WAITNEXTGAME) {
            if (actualGameFirstTurn === FIRSTTURNTYPE.HUMAN) {
                actualGameFirstTurn = FIRSTTURNTYPE.AI;
                gameState = GAMESTATETYPE.IATURN;
            } else if (actualGameFirstTurn === FIRSTTURNTYPE.AI) {
                actualGameFirstTurn = FIRSTTURNTYPE.HUMAN;
                gameState = GAMESTATETYPE.HUMANTURN;
            }
        } else
            throw 'error de estado';
    };

    this.endGame = function () {
        gameState = GAMESTATETYPE.NOTSTARTED;
        AIWins = '-';
        humanWins = '-';
        ties = '-';
    };

    this.setPlayerAvatar = function (avatar) {
        if (gameState === GAMESTATETYPE.NOTSTARTED) {
            if (avatar === AVATARTYPE.X) {
                playerAvatar = AVATARTYPE.X;
                AIAvatar = AVATARTYPE.O;
            }
            if (avatar === AVATARTYPE.O) {
                playerAvatar = AVATARTYPE.O;
                AIAvatar = AVATARTYPE.X;
            }
        } else
            throw 'error de estado';
    };
};

var AVATARTYPE = {
    X: 'X',
    O: 'O'
};

var AI = function (_playerAvatar, _AIAvatar) {
    
    if (AI.prototype._singletonInstance) {
        return AI.prototype._singletonInstance;
    }

   AI.prototype._singletonInstance = this;

    var score = function (_state) {
        if (_state.getResult() !== '') {
            if (_state.getResult() === RESULTTYPE.HUMANWINS) {
                return 10 - _state.getOCounts();
            } else if (_state.getResult() === RESULTTYPE.IAWINS) {
                return -10 + _state.getOCounts();
            } else if (_state.getResult() === RESULTTYPE.TIE) {
                return 0;
            }
        }
    };

    var minMaxValue = function (_state) {
        if (_state.isTerminal()) {
            return score(_state);
        }
        var availableNextStages = getAvailableNextStages(_state);
        if (_state.getNextTurn() === playerAvatar) {
            var bestMoveValue = -1000;
            for (var i = 0; i < availableNextStages.length; i++) {
                var predictedMoveValue = minMaxValue(availableNextStages[i]);
                if (predictedMoveValue > bestMoveValue) {
                    bestMoveValue = predictedMoveValue;
                }
            }
        }
        if (_state.getNextTurn() === AIAvatar) {
            var bestMoveValue = 1000;
            for (var i = 0; i < availableNextStages.length; i++) {
                var predictedMoveValue = minMaxValue(availableNextStages[i]);
                if (predictedMoveValue < bestMoveValue) {
                    bestMoveValue = predictedMoveValue;
                }
            }
        }
        return bestMoveValue;
    };

    this.move = function (_currentState) {
        if (_currentState.emptyCells().length === 9) {
           var action = new Action(Math.floor(Math.random() * 3), Math.floor(Math.random() * 3));
           return action.applyTo(_currentState);
        } else {
            var bestMoveValue = 1000;
            var availableNextStages = getAvailableNextStages(_currentState);
            for (var i = 0; i < availableNextStages.length; i++) {
                var predictedMoveValue = minMaxValue(availableNextStages[i]);
                if (predictedMoveValue < bestMoveValue) {
                    bestMoveValue = predictedMoveValue;
                    var move = availableNextStages[i];
                }
            }
            return move;
        }
    };

    var getAvailableNextStages = function (_currentState) {
        var availableCells = _currentState.emptyCells();
        var availableNextStages = availableCells.map(function (pos) {
            var action = new Action(pos[0], pos[1]);
            var next = action.applyTo(_currentState);
            return next;
        });
        return availableNextStages;
    };

    var playerAvatar = _playerAvatar;
    var AIAvatar = _AIAvatar;
};

var MainController = function () {

    if (MainController.prototype._singletonInstance) {
        return MainController.prototype._singletonInstance;
    }
    MainController.prototype._singletonInstance = this;

    this.setPlayerAvatar = function (avatar) {
        gameModel.getGameState()
                .setPlayerAvatar(avatar);
    };

    this.newGame = function () {
        if (gameModel.getGameState()
                .getStatus() === GAMESTATETYPE.NOTSTARTED) {
            this.startGame(FIRSTTURNTYPE.HUMAN);
        } else {
            pageView.toggleRestartModal();
        }
    };

    this.startGame = function (_firstTurn) {
        if (gameModel.getGameState()
                .getStatus() === GAMESTATETYPE.NOTSTARTED) {
            if (_firstTurn === FIRSTTURNTYPE.HUMAN) {
                boardModel.getBoardState()
                        .reset(gameModel.getGameState()
                                .getPlayerAvatar());
                gameModel.getGameState()
                        .startGame(FIRSTTURNTYPE.HUMAN);
                gameModel.dataChange();
                boardModel.dataChange();
            } else if (_firstTurn === FIRSTTURNTYPE.IA) {
                boardModel.getBoardState()
                        .reset(gameModel.getGameState()
                                .getAIAvatar());
                gameModel.getGameState()
                        .startGame(FIRSTTURNTYPE.IA);
                doAITurn();
                gameModel.dataChange();
                boardModel.dataChange();
            }
        }
    };

    this.restartGame = function (_firstTurn) {
        gameModel.getGameState().endGame();
        this.startGame(_firstTurn);

    };

    this.doHumanTurn = function (_action) {
        if (gameModel.getGameState().getStatus() === GAMESTATETYPE.HUMANTURN
                && boardModel.getBoardState().isPlayable(_action.getY(), _action.getX())) {
            boardModel.getBoardState().setAction(_action);
            boardModel.dataChange();
            if (checkWiner() === false) {
                gameModel.getGameState().advanceTurn();
                setTimeout(doAITurn, 1);
            }
        }
    };

    var checkWiner = function () {
        if (boardModel.getBoardState()
                .getResult() === RESULTTYPE.HUMANWINS
                || boardModel.getBoardState()
                .getResult() === RESULTTYPE.IAWINS
                || boardModel.getBoardState()
                .getResult() === RESULTTYPE.TIE) {
            gameModel.getGameState()
                    .waitGame(boardModel.getBoardState()
                            .getResult());
            pageView.winDelay();
            return true;
        }
        return false;
    };

    var doAITurn = function () {
        if (gameModel.getGameState().getStatus() === GAMESTATETYPE.IATURN) {
            var ai = new AI(gameModel.getGameState().getPlayerAvatar(), gameModel.getGameState().getAIAvatar());
            boardModel.setBoardState(ai.move(boardModel.getBoardState()));
            boardModel.dataChange();
            if (checkWiner() === false) {
                gameModel.getGameState().advanceTurn();
            }
        }
    };

    this.nextGame = function () {
        if (gameModel.getGameState().getStatus() === GAMESTATETYPE.WAITNEXTGAME) {
            gameModel.getGameState().nextGame();
            if (gameModel.getGameState().getStatus() === GAMESTATETYPE.IATURN) {
                boardModel.getBoardState().reset(gameModel.getGameState().getAIAvatar());
                doAITurn();
            } else if (gameModel.getGameState().getStatus() === GAMESTATETYPE.HUMANTURN) {
                boardModel.getBoardState().reset(gameModel.getGameState().getPlayerAvatar());
            }
            boardModel.dataChange();
            gameModel.dataChange();
        }
    };

    var gameModel = new GameModel();
    var boardModel = new BoardModel(gameModel.getGameState());
    var boardView = new BoardView();
    var pageView = new PageView();
    var tableScoreBoardView = new TableScoreBoardView();
    boardModel.addSuscriber(boardView);
    gameModel.addSuscriber(tableScoreBoardView);

};

var BoardModel = function (_gameState) {

    if (BoardModel.prototype._singletonInstance) {
        return BoardModel.prototype._singletonInstance;
    };
    
    BoardModel.prototype._singletonInstance = this;
    var suscribers = [];
    var currentBoardState = new BoardState(_gameState.getPlayerAvatar(),
            0,
            0,
            [['0', '1', '0'], ['0', '0', '1'], ['1', '1', '1']],
            '',
            _gameState);

    this.dataChange = function () {
        for (var i = 0; i < suscribers.length; i++) {
            suscribers[i].refresh();
        }
    };

    this.addSuscriber = function (suscriber) {
        suscribers.push(suscriber);
    };

    this.getBoardState = function () {
        return currentBoardState;
    };

    this.setBoardState = function (_currentBoardState) {
        currentBoardState = _currentBoardState;
    };
};

var GameModel = function () {

    if (GameModel.prototype._singletonInstance) {
        return GameModel.prototype._singletonInstance;
    }
    GameModel.prototype._singletonInstance = this;
    var suscribers = [];
    var gameState = new GameState ();

    this.dataChange = function () {

        for (var i = 0; i < suscribers.length; i++) {
            suscribers[i].refresh();
        }
    };

    this.addSuscriber = function (suscriber) {
        suscribers.push(suscriber);
    };
    
    this.getGameState = function(){
        return gameState;
    };
};

var BoardView = function () {

    if (BoardView.prototype._singletonInstance) {
        return BoardView.prototype._singletonInstance;
    }
    BoardView.prototype._singletonInstance = this;
    var model = new BoardModel();

    var draw = function () {
        var state = model.getBoardState().getState();
        $("#cell1").html(state[0][0]);
        $("#cell2").html(state[0][1]);
        $("#cell3").html(state[0][2]);
        $("#cell4").html(state[1][0]);
        $("#cell5").html(state[1][1]);
        $("#cell6").html(state[1][2]);
        $("#cell7").html(state[2][0]);
        $("#cell8").html(state[2][1]);
        $("#cell9").html(state[2][2]);
    };

    var loadListeners = function () {
        $("#cell1").click(function () {
            sendAction(action = new Action(0, 0));
        });
        $("#cell2").click(function () {
            sendAction(action = new Action(0, 1));
        });
        $("#cell3").click(function () {
            sendAction(action = new Action(0, 2));
        });
        $("#cell4").click(function () {
            sendAction(action = new Action(1, 0));
        });
        $("#cell5").click(function () {
            sendAction(action = new Action(1, 1));
        });
        $("#cell6").click(function () {
            sendAction(action = new Action(1, 2));
        });
        $("#cell7").click(function () {
            sendAction(action = new Action(2, 0));
        });
        $("#cell8").click(function () {
            sendAction(action = new Action(2, 1));
        });
        $("#cell9").click(function () {
            sendAction(action = new Action(2, 2));
        });
    };

    var sendAction = function (_action) {
        $("#clock").show();
        (new MainController()).doHumanTurn(_action);
        $("#clock").delay(100).fadeOut(600);
    };

    this.refresh = function () {
        draw();
    };

    draw();
    loadListeners();
};

var PageView = function () {

    if (PageView.prototype._singletonInstance) {
        return PageView.prototype._singletonInstance;
    }
    PageView.prototype._singletonInstance = this;

    var loadListeners = function () {
        $("#btnYes").click(function () {
            (new MainController()).restartGame(FIRSTTURNTYPE.HUMAN);
        });
        $("#btnNewGame").click(function () {
            (new MainController()).newGame();
        });
        $("#btnO").click(function () {
            (new MainController()).setPlayerAvatar(AVATARTYPE.O);
        });
        $("#btnX").click(function () {
            (new MainController()).setPlayerAvatar(AVATARTYPE.X);
        });       
        $("#screen").click(function () {
            $("#screen").hide();
            (new MainController()).nextGame(); 
        });
    };
    
    this.winDelay = function () {
        $("#board").animate({
            opacity: 0.4
        }, 1500);
        $("#board").animate({
            opacity: 1
        }, 1500);
        $("#screen").show();
    };

    this.toggleRestartModal = function () {
        $('#modalRestart').modal('toggle');
    };

    loadListeners();
};

var TableScoreBoardView = function () {

    if (TableScoreBoardView.prototype._singletonInstance) {
        return TableScoreBoardView.prototype._singletonInstance;
    }
    TableScoreBoardView.prototype._singletonInstance = this;
    var model = new GameModel().getGameState();

    var draw = function () {
        $("#pIAWins").html("IA Wins: " + model.getIAWins());
        $("#pHumanWins").html("Human Wins: " + model.getHumanWins());
        $("#pTies").html("Ties: " + model.getTies());
    };

    this.refresh = function () {
        draw();
    };

    draw();
};

function Main() {
    
};

Main.main = function () {
    new MainController();
};

Main.main();