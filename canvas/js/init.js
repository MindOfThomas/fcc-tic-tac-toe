document.addEventListener('DOMContentLoaded', function() {
  showModal();
});

function showModal() {
  let modal = document.getElementById('modal');

  modal.style.display = 'block';

  document.getElementById('bot').addEventListener('change', function(event) {
    botEnabled = event.target.checked;
    document.getElementById('playAs-container').style.display = botEnabled ? 'block' : 'none';
  });
  document.getElementById('playAs').addEventListener('change', function(event) {
    tokens.person = event.target.value;
    tokens.bot = event.target.value === 'X' ? 'O' : 'X';
  });
  document.getElementById('play').addEventListener('click', function() {
    clearCanvas();
    setupGame();
    setupCanvas();
    modal.style.display = 'none';
    moveController();
  });
}
