import { parseFunction } from './regex';

parseFunction(`
  function sleep(timer) {

    return new Promise(function(resolve) {
      setTimeout(resolve, timer);
    });
  }
`)
