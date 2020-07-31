type Key = string | number | symbol;
type ReactiveSet = [Object, Key];

const handlers = new Map<Object, Map<Key, Function[]>>();
let usedReactivities: ReactiveSet[] = [];

export function reactive(obj: any): any {
  return new Proxy(obj, {
    get(obj, key) {
      usedReactivities.push([obj, key]);
      return obj[key];
    },
    set(obj, key, value) {
      console.log(obj, key, value);
      obj[key] = value;
      if(handlers.get(obj)) {
        (handlers.get(obj).get(key) || []).forEach(handler => (handler as Function)());
      }
      return true;
    }
  })
}

export function effect<T>(handler: () => T) {
  usedReactivities = [];
  handler();
  for(let usedReactivity of usedReactivities) {
    let [obj, key] = usedReactivity;
    if(!handlers.has(obj)) {
      handlers.set(obj, new Map());
    }
    if(!handlers.get(obj).has(key)) {
      handlers.get(obj).set(key, []);
    }
    handlers.get(obj).get(key).push(handler)
  }
}
