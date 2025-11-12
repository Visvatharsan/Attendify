// Wait for the document to be fully loaded
$(document).ready(function() {

    // --- Dynamic Content Loading ---

    // Check if we are on the student dashboard page
    if ($('#taskList').length) {
        loadStudentDashboard();
    }

    // Check if we are on the attendance history page
    if ($('#attendanceHistoryTable').length) {
        loadAttendanceHistory();
    }

    // --- Function to load student_dashboard.html content ---
    function loadStudentDashboard() {
        // Load Today's Attendance
        $.getJSON('assets/data/attendance.json', function(data) {
            const $tableBody = $('#todayAttendanceTable');
            $tableBody.empty(); // Clear loading state

            $.each(data.today, function(index, item) {
                let statusBadge;
                switch(item.status.toLowerCase()) {
                    case 'present':
                        statusBadge = `<span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Present</span>`;
                        break;
                    case 'absent':
                        statusBadge = `<span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Absent</span>`;
                        break;
                    case 'pending':
                        statusBadge = `<span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>`;
                        break;
                    default:
                        statusBadge = `<span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">N/A</span>`;
                }

                const row = `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.time}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.subject}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${statusBadge}</td>
                    </tr>
                `;
                $tableBody.append(row);
            });
        }).fail(function() {
            $('#todayAttendanceTable').html('<tr><td colspan="3" class="px-6 py-4 text-center text-red-500">Could not load attendance data.</td></tr>');
        });

        // Load Personalized Tasks
        $.getJSON('assets/data/tasks.json', function(data) {
            const $taskList = $('#taskList');
            $taskList.empty(); // Clear loading state

            $.each(data, function(index, task) {
                // Convert resources array to an HTML list string
                const resourcesHtml = task.resources.map(res => `<li>${res}</li>`).join('');
                
                const card = `
                    <div class="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                        <h3 class="font-semibold text-lg text-gray-800">${task.title}</h3>
                        <p class="text-sm text-gray-600 mt-2">${task.description.substring(0, 70)}... (${task.duration} mins)</p>
                        <p class="text-xs text-gray-500 mt-2">Subject: ${task.subject} | Difficulty: ${task.difficulty}</p>
                        <button 
                            class="view-task-btn mt-4 w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            data-title="${task.title}"
                            data-description="${task.description}"
                            data-resources="${resourcesHtml}">
                            View Details
                        </button>
                    </div>
                `;
                $taskList.append(card);
            });
        }).fail(function() {
            $('#taskList').html('<p class="text-red-500">Could not load tasks.</p>');
        });
    }

    // --- Function to load student_attendance_history.html content ---
    function loadAttendanceHistory() {
        $.getJSON('assets/data/attendance.json', function(data) {
            // Populate summary cards
            $('#summaryOverall').text(data.summary.overall).addClass('text-green-600');
            $('#summaryMonth').text(data.summary.thisMonth).addClass('text-gray-900');
            $('#summaryAbsences').text(data.summary.absences).addClass('text-red-600');

            // Populate history table
            const $tableBody = $('#attendanceHistoryTable');
            $tableBody.empty(); // Clear loading state

            $.each(data.history, function(index, item) {
                let statusBadge;
                switch(item.status.toLowerCase()) {
                    case 'present':
                        statusBadge = `<span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Present</span>`;
                        break;
                    case 'absent':
                        statusBadge = `<span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Absent</span>`;
                        break;
                    case 'late':
                        statusBadge = `<span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Late</span>`;
                        break;
                    default:
                        statusBadge = `<span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">N/A</span>`;
                }

                const row = `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.date}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.subject}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${statusBadge}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.notes}</td>
                    </tr>
                `;
                $tableBody.append(row);
            });
        }).fail(function() {
            $('#attendanceHistoryTable').html('<tr><td colspan="4" class="px-6 py-4 text-center text-red-500">Could not load attendance history.</td></tr>');
            $('#summaryOverall, #summaryMonth, #summaryAbsences').text('N/A').addClass('text-red-500');
        });
    }


    // --- Task Detail Modal Logic (for student_dashboard.html) ---
    
    // We must use event delegation since the task buttons are now loaded dynamically
    // We attach the listener to a parent element (#taskList) that exists on page load
    $('#taskList').on('click', '.view-task-btn', function() {
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

    // Handle closing the modal (no change needed)
    $('#closeTaskModalBtn').on('click', function() {
        $('#taskDetailModal').addClass('hidden');
    });

    // Handle closing the modal by clicking on the background overlay (no change needed)
    $('#taskDetailModal').on('click', function(e) {
        // Check if the click is on the overlay itself (the parent)
        if ($(e.target).is('#taskDetailModal')) {
            $(this).addClass('hidden');
        }
    });

    // --- Profile Form Logic (for student_profile.html) ---

    $('#profileForm').on('submit', function(e) {
        e.preventDefault(); // Stop the form from submitting normally
        
        const strengths = [];
        $('input[id^="strength-"]:checked').each(function() {
            strengths.push($(this).next('label').text());
        });

        const interests = [];
        $('input[id^="interest-"]:checked').each(function() {
            interests.push($(this).next('label').text());
        });

        const careerGoals = $('#-goals').val();

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