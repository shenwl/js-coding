import { effect, reactive } from './effect';

const counter = reactive({ num: 0 })
let dummy;
effect(() => dummy = counter.num);
counter.num = 7;
console.log('dummy show be 7, dummy: ', dummy);


let dummy1, dummy2;
const counter2 = reactive({ num: 0 });
effect(() => (dummy1 = counter2.num));
effect(() => (dummy2 = counter2.num));
console.log(dummy1 === 0);
console.log(dummy2 === 0);
counter2.num++
console.log(dummy1 === 1);
console.log(dummy2 === 1);

counter.num = 6;
console.log('dummy show be 6, dummy: ', dummy);

