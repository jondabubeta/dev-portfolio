export default function toggleProject(button) {
  const container = button.closest('.group');
  const content = container.querySelector('[data-project-details]');
  const arrowRight = button.querySelector('.arrow-right');
  const arrowDown = button.querySelector('.arrow-down');

  const isHidden = content.classList.contains('hidden');
  if (isHidden) {
    content.classList.remove('hidden');
    arrowRight.classList.add('hidden');
    arrowDown.classList.remove('hidden');
  } else {
    content.classList.add('hidden');
    arrowRight.classList.remove('hidden');
    arrowDown.classList.add('hidden');
  }
}
