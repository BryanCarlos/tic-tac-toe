const root = document.querySelector(':root')
const main = document.getElementById('main')
const gameArea = []
let clicks = 0

document.getElementById('switchTheme').addEventListener('click', () => {
  if (main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#f1f1f1')
    root.style.setProperty('--text-color', '#292c35')
    root.style.setProperty('--winner', '#00aa35')
    main.dataset.theme = 'light'
  } else {
    root.style.setProperty('--bg-color', '#292c35')
    root.style.setProperty('--text-color', '#f1f1f1')
    root.style.setProperty('--winner', '#3fca35')
    main.dataset.theme = 'dark'
  }
})

document.querySelectorAll('.box').forEach((boxBtn) => {
  boxBtn.addEventListener('click', () => {
    if (boxBtn.dataset.status === 'inactive') {
      if (clicks % 2 === 0) {
        boxBtn.innerText = 'X'
        boxBtn.dataset.status = 'active'
      } else {
        boxBtn.innerText = 'O'
        boxBtn.dataset.status = 'active'
      }

      clicks++

      if (clicks >= 5) {
        checkWinner()
        
      }
      
    } else {
      return
    }
  })
})

document.getElementById('startGame').addEventListener('click', () => {
  const player1 = document.getElementById('player1').value
  const player2 = document.getElementById('player2').value

  if (player1.length === 0 || player2.length === 0) {
    return alert('Preencha o nome dos jogadores!')
  } else if (player1 === player2) {
    return alert('Os nomes não podem ser iguais.')
  }

  document.querySelectorAll('.box').forEach((boxBtn) => {
    boxBtn.disabled = false
  })
})

document.getElementById('restartGame').addEventListener('click', () => {
  const player1 = document.getElementById('player1')
  const player2 = document.getElementById('player2')

  player1.value = ''
  player2.value = ''
  clicks = 0

  document.querySelectorAll('.box').forEach((boxBtn) => {
    boxBtn.innerText = ''
    boxBtn.disabled = true
    boxBtn.dataset.status = 'inactive'
    boxBtn.style.borderColor = 'var(--text-color)'
  })
})

const winCombos = [
  // Combinações para ganhar nas linhas
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Combinações para ganhar nas colunas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Combinações para ganhar nas diagonais
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;

    const boxA = document.getElementById(`box-${a}`);
    const boxB = document.getElementById(`box-${b}`);
    const boxC = document.getElementById(`box-${c}`);

    if (
      boxA.innerText !== '' &&
      boxA.innerText === boxB.innerText &&
      boxA.innerText === boxC.innerText
    ) {
      // Temos um vencedor
      boxA.style.borderColor = boxB.style.borderColor = boxC.style.borderColor = 'var(--winner)'

      if (boxA.innerText === 'X') {
        const player1 = document.getElementById('player1').value

        alert(`${player1} ganhou!`)
      } else {
        if (boxA.innerText === 'O') {
          const player2 = document.getElementById('player2').value
  
          alert(`${player2} ganhou!`)
      }
      return;
    }
  }

    // Se chegamos até aqui e todos os botões estão preenchidos, é um empate
    if (clicks === 9) {
      document.querySelectorAll('.box').forEach((boxBtn) => {
        boxBtn.style.borderColor = 'var(--draw-game)'
      })
    }
  }
}