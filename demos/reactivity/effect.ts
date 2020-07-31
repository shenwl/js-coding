type Prop = string | number | symbol;
type ReactiveSet = [Object, Prop];

const handlerMap = new Map<Object, Map<Prop, Set<Function>>>();
let usedReactivities: ReactiveSet[] = [];

export function reactive(obj: any): any {
  return new Proxy(obj, {
    get(obj, key) {
      usedReactivities.push([obj, key]);
      return obj[key];
    },
    set(obj, key, value) {
      obj[key] = value;
      if(handlerMap.get(obj)) {
        (handlerMap.get(obj).get(key)).forEach(handler => (handler as Function)());
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
    if(!handlerMap.has(obj)) {
      handlerMap.set(obj, new Map());
    }
    if(!handlerMap.get(obj).has(key)) {
      handlerMap.get(obj).set(key, new Set());
    }
    handlerMap.get(obj).get(key).add(handler)
  }
}
