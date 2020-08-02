import { throttle } from 'lodash';

type DragableOptions = {
  onMove?: (e: MouseEvent, dragable: HTMLBaseElement) => void;
  disableSelect?: boolean;
  throttleWait?: number;
}

export default class Dragable {
  $el: HTMLBaseElement;
  baseX: number;
  baseY: number;
  throttleWait: number;
  onMove?: (e: MouseEvent, dragable: HTMLBaseElement) => void;
  disableSelect?: boolean;

  constructor(el: string, options: DragableOptions = { disableSelect: true, throttleWait: 100 }) {
    const $el: HTMLBaseElement = document.querySelector(el);
    if (!$el) {
      throw Error('can not find element: ' + el);
    }
    this.$el = $el;
    this.baseX = 0;
    this.baseY = 0;
    this.onMove = options.onMove;
    this.disableSelect = options.disableSelect;
    this.throttleWait = options.throttleWait;

    this.init();
  }

  private preventDefault(e: Event) {
    e.preventDefault();
  }

  init() {
    const { onMove, disableSelect, throttleWait } = this;
    const dragable = this.$el;
    dragable.addEventListener('mousedown', (e: MouseEvent) => {
      let startX: number = e.clientX;
      let startY: number = e.clientY;

      disableSelect && document.addEventListener('selectstart', this.preventDefault);

      const move = onMove ? throttle((e: MouseEvent) => onMove(e, dragable), throttleWait) : throttle((e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = clientX - startX + this.baseX;
        const y = clientY - startY + this.baseY;
        dragable.style.transform = `translate(${x}px, ${y}px)`;
      }, throttleWait);
      const up = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        this.baseX = clientX - startX + this.baseX;
        this.baseY = clientY - startY + this.baseY;
        // remove event
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        disableSelect && document.removeEventListener('selectstart', this.preventDefault);
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });
  }
}
