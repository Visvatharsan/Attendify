// js/script.js

// This is the standard "document ready" function for jQuery.
// It ensures your code doesn't run until the page is fully loaded.
$(function() {
    
    console.log("Document is ready! jQuery is working.");

    // --- Mobile Menu Toggle ---
    $('#mobile-menu-button').on('click', function() {
        $('#mobile-menu').slideToggle(); 
    });


    // --- Shared Modal Logic ---
    
    // Get the modal and buttons
    const modal = $('#shared-modal');
    const openBtn = $('#open-modal-btn');
    
    // All buttons that should close the modal
    // We use classes here so multiple buttons can close it
    const closeBtns = $('.close-modal-btn-secondary, #close-modal-btn');

    // Open the modal
    openBtn.on('click', function() {
        modal.fadeIn(200); // Use .fadeIn() for a nice effect
    });

    // Close the modal when a close button is clicked
    closeBtns.on('click', function() {
        modal.fadeOut(200); // Use .fadeOut()
    });

    // Close the modal when the user clicks on the dark overlay
    modal.on('click', function(event) {
        // Check if the click is on the overlay itself, not the content
        if (event.target === modal[0]) {
            modal.fadeOut(200);
        }
    });

});