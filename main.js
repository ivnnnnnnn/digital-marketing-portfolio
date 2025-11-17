function toggleDetail(element) {
  const expHeader = element;
  const detail = expHeader.nextElementSibling;

  expHeader.classList.toggle("expanded");
  detail.style.display = (detail.style.display === "block") ? "none" : "block";
}

function expandAll() {
  document.querySelectorAll('.exp-header').forEach(header => {
    header.classList.add("expanded");
    const detail = header.nextElementSibling;
    detail.style.display = "block";
  });
}
function collapseAll() {
  document.querySelectorAll('.exp-header').forEach(header => {
    header.classList.remove("expanded");
    const detail = header.nextElementSibling;
    detail.style.display = "none";
  });
}

// Tema (dark/light)
function toggleTheme() {
  const theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('cv-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('cv-theme', 'dark');
  }
}

// Cek preferensi tema user
(function() {
  const theme = localStorage.getItem('cv-theme');
  if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
})();

// Keyboard nav untuk card pengalaman
document.querySelectorAll('.exp-header').forEach(header => {
  header.addEventListener('keydown', function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDetail(header);
    }
  });
});