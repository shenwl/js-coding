const map: number[] = new Array(10000).fill(0);
const root: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
let mouse: boolean = false

function __main__() {
  for(let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('mousemove', () => {
        if(mouse) {
          cell.style.backgroundColor = 'black';
        }
      })
      root.appendChild(cell);
    }
  }
  window.document.addEventListener('mousedown', () => mouse = true);
  window.document.addEventListener('mouseup', () => mouse = false);
}
__main__();
