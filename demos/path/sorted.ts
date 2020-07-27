/**
 * 乱序存入元素，有序取出
 */
export default class Sorted<T> {
  data: T[];
  compare: Function;

  constructor(data: T[], compare: (a: T, b: T) => number) {
    this.data = data;
    this.compare = compare;
  }

  get length(): number {
    return this.data.length;
  }

  // 取最小的
  take = (): T | null => {
    const { data } = this;
    if (!data || (data.length < 1)) return null;
    let min = data[0];
    let minIndex = 0;
    for (let i = 1; i < data.length; i++) {
      if(this.compare(data[i], min) < 0) {
        min = data[i];
        minIndex = i;
      }
    }
    // 删除元素
    data[minIndex] = data[data.length - 1];
    this.data.pop();
    return min;
  }

  insert(el: T) {
    this.data.push(el);
  }
}
