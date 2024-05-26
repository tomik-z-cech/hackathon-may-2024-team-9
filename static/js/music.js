$(document).ready(function () {
    if (sessionStorage.getItem('modalConfirmed') != 'true'){
        $('#exampleModal').show();
    };

    let audio = new Audio (m1);
    // audio.loop = loopBool;
    audio.volume = 0.2;

    $('#music-off').click(function() {
        sessionStorage.setItem('modalConfirmed','true');
        audio.muted = true;
        $('#exampleModal').hide();
    });
    
    $('#music-on').click(function() {
        sessionStorage.setItem('modalConfirmed','true');
        sessionStorage.setItem('soundEnabled','true');
        audio.muted = false;
        audio.play();
        $('#exampleModal').hide();
    });

    $('#sound-setting-button').click(function(){
        $('#exampleModal').show();
    });
});
