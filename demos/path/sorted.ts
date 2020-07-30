import MinBinaryHeap from '../../common/minBinaryHeap';

/**
 * 乱序存入元素，有序取出
 */
export default class Sorted<T> {
  heap: MinBinaryHeap<T>;
  compare: Function;

  constructor(data: T[], compare: (a: T, b: T) => number) {
    this.heap = new MinBinaryHeap(data, compare);
    this.compare = compare;
  }

  get length(): number {
    return this.heap.size;
  }

  // 取最小的
  take = (): T | null => {
    return this.heap.takeMin();
  }

  insert(el: T) {
    this.heap.insert(el);
  }

  isEmpty = (): boolean => {
    return this.heap.isEmpty();
  }
}
