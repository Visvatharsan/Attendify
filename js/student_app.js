// Wait for the document to be fully loaded
$(document).ready(function() {

    // --- Task Detail Modal Logic (for student_dashboard.html) ---
    
    // Get all "View Details" buttons
    $('.view-task-btn').on('click', function() {
        // Get data from the button that was clicked
        const title = $(this).data('title');
        const description = $(this).data('description');
        const resources = $(this).data('resources'); // This is an HTML string

        // Populate the modal with the data
        $('#modalTaskTitle').text(title);
        $('#modalTaskDescription').text(description);
        $('#modalTaskResources').html(resources); // Use .html() to render the list items

        // Show the modal
        $('#taskDetailModal').removeClass('hidden');
    });

    // Handle closing the modal
    $('#closeTaskModalBtn').on('click', function() {
        $('#taskDetailModal').addClass('hidden');
    });

    // Handle closing the modal by clicking on the background overlay
    $('#taskDetailModal').on('click', function(e) {
        // Check if the click is on the overlay itself (the parent)
        if ($(e.target).is('#taskDetailModal')) {
            $(this).addClass('hidden');
        }
    });

    // --- Profile Form Logic (for student_profile.html) ---

    $('#profileForm').on('submit', function(e) {
        e.preventDefault(); // Stop the form from submitting normally

        // In a real app, you'd collect the data and send it to a backend.
        // For now, we'll just log it and show a success message.
        
        const strengths = [];
        $('input[id^="strength-"]:checked').each(function() {
            strengths.push($(this).next('label').text());
        });

        const interests = [];
        $('input[id^="interest-"]:checked').each(function() {
            interests.push($(this).next('label').text());
        });

        const careerGoals = $('#career-goals').val();

        console.log("Saving Profile Data:");
        console.log("Strengths:", strengths);
        console.log("Interests:", interests);
        console.log("Career Goals:", careerGoals);

        // Show a temporary success message
        const $saveMessage = $('#saveMessage');
        $saveMessage.removeClass('hidden');
        setTimeout(function() {
            $saveMessage.addClass('hidden');
        }, 3000); // Hide after 3 seconds
    });

});