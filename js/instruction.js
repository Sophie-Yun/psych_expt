function BLOCK_MOBILE() {
    $("#instrText").html('It seems that you are using a touchscreen device or a phone. Please use a laptop or desktop instead.<br /><br />If you believe you have received this message in error, please contact the experimenter at experimenter@domain.edu<br /><br />Otherwise, please switch to a laptop or a desktop computer for this experiment.');
    $("#instrNextBut").hide();
    $("#instrBackBut").hide();
    $("#instrPage").show();
}

function ALLOW_SHORTCUTS_FOR_TESTING() {
    document.onkeydown = function(event) {
        if(event.key == "s" || event.which == 83 || event.keyCode == 83) {
            console.log("s");
            instr.index = 14;
            instr.next();
        }
        // else if (event.key == "p" || event.which == 80 || event.keyCode == 80) {
        //     console.log("p");
        //     instr.index = 16;
        //     instr.next();
        // }
        else if (event.keyCode == "e" || event.which == 69 || event.keyCode == 69) {
            console.log("e");
            instr.index = 16;
            instr.next();
        } else if (event.keyCode == "d" || event.which == 68 || event.keyCode == 68) {
            console.log("d");
            instr.index = 18;
            instr.next();
        }
    };

}
/*
 ### #     #  #####  ####### ######
  #  ##    # #     #    #    #     #
  #  # #   # #          #    #     #
  #  #  #  #  #####     #    ######
  #  #   # #       #    #    #   #
  #  #    ## #     #    #    #    #
 ### #     #  #####     #    #     #

*/

const REWARD = 0.4;
const STEP_COST = 0.05;

class instrObject {
    constructor(options = {}) {
        Object.assign(this, {
            text: [],
            funcDict: {},
            qConditions: [],
        }, options);
        this.index = 0;
        this.instrKeys = Object.keys(this.funcDict).map(Number);
        this.qAttemptN = {};
        for (var i=0;i<this.qConditions.length;i++){
            this.qAttemptN[this.qConditions[i]] = 1;
        }
        this.readingTimes = [];
    }

    start(textBox = $("#instrPage"), textElement = $("#instrText")) {
        textElement.html(this.text[0]);
        if (this.instrKeys.includes(this.index)) {
            this.funcDict[this.index]();
        }
        textBox.show();
        this.startTime = Date.now();

        BUFFER_ALL_IMG();
        DISABLE_DEFAULT_KEYS();
    }

    next(textElement = $("#instrText")) {
        this.readingTimes.push((Date.now() - this.startTime)/1000);
        this.index += 1;
        DISABLE_DEFAULT_KEYS();
        if (this.index < this.text.length) {
            textElement.html(this.text[this.index]);
            if (this.instrKeys.includes(this.index)) {
                this.funcDict[this.index]();
            }
            this.startTime = Date.now();
        }

    }

    back(textElement = $("#instrText")) {
        this.readingTimes.push((Date.now() - this.startTime)/1000);
        this.index -= 1;
        if (this.index >= 0) {
            textElement.html(this.text[this.index]);
            if (this.instrKeys.includes(this.index)) {
                this.funcDict[this.index]();
            }
            this.startTime = Date.now();
        } else
            this.index = 0;
    }
}

var instr_text = new Array;

var instr_text = new Array;
instr_text[0] = "<strong>Welcome!</strong><br><br>In this experiment, you will play a game that involves cooperating and communicating with another player to take as few steps as possible to reach a target goal item in the environment. You even have a chance to earn some bonus money. <br><br>Hope you enjoy it!";
instr_text[1] = "Please read the instructions on the next few pages carefully. You will be asked about the instructions later and see some practice rounds to make sure you understand the game.";
instr_text[2] = "In this experiment, you are the player in blue " + "<img class='inlineShape' src='shape/signaler.png'/>" + " and your partner is in white " + "<img class='inlineShape' src='shape/receiver.png' />" + " .";
instr_text[3] = "At the beginning of each round, you and your partner will stand at different positions in a game board. <br><br>You will also see items scattered in the grids.";
instr_text[4] = "Besides the game board, you will also see a target for the round. For example, \"Target: <img class='inlineShape' src='shape/redCircle.png'/> \".<br><br> You and your partners’ goal is for one of you to reach the target by the end of the round. <br><br>However, you are the only person that knows the target. Your partner does not know the target, but is intelligent and motivated to cooperate with you. ";
instr_text[5] = "To reach the target, you can click a button to take the shortest path to automatically walk to the target. You cannot walk across a barrier which is displayed as a thick line. <br><br>If you move your mouse over an item on the grid, you will see the minimum steps for either you or your partner to reach the item. <br><br>You can try to go to the target by yourself on the next page.";
instr_text[6] = "";
instr_text[7] = "Good job! <br><br>If you don't want to move by yourself, you can ask your partner to move. <br><br>You have the option to send one of the given signals to your partner. The signal can give partial information about the target."
instr_text[8] = "After you send the signal, your partner will try their best to reach the target given the information you provided. <br><br>Similarly, your partner cannot move across a barrier which is displayed as a thick line. <br><br>You can try to send a signal on the next page."
instr_text[9] = "";
instr_text[10] = "Nice! Now you know how to send a signal to your partner. <br><br> If you and your partner cooperate to reach the target efficiently, you will have a chance to accumulate an additional money reward at the end of the experiment."
instr_text[11] = "In each round, if either you or your partner reaches the correct goal, you will both receive a bonus of $" + REWARD.toFixed(2) + ". However, every step either of you takes costs $" + STEP_COST.toFixed(2) + "."
instr_text[12] = "Your additional money reward accumulates across rounds, but it will never drop below $0.00. <br><br> You will see a set of practice rounds before you can start to earn the money bonus.";
//instr_text[13] = "Some rounds might be difficult. If you decide that it is too costly for either of you to move towards the target, you have the option to QUIT this round. Neither of you will lose or receive money bonus if you choose to quit. <br><br>However, once you start an action, you cannot change your mind on that round.";
instr_text[13] = "";
instr_text[14] = "By clicking on the NEXT button, I am acknowledged and hereby accept the terms. I understand the task in this experiment.";
instr_text[15] = "Please start the practice rounds on the next page. Note that the cost and reward in this set <strong>ARE NOT</strong> counting towards your additional money reward.";
instr_text[16] = "";
// instr_text[17] = "You have finished the first set of practice rounds. Please start the second set on the next page. Note that the cost and reward in this set <strong>ARE NOT</strong> counting towards your additional money reward.";
// instr_text[18] = "";
instr_text[17] = "You have finished all the practice rounds. You are now ready for the experiment. <br><br> Note that the cost and reward in this set <strong>ARE</strong> counting towards your additional money reward. <br><br>Good luck!";
instr_text[18] = "";
instr_text[19] = "You have finished all the rounds. Please answer all the questions on the next page.";
instr_text[20] = "";
instr_text[21] = "";
instr_text[22] = "Thank you for completing this experiment!";



const INSTR_FUNC_DICT = {
    0: HIDE_BACK_BUTTON,
    1: SHOW_BACK_BUTTON,
    2: HIDE_EXAMPLE_GRID,
    3: SHOW_EXAMPLE_GRID,
    4: HIDE_EXAMPLE_GRID,
    5: SHOW_INSTR,
    6: TRY_MOVE,
    7: SHOW_INSTR,
    8: SHOW_INSTR,
    9: TRY_SAY,
    10: SHOW_INSTR,
    11: SHOW_INSTR,
    12: SHOW_INSTR,
    13: SHOW_INSTR_QUESTION,
    14: SHOW_CONSENT,
    15: SHOW_INSTR,
    16: START_SANITY_CHECK_TRIAL,
    17: SHOW_INSTR,
    18: START_EXPT,
    19: SHOW_INSTR,
    20: SHOW_DEBRIEFING_PAGE,
    21: HIDE_NEXT_BUTTON,
    22: HIDE_NEXT_BUTTON
};

function HIDE_BACK_BUTTON(){
    $("#instrBackBut").hide();
}

function HIDE_NEXT_BUTTON(){
    $("#instrNextBut").hide();
}

function SHOW_BACK_BUTTON(){
    $("#instrBackBut").show();
}

function HIDE_EXAMPLE_GRID() {
    $("#examGrid").hide();
}

function SHOW_EXAMPLE_GRID() {
    $("#examGrid").css("display", "block");
}

function SHOW_INSTR() {
    HIDE_CONSENT();
    HIDE_INSTR_Q();
    RESET_INSTR();
    RESET_GAMEBOARD();
    if (!instr.quizCorrect)
        RESET_INSTR_Q();
}

function HIDE_CONSENT() {
    $("#consent").hide();
}

function HIDE_INSTR_Q() {
    $("#instrQBox").hide();
}
function RESET_INSTR() {
    $("#instrText").show();
    $("#instrNextBut").show();
    $("#tryMovePage").hide();
    $("#trySayPage").hide();
}

function SHOW_CONSENT() {
    $("#consent").show();
    HIDE_INSTR_Q();
    RESET_INSTR();
}

function SHOW_INSTR_QUESTION() {
    HIDE_CONSENT();
    $("#instrText").show();
    $("#instrQBox").show();
    if (!instr.quizCorrect)
        $("#instrNextBut").hide();
    $("#rewardInInstrQuiz").html(REWARD.toFixed(2));
    $("#stepCostInInstrQuiz").html(STEP_COST.toFixed(2));
}

function SUBMIT_INSTR_Q() {
    var instrChoice = $("input[name='instrQ']:checked").val();
    if (typeof instrChoice === "undefined") {
        $("#instrQWarning").text("Please answer the question. Thank you!");
    } else if (instrChoice == "several") {
        qAttemptNum++;
        $("#instrQWarning").text("Correct! Please click on NEXT to proceed!");
        $("#instrQBut").hide();
        $("#instrNextBut").show();
        $("#quizBox input").prop("disabled", true);
        $("#quizBox label").css({"cursor": "auto",
                                "pointer-events": "none"});
        instr.quizCorrect = true;
    } else {
        qAttemptNum++;
        $("#instrQWarning").text("You have given an incorrect answer. Please try again.");
    }
}

function RESET_INSTR_Q() {
    $("#instrQWarning").text("");
    $("input[name='instrQ']").prop("checked", false);
}


function BUFFER_ALL_IMG() {
    $("#buffer").attr("src", "exampleGrid.png");
    $("#buffer").attr("src", "signaler.png");
    $("#buffer").attr("src", "receiver.png");
    for (var i in PIC_DICT){
        $("#buffer").attr("src", PIC_DICT[i]);
    }
}

var instr_options = {
    text: instr_text,
    funcDict: INSTR_FUNC_DICT,
    qConditions: ['onlyQ'],
};

/*
 ######  ####### ######  ######  ### ####### ####### ### #     #  #####
 #     # #       #     # #     #  #  #       #        #  ##    # #     #
 #     # #       #     # #     #  #  #       #        #  # #   # #
 #     # #####   ######  ######   #  #####   #####    #  #  #  # #  ####
 #     # #       #     # #   #    #  #       #        #  #   # # #     #
 #     # #       #     # #    #   #  #       #        #  #    ## #     #
 ######  ####### ######  #     # ### ####### #       ### #     #  #####

*/

function SHOW_DEBRIEFING_PAGE() {
    $("#questionsBox").show();
    $("#instrPage").hide();
    ALLOW_SPACE();
}

function SUBMIT_DEBRIEFING_Q() {
    var serious = $("input[name='serious']:checked").val();
    var strategy = $("#strategy").val();
    var problems = $("#problems").val();
    var rating = $("input[name='rating']:checked").val();
    var motivation = $("input[name='motivation']:checked").val();
    if (serious == undefined || strategy == "" || problems == "" || rating === undefined || motivation === undefined)
        alert("Please finish all the questions. Thank you!")
    else {
        console.log(serious);
        console.log(strategy);
        console.log(problems);
        console.log(rating);
        console.log(motivation);
        $("#uidText").html("You have earned " + expt.totalScore.toFixed(2) + " in total. Please put down your UID if you'd like to receive the money bonus.")
        $("#questionsBox").hide();
        $("#uidPage").show();
        NEXT_INSTR();
    }
}

function SUBMIT_UID() {
    var uid = $("#uid").val();
    console.log(uid);
    $("#uidPage").hide();
    NEXT_INSTR();
    $("#instrPage").show();
}