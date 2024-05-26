$(document).ready(function () {
    if (sessionStorage.getItem('modalConfirmed') != 'true'){
        console.log('confirm');
        $('#exampleModal').show();
    };

    $('#music-off').click(function() {
        sessionStorage.setItem('modalConfirmed','true');
        $('#exampleModal').hide();
    });
    
    $('#music-on').click(function() {
        sessionStorage.setItem('modalConfirmed','true');
        sessionStorage.setItem('soundEnabled','true');
        var audio = document.querySelector('.audio');
        audio.muted = false;
        audio.play();
        $('#exampleModal').hide();
    });
});
