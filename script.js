// Accordion for portfolio section
document.querySelectorAll('.accordion').forEach(function(btn){
    btn.addEventListener('click', function(){
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// Modal for project details
function showProjectDetails() {
    document.getElementById('modal').style.display = 'block';
}
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Optional: close modal when clicking outside modal-content
window.onclick = function(e) {
    var modal = document.getElementById('modal');
    if (e.target === modal) modal.style.display = "none";
}