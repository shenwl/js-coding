type Prop = string | number | symbol;
type ReactiveSet = [Object, Prop];

const handlerMap = new Map<Object, Map<Prop, Set<Function>>>();
const reactivities = new Map();

let usedReactivities: ReactiveSet[] = [];

export function reactive(obj: any): any {
  if(reactivities.has(obj)) {
    return reactivities.get(obj);
  }

  const proxy =  new Proxy(obj, {
    get(obj, key) {
      usedReactivities.push([obj, key]);

      if(typeof obj[key] === 'object') {
        return reactive(obj[key]);
      }

      return obj[key];
    },
    set(obj, key, value) {
      obj[key] = value;
      if(handlerMap.get(obj)) {
        (handlerMap.get(obj).get(key)).forEach(handler => (handler as Function)());
      }
      return true;
    }
  });
  reactivities.set(obj, proxy);
  reactivities.set(proxy, proxy);
  return proxy;
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
