$(document).ready(function() {
    const $menuItems = $('.menu-item');
    let currentIndex = 0;

    // Highlight the first item by default
    $menuItems.eq(currentIndex).addClass('active');

    // Function to update the active menu item
    function updateActiveItem(index) {
        $menuItems.eq(currentIndex).removeClass('active');
        currentIndex = index;
        $menuItems.eq(currentIndex).addClass('active');
    }

    // Event listener for mouse clicks
    $menuItems.on('click', function() {
        window.location.href = $(this).data('link');
    });

    // Event listener for mouse hover
    $menuItems.on('mouseover', function() {
        const index = $menuItems.index(this);
        updateActiveItem(index);
    });

    // Event listener for keyboard navigation
    $(document).on('keydown', function(e) {
        if (e.key === 'ArrowUp') {
            const newIndex = (currentIndex - 1 + $menuItems.length) % $menuItems.length;
            updateActiveItem(newIndex);
        } else if (e.key === 'ArrowDown') {
            const newIndex = (currentIndex + 1) % $menuItems.length;
            updateActiveItem(newIndex);
        } else if (e.key === 'Enter') {
            window.location.href = $menuItems.eq(currentIndex).data('link');
        }
    });
});