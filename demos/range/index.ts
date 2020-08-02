const dragable: HTMLDivElement = document.getElementById('dragable') as HTMLDivElement;

let baseX = 0;
let baseY = 0;

dragable.addEventListener('mousedown', (e: MouseEvent) => {
  let startX: number = e.clientX;
  let startY: number = e.clientY;

  const move = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const x = clientX - startX + baseX;
    const y = clientY - startY + baseY;
    dragable.style.transform = `translate(${x}px, ${y}px)`;
  };
  const up = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    baseX = clientX - startX + baseX;
    baseY = clientY - startY + baseY;
    // remove event
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
  };

  document.addEventListener('mousemove', move);

  document.addEventListener('mouseup', up);
});
