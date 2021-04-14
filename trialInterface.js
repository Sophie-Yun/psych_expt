function DISABLE_DEFAULT_KEYS() {
    document.onkeydown = function(e) {
        if(e.keyCode == 13 || e.keyCode == 32) {
            e.preventDefault();
            //e.stopPropagation();
        }
    }
}
/*
  #####     #    #     # #######     #####  ######  ### ######
 #     #   # #   ##   ## #          #     # #     #  #  #     #
 #        #   #  # # # # #          #       #     #  #  #     #
 #  #### #     # #  #  # #####      #  #### ######   #  #     #
 #     # ####### #     # #          #     # #   #    #  #     #
 #     # #     # #     # #          #     # #    #   #  #     #
  #####  #     # #     # #######     #####  #     # ### ######

*/

function ADD_BARRIER(obj) {
    if(obj.barrier["up"] == "" || obj.barrier["up"] == undefined)
        return;
    else {
        for (var i = 0; i < obj.barrier["up"].length; i++) {
            var coord = obj.barrier["up"][i];
            $("#shape" + coord[0] + "v" + coord[1]).css("border-top", "black solid");
        }
        for (var i = 0; i < obj.barrier["down"].length; i++) {
            var coord = obj.barrier["down"][i];
            $("#shape" + coord[0] + "v" + coord[1]).css("border-bottom", "black solid");
        }
    }
}

function CREATE_GRID(obj) {
    var gridArray = obj.gridArray;
    var nrow = GRID_NROW;
    var ncol = GRID_NCOL;
    var shapeId;
    if(obj.isTryMove) {
        for (var row = 0; row < nrow; row++) {
            for (var col = 0; col < ncol; col++) {
                shapeId = "shape" + row + "v" + col;

                if (gridArray[row][col]!= null){
                    $("#tryMoveGridContainer").append("<div class='gridItem' id='" + shapeId + "'></div>")
                    $("#" + shapeId).append($("<img>", {class: "shape", src: gridArray[row][col]}));
                }
                else{
                    $("#tryMoveGridContainer").append("<div class='gridEmpty' id='" + shapeId + "'></div>");
                }
            };
        };
        ADD_BARRIER(obj);
    } else if (obj.isTrySay) {
        for (var row = 0; row < nrow; row++) {
            for (var col = 0; col < ncol; col++) {
                shapeId = "shape" + row + "v" + col;

                if (gridArray[row][col]!= null){
                    $("#trySayGridContainer").append("<div class='gridItem' id='" + shapeId + "'></div>")
                    $("#" + shapeId).append($("<img>", {class: "shape", src: gridArray[row][col]}));
                }
                else{
                    $("#trySayGridContainer").append("<div class='gridEmpty' id='" + shapeId + "'></div>");
                }
            };
        };
    } else if (obj.isSanityCheck) {
        for (var row = 0; row < nrow; row++) {
            for (var col = 0; col < ncol; col++) {
                shapeId = "shape" + row + "v" + col;

                if (gridArray[row][col]!= null){
                    $("#sanityCheckGridContainer").append("<div class='gridItem' id='" + shapeId + "'></div>")
                    $("#" + shapeId).append($("<img>", {class: "shape", src: gridArray[row][col]}));
                }
                else{
                    $("#sanityCheckGridContainer").append("<div class='gridEmpty' id='" + shapeId + "'></div>");
                }
            };
        };
        ADD_BARRIER(obj);
    } else if (obj.isPracTrial) {
        for (var row = 0; row < nrow; row++) {
            for (var col = 0; col < ncol; col++) {
                shapeId = "shape" + row + "v" + col;

                if (gridArray[row][col]!= null){
                    $("#practiceGridContainer").append("<div class='gridItem' id='" + shapeId + "'></div>")
                    $("#" + shapeId).append($("<img>", {class: "shape", src: gridArray[row][col]}));
                }
                else{
                    $("#practiceGridContainer").append("<div class='gridEmpty' id='" + shapeId + "'></div>");
                }
            };
        };
    } else if (obj.isExptTrial) {
        for (var row = 0; row < nrow; row++) {
            for (var col = 0; col < ncol; col++) {
                shapeId = "shape" + row + "v" + col;

                if (gridArray[row][col]!= null){
                    $("#gridContainer").append("<div class='gridItem' id='" + shapeId + "'></div>")
                    $("#" + shapeId).append($("<img>", {class: "shape", src: gridArray[row][col]}));
                }
                else{
                    $("#gridContainer").append("<div class='gridEmpty' id='" + shapeId + "'></div>");
                }
            };
        };
    }

}

function REMOVE_PREVIOUS(actor) {
    if($("#shape"+ actor[0] + "v" + actor[1]).hasClass("gridEmpty"))
        $("#shape"+ actor[0] + "v" + actor[1] + " img").remove();
    else
        $(".top").remove();
}

function NEW_SIGNALER_POSITION(signalerLocation) {
    var signalerImg = "signaler.png";
    if($("#shape"+ signalerLocation[0] + "v" + signalerLocation[1]).hasClass("gridItem"))
        $("#shape" + signalerLocation[0] + "v" + signalerLocation[1]).append($("<img>", {class: "top", src: SHAPE_DIR + signalerImg}));
    else
        $("#shape" + signalerLocation[0] + "v" + signalerLocation[1]).append($("<img>", {class: "shape", src: SHAPE_DIR + signalerImg}));
}

function NEW_RECEIVER_POSITION(receiverLocation) {
    var receiverImg = "receiver.png";
    if($("#shape"+ receiverLocation[0] + "v" + receiverLocation[1]).hasClass("gridItem"))
        $("#shape" + receiverLocation[0] + "v" + receiverLocation[1]).append($("<img>", {class: "top", src: SHAPE_DIR + receiverImg}));
    else
        $("#shape" + receiverLocation[0] + "v" + receiverLocation[1]).append($("<img>", {class: "shape", src: SHAPE_DIR + receiverImg}));
}

function FIRST_MOVE(obj) {
    if(!obj.signalerMoved){
        obj.signalerMoved = true;
        $("#shape"+ obj.signalerLocation[0] + "v" + obj.signalerLocation[1] + " img").remove();
        $("#shape"+ obj.signalerLocation[0] + "v" + obj.signalerLocation[1]).attr("class", "gridEmpty");
    }
}

function MOVE_LEFT(obj) {
    if(obj.signalerLocation[1]-1 >= 0){
        FIRST_MOVE(obj);
        REMOVE_PREVIOUS(obj.signalerLocation);
        obj.signalerLocation = [obj.signalerLocation[0], (obj.signalerLocation[1]-1)];
        RECORD_SIGNALER_PATH(obj);
        NEW_SIGNALER_POSITION(obj.signalerLocation);
    }
}
function MEET_UP_BARRIER(obj) {
    if(obj.isTryMove){
        for (var i = 0; i < obj.barrier["up"].length; i++){
            var coord = obj.barrier["up"][i];
            if(obj.signalerLocation[0] == coord[0] && obj.signalerLocation[1] == coord[1])
                return true
        }
        return false
    }
    else if (obj.isSanityCheck && obj.barrier["up"] != undefined) {
        for (var i = 0; i < obj.barrier["up"].length; i++){
            var coord = obj.barrier["up"][i];
            if(obj.signalerLocation[0] == coord[0] && obj.signalerLocation[1] == coord[1])
                return true
        }
        return false
    }
        return false
}
function MEET_DOWN_BARRIER(obj) {
    if(obj.isTryMove){
        for (var i = 0; i < obj.barrier["down"].length; i++){
            var coord = obj.barrier["down"][i];
            if(obj.signalerLocation[0] == coord[0] && obj.signalerLocation[1] == coord[1])
                return true
        }
        return false
    }   else if (obj.isSanityCheck && obj.barrier["down"] != undefined) {
        for (var i = 0; i < obj.barrier["down"].length; i++){
            var coord = obj.barrier["down"][i];
            if(obj.signalerLocation[0] == coord[0] && obj.signalerLocation[1] == coord[1])
                return true
        }
        return false
    }
        return false
}
function MOVE_UP(obj) {
    if(obj.signalerLocation[0]-1  >= 0){
        if(!MEET_UP_BARRIER(obj)){
            FIRST_MOVE(obj);
            REMOVE_PREVIOUS(obj.signalerLocation);
            obj.signalerLocation = [(obj.signalerLocation[0]-1), obj.signalerLocation[1]];
            RECORD_SIGNALER_PATH(obj);
            NEW_SIGNALER_POSITION(obj.signalerLocation);
        }
    }
}

function MOVE_RIGHT(obj) {
    if(obj.signalerLocation[1]+1 < GRID_NCOL){
        FIRST_MOVE(obj);
        REMOVE_PREVIOUS(obj.signalerLocation);
        obj.signalerLocation = [obj.signalerLocation[0], (obj.signalerLocation[1]+1)];
        RECORD_SIGNALER_PATH(obj);
        NEW_SIGNALER_POSITION(obj.signalerLocation);
    }
}

function MOVE_DOWN(obj) {
    if((obj.signalerLocation[0]+1) < GRID_NROW){
        if(!MEET_DOWN_BARRIER(obj)){
            FIRST_MOVE(obj);
            REMOVE_PREVIOUS(obj.signalerLocation);
            obj.signalerLocation = [(obj.signalerLocation[0]+1), obj.signalerLocation[1]];
            RECORD_SIGNALER_PATH(obj);
            NEW_SIGNALER_POSITION(obj.signalerLocation);
        }
    }
}

function RECEIVER_FIRST_MOVE(obj) {
    if(!obj.receiverMoved){
        obj.receiverMoved = true;
        $("#shape"+ obj.receiverLocation[0] + "v" + obj.receiverLocation[1] + " img").remove();
        $("#shape"+ obj.receiverLocation[0] + "v" + obj.receiverLocation[1]).attr("class", "gridEmpty");
    }
}

function RECEIVER_MOVE_LEFT(obj) {
    if(obj.receiverLocation[1]-1 >= 0){
        RECEIVER_FIRST_MOVE(obj);
        REMOVE_PREVIOUS(obj.receiverLocation);
        obj.receiverLocation = [obj.receiverLocation[0], (obj.receiverLocation[1]-1)];
        RECORD_RECEIVER_PATH(obj);
        NEW_RECEIVER_POSITION(obj.receiverLocation);
    }
}

function RECEIVER_MOVE_UP(obj) {
    if(obj.receiverLocation[0]-1 >= 0){
        RECEIVER_FIRST_MOVE(obj);
        REMOVE_PREVIOUS(obj.receiverLocation);
        obj.receiverLocation = [(obj.receiverLocation[0]-1), (obj.receiverLocation[1])];
        RECORD_RECEIVER_PATH(obj);
        NEW_RECEIVER_POSITION(obj.receiverLocation);
    }
}

function RECEIVER_MOVE_RIGHT(obj) {
    if(obj.receiverLocation[1]+1 < GRID_NCOL){
        RECEIVER_FIRST_MOVE(obj);
        REMOVE_PREVIOUS(obj.receiverLocation);
        obj.receiverLocation = [obj.receiverLocation[0], (obj.receiverLocation[1]+1)];
        RECORD_RECEIVER_PATH(obj);
        NEW_RECEIVER_POSITION(obj.receiverLocation);
    }
}

function RECEIVER_MOVE_DOWN(obj) {
    if(obj.receiverLocation[0]+1 < GRID_NROW){
        RECEIVER_FIRST_MOVE(obj);
        REMOVE_PREVIOUS(obj.receiverLocation);
        obj.receiverLocation = [(obj.receiverLocation[0]+1), obj.receiverLocation[1]];
        RECORD_RECEIVER_PATH(obj);
        NEW_RECEIVER_POSITION(obj.receiverLocation);
    }
}

function UPDATE_GAME_GRID(obj, key) {
    switch (key){
        case 37: //left
            MOVE_LEFT(obj);
            break;
        case 38: //up
            MOVE_UP(obj);
            break;
        case 39: //right
            MOVE_RIGHT(obj);
            break;
        case 40: //down
            MOVE_DOWN(obj);
            break;
        case "left":
            RECEIVER_MOVE_LEFT(obj);
            break;
        case "up":
            RECEIVER_MOVE_UP(obj);
            break;
        case "right":
            RECEIVER_MOVE_RIGHT(obj);
            break;
        case "down":
            RECEIVER_MOVE_DOWN(obj);
            break;
    }
}

function RESET_GAMEBOARD() {
    TRY_EXPT_INSTR_APPEAR();
    SANITY_CHECK_INSTR_APPEAR();
    PRACTICE_EXPT_INSTR_APPEAR();
    EXPT_INSTR_APPEAR();
    $(".tryDecision").html("");
    $("#sanityCheckDecision").html("");
    $("#practiceDecision").html("");
    $("#decision").html("");
    $(".tryResult").hide();
    $("#sanityCheckResult").hide();
    $("#practiceResult").hide();
    $("#result").hide();
}

/*
  #####     #    #     # #######    ######  #######    #    ######  ######
 #     #   # #   ##   ## #          #     # #     #   # #   #     # #     #
 #        #   #  # # # # #          #     # #     #  #   #  #     # #     #
 #  #### #     # #  #  # #####      ######  #     # #     # ######  #     #
 #     # ####### #     # #          #     # #     # ####### #   #   #     #
 #     # #     # #     # #          #     # #     # #     # #    #  #     #
  #####  #     # #     # #######    ######  ####### #     # #     # ######

*/
function CREATE_EXPT_BUTTONS(obj) {
    if(obj.isTryMove && !obj.nextButCreated) {
        $("#tryMoveResultBut").click(function(){NEXT_INSTR()});
        obj.nextButCreated = true;
    }
    else if (obj.isTrySay && !obj.nextButCreated) {
        $("#trySayResultBut").click(function(){NEXT_INSTR()});
        obj.nextButCreated = true;
    }
    else if (obj.isSanityCheck) {
        $("#sanityCheckQuitBut").click(function(){SHOW_QUIT_RESULT(obj)});
        $("#sanityCheckResultBut").click(function(){NEXT_TRIAL(obj)});
    } else if (obj.isPracTrial) {
        $("#practiceQuitBut").click(function(){SHOW_QUIT_RESULT(obj)});
        $("#practiceResultBut").click(function(){NEXT_TRIAL(obj)});
    } else if (obj.isExptTrial) {
        $("#quitBut").click(function(){SHOW_QUIT_RESULT(obj)});
        $("#resultBut").click(function(){NEXT_TRIAL(obj)});
    }
}

function CREATE_SIGNAL_BUTTONS(obj, availableSignals) {
    for (var i = 0; i < MAX_SAY_OPTION; i++) {
        if(obj.isTrySay || obj.isTryMove){
            $("#tryButOption" + i).css({
                "border": "1px solid",
                "opacity": 0.2,
                "background": "#bcbab8",
                "cursor": "auto",
                "box-shadow": "none",
                "pointer-events": "none"
            });
            if(!obj.buttonsCreated)
                $("#tryButOption" + i).click(function(){RECEIVER_WALK(obj,$(this).html())});

            for (var j = 0; j < availableSignals.length; j++) {
                if (availableSignals[j] == $("#tryButOption" + i).html()) {
                    $("#tryButOption" + i).css({
                        "border": "revert",
                        "opacity": 1,
                        "background": "#9D8F8F",
                        "box-shadow": "2px 2px 4px rgba(0, 0, 0, 0.25)",
                        "pointer-events": "revert",
                        "cursor": "pointer"
                    });
                }
            }
        } else if (obj.isSanityCheck) {
            $("#sanityCheckButOption" + i).css({
                "border": "1px solid",
                "opacity": 0.2,
                "background": "#bcbab8",
                "cursor": "auto",
                "box-shadow": "none",
                "pointer-events": "none"
            });
            if(!obj.buttonsCreated)
                $("#sanityCheckButOption" + i).click(function(){RECEIVER_WALK(obj,$(this).html())});
            for (var j = 0; j < availableSignals.length; j++) {
                if (availableSignals[j] == $("#sanityCheckButOption" + i).html()) {
                    $("#sanityCheckButOption" + i).css({
                        "border": "revert",
                        "opacity": 1,
                        "background": "#9D8F8F",
                        "box-shadow": "2px 2px 4px rgba(0, 0, 0, 0.25)",
                        "pointer-events": "revert",
                        "cursor": "pointer"
                    });
                }
            }
        } else if (obj.isPracTrial) {
            $("#practiceButOption" + i).css({
                "border": "1px solid",
                "opacity": 0.2,
                "background": "#bcbab8",
                "cursor": "auto",
                "box-shadow": "none",
                "pointer-events": "none"
            });
            if(!obj.buttonsCreated)
                $("#practiceButOption" + i).click(function(){RECEIVER_WALK(obj,$(this).html())});
            for (var j = 0; j < availableSignals.length; j++) {
                if (availableSignals[j] == $("#practiceButOption" + i).html()) {
                    $("#practiceButOption" + i).css({
                        "border": "revert",
                        "opacity": 1,
                        "background": "#9D8F8F",
                        "box-shadow": "2px 2px 4px rgba(0, 0, 0, 0.25)",
                        "pointer-events": "revert",
                        "cursor": "pointer"
                    });
                }
            }
        } else if (obj.isExptTrial) {
            $("#butOption" + i).css({
                "border": "1px solid",
                "opacity": 0.2,
                "background": "#bcbab8",
                "cursor": "auto",
                "box-shadow": "none",
                "pointer-events": "none"
            });
            if(!obj.buttonsCreated)
                $("#butOption" + i).click(function(){RECEIVER_WALK(obj,$(this).html())});
            for (var j = 0; j < availableSignals.length; j++) {
                if (availableSignals[j] == $("#butOption" + i).html()) {
                    $("#butOption" + i).css({
                        "border": "revert",
                        "opacity": 1,
                        "background": "#9D8F8F",
                        "box-shadow": "2px 2px 4px rgba(0, 0, 0, 0.25)",
                        "pointer-events": "revert",
                        "cursor": "pointer"
                    });
                }
            }
        }
    }
    obj.buttonsCreated = true;
}

function TRY_EXPT_INSTR_FADE() {
    $(".tryExptFade").fadeTo(200, 0.4);
    $(".butExpt").css("pointer-events", "none");
}

function SANITY_CHECK_INSTR_FADE() {
    $("#sanityCheckFade").fadeTo(200, 0.4);
    $(".butExpt").css("pointer-events", "none");
}

function PRACTICE_EXPT_INSTR_FADE() {
    $("#practiceExptFade").fadeTo(200, 0.4);
    $(".butExpt").css("pointer-events", "none");
}

function EXPT_INSTR_FADE() {
    $("#exptFade").fadeTo(200, 0.4);
    $(".butExpt").css("pointer-events", "none");
}

function TRY_EXPT_INSTR_APPEAR() {
    $(".tryExptFade").css("opacity", 1);
    $(".butExpt").css("pointer-events", "auto");
}

function SANITY_CHECK_INSTR_APPEAR() {
    $("#sanityCheckFade").css("opacity", 1);
    $(".butExpt").css("pointer-events", "auto");
}

function PRACTICE_EXPT_INSTR_APPEAR() {
    $("#practiceExptFade").css("opacity", 1);
    $(".butExpt").css("pointer-events", "auto");
}

function EXPT_INSTR_APPEAR() {
    $("#exptFade").css("opacity", 1);
    $(".butExpt").css("pointer-events", "auto");
}

function CHANGE_IN_TRIAL_INSTR(decision) {
    TRY_EXPT_INSTR_FADE();
    SANITY_CHECK_INSTR_FADE();
    PRACTICE_EXPT_INSTR_FADE();
    EXPT_INSTR_FADE();
    if(decision == "do"){
        $(".tryDecision").html("Please hit ENTER when you land on the item.");
        $("#sanityCheckDecision").html("Please hit ENTER when you land on the item.");
        $("#practiceDecision").html("Please hit ENTER when you land on the item.");
        $("#decision").html("Please hit ENTER when you land on the item.");
    } else if(decision == "say") {
        $(".tryDecision").html("<img class='shape' src='shape/receiver.png' />" + " is responding to your signal.");
        $("#sanityCheckDecision").html("<img class='shape' src='shape/receiver.png' />" + " is responding to your signal.");
        $("#practiceDecision").html("<img class='shape' src='shape/receiver.png' />" + " is responding to your signal.");
        $("#decision").html("<img class='shape' src='shape/receiver.png' />" + " is responding to your signal.");
    }
}

/*
  #####   #####  ####### ######  #######    ######  #######    #    ######  ######
 #     # #     # #     # #     # #          #     # #     #   # #   #     # #     #
 #       #       #     # #     # #          #     # #     #  #   #  #     # #     #
  #####  #       #     # ######  #####      ######  #     # #     # ######  #     #
       # #       #     # #   #   #          #     # #     # ####### #   #   #     #
 #     # #     # #     # #    #  #          #     # #     # #     # #    #  #     #
  #####   #####  ####### #     # #######    ######  ####### #     # #     # ######

*/

function SETUP_SCOREBOARD(obj) {
    if(obj.isTryMove) {
        $("#tryMoveGoal").attr("src", obj.gridArray[obj.goalCoord[0]][obj.goalCoord[1]]);
    } else if (obj.isTrySay){
        $("#trySayGoal").attr("src", obj.gridArray[obj.goalCoord[0]][obj.goalCoord[1]]);
    } else if (obj.isSanityCheck){
        $("#sanityCheckGoalShape").attr("src", obj.gridArray[obj.goalCoord[0]][obj.goalCoord[1]]);
        $("#sanityCheckTotalBonusBefore").html("$" + obj.totalScore.toFixed(2));
        $(".sanityCheckCost").html("-$" + obj.step.toFixed(2));
    } else if (obj.isPracTrial){
        $("#practiceGoalShape").attr("src", obj.gridArray[obj.goalCoord[0]][obj.goalCoord[1]]);
        $("#practiceTotalBonusBefore").html("$" + obj.totalScore.toFixed(2));
        $(".practiceCost").html("-$" + obj.step.toFixed(2));
    } else if (obj.isExptTrial){
        $("#goalShape").attr("src", obj.gridArray[obj.goalCoord[0]][obj.goalCoord[1]]);
        $("#exptTotalBonusBefore").html("$" + obj.totalScore.toFixed(2));
        $(".exptCost").html("-$" + obj.step.toFixed(2));
    }
}

function UPDATE_STEPS(obj) {
    obj.step = Math.round((obj.step + STEP_COST) * 100) / 100;
    if (obj.isSanityCheck)
        $(".sanityCheckCost").html("-$" + obj.step.toFixed(2));
    else if (obj.isPracTrial)
        $(".practiceCost").html("-$" + obj.step.toFixed(2));
    else if (obj.isExptTrial)
        $(".exptCost").html("-$" + obj.step.toFixed(2));
}

function HIDE_COST_IN_TRY_SCOREBOARD() {
    $(".hiddenInfo").css("opacity", 0);
}

/*
 ######  #######  #####  #     # #       #######    ######  ####### #     #
 #     # #       #     # #     # #          #       #     # #     #  #   #
 #     # #       #       #     # #          #       #     # #     #   # #
 ######  #####    #####  #     # #          #       ######  #     #    #
 #   #   #             # #     # #          #       #     # #     #   # #
 #    #  #       #     # #     # #          #       #     # #     #  #   #
 #     # #######  #####   #####  #######    #       ######  ####### #     #

*/
function GET_ROUND_BONUS_STRING(bonus){
    if (bonus >= 0)
        return "$" + bonus.toFixed(2)
    else
        return "-$" + (-1 * bonus).toFixed(2)
}

function getSanityCheckFeedback(obj, trialStrategy) {
    if (trialStrategy == "communicate") {
        reversedReceiverIntentionDict = Object.entries(obj.inputData[obj.randomizedTrialList[obj.trialIndex]]["receiverIntentionDict"]).reduce((tmpObj, item) => (tmpObj[item[1]] = item[0]) && tmpObj, {});
        intention = obj.inputData[obj.randomizedTrialList[obj.trialIndex]]["intention"];
        feedback = "Some feedback: the ideal way to reach the target would've been to signal " + reversedReceiverIntentionDict[intention] + ".";
    } else if (trialStrategy == "do") {
        feedback = "Some feedback: the ideal way to reach the target would've been to move to the target.";
    } else if (trialStrategy == "quit") {
        feedback = "Some feedback: the ideal way to reach the target would've been to quit.";
    }
    return feedback;
}

function SHOW_WIN_RESULT_BOX_FOR_MOVE(obj,win) {
    var reward;
    obj.totalScore = (obj.totalScore >= 0)? obj.totalScore : 0;
    obj.totalScore = (obj.totalScore <= MAX_BONUS)? obj.totalScore : MAX_BONUS;
    if (obj.isTryMove || obj.isTrySay){
        if(win){
            $(".tryResultText").html("Congratulations!<br><br>You reached the target!");
        } else {
            $(".tryResultText").html("Sorry, you did not reach the target.<br><br>Good luck on your next round!");
        }
        $(".tryResult").show();
    } else if (obj.isSanityCheck){
        trialStrategy = obj.inputData[obj.randomizedTrialList[obj.trialIndex]]["trialStrategy"];
        if (trialStrategy == "do") {
            if (!win) {
                obj.sanityMoveFails++;
            }
            obj.sanityMoveAttempts++;
        } else if (trialStrategy == "quit") {
            obj.sanityQuitFails++;
            obj.sanityQuitAttempts++;
        } else if (trialStrategy == "communicate") {
            obj.sanitySayFails++;
            obj.sanitySayAttempts++;
        }
        $("#sanityCheckResult .sanityCheckCost").html("-$" + obj.step.toFixed(2));
        var reward;
        if(win){
            if (trialStrategy == "do") {
                $("#sanityCheckResultText").html("Congratulations!<br><br>You reached the target!");
            }
            else {
                $("#sanityCheckResultText").html("Congratulations! You reached the target! <br>" + getSanityCheckFeedback(obj, trialStrategy));
            }
            reward = REWARD;
        } else {
            $("#sanityCheckResultText").html("Sorry, you did not reach the target. <br>" + getSanityCheckFeedback(obj, trialStrategy) + "<br><br>Good luck on your next round! ");
            reward = 0;
        }
        $("#sanityCheckReward").html("$" + reward.toFixed(2));
        $("#sanityCheckRoundBonus").html(GET_ROUND_BONUS_STRING(reward - obj.step));
        $("#sanityCheckTotalBonusAfter").html("$" + obj.totalScore.toFixed(2));
        $("#sanityCheckResult").show();
    } else if (obj.isPracTrial){
        if(win){
            $("#practiceResultText").html("Congratulations!<br><br>You reached the target!");
            reward = REWARD;
        } else {
            $("#practiceResultText").html("Sorry, you did not reach the target.<br><br>Good luck on your next round!");
            reward = 0;
        }
        $("#practiceReward").html("$" + reward.toFixed(2));
        $("#practiceRoundBonus").html(GET_ROUND_BONUS_STRING(reward - obj.step));
        $("#practiceTotalBonusAfter").html("$" + obj.totalScore.toFixed(2));
        $("#practiceResult").show();
    } else if (obj.isExptTrial){
        if(win){
            $("#resultText").html("Congratulations!<br><br>You reached the target!");
            reward = REWARD;
        } else {
            $("#resultText").html("Sorry, you did not reach the target.<br><br>Good luck on your next round!");
            reward = 0;
        }
        $("#reward").html("$" + reward.toFixed(2));
        $("#exptRoundBonus").html(GET_ROUND_BONUS_STRING(reward - obj.step));
        $("#exptTotalBonusAfter").html("$" + obj.totalScore.toFixed(2));
        $("#result").show();
    }
}

function SHOW_WIN_RESULT_BOX_FOR_SAY(obj,win) {
    var reward;
    obj.totalScore = (obj.totalScore >= 0)? obj.totalScore : 0;
    obj.totalScore = (obj.totalScore <= MAX_BONUS)? obj.totalScore : MAX_BONUS;
    if (obj.isTrySay || obj.isTryMove) {
        if(win){
            var landedItem = $('#shape'+ obj.receiverLocation[0] + 'v' + obj.receiverLocation[1] + ' .shape').attr('src');
            $(".tryResultText").html("<img class='inlineShape' src='shape/receiver.png'/>" + " lands on " +  "<img class='inlineShape' style='background-color: #f9f9f9; padding: 2px;' src='" + landedItem + "'>" + "<br>Congratulations!<br>You reached the target!");
        } else {
            var landedItem = $('#shape'+ obj.receiverLocation[0] + 'v' + obj.receiverLocation[1] + ' .shape').attr('src');
            $(".tryResultText").html("<img class='inlineShape' style='background-color: white;' src='shape/receiver.png'/>" + " lands on " +  "<img class='inlineShape' style='background-color: #f9f9f9' src='" + landedItem + "'>" + "<br>Sorry, you did not reach the target.<br>Good luck on your next round!");
        }
        $(".tryResult").show();
    } else if(obj.isSanityCheck){
        trialStrategy = obj.inputData[obj.randomizedTrialList[obj.trialIndex]]["trialStrategy"];
        if (trialStrategy == "do") {
            obj.sanityMoveFails++;
            obj.sanityMoveAttempts++;
        } else if (trialStrategy == "quit") {
            obj.sanityQuitFails++;
            obj.sanityQuitAttempts++;
        } else if (trialStrategy == "communicate") {
            if (!win) {
                obj.sanitySayFails++;
            }
            obj.sanitySayAttempts++;
        }
        $("#sanityCheckResult .sanityCheckCost").html("-$" + obj.step.toFixed(2));
        var reward;
        if(win){
            var landedItem = $('#shape'+ obj.receiverLocation[0] + 'v' + obj.receiverLocation[1] + ' .shape').attr('src');
            if (trialStrategy == "communicate") {
                $("#sanityCheckResultText").html("<img class='inlineShape' src='shape/receiver.png'/>" + " lands on " +  "<img class='inlineShape' style='background-color: #f9f9f9; padding: 2px;' src='" + landedItem + "'>" + "<br>Congratulations!<br>You reached the target!");
            }
            else {
                $("#sanityCheckResultText").html("<img class='inlineShape' src='shape/receiver.png'/>" + " lands on " +  "<img class='inlineShape' style='background-color: #f9f9f9; padding: 2px;' src='" + landedItem + "'>" + "<br>Congratulations! You reached the target! <br>" + getSanityCheckFeedback(obj, trialStrategy));
            }
            reward = REWARD;
        } else {
            var landedItem = $('#shape'+ obj.receiverLocation[0] + 'v' + obj.receiverLocation[1] + ' .shape').attr('src');
            $("#sanityCheckResultText").html("<img class='inlineShape' style='background-color: white;' src='shape/receiver.png'/>" + " lands on " +  "<img class='inlineShape' style='background-color: #f9f9f9' src='" + landedItem + "'>" + "<br>Sorry, you did not reach the target. <br>" + getSanityCheckFeedback(obj, trialStrategy) + "<br>Good luck on your next round!");
            reward = 0;
        }
        $("#sanityCheckReward").html("$" + reward.toFixed(2));
        $("#sanityCheckRoundBonus").html(GET_ROUND_BONUS_STRING(reward - obj.step));
        $("#sanityCheckTotalBonusAfter").html("$" + obj.totalScore.toFixed(2));
        $("#sanityCheckResult").show();
    } else if(obj.isPracTrial){
        if(win){
            var landedItem = $('#shape'+ obj.receiverLocation[0] + 'v' + obj.receiverLocation[1] + ' .shape').attr('src');
            $("#practiceResultText").html("<img class='inlineShape' src='shape/receiver.png'/>" + " lands on " +  "<img class='inlineShape' style='background-color: #f9f9f9; padding: 2px;' src='" + landedItem + "'>" + "<br>Congratulations!<br>You reached the target!");
            reward = REWARD;
        } else {
            var landedItem = $('#shape'+ obj.receiverLocation[0] + 'v' + obj.receiverLocation[1] + ' .shape').attr('src');
            $("#practiceResultText").html("<img class='inlineShape' style='background-color: white;' src='shape/receiver.png'/>" + " lands on " +  "<img class='inlineShape' style='background-color: #f9f9f9' src='" + landedItem + "'>" + "<br>Sorry, you did not reach the target.<br>Good luck on your next round!");
            reward = 0;
        }
        $("#practiceReward").html("$" + reward.toFixed(2));
        $("#practiceRoundBonus").html(GET_ROUND_BONUS_STRING(reward - obj.step));
        $("#practiceTotalBonusAfter").html("$" + obj.totalScore.toFixed(2));
        $("#practiceResult").show();
    } else if (obj.isExptTrial){
        if(win){
            var landedItem = $('#shape'+ obj.receiverLocation[0] + 'v' + obj.receiverLocation[1] + ' .shape').attr('src');
            $("#resultText").html("<img class='inlineShape' src='shape/receiver.png'/>" + " lands on " +  "<img class='inlineShape' style='background-color: #f9f9f9; padding: 2px;' src='" + landedItem + "'>" + "<br>Congratulations!<br>You reached the target!");
            reward = REWARD;
        } else {
            var landedItem = $('#shape'+ obj.receiverLocation[0] + 'v' + obj.receiverLocation[1] + ' .shape').attr('src');
            $("#resultText").html("<img class='inlineShape' style='background-color: white;' src='shape/receiver.png'/>" + " lands on " +  "<img class='inlineShape' style='background-color: #f9f9f9' src='" + landedItem + "'>" + "<br>Sorry, you did not reach the target.<br>Good luck on your next round!");
            reward = 0;
        }
        $("#reward").html("$" + reward.toFixed(2));
        $("#exptRoundBonus").html(GET_ROUND_BONUS_STRING(reward - obj.step));
        $("#exptTotalBonusAfter").html("$" + obj.totalScore.toFixed(2));
        $("#result").show();
    }
}

function SHOW_QUIT_RESULT(obj) {
    obj.allowMove = false;
    obj.totalScore = (obj.totalScore >= 0)? obj.totalScore : 0;
    obj.totalScore = (obj.totalScore <= MAX_BONUS)? obj.totalScore : MAX_BONUS;
    CHECK_CONSECUTIVE_QUIT(obj);
    CHANGE_IN_TRIAL_INSTR();
    DISABLE_DEFAULT_KEYS();
    if(obj.isSanityCheck){
        trialStrategy = obj.inputData[obj.randomizedTrialList[obj.trialIndex]]["trialStrategy"];
        if (trialStrategy == "do") {
            obj.sanityMoveFails++;
            obj.sanityMoveAttempts++;
        } else if (trialStrategy == "quit") {
            obj.sanityQuitAttempts++;
        } else if (trialStrategy == "communicate") {
            obj.sanitySayFails++;
            obj.sanitySayAttempts++;
        }
        reward = 0;
        if (trialStrategy == "quit") {
            $("#sanityCheckResultText").html("Don't worry!<br>Good luck on your next round!");
        } else {
            $("#sanityCheckResultText").html("Don't worry! <br>" + getSanityCheckFeedback(obj, trialStrategy) + "<br>Good luck on your next round!");
        }

        $("#sanityCheckReward").html("$" + reward.toFixed(2));
        $("#sanityCheckRoundBonus").html(GET_ROUND_BONUS_STRING(reward - obj.step));
        $("#sanityCheckTotalBonusAfter").html("$" + obj.totalScore.toFixed(2));
        $("#sanityCheckResult").show();
    } else if(obj.isPracTrial){
        reward = 0;
        $("#practiceResultText").html("Don't worry!<br>Good luck on your next round!");
        $("#practiceReward").html("$" + reward.toFixed(2));
        $("#practiceRoundBonus").html(GET_ROUND_BONUS_STRING(reward - obj.step));
        $("#practiceTotalBonusAfter").html("$" + obj.totalScore.toFixed(2));
        $("#practiceResult").show();
    } else if(obj.isExptTrial){
        RECORD_DECISION_DATA(obj, "quit");
        RECORD_ACTION_TIME(obj);
        reward = 0;
        $("#resultText").html("Don't worry!<br>Good luck on your next round!");
        $("#reward").html("$" + reward.toFixed(2));
        $("#exptRoundBonus").html(GET_ROUND_BONUS_STRING(reward - obj.step));
        $("#exptTotalBonusAfter").html("$" + obj.totalScore.toFixed(2));
        $("#result").show();
        RECORD_SIGNAL_DATA(obj);
        RECORD_SIGNALER_END_LOCATION(obj);
        RECORD_SIGNALER_ACHIEVED(obj);
        RECORD_RECEIVER_END_LOCATION(obj);
        RECORD_RECEIVER_ACHIEVED(obj);
    }

};

function CHECK_CONSECUTIVE_QUIT(obj) {
    obj.consecutiveQuitNum += 1;
    if (obj.consecutiveQuitNum >= CONSECUTIVE_QUIT_MAX) {
        alert("You have been quitting too often! Please do the future rounds more carefully.")
        obj.quitWarningPopup = true;
    } else
        obj.quitWarningPopup = false;
}