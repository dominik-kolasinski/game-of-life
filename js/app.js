document.addEventListener("DOMContentLoaded", function(){
	function setStart(){

	}

	function setCellState(x,y,state){

	}

	function computeCellNextState(x,y){

	}

	function computeNextGeneration(){

	}

	function printNextGeneration(){

	}

	function Start(){

	}

	function Play(){
		
	}

	function Pause(){
		
	}

	function GameOfLife(boardWidth,boardHeight) {
		var self = this;
		this.width = boardWidth;
		this.height = boardHeight;
		this.board = document.getElementById("board");
		createBoard();
		this.cells = document.querySelectorAll("#board>div");
		firstGlider();
		computeNextGeneration();
		document.getElementById("play").addEventListener("click", computeOneCycle);
		

		function createBoard(){
			self.board.style.width = boardWidth*10+"px";
			self.board.style.height = boardHeight*10+"px";
			console.log(self.board.style.width);
			console.log(self.board.style.height);
			boardCellsAll = boardWidth*boardHeight;
			console.log(boardCellsAll);

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
			// if(x<0 || y<0 || x>49 || y>49){
			// 	return false;
			// }else{
			// 	// return document.querySelectorAll("#board>div")[x+y*boardWidth];
				return x+y*boardWidth;
			// }
		}

		function setCellState(x,y,state){
			if(state == "live"){
				document.querySelectorAll("#board>div")[getIndex(x,y)].classList.add("live");	
			}
		}

		function firstGlider(){
			setCellState(0,0,"live");
			setCellState(0,1,"live");
			setCellState(0,2,"live");
			setCellState(0,3,"live");
			setCellState(0,4,"live");

			setCellState(1,0,"live");
			// setCellState(1,1,"live");
			setCellState(1,2,"live");
			// setCellState(1,3,"live");
			setCellState(1,4,"live");
		}

		function computeCellNextState(x,y){
				var liveNeighbours = 0;
				emptyNeighbours = 0;

				if(x-1<0 || y-1<0){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x-1,y-1)].classList.contains("live")){
					liveNeighbours++;	
				}
				if(y-1<0){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x,y-1)].classList.contains("live")){
					liveNeighbours++;
				}
				if(x+1>49 || y-1<0){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x+1,y-1)].classList.contains("live")){
					liveNeighbours++;
				}
				if(x-1<0){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x-1,y)].classList.contains("live")){
					liveNeighbours++;
				}
				if(x+1>49){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x+1,y)].classList.contains("live")){
					liveNeighbours++;
				}
				if(x-1<0 || y+1>49){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x-1,y+1)].classList.contains("live")){
					liveNeighbours++;
				}
				if(y+1>49){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x,y+1)].classList.contains("live")){
					liveNeighbours++;
				}
				if(x+1>49 || y+1>49){
					emptyNeighbours++;
				}else if(self.cells[getIndex(x+1,y+1)].classList.contains("live")){
					liveNeighbours++;
				}			

				if(liveNeighbours<2 || liveNeighbours>3){
					return 0;
				}else{
					return 1;
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
			for(var i = 0; i <= 49; i++){
				for(var j = 0; j <=49; j++){
					// if(computeCellNextState(j,i) == undefined){
						// emptyNeighboursCount++;
					// }else{
						nextCells.push(computeCellNextState(j,i));	
					// }
				}
			}
			console.log(nextCells);
			console.log(emptyNeighbours);
		}

		function printNextGeneration(){
			console.log("next generation!");
			for(var i=0; i<self.cells.length;i++){
				if(nextCells[i]==1){
					console.log("live");
					self.cells[i].classList.add("live");
				}else if(nextCells[i]==0){
					console.log("dead");
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