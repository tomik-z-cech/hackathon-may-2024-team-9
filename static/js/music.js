$(document).ready(function () {
    var audio = document.querySelector('.audio');
    if (sessionStorage.getItem('modalConfirmed') != 'true'){
        $('#exampleModal').show();
    };

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
