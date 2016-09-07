document.addEventListener("DOMContentLoaded", function(){
	
	function GameOfLife(boardWidth,boardHeight) {
		var self = this;
		this.interval;
		this.width = boardWidth;
		this.height = boardHeight;
		this.board = document.getElementById("board");
		
			setButtons();
			createBoard();
			firstGlider();

		this.cells = document.querySelectorAll("#board>div");

		function startSimulation(){
			 self.interval = setInterval(computeOneCycle, 500);
		}

		function stopSimulation(){
			window.clearInterval(self.interval);
		}

		function computeOneCycle(){
			computeNextGeneration();
			printNextGeneration();
		}

		function setButtons(){
			document.getElementById("play").addEventListener("click",startSimulation);
			document.getElementById("pause").addEventListener("click",stopSimulation);
		}		
		
		function createBoard(){
			self.board.style.width = boardWidth*10+"px";
			self.board.style.height = boardHeight*10+"px";
			boardCellsAll = boardWidth*boardHeight;

			for(var i = 0; i < boardCellsAll; i++){
				var newDiv = document.createElement("div");
  				document.getElementById("board").appendChild(newDiv);
			}

			self.cells = document.querySelectorAll("#board>div");
			
			for( var i = 0; i < self.cells.length; i++){
				self.cells[i].addEventListener("click",function(){
					this.classList.toggle("live");
				});
			}
		}

		function getIndex(x,y){
			return x+y*boardWidth;
		}

		function setCellState(x,y,state){
			if(state == "live"){
				document.querySelectorAll("#board>div")[getIndex(x,y)].classList.add("live");	
			}
		}

		function firstGlider(){
			setCellState(3,3,"live");
			setCellState(4,4,"live");
			setCellState(4,5,"live");
			setCellState(3,5,"live");
			setCellState(2,5,"live");
		}

		function computeCellNextState(x,y){
				var liveNeighbours = 0;
				emptyNeighbours = 0;

				if(x==0 || y==0){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x-1,y-1)].classList.contains("live")){
					liveNeighbours++;	
				}
				if(y==0){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x,y-1)].classList.contains("live")){
					liveNeighbours++;
				}
				if(x==self.width-1 || y==0){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x+1,y-1)].classList.contains("live")){
					liveNeighbours++;
				}
				if(x==0){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x-1,y)].classList.contains("live")){
					liveNeighbours++;
				}
				if(x==self.width-1){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x+1,y)].classList.contains("live")){
					liveNeighbours++;
				}
				if(x==0 || y==self.height-1){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x-1,y+1)].classList.contains("live")){
					liveNeighbours++;
				}
				if(y==self.height-1){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x,y+1)].classList.contains("live")){
					liveNeighbours++;
				}
				if(x==self.width-1 || y==self.height-1){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x+1,y+1)].classList.contains("live")){
					liveNeighbours++;
				}			

				if(self.cells[getIndex(x,y)].classList.contains("live")){
					if(liveNeighbours<2 || liveNeighbours>3){
						return 0;
					}else if(liveNeighbours==2 || liveNeighbours==3){
						return 1;
					}	
				}else if(!self.cells[getIndex(x,y)].classList.contains("live")){
					if(liveNeighbours==3){
						return 1;
					}
				}
				
				

			// 1. sąsiad: x-1, y-1
			// 2. sąsiad: x, y-1
			// 3. sąsiad: x+1, y-1
			// 4. sąsiad: x-1, y
			// 5. sąsiad: x+1, y
			// 6. sąsiad: x-1, y+1
			// 7. sąsiad: x, y+1
			// 8. sąsiad: x+1, y+1
			// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
			// Any live cell with two or three live neighbours lives on to the next generation.
			// Any live cell with more than three live neighbours dies, as if by over-population.
			// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
		}

		function computeNextGeneration(){
			nextCells = [];
			for(var i = 0; i < 50; i++){
				for(var j = 0; j < 50; j++){
					// if(computeCellNextState(j,i) == undefined){
						// emptyNeighboursCount++;
					// }else{
						nextCells.push(computeCellNextState(j,i));	
					// }
				}
			}
		}

		function printNextGeneration(){
			for(var i=0; i<self.cells.length;i++){
				if(nextCells[i]==1){
					self.cells[i].classList.add("live");
				}else if(nextCells[i]==0){
					self.cells[i].classList.remove("live");
				}
			}
		}

		function computeOneCycle(){
			computeNextGeneration();
			printNextGeneration();
		}
	}

	var gol1 = new GameOfLife(50,50);
	console.log(gol1);
	console.log(gol1.width);
	console.log(gol1.height);
	console.log(gol1.board);
	console.log(gol1.cells);

});