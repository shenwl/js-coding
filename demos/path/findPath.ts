import { MapItem, Coordinate } from "./type";
import Sorted from './sorted';

function distance(p: Coordinate, end: Coordinate) {
  return Math.abs((p[0] - end[0]) ** 2 + (p[1] - end[1]) ** 2);
}

async function bfs(container: HTMLDivElement, map: MapItem[], start: Coordinate, end: Coordinate) {
  // push/shift
  const collection: Sorted<Coordinate> = new Sorted([start], (a, b) => {
    return distance(a, end) - distance(b, end);
  });
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
    collection.insert([x, y]);
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
    // @todo：检测是否有墙
    // const cell = container.children[index] as HTMLDivElement;
    // cell.style.backgroundColor = 'lightgreen';
    map[index] = pre;
    visit([x, y]);
    // await sleep(1);
  }

  while (collection.length) {
    const pre = collection.take();
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

    // @todo：完成墙检测后放开，支持折线路径
    // await insert([x - 1, y - 1], pre);
    // await insert([x + 1, y - 1], pre);
    // await insert([x - 1, y + 1], pre);
    // await insert([x + 1, y + 1], pre);
  }
  return null;
}

export default function findPath(container: HTMLDivElement, map: MapItem[], start: Coordinate, end: Coordinate) {
  const copyMap = map.slice();
  bfs(container, copyMap, start, end);
}
