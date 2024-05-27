// Test mode
testMode = false;

// Global variables
const choices = ['Force Shield', 'Lightsaber', 'Blaster'];
let typingDelay = 30;
let currentAudio = '';
let userLives = 1; // Minimum 1 life
let artefacts = '';
let bossLives = 3;
let userChoice = 0;
let bossChoice = 0;
let finalstageUnlocked = '';
let currentCharacterName = '';
let finalScore = '';

// Functions

// Function for playing musical background 
function playAudio(track){
    if (sessionStorage.getItem('soundEnabled') == 'true') {
        let soundToPlay = new Audio (track);
        soundToPlay.loop = true;
        soundToPlay.volume = 0.2;
        soundToPlay.play();
        return soundToPlay;
    }
}

// Function for playing musical background
function playSFX(track){
    if (sessionStorage.getItem('soundEnabled') == 'true') {
        let sfxToPlay = new Audio (track);
        sfxToPlay.volume = 0.8;
        sfxToPlay.play();
        return sfxToPlay;
    }
}

// Function displays winning message in container
function winGame() {
    currentAudio = playAudio(mWon);
    $('#screen-container').css('background',`url('${backWin}') no-repeat fixed top right / cover`);
    $('#game-container').css('opacity','1');
    $('#message-container').empty();
    const message = `congratulations, ${playerName} - jedi master ! through your wisdom and bravery, you have successfully navigated the challenges of the galaxy. the force is strong with you! your knowledge has restored peace and balance to the universe. the galaxy is safe once more, thanks to your heroic efforts . may the force be with you, always.`;
    let messageContainer = $('#message-container');
    let index = 0;

    function type() {
        if (index < message.length) {
            messageContainer.append(message.charAt(index));
            index++;
            setTimeout(type, typingDelay);
        } else {
            messageContainer.html(message);
            messageContainer.append('<button class="btn btn-warning" id="messageButtonOK">great</button>');
            $('#messageButtonOK').click(function(){
                messageContainer.hide();
                $.ajax({
                    url: '/record-data/',
                    method: 'GET',
                    data: {
                        player_name: playerName,
                        final_score: finalScore
                    },
                    success: function (data) {
                        if (sessionStorage.getItem('soundEnabled') == 'true') {
                            currentAudio.pause();
                        }
                        if (data.recorded == 'yes'){
                            window.location.href = afterRSPLink;
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('AJAX Error: ' + status + ' - ' + error);
                    }
                });
            });
        }
    }
    type();
}

// Function displays winning message in container
function gameOver() {
    currentAudio = playAudio(mLost);
    $('#screen-container').css('background',`url('${backLost}') no-repeat fixed top right / cover`);
    $('#game-container').css('opacity','1');
    $('#message-container').empty();
    const message = `you have fallen, brave warrior ${playerName} , despite your valiant efforts, the challenges of the galaxy were too great . the darkness has claimed you , and the balance of the universe is now at risk. but remember , every end is a new beginning. your legacy will inspire others to rise and continue the fight . may the force be with you , always.`
    let messageContainer = $('#message-container');
    let index = 0;

    function type() {
        if (index < message.length) {
            messageContainer.append(message.charAt(index));
            index++;
            setTimeout(type, typingDelay);
        } else {
            messageContainer.html(message);
            messageContainer.append('<button class="btn btn-warning" id="messageButtonOK">i will try again</button>');
            $('#messageButtonOK').click(function(){
                if (sessionStorage.getItem('soundEnabled') == 'true') {
                    currentAudio.pause();
                }
                messageContainer.hide();
                window.location.href = afterRSPLink;
            });
        }
    }
    type();
}

// Function displays starting message in container
function finalStageMessage() {
    currentAudio = playAudio(m1);
    $('#screen-container').css('background',`url('${backFinal}') no-repeat fixed top right / cover`);
    $('#game-container').css('opacity','1');
    $('#game-container').append('<div id="message-container" class="text-center"></div>')
    switch (userLives){
        case 4:
            userLivesMessage = 'three extra lives';
            break;
        case 3:
            userLivesMessage = 'two extra lives';
            break;
        case 2:
            userLivesMessage = 'one extra life';
            break;
        case 1:
            userLivesMessage = 'zero extra lives';
            break;
        default:
            userLivesMessage = 'zero extra lives';
    }
    const message = `${playerName}, after a hard-fought battle to conquer the mind, Darth Sidious stands between you and saving the galaxy. Through your acquired artefacts, you have gained ${userLivesMessage} .`;
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
                if (sessionStorage.getItem('soundEnabled') == 'true') {
                    currentAudio.pause();
                }
                messageContainer.hide();
                prepareFinalGameView();
            });
        }
    }
    type();
}

// Function prepares game view and character perks
function prepareFinalGameView(){
    $('#game-container').empty()
    currentAudio = playAudio(mFinal);
    switch (currentCharacterName){
        case 'Han Solo':
            currentCharacterImage = characterImage4;
            break; 
        case 'Darth Vader':
            currentCharacterImage = characterImage3;
            break; 
        case 'Luke Skywalker':
            currentCharacterImage = characterImage2;
            break;  
        case 'Princess Leia':
            currentCharacterImage = characterImage1;
            break;  
        case 'Yoda':
            currentCharacterImage = characterImage0;
            break;  
    };
$('#game-container').append(`
                    <div id="final-game-container" class="text-center">
                        <div id="final-current-player-image-container">
                            <img src="${currentCharacterImage}" alt="Current player image" class="final-current-player-image">
                        </div>
                        <div id="lives-container" class="d-flex align-items-center justify-content-center text-center flex-column">
                            your lives
                            <br>
                            <span id="user-lives" class="w-100 text-center inline-block">
                                ${userLives}
                            </span>
                        </div>
                        <div id="attack-container" class="d-flex align-items-center justify-content-center text-center flex-column">
                            choose your method of attack
                            <br>
                            <br>
                            <span class="w-100">
                                <button class="btn btn-warning attack-btn">Force Shield</button>
                                <button class="btn btn-warning attack-btn">Lightsaber</button>
                                <button class="btn btn-warning attack-btn">Blaster</button>
                            </span>
                        </div>
                        <div id="boss-lives-container" class="d-flex align-items-center justify-content-center text-center flex-column">
                            opponents lives
                            <br>
                            <span id="boss-lives" class="w-100 text-center inline-block">
                                ${bossLives}
                            </span>
                        </div>
                        <div id="final-score-container" class="d-flex align-items-center justify-content-center text-center">
                            score
                            <br>
                            <span id="running-score" class="w-100 text-center inline-block">
                                ${finalScore}
                            </span>
                        </div>
                        <div id="boss-image-container">
                            <img src="${bossImage}" alt="Boss image" class="boss-image">
                        </div>
                    </div>
                    `);

    setTimeout(function() {
        $('#final-current-player-image-container').css('opacity','1');
        $('#lives-container').css('opacity','1');
        $('#attack-container').css('opacity','1');
        $('#boss-lives-container').css('opacity','1');
        $('#final-score-container').css('opacity','1');
        $('#boss-image-container').css('opacity','1');
    }, 1000);

    $('.attack-btn').click(function(){
        playSFX(sfx1);
        if (sessionStorage.getItem('soundEnabled') == 'true') {
            currentAudio.pause();
        }
        bossChoice = Math.floor(Math.random() * choices.length);
        userChoice = $('.attack-btn').index(this);
        playFinalGame();
    });
}

// Function for RPS/final stage mechanics
function playFinalGame() {
    $('#final-current-player-image-container').css('opacity','0');
    $('#lives-container').css('opacity','0');
    $('#attack-container').css('opacity','0');
    $('#boss-lives-container').css('opacity','0');
    $('#final-score-container').css('opacity','0');
    $('#boss-image-container').css('opacity','0');
    currentAudio = playAudio(mBattle);
    setTimeout(function() {
        $('#game-container').empty();
        $('#game-container').append(`
        <div id="message-container" class="text-center">
            <span id="player-choice" class="battle-choice"></span>
            <span id="versus" class="battle-choice"></span>
            <span id="boss-choice" class="battle-choice"></span>
            <span id="rps-result" class="battle-choice"></span>
        </div>
        `);
    }, 2500);
    // Countdown
    let countdown = 5;
    let countdownInterval = setInterval(() => {
        if (countdown > 0) {
            $('#boss-choice').text(`Darth Sidious attacks in ${countdown} seconds ...`);
            countdown--;
        } else {
            clearInterval(countdownInterval);
            $('#player-choice').html(`You used : <strong>${choices[userChoice]}</strong>`);
    $('#boss-choice').html(`Darth Sidious used : <strong>${choices[bossChoice]}</strong>`);
    $('#versus').html(`<i class="fa-solid fa-x"></i>`);
    $('#message-container').append('<button class="btn btn-warning" id="ok">ok</button>');
    if (userChoice == bossChoice) {
        playSFX(sfxClash);
        $('#rps-result').html('Your attacks cancel eachother out !<br><strong>Try again</strong>');
    }else if ((userChoice == 0 && bossChoice == 2) ||
            (userChoice == 2 && bossChoice == 1) ||
            (userChoice == 1 && bossChoice == 0) ) {
                // User won
                playSFX(sfx4);
                bossLives--;
                if (bossLives === 0) {
                    $('#rps-result').html('The strategy was effective !<br><strong>Dark Sidious lost their last life</strong>');
                } else if (bossLives > 0) {
                    $('#rps-result').html('The strategy was effective !<br><strong>Dark Sidious lost a life</strong');
                }
    } else {
        // Boss won
        playSFX(sfxSad);
        userLives--;
        $('#lives-count').text(userLives);
        if (userLives === 0) {
            $('#rps-result').html('Your strategy was ineffective and thus,<br><strong>you\'ve lost your last life !</strong>');
        } else {
            $('#rps-result').html('Your strategy was ineffective and thus,<br><strong>you\'ve lost a life !</strong>');
        }
    }
    $('#ok').click(function(){
        if (sessionStorage.getItem('soundEnabled') == 'true') {
            currentAudio.pause();
        }
        if (userLives == 0) {
            gameOver();
        } else if (bossLives == 0) {
            winGame();
        } else {
            prepareFinalGameView();
        };
    });
        }
    }, 1000);
}

    

// Starting point of final game
$(document).ready(function () {
    if (testMode == false){
        // Read session
        finalstageUnlocked = sessionStorage.getItem('finalStageUnlocked');
        currentCharacterName = sessionStorage.getItem('currentCharacterName');
        finalScore = parseInt(sessionStorage.getItem('runningScore'));
        artefacts = sessionStorage.getItem('wonChapters');
        if (finalstageUnlocked != 'true' ){
            alert('Cannot acces final stage directly');
            window.location.href = afterRSPLink;
        }
    }else{
        typingDelay = 0;
        finalstageUnlocked = true;
        currentCharacterName = 'Han Solo';
        finalScore = 1260;
        artefacts = [1,2,3];
        bossLives = 10;
    }
    $('header').hide();
    $('footer').hide();
    $('#game-container').empty();
    if (artefacts != null) {
        userLives = userLives + artefacts.length;
    };
    finalStageMessage();
});
