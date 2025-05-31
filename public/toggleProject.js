document.addEventListener('DOMContentLoaded', function () {
  window.toggleProject = function (button) {
    const content = button.nextElementSibling;
    const allDetails = document.querySelectorAll('[data-project-details]');
    const allButtons = document.querySelectorAll('button[onclick="toggleProject(this)"]');

    allDetails.forEach(el => {
      if (el !== content) {
        el.classList.remove('max-h-[500px]');
        el.classList.add('max-h-0');
      }
    });
    allButtons.forEach(btn => {
      if (btn !== button) {
        btn.classList.remove('expanded');
      }
    });

    const isExpanded = content.classList.contains('max-h-[500px]');
    if (isExpanded) {
      content.classList.remove('max-h-[500px]');
      content.classList.add('max-h-0');
      button.classList.remove('expanded');
    } else {
      content.classList.remove('max-h-0');
      content.classList.add('max-h-[500px]');
      button.classList.add('expanded');
    }
  };
});