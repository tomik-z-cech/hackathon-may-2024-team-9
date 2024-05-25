document.addEventListener('DOMContentLoaded', () => {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();

    // Function to unmute and play the audio
    function unmuteAndPlayAudio() {
        var audio = document.querySelector('.audio');
        audio.muted = false;
        audio.play();
    }

    var audioSound = document.querySelector('.musicOn');

    audioSound.addEventListener('click', function() {
        unmuteAndPlayAudio();
        myModal.hide();
    });
});
