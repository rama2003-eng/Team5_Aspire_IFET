
document.addEventListener("DOMContentLoaded", function() {
    const addExamLink = document.getElementById('add-exam-link');
    const addExamPopup = document.getElementById('add-exam-popup');
    const closeExamPopupBtn = document.getElementById('close-exam-popup');

    // Show the add exam popup when the link is clicked
    addExamLink.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        addExamPopup.style.display = "block"; // Show the popup
    });

    // Close the add exam popup when the close button is clicked
    closeExamPopupBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default button behavior
        addExamPopup.style.display = "none"; // Hide the popup
    });

    // Close the add exam popup when clicking outside the popup
    window.addEventListener('click', function(event) {
        if (event.target == addExamPopup) {
            addExamPopup.style.display = "none"; // Hide the popup
        }
    });
    const addCourseLink = document.getElementById('add-course-link');
    const addCoursePopup = document.getElementById('add-course-popup');
    const closeCoursePopupBtn = document.getElementById('close-course-popup');

    // Show the add exam popup when the link is clicked
    addCourseLink.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        addCoursePopup.style.display = "block"; // Show the popup
    });

    // Close the add exam popup when the close button is clicked
    closeCoursePopupBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default button behavior
        addCoursePopup.style.display = "none"; // Hide the popup
    });

    // Close the add exam popup when clicking outside the popup
    window.addEventListener('click', function(event) {
        if (event.target == addCoursePopup) {
            addCoursePopup.style.display = "none"; // Hide the popup
        }
    });
});

