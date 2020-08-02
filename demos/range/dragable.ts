type DragableOptions = {
  el: string,
}

export default class Dragable {
  $el: HTMLBaseElement;
  baseX: number;
  baseY: number;

  constructor(options: DragableOptions) {
    const $el: HTMLBaseElement = document.querySelector(options.el);
    if (!$el) {
      throw Error('can not find element: ' + options.el);
    }
    this.$el = $el;
    this.baseX = 0;
    this.baseY = 0;

    this.init();
  }

  init() {
    const dragable = this.$el;
    dragable.addEventListener('mousedown', (e: MouseEvent) => {
      let startX: number = e.clientX;
      let startY: number = e.clientY;

      const move = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = clientX - startX + this.baseX;
        const y = clientY - startY + this.baseY;
        dragable.style.transform = `translate(${x}px, ${y}px)`;
      };
      const up = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        this.baseX = clientX - startX + this.baseX;
        this.baseY = clientY - startY + this.baseY;
        // remove event
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };

      document.addEventListener('mousemove', move);

      document.addEventListener('mouseup', up);
    });
  }
}
