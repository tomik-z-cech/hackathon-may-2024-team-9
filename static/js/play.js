// Constant variables
const typingDelay = 0;

// Global variables
let characterSelected = 0
let timePerQuestion = 30
let timerStopped = false
let currentChapter = 0
let runningScore = 0

// Functions

// Function displayes end of chapter message
function chapterMessage(reason) {
    $('#game-container').css('opacity','1');
    $('#game-container').append('<div id="message-container" class="text-center"></div>');
    switch(reason) {
        case 'outOfTime':
            message = `you ran out of time ${playerName} and unfortunately, the weapon has slipped through your grasp . the force was not with you on this mission . while you were close, destiny has chosen a different path for you today . prepare yourself, learn from this experience, and come back stronger . may the force guide you on your next adventure .`
            break;
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
            });
        }
    }
    type();
}

// Function displays message in container
function startMessage() {
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
        break;
    // Vader
    case 3:
        currentCharacterImage = characterImage3
        break;
    // Luke    
    case 2:
        currentCharacterImage = characterImage2
        break;
    // Leia
    case 1:
        currentCharacterImage = characterImage1
        break;
    // Yoda
    default:
        currentCharacterImage = characterImage0
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
                    <div id="timer-container">
                        <span class="w-100 text-center inline-block">
                            timer
                        </span>
                        <br>
                        <span id="running-timer" class="w-100 text-center inline-block">
                            ${timePerQuestion}
                        </span>
                    </div>
                    <div id="lifelines-container">
                        <span class="w-100 text-center inline-block">
                            lifeline
                        </span>
                    </div>
                    <div id="question-container">
                        <span class="w-100 text-center inline-block">
                            question
                        </span>
                    </div>
                    <div id="answers-container">
                        <span class="w-100 text-center inline-block">
                            answers
                        </span>
                    </div>
                    <div id="score-container">
                        <span class="w-100 text-center inline-block">
                            score
                        </span>
                        <br>
                        <span id="running-score" class="w-100 text-center inline-block">
                            ${runningScore}
                        </span>
                    </div>
                    `);
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
        countdownTimer();
    }, 2000);
}

function countdownTimer(){
    let timeLeft = timePerQuestion;
    let timerId = setInterval(countdown, 1000);
    function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
        endOfChapter('outOfTime');
    }else{
        $('#running-timer').html(timeLeft);
        if (timerStopped == false) {
            timeLeft--;
            //if (addTime == true){
            //   timeLeft += 30;
            //    addTime = false;
            //    }
            }
        }
    }
}

function endOfChapter(reason) {
    $('#current-player-image-container').css('opacity','0');
    $('#artefact-image-container').css('opacity','0');
    $('#timer-container').css('opacity','0');
    $('#lifelines-container').css('opacity','0');
    $('#question-container').css('opacity','0');
    $('#answers-container').css('opacity','0');
    $('#score-container').css('opacity','0');
    console.log(currentChapter);
    if (currentChapter == 2){
        console.log('end of quiz')
        window.location.href = afterChaptersLink;
    };
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
    startMessage();
});