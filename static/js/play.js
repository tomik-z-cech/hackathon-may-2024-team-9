// Quiz game part of game
$(document).ready(function () {
    // Constant variables
    const gameContainer = $('#game-container');
    
    // Function clears the game container
    function clearGameContainer(){
        gameContainer.empty();
    };

    // Function to choose character
    function chooseCharacter() {
        clearGameContainer();
        gameContainer.append(`
            <div id="message-container" class="text-center">
                <h2>Choose your character</h2>
                <br>
                <span>
                    <img src="">
                </span>
                <span>
                
                </span>
            </div>
            `);
    };
    
    // Function displays message in container
    function startMessage() {
        gameContainer.append('<div id="message-container" class="text-center"></div>')
        const message = "Hello " + playerName + ", Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum."
        let messageContainer = $('#message-container');
        let index = 0;
    
        function type() {
            if (index < message.length) {
                messageContainer.append(message.charAt(index));
                index++;
                setTimeout(type, 60);
            } else {
                messageContainer.html(message);
                messageContainer.append('<button class="btn btn-info" id="messageButtonOK">OK</button>');
                $('#messageButtonOK').click(function(){
                    console.log('click');
                    messageContainer.hide();
                    chooseCharacter();
                });
            }
        }
        type();
    }

    // Starting point of quiz
    clearGameContainer();
    startMessage();
});