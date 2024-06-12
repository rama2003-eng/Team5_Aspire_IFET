// document.addEventListener("DOMContentLoaded", function() {
//     var modal = document.querySelector(".login-form");
//     // var loginButton = document.querySelector(".title");
//     var addExamLink = document.querySelector('a[href="addexam.html"]');
//     var closeButton = document.querySelector(".close-icon");

//     modal.style.display = "none";

//     function openModal() {
//         modal.style.display = "block";
//     }

//     function closeModal() {
//         modal.style.display = "none";
//     }

//     loginButton.addEventListener("click", openModal);
//     closeButton.addEventListener("click", closeModal);
//     addExamLink.addEventListener("click", openModal);
// });

// function toggleLoginForm() {
//     var loginForm = document.querySelector('.login-form');
//     loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
// }

// // Add event listener to the "Add Exam" link to toggle the login form visibility
// document.querySelector('a[href="addexam.html"]').addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent the default link behavior
//     toggleLoginForm();
// });

document.addEventListener("DOMContentLoaded", function() {
    var addExamLink = document.querySelector('.add-exam-link');
    var loginFormContainer = document.querySelector('.login-form');

    addExamLink.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default behavior of the link
        loadLoginForm();
    });

    function loadLoginForm() {
        fetch('1.html') // Fetch the login form HTML
            .then(response => response.text()) // Parse the response as text
            .then(html => {
                loginFormContainer.innerHTML = html; // Insert the login form HTML into the container
                attachLoginFormListeners(); // Attach event listeners to the loaded login form
            })
            .catch(error => console.error('Error fetching login form:', error));
    }

    function attachLoginFormListeners() {
        var closeButton = document.querySelector(".close-icon");
        closeButton.addEventListener("click", function() {
            loginFormContainer.innerHTML = ''; // Clear the login form container when the close button is clicked
        });
    }
});


