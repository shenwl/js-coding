import { effect, reactive } from './effect';

const counter = reactive({ num: 0 })
let dummy;
effect(() => dummy = counter.num);
counter.num = 7;
console.log('dummy show be 7, dummy: ', dummy);
