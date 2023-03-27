//Variables
let boardGame = [
    '', '', '', 
    '', '', '',
    '', '', ''
]

// Crear un array con los identificadores de las celdas del tablero
const cells = ["sq-1", "sq-2", "sq-3", "sq-4", "sq-5", "sq-6", "sq-7", "sq-8", "sq-9"];

const images = {
    escudo: "./img/shield-hylian.png",
    espada: "./img/espada-maestra.png"
};
// Variable para llevar el control de a quién le toca jugar
let currentPlayer = "espada";


const btn = document.querySelector(".boton");
btn.addEventListener("click", function() {
  // Eliminar todas las imágenes de las celdas del tablero
  const cells = document.querySelectorAll(".panelGame");
  cells.forEach(function(cell) {
    cell.innerHTML = "";
  });
  // Reiniciar el jugador actual y el estado del tablero
  currentPlayer = "espada";
  boardGame = ["", "", "", "", "", "", "", "", ""];
});


function checkWinner() {
    const winningCombinations = [
        // Combinaciones ganadoras horizontales
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Combinaciones ganadoras verticales
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Combinaciones ganadoras diagonales
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (boardGame[a] !== '' && boardGame[a] === boardGame[b] && boardGame[a] === boardGame[c]) {
            return boardGame[a]
        }
    }
    // Si no hay ganador, devolver null
    return null
}


function checkTie() {
    for (let i = 0; i < boardGame.length; i++) {
        if (boardGame[i] === '') {
            return false;
        }
    }
    const winner = checkWinner();
    return winner === null;
}


// Asignar un evento click a cada celda del tablero
for (let i = 0; i < cells.length; i++) {
    document.getElementById(cells[i]).addEventListener("click", function() {
        // Obtener la celda en la que se ha hecho clic
        const cell = document.getElementById(cells[i]);
        // Si la celda ya tiene contenido, no se hace nada
        if (cell.innerHTML !== "") {
            return;
        }
        // Crear una imagen y asignarle la ruta correspondiente al jugador actual
        const image = document.createElement("img");
        if(currentPlayer === 'espada'){
            image.classList.add('escudo')
        }else{
            image.classList.add('trifuerza')
        }
        image.src = images[currentPlayer];
        // Añadir la imagen a la celda
        cell.appendChild(image);

         // Actualizar el estado del tablero con el jugador actual
         boardGame[i] = currentPlayer;

         // Verificar si hay un ganador
         const winner = checkWinner();
         if (winner) {
            Swal.fire({
                title: `¡El jugador ${winner} ha ganado!`,
                width: 600,
                padding: '3em',
                color: '#fff',
                background: '#fff url(/img/hyrule-flag.jpeg)',
                
                
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `
              })
            
             
             
         } else if (checkTie()){
            Swal.fire({
                title: '¡Empate!',
                width: 600,
                padding: '3em',
                color: '#fff',
                background: '#fff url(/img/hyrule-flag.jpeg)',
                
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `
              })
         }else{
            // Cambiar el jugador actual si no hay ganador
            currentPlayer = currentPlayer === "espada" ? "escudo" : "espada";
         }
         
         
    });
    
        
        
}
