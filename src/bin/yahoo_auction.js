import webpage from 'webpage';

const page = webpage.create();
const findCenterCoordinate = ($element) => {
  const x = $element.offset().x + $element.width / 2;
  const y = $element.offset().y + $element.height / 2;
  return { x, y };
};

page.onConsoleMessage = (message) => console.log(message);
page.onError = (message, trace) => {
  const messageStack = [`ERROR: ${message}`];
  if (trace && trace.length) {
    messageStack.push('TRACE:');
    trace.forEach((t) => {
      const f = t.function ? ` (in function "${t.function}")` : '';
      messageStack.push(` -> ${t.file} : ${t.line} + ${f}`);
    });
  }
  console.error(messageStack.join('\n'));
};
page.viewportSize = { width: 1000, height: 800 };

page.open('https://auctions.yahoo.co.jp/', (status) => {
  page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.js', () => {
    const $loginButton = page.evaluate(() => {
      return $('#masthead > div > div.yjmthloginarea > p:nth-child(1) > strong > a');
    });
    const loginButton = findCenterCoordinate($loginButton);
    console.log('hello!3');
    page.onLoadFinished(() => {
      console.log('pageLoad');
      page.onLoadFinished = null;
      console.log(page);
    });
    page.sendEvent('click', loginButton.x, loginButton.y);
  });
})

