const toggle = document.querySelector(".toggle");
const navigation = document.querySelector(".navigation");
const main = document.querySelector(".main");

toggle.onclick = function(){
    navigation.classList.toggle("active")
    main.classList.toggle("active")
}
$(document).ready(function(){
$("#userAvatar").click(function(){
$("#logoutDropdown").toggle();
});
});
// add hovered class in selected list item
const list = document.querySelectorAll(".navigation li");
function activeLink(){
    list.forEach((item) =>
    item.classList.remove("hovered"));
    this.classList.add("hovered");
}
list.forEach((item) =>
item.addEventListener("mouseover",activeLink));
document.addEventListener("DOMContentLoaded", function() {
    const startExamBtn = document.getElementById('start-exam-btn');

    // Event listener for the "Start Exam" button
    startExamBtn.addEventListener('click', function() {
        console.log("Start Exam button clicked!"); // Check if this message appears in the console
        // Redirect to exam.html inside the Student folder
        window.location.href = 'Student/exam.html';
    });
});
