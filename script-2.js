const canvas = document.getElementById("arena");
const context = canvas.getContext("2d");
const comer = document.getElementById("comer");
const gameOver = document.getElementById("game-over");
let jogo;

const grid = 24; //tamanho de uma coluna na arena
let cobra1 = [], cobra2 = [];
cobra1[0] = {
	x: 5 * grid,
	y: 6 * grid
}
cobra2[0] = {
	x: 7 * grid,
	y: 6 * grid
}

let direcao1, direcao2;
let comida = {
	x: (Math.floor(Math.random()* grid) * grid)%canvas.width,
	y: (Math.floor(Math.random()* grid) * grid)%canvas.height
}
let pontuacao1 = 0, pontuacao2 = 0;

function criaComida(){
	context.fillStyle = "#f44336";
	//context.fillRect(comida.x, comida.y, grid, grid);
	context.beginPath();
	context.arc(comida.x + 12, comida.y + 12, 12, 0, 2 * Math.PI);
	context.closePath();
	context.fill();
}

function novaComida(){
	comida.x = (Math.floor(Math.random()* grid) * grid)%canvas.width;
	comida.y = (Math.floor(Math.random()* grid) * grid)%canvas.height;
}

function criaCobra1(){
	for(i=0; i<cobra1.length;i++){
		context.fillStyle="#1b5e20";
		context.fillRect(cobra1[i].x, cobra1[i].y, grid, grid);
	}
}

function criaCobra2(){
	for(i=0; i<cobra2.length;i++){
		context.fillStyle="#ffa726";
		context.fillRect(cobra2[i].x, cobra2[i].y, grid, grid);
	}
}

function movimento(m){
		//Jogador 1
		if(m.keyCode == 65 && direcao1 != "direita"){
			direcao1 = "esquerda";
		}
		
		if(m.keyCode == 87 && direcao1 != "baixo"){
			direcao1 = "cima";
		}
		
		if(m.keyCode == 68 && direcao1 != "esquerda"){
			direcao1 = "direita";
		}
		
		if(m.keyCode == 83 && direcao1 != "cima"){
			direcao1 = "baixo";
		}
		
		//Jogador 2
		if(m.keyCode == 37 && direcao2 != "direita"){
			direcao2 = "esquerda";
		}
		
		if(m.keyCode == 38 && direcao2 != "baixo"){
			direcao2 = "cima";
		}
		
		if(m.keyCode == 39 && direcao2 != "esquerda"){
			direcao2 = "direita";
		}
		
		if(m.keyCode == 40 && direcao2 != "cima"){
			direcao2 = "baixo";
		}
}

function checaComida(){
	while(1){
		let corretos = 0; //Quantidade de partes da cobra que não estão na mesma posição que a comida
		for(i=0; i<cobra1.length;i++){
			if(comida.x == cobra1[i].x && comida.y == cobra1[i].y){
				novaComida();
				break;
			}
			else{
				corretos++;
			}
		}
		for(i=0; i<cobra2.length;i++){
			if(comida.x == cobra2[i].x && comida.y == cobra2[i].y){
				novaComida();
				break;
			}
			else{
				corretos++;
			}
		}
		if(corretos == (cobra1.length + cobra2.length)){
			break;
		}
	}
}

function iniciar(){	
	document.getElementById("pontuacao1").innerHTML = pontuacao1;
	document.getElementById("pontuacao2").innerHTML = pontuacao2;
	document.addEventListener("keydown", movimento);
	
	//Caso a cobra passe pelo limite da arena, ela surge na direção oposta
	if(cobra1[0].x > 12*grid){
		cobra1[0].x = 0;
    }
	if(cobra1[0].x < 0){
		cobra1[0].x = 13 * grid;
    }
	if(cobra1[0].y > 12*grid){
		cobra1[0].y = 0;
    }
	if(cobra1[0].y < 0){
		cobra1[0].y = 13 * grid;
	}
	
	if(cobra2[0].x > 12*grid){
		cobra2[0].x = 0;
    }
	if(cobra2[0].x < 0){
		cobra2[0].x = 13 * grid;
    }
	if(cobra2[0].y > 12*grid){
		cobra2[0].y = 0;
    }
	if(cobra2[0].y < 0){
		cobra2[0].y = 13 * grid;
	}
	
	//Checa se a cobra colidiu com uma parte de si
    for(i = 1; i < cobra1.length; i++){
        if( (cobra1[0].x == cobra1[i].x && cobra1[0].y == cobra1[i].y) || (cobra2[0].x == cobra1[i].x && cobra2[0].y == cobra1[i].y) ){
			gameOver.play();
			console.log("Fim");
            clearInterval(jogo);
        }
    }
	
	for(i = 1; i < cobra2.length; i++){
        if( (cobra2[0].x == cobra2[i].x && cobra2[0].y == cobra2[i].y) || (cobra1[0].x == cobra2[i].x && cobra1[0].y == cobra2[i].y) ){
			gameOver.play();
			console.log("Fim");
            clearInterval(jogo);
        }
    }
	
	context.fillStyle="white";
	context.fillRect(0,0,canvas.width,canvas.height);
	criaCobra1();
	criaCobra2();
	criaComida();
	
	let cobraX1 = cobra1[0].x;
    let cobraY1 = cobra1[0].y;
	let cobraX2 = cobra2[0].x;
    let cobraY2 = cobra2[0].y;
	
	//Movimento de acordo com a direção selecionada
	if(direcao1 == "esquerda"){
		cobraX1 -= grid;
	}
	if(direcao1 == "direita"){
		cobraX1 += grid;
	}
	if(direcao1 == "cima"){
		cobraY1 -= grid;
	}
	if(direcao1 == "baixo"){
		cobraY1 += grid;
	}
	
	if(direcao2 == "esquerda"){
		cobraX2 -= grid;
	}
	if(direcao2 == "direita"){
		cobraX2 += grid;
	}
	if(direcao2 == "cima"){
		cobraY2 -= grid;
	}
	if(direcao2 == "baixo"){
		cobraY2 += grid;
	}
	
	//Caso a cobra não tenha pego a comida ainda, tira a última posição do array
	if(cobraX1 != comida.x || cobraY1 != comida.y){
        cobra1.pop();
    }else{
		comer.play();
		pontuacao1++;
		document.getElementById("pontuacao1").innerHTML = pontuacao1; //Mostra a pontuação na tela
		novaComida();
		
		//Caso a comida nova esteja numa parte da cobra, recalcula a posição
		checaComida();
    }
	
	if(cobraX2 != comida.x || cobraY2 != comida.y){
        cobra2.pop();
    }else{
		comer.play();
		pontuacao2++;
		document.getElementById("pontuacao2").innerHTML = pontuacao2; //Mostra a pontuação na tela
		novaComida();
		
		//Caso a comida nova esteja numa parte da cobra, recalcula a posição
		checaComida();
    }
	
	//A posição seguinte no movimento da cobra se torna a cabeça dela
	let inicioCobra1 ={
        x: cobraX1,
        y: cobraY1
    }
	
	let inicioCobra2 ={
        x: cobraX2,
        y: cobraY2
    }

    cobra1.unshift(inicioCobra1);
	cobra2.unshift(inicioCobra2);
}

function inicializar(){
	clearInterval(jogo);
	pontuacao1 = 0;
	pontuacao2 = 0;
	direcao1=null; // começa parado
	direcao2=null;
	
	//Limpando o canvas
	context.fillStyle="white";
	context.fillRect(0,0,canvas.width,canvas.height);
	
	//Cobra inicial tem tamanho 1 e começa no meio da arena
	cobra1.length = 1;
	cobra2.length = 1;
	cobra1[0].x = 5 * grid;
	cobra1[0].y = 6 * grid;
	cobra2[0].x = 7 * grid;
	cobra2[0].y = 6 * grid;
	criaCobra1();
	criaCobra2();
	
	jogo = setInterval(iniciar, 150);
}
