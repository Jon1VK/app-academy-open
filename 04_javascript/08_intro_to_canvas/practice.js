document.addEventListener('DOMContentLoaded', function () {
  const canvasEl = document.getElementById('mycanvas');
  canvasEl.setAttribute('width', '500px');
  canvasEl.setAttribute('height', '500px');

  const ctx = canvasEl.getContext('2d');

  ctx.fillStyle = 'red';
  ctx.fillRect(50, 50, 50, 50);

  ctx.strokeStyle = 'green';
  ctx.beginPath();
  ctx.arc(150, 150, 25, 0, 2 * Math.PI);
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = 'blue';
  ctx.fill();
});
