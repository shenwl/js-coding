import Dragable from './dragable';

const root = document.getElementById('root') as HTMLDivElement;

let ranges: Range[] = [];
document.addEventListener('selectstart', e => e.preventDefault());

for (let i = 0; i < root.childNodes[0].textContent.length; i++) {
  let range = document.createRange();
  range.setStart(root.childNodes[0], i);
  range.setEnd(root.childNodes[0], i);
  ranges.push(range);
}

function nearest(x0: number, y0: number): Range {
  let nearestRange = null;
  let distance = Infinity;

  for (let range of ranges) {
    const { x, y } = range.getBoundingClientRect();
    const d = (x0 - x) ** 2 + (y0 - y) ** 2;
    if(d < distance) {
      nearestRange = range;
      distance = d;
    }
  }
  return nearestRange;
}

new Dragable({ el: '#dragable', onMove: (e: MouseEvent, dragable) => {
  const { clientX, clientY } = e;
  const range = nearest(clientX, clientY);
  console.log(range);
  range.insertNode(dragable)
} });
