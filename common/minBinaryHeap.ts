/**
 * 最小二叉堆(完全二叉树)
 */
export default class MinBinaryHeap<T> {
  data: T[];
  compare: Function;

  constructor(data: T[], compare: (a: T, b: T) => number) {
    this.data = data;
    this.compare = compare;
    this.heapify();
  }

  get size() {
    return this.data.length;
  }

  parent(index: number) {
    if (index == 0) {
      throw Error("index 0 doesn't have parent.");
    }
    return Math.floor((index - 1) / 2);
  }

  left(index: number) {
    return index * 2 + 1;
  }

  right(index: number) {
    return index * 2 + 2;
  }

  swap = (index1: number, index2: number) => {
    const { data } = this;
    const temp = data[index1];
    data[index1] = data[index2];
    data[index2] = temp;
  }

  /**
   * 元素和子节点对比，下沉到合适位置
   * 规则：堆中某个节点的值总是不小于其父节点的值
   */
  siftDown = (elIndex: number) => {
    if (elIndex < 0 || (elIndex >= this.size - 1)) return;
    const { data, compare } = this;

    // 小于子元素，就要下沉（与较大的子元素交换）
    let leftIndex = this.left(elIndex);
    let rightIndex = this.right(elIndex);
    while (leftIndex < this.size) {
      let compareIndex = leftIndex;
      let compareEl = data[leftIndex];

      if (rightIndex < this.size && compare(data[rightIndex], compareEl) < 0) {
        compareIndex = rightIndex;
        compareEl = data[rightIndex];
      }
      if (compare(data[elIndex], compareEl) < 0) {
        break;
      }

      this.swap(elIndex, compareIndex);

      elIndex = compareIndex;
      leftIndex = this.left(elIndex);
      rightIndex = this.right(elIndex);
    }
  }

  /**
  * 向堆中添加元素，需要按照二叉堆的规则将元素上浮到正确位置
  * 规则：堆中某个节点的值总是不小于其父节点的值
  */
  siftUp = (elIndex: number) => {
    if (elIndex <= 0) return;
    const { data, compare } = this;
    // 小于父元素，就要上浮（与父元素交换）
    let parentIndex = this.parent(elIndex);
    while (compare(data[elIndex], data[parentIndex]) < 0) {
      this.swap(elIndex, parentIndex);
      elIndex = parentIndex;
      // 已经上浮到顶端
      if (elIndex == 0) {
        break;
      }
      parentIndex = this.parent(elIndex);
    }
  }

  /**
   * 将任意数组整理成堆的形状
   * 实现：直接把当前数组看作完成二叉树，从最后一个非叶子节点开始计算，从后往前不断sift down
   * 如何定位最后一个非叶子节点的索引：拿到最后一个节点的索引，然后计算它的父节点。复杂度：O(n)
   * 如果将n个元素逐个插入到一个空堆中，复杂度是O(n log n)
   */
  private heapify = () => {
    const { data } = this;
    const lastLeafNodeIndex = data.length - 1;
    if(lastLeafNodeIndex <= 0) return;
    for (let i = this.parent(lastLeafNodeIndex); i >= 0; i--) {
      this.siftDown(i);
    }
  }

  takeMin = (): T | null => {
    if(this.size <= 0) return null;
    const min = this.data[0];
    // 把最后一个元素拿到root，然后sift down
    this.swap(0, this.size - 1);
    this.data.pop();
    this.siftDown(0);
    return min;
  }

  insert(el: T): void {
    this.data.push(el);
    this.siftUp(this.size - 1);
  }

  isEmpty = (): boolean => {
    return this.data.length === 0;
  }
}
