import { MapItem, Coordinate } from "./type";
import sleep from "./sleep";

async function bfs(container: HTMLDivElement, map: MapItem[], start: Coordinate, end: Coordinate) {
  // push/shift
  const queue: Coordinate[] = [start];
  // 记录访问过的坐标
  const visited: any = {
    [`${start[0]}`]: [start[1]],
  };

  const visit = ([x, y]: [number, number]) => {
    if (visited[x]) {
      visited[x].push(y);
    } else {
      visited[x] = [y];
    }
    queue.push([x, y]);
  }

  const insert = async (point: Coordinate, pre: Coordinate) => {
    const [x, y] = point;
    const index = 100 * y + x;
    // 已存在
    if ((visited[x] || []).includes(y)) {
      return;
    }
    // 不为0走不了
    if (map[index] !== 0) {
      return;
    }
    // 到边了
    if (x < 0 || y < 0 || x > 100 || y > 100) {
      return;
    }
    const cell = container.children[index] as HTMLDivElement;
    cell.style.backgroundColor = 'lightgreen';
    map[index] = pre;
    await sleep(1);
    visit([x, y]);
  }

  while (queue.length) {
    const pre = queue.shift();
    let [x, y] = pre;
    if (x === end[0] && (y === end[1])) {
      const path: MapItem[] = [];
      while (x !== start[0] || (y !== start[1])) {
        path.push([x, y]);
        const i = y * 100 + x;
        [x, y] = map[i] as Coordinate;
        (container.children[i] as HTMLDivElement).style.backgroundColor = 'pink';
      }
      return path;
    }
    await insert([x - 1, y], pre);
    await insert([x + 1, y], pre);
    await insert([x, y - 1], pre);
    await insert([x, y + 1], pre);
  }
  return null;
}

export default function findPath(container: HTMLDivElement, map: MapItem[], start: Coordinate, end: Coordinate) {
  const copyMap = map.slice();
  bfs(container, copyMap, start, end);
}
