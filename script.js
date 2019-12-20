const canvas = document.getElementById("arena");
const context = canvas.getContext("2d");
const comer = document.getElementById("comer");
let jogo;

const grid = 24; //tamanho de uma coluna na arena
let cobra = [];
cobra[0] = {
	x: 6 * grid,
	y: 6 * grid
}

let direcao;
let comida = {
	x: (Math.floor(Math.random()* grid) * grid)%canvas.width,
	y: (Math.floor(Math.random()* grid) * grid)%canvas.height
}
let pontuacao = 0;
let recorde = 0;

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

function criaCobra(){
	context.fillStyle="white";
	context.fillRect(0,0,canvas.width,canvas.height);
	for(i=0; i<cobra.length;i++){
		context.fillStyle="#1b5e20";
		context.fillRect(cobra[i].x, cobra[i].y, grid, grid);
	}
}

function movimento(m){
		if(m.keyCode == 37 && direcao != "direita"){
			direcao = "esquerda";
		}
		
		if(m.keyCode == 38 && direcao != "baixo"){
			direcao = "cima";
		}
		
		if(m.keyCode == 39 && direcao != "esquerda"){
			direcao = "direita";
		}
		
		if(m.keyCode == 40 && direcao != "cima"){
			direcao = "baixo";
		}
}

function iniciar(){	
	if(pontuacao > recorde){
		recorde = pontuacao;
	}
	
	document.getElementById("pontuacao").innerHTML = pontuacao;
	document.getElementById("recorde").innerHTML = recorde;
	document.addEventListener("keydown", movimento);
	
	//Caso a cobra passe pelo limite da arena, ela surge na direção oposta
	if(cobra[0].x > 12*grid){
		cobra[0].x = 0;
    }
	if(cobra[0].x < 0){
		cobra[0].x = 13 * grid;
    }
	if(cobra[0].y > 12*grid){
		cobra[0].y = 0;
    }
	if(cobra[0].y < 0){
		cobra[0].y = 13 * grid;
	}
	
	//Checa se a cobra colidiu com uma parte de si
    for(i = 1; i < cobra.length; i++){
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
			console.log("Fim");
            clearInterval(jogo);
        }
    }
	
	criaCobra();	
	criaComida();
	
	let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;
	
	//Movimento de acordo com a direção selecionada
	if(direcao == "esquerda"){
		cobraX -= grid;
	}
	if(direcao == "direita"){
		cobraX += grid;
	}
	if(direcao == "cima"){
		cobraY -= grid;
	}
	if(direcao == "baixo"){
		cobraY += grid;
	}
	
	console.log(cobraX);
	console.log(comida.x);
	
	//Caso a cobra não tenha pego a comida ainda, tira a última posição do array
	if(cobraX != comida.x || cobraY != comida.y){
        cobra.pop();
    }else{
		comer.play();
		pontuacao++;
		document.getElementById("pontuacao").innerHTML = pontuacao; //Mostra a pontuação na tela
		novaComida();
		
		//Caso a comida nova esteja numa parte da cobra, recalcula a posição
		while(1){
			let corretos = 0; //Quantidade de partes da cobra que não estão na mesma posição que a comida
			for(i=0; i<cobra.length;i++){
				if(comida.x == cobra[i].x && comida.y == cobra[i].y){
					novaComida();
					break;
				}
				else{
					corretos++;
				}
			}
			if(corretos == cobra.length){
				break;
			}
		}
    }
	
	//A posição seguinte no movimento da cobra se torna a cabeça dela
	let inicioCobra ={
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(inicioCobra);
}

function inicializar(){
	clearInterval(jogo);
	pontuacao = 0;
	direcao=null; // começa parado
	
	//Limpando o canvas
	context.fillStyle="white";
	context.fillRect(0,0,canvas.width,canvas.height);
	
	//Cobra inicial tem tamanho 1 e começa no meio da arena
	cobra.length = 1;
	cobra[0].x = 6 * grid;
	cobra[0].y = 6 * grid;
	criaCobra();
	
	jogo = setInterval(iniciar, 150);
}
