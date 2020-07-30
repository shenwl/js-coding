const root = document.getElementById('root');

export function parseFunction(source: string) {
  const reg = /(function|new|return)|([ \t\n\r]+|([a-zA-Z][a-zA-Z0-9]*)|([\(\)\{\}\,\;]))/g;
  const dict = ['keywords', 'whitespace', 'identifier', 'punctuator'];

  let token = null;
  let lastIndex = 0;
  do {
    lastIndex = reg.lastIndex;
    token = reg.exec(source);
    if (!token) break;
    const text = document.createElement('span');
    text.textContent = token[0];

    for (let i = 1; i < 4; i++) {
      if (token[i]) {
        text.classList.add(dict[i - 1]);
      };
    }
    root.appendChild(text);
  } while (token);
}
