document.addEventListener("DOMContentLoaded", function(){
  function draw(){
  	var canvas = document.getElementById('tutorial');
    if (canvas.getContext){
	  var ctx = canvas.getContext('2d');

	  ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect (10, 10, 150, 150);

      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect (70, 70, 150, 150);
    }
  }
  window.onload = draw();
});