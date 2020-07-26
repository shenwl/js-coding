const cacheMap = localStorage.getItem('map');
let map: number[] = cacheMap ? JSON.parse(cacheMap) : new Array(10000).fill(0);
const container: HTMLDivElement = document.getElementById('container') as HTMLDivElement;
const saveBtn: HTMLButtonElement = document.getElementById('save-btn') as HTMLButtonElement;
const clearBtn: HTMLButtonElement = document.getElementById('clear-btn') as HTMLButtonElement;
let mouse: boolean = false;
let clear: boolean = false;

function onSave() {
  localStorage.setItem('map', JSON.stringify(map));
}
function onClear() {
  localStorage.removeItem('map');
  map = new Array(10000).fill(0);
  container.innerHTML = '';
  drawMap();
}

function drawMap() {
  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      const position = y * 100 + x;
      if (map[position] === 1) {
        cell.style.backgroundColor = 'black';
      }
      cell.addEventListener('mousemove', () => {
        if (mouse) {
          cell.style.backgroundColor = clear ? '' : 'black';
          map[position] = clear ? 0 : 1;
        }
      })
      container.appendChild(cell);
    }
  }
}

function initEvent() {
  window.document.addEventListener('mousedown', (e: MouseEvent) => {
    mouse = true
    // 右键
    clear = e.which === 3;
  });
  window.document.addEventListener('mouseup', () => mouse = false);

  window.document.addEventListener('contextmenu', (e: Event) => e.preventDefault());

  saveBtn.addEventListener('click', onSave);
  clearBtn.addEventListener('click', onClear);
}

function __main__() {
  drawMap();
  initEvent();
}
__main__();
