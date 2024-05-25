// Test mode

testMode = true

// Global variables
let typingDelay = 60;
let characterSelected = 0;
let timePerQuestion = 30;
let timerStopped = false;
let currentChapter = 0;
let runningScore = 0;
let questionSet = '';
let currentCharacterName = '';
let questionsAlreadySelected = [];
let correctAnswersPerChapter = 0;
let currentAudio = '';
let timeLeft = 0;
let wonChapters = [];

// Functions

/** 
*  Function for playing musical background - function take number of track as parameter
*  #m1 - intro background track
*/
function playAudio(track, loopBool){
    let soundToPlay = new Audio (track);
    soundToPlay.loop = loopBool;
    soundToPlay.play();
    return soundToPlay;
}

// Function displayes end of chapter message
function chapterMessage(reason) {
    $('#game-container').css('opacity','1');
    $('#game-container').append('<div id="message-container" class="text-center"></div>');
    correctAnswersPerChapter = 0;
    switch(reason) {
        case 'outOfTime':
            currentAudio = playAudio(m3, true);
            message = `you ran out of time ${playerName} and unfortunately, the weapon has slipped through your grasp . the force was not with you on this mission . while you were close, destiny has chosen a different path for you today . prepare yourself, learn from this experience, and come back stronger . may the force guide you on your next adventure .`
            break;
        case 'wrongAnswer':
            currentAudio = playAudio(m3, true);
            message = `${playerName}, in the grand scheme of the galaxy, your chosen path has led you astray. the force did not align with your decision, you shall not pass this chapter unscathed. the journey for the weapon remains elusive, slipping through your grasp like sand in the desert winds. but fear not, for even in failure, there are lessons to be learned.`
            break;
        case 'wonChapter':
            currentAudio = playAudio(m1, true);
            message = `Congratulations ${playerName}, traveler of the stars! You have successfully navigated this chapter of your journey, drawing ever nearer to the ultimate showdown. Your path is illuminated by the Force, guiding you towards the final confrontation. Steel your resolve, for the greatest challenges lie ahead. With each step forward, you edge closer to destiny's embrace.`;    
        default:
            mesage = 'Something else'
    }
    let messageContainer = $('#message-container');
    let index = 0;

    function type() {
        if (index < message.length) {
            messageContainer.append(message.charAt(index));
            index++;
            setTimeout(type, typingDelay);
        } else {
            messageContainer.html(message);
            messageContainer.append('<button class="btn btn-warning" id="messageButtonOK">next chapter</button>');
            $('#messageButtonOK').click(function(){
                messageContainer.hide();
                prepareGameView();
                currentAudio.pause();
                if (currentChapter > 2){
                    // LINK TO RPS
                    window.location.href = afterChaptersLink;
                };
            });
        }
    }
    type();
}

// Function displays starting message in container
function startMessage() {
    currentAudio = playAudio(m1, true);
    $('#game-container').css('opacity','1');
    $('#game-container').append('<div id="message-container" class="text-center"></div>')
    const message = "welcome to mindwars " + playerName + " , the ultimate star wars-themed quiz game . journey through the galaxy , test your knowledge , and unlock the secrets of the force . i hope are you ready to prove your wisdom and become a jedi master . may the force be with you as you embark on this epic adventure !"
    let messageContainer = $('#message-container');
    let index = 0;

    function type() {
        if (index < message.length) {
            messageContainer.append(message.charAt(index));
            index++;
            setTimeout(type, typingDelay);
        } else {
            messageContainer.html(message);
            messageContainer.append('<button class="btn btn-warning" id="messageButtonOK">ok</button>');
            $('#messageButtonOK').click(function(){
                messageContainer.hide();
                chooseCharacter();
            });
        }
    }
    type();
}

// Function to choose character
function chooseCharacter() {
    $('#game-container').empty();
    $('#game-container').append(`
        <div id="message-container" class="text-center">
            <h2>Choose your character</h2>
            <br>
            <span>
                <img src="` + characterImage0 + `" class="enlarge-on-hover character-image" alt="Yoda">
                <img src="` + characterImage1 + `" class="enlarge-on-hover character-image" alt="Princess Leia">
                <img src="` + characterImage2 + `" class="enlarge-on-hover character-image" alt="Luke Skywalker">
                </span>
                <span>
                <img src="` + characterImage3 + `" class="enlarge-on-hover character-image" alt="Darth Vader">
                <img src="` + characterImage4 + `" class="enlarge-on-hover character-image" alt="Han Solo">
            </span>
        </div>
        `);
        $('.character-image').click(function(){
            characterSelected = $('.character-image').index(this);
            $('#message-container').css('opacity','0');
            setTimeout(function() {
                prepareGameView();
            }, 3000);
        });
}

// Function prepares game view and character perks
function prepareGameView(){
$('#game-container').empty()
switch(characterSelected) {
    // Solo
    case 4:
        currentCharacterImage = characterImage4
        currentQuestionSet = questionSet4
        currentCharacterName = 'Han Solo'
        break;
    // Vader
    case 3:
        currentCharacterImage = characterImage3
        currentQuestionSet = questionSet3
        currentCharacterName = 'Darth Vader'
        break;
    // Luke    
    case 2:
        currentCharacterImage = characterImage2
        currentQuestionSet = questionSet2
        currentCharacterName = 'Luke Skywalker'
        break;
    // Leia
    case 1:
        currentCharacterImage = characterImage1
        currentQuestionSet = questionSet1
        currentCharacterName = 'Princess Leia'
        break;
    // Yoda
    default:
        currentCharacterImage = characterImage0
        currentQuestionSet = questionSet0
        currentCharacterName = 'Yoda'
    };
$('#game-container').append(`
                    <div id="current-player-image-container">
                        <img src="` + currentCharacterImage + `" alt="Current player image" class="current-player-image">
                    </div>
                    <div id="artefact-image-container">
                        <span class="w-100 text-center inline-block">
                            artefact
                        </span>
                    </div>
                    <div id="timer-container" class="d-flex align-items-center justify-content-center text-center">
                        time left
                        <br>
                        <span id="running-timer">${timePerQuestion}</span>
                    </div>
                    <div id="lifelines-container">
                        <span class="w-100 text-center inline-block">
                            lifeline
                        </span>
                    </div>
                    <div id="question-container">
                        <div id="question-space" class="text-center">
                        </div>
                    </div>
                    <div id="answers-container">
                    </div>
                    <div id="score-container" class="d-flex align-items-center justify-content-center text-center">
                        score
                        <br>
                        <span id="running-score" class="w-100 text-center inline-block">
                            ${runningScore}
                        </span>
                    </div>
                    `);
    currentAudio.pause();
    setTimeout(function() {
        $('#current-player-image-container').css('opacity','1');
        $('#artefact-image-container').css('opacity','1');
        $('#timer-container').css('opacity','1');
        $('#lifelines-container').css('opacity','1');
        $('#question-container').css('opacity','1');
        $('#answers-container').css('opacity','1');
        $('#score-container').css('opacity','1');
    }, 1000);
    setTimeout(function() {
        askQuestion();
    }, 2000);
}

function countdownTimer(){
    timeLeft = timePerQuestion;
    let timerId = setInterval(countdown, 1000);
    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            endOfChapter('outOfTime');
        }else{
            $('#running-timer').html(timeLeft);
            if (timerStopped == false) {
                timeLeft--;
            } else {
                clearTimeout(timerId);
            }
            //if (addTime == true){
            //   timeLeft += 30;
            //    addTime = false;
            //    }
        }
    }
}

function askQuestion(){
    switch(currentChapter){
        case 0:
            currentAudio = playAudio(m2, true);
            $('#screen-container').css('background',`url('${back1}') no-repeat fixed top right / cover`);
        break;
        case 1:
            currentAudio = playAudio(m4, true);
            $('#screen-container').css('background',`url('${back2}') no-repeat fixed top right / cover`);
            break;
        case 2:
            currentAudio = playAudio(m5, true);
            $('#screen-container').css('background',`url('${back3}') no-repeat fixed top right / cover`);
            break;
        default:
            currentAudio = playAudio(m2, true);
            $('#screen-container').css('background',`url('${back1}') no-repeat fixed top right / cover`);
    }
    let questionAddition = 0;
    timeLeft = timePerQuestion;
    timerStopped = false;
    countdownTimer();
    fetch(currentQuestionSet)
    .then((response) => response.json())
    .then((questions) => {
        if (currentChapter == 0){
            questionLevel = 'easy';
        } else if (currentChapter == 1){
            questionLevel = 'medium';
            questionAddition = 50;
        } else {
            questionLevel = 'hard';
            questionAddition = 100;
        }
        do {
            questionRef = 'q' + (Math.ceil(Math.random() * 50) + questionAddition);
        } while (questionsAlreadySelected.includes(questionRef) == true);
        questionsAlreadySelected.push(questionRef);
        $('#question-space').html(`<span>${questions.character[currentCharacterName][questionLevel][0][questionRef].question}</span>`);
        $('#answers-container').append(`
                                    <div class="answer-option text-center" id="answer-a">${questions.character[currentCharacterName][questionLevel][0][questionRef].options[0]}</div>
                                    <div class="answer-option text-center" id="answer-b">${questions.character[currentCharacterName][questionLevel][0][questionRef].options[1]}</div>
                                    <div class="answer-option text-center" id="answer-c">${questions.character[currentCharacterName][questionLevel][0][questionRef].options[2]}</div>
                                    <div class="answer-option text-center" id="answer-d">${questions.character[currentCharacterName][questionLevel][0][questionRef].options[3]}</div>
        `);
        $('.answer-option').click(function(){
            let scoreThisQuestion = 10 * timeLeft * (currentChapter + 1);
            runningScore = runningScore + scoreThisQuestion;
            timerStopped = true;
            $(this).css('background-color','var(--dark-foreground)');
            $(this).css('color','var(--dark-background)');
            $('#cover-mask').show();
            if ($('.answer-option').index(this) == questions.character[currentCharacterName][questionLevel][0][questionRef].answer || testMode == true ){
                setTimeout(function(){
                    $('#cover-mask').hide();
                    currentAudio.pause();
                    correctAnswersPerChapter++;
                    if (correctAnswersPerChapter == 5){
                        endOfChapter('wonChapter');
                    }else{
                        console.log(currentChapter)
                        $('#answers-container').empty();
                        $('#running-score').html(runningScore);
                        askQuestion();
                    }
                },3000);
            }else{
                setTimeout(function(){
                    $('#cover-mask').hide();
                    currentAudio.pause();
                    endOfChapter('wrongAnswer');
                },3000);
            }
        });
    });
}

function endOfChapter(reason) {
    $('#current-player-image-container').css('opacity','0');
    $('#artefact-image-container').css('opacity','0');
    $('#timer-container').css('opacity','0');
    $('#lifelines-container').css('opacity','0');
    $('#question-container').css('opacity','0');
    $('#answers-container').css('opacity','0');
    $('#score-container').css('opacity','0');
    currentChapter++;
    setTimeout(function() {
        $('#game-container').empty();
        chapterMessage(reason);
    }, 2500);
    
}

// Starting point of quiz game
$(document).ready(function () {
    $('header').hide();
    $('footer').hide();
    $('#game-container').empty();
    if (testMode == true){
        typingDelay = 0;
        timePerQuestion = 2000;
    }
    startMessage();
});