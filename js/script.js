// js/script.js

// This is the standard "document ready" function for jQuery.
// It ensures your code doesn't run until the page is fully loaded.
$(function() {
    
    console.log("Document is ready! jQuery is working.");

    // --- Mobile Menu Toggle ---
    // Find the button with the ID 'mobile-menu-button'
    // and when it's clicked...
    $('#mobile-menu-button').on('click', function() {
        
        // Find the menu with the ID 'mobile-menu'
        // and toggle the 'hidden' class.
        // .slideToggle() is a nice jQuery animation
        $('#mobile-menu').slideToggle(); 

        // Optional: Change the hamburger icon to a close icon (X)
        // This requires a bit more setup, but 'slideToggle' is the main function.
    });

});