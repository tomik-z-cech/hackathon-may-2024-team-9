$(document).ready(function () {
    // Update the page date
    $('#copyright').text(new Date().getFullYear());

    // Show the footer
    $('.footer-arrow').on('click', function () {
        $(this).addClass('d-none');
        if ($(this).hasClass('arrow-up')) {
            $('.arrow-down').removeClass('d-none');
            $('#footer').collapse('show');
        } else {
            $('.arrow-up').removeClass('d-none');
            $('#footer').collapse('hide');
        }
    });
    $('.offcanvas').on('shown.bs.offcanvas', function() {
        $('footer').hide();
    });

    $('.offcanvas').on('hidden.bs.offcanvas', function() {
        $('footer').show();
    });
});