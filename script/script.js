
const canvas = document.getElementById("snack");
const context = canvas.getContext("2d");
let box = 32;
let snack = [];
let direction = "right";

snack[0] = {
    x: 8 * box,
    y: 8 * box
}

// função que gera posições aleatorias para a comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// função que cria o background do jogo
function criarBg(){
    context.fillStyle = "#7986cb";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// função que cria o estilo da cobrinha
function criandoCobrinha(){
    for(i = 0; i < snack.length; i++){
        context.fillStyle = "#000051";
        context.fillRect(snack[i].x, snack[i].y, box, box);
    }
}

// função que cria o estilo da comida
function drawFood(){
    context.fillStyle = "#003c8f"; 
    context.fillRect(food.x, food.y, box, box);
}

// faz a chamada da função update para que a direção seja atualizada
document.addEventListener('keydown', update);

// função que atualiza a direção da cobrinha de acordo com o a tecla 
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down"; 
}

function iniciarJogo(){

    // define as posições da cobrinha de acordo com a localização
    if(snack[0].x > 15 * box && direction == "right") snack[0].x = 0;
    if(snack[0].x < 0 && direction == "left") snack[0].x = 16 * box;
    if(snack[0].y > 15 * box && direction == "down") snack[0].y = 0;
    if(snack[0].y < 0 && direction == "up") snack[0].y = 16 * box;

    // verifica se a cobrinha encostou nela mesma
    for(i = 1; i < snack.length; i++){
        if(snack[0].x == snack[i].x && snack[0].y == snack[i].y){
            clearInterval(jogo);
            alert("Game Over ");
        }
    }

    // faz a chamada das funções
    criarBg();
    criandoCobrinha();
    drawFood();

    // cria as variaveis de posição X e Y
    let snackX = snack[0].x;
    let snackY = snack[0].y;

    // faz a movimentação da cobrinha de acordo com a direção
    if(direction == "right") snackX += box;
    if(direction == "left") snackX -= box;
    if(direction == "up") snackY -= box;
    if(direction == "down") snackY += box;

    // condição que verifica se a cobra encostou na comida e aumenta o tamanho da cobrinha
    if(snackX != food.x || snackY != food.y){
        snack.pop();
    }
    else{
       food.x = Math.floor(Math.random() * 15 + 1) * box;
       food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // define as propriedades da cabeça da cobrinha
    let newHwead = {
        x: snackX,
        y: snackY
    }

    snack.unshift(newHwead);

}
// faz a chamada da função que inicia o jogo com o intervalo descrito
const jogo =  setInterval(iniciarJogo, 100);



