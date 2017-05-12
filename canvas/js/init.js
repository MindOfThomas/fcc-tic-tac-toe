document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('mode').addEventListener('change', function(event) {
    mode = event.target.value;
  });
  showModal();
});

function showModal() {
  let modal = document.getElementById('modal');

  modal.style.display = 'block';

  document.getElementById('playAsX').addEventListener('click', function() {
    tokens.person = 'X';
    tokens.bot = 'O';
    clearCanvas();
    setupGame();
    setupCanvas();
    modal.style.display = 'none';
  });
  document.getElementById('playAsO').addEventListener('click', function() {
    tokens.person = 'O';
    tokens.bot = 'X';
    clearCanvas();
    setupGame();
    setupCanvas();
    modal.style.display = 'none';
    moveController();
  });
}
