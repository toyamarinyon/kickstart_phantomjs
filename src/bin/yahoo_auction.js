import 'babel-polyfill';
import webpage from 'webpage';

const page = webpage.create();

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

const clickLoginAnchor = () => {
  return new Promise((resolve, reject) => {
    page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.js', () => {
      page.onLoadFinished = () => {
        page.onLoadFinished = null;
        page.render('/var/share/login.jpg', { format: 'jpeg', quality: '100' });
        return resolve();
      };
      page.evaluate(() => {
        $('a:contains("出品中")').get(0).click();
      });
    });
  });
};

const login = () => {
  return new Promise((resolve, reject) => {
    page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.js', () => {
      page.onLoadFinished = () => {
        page.onLoadFinished = null;
        page.render('/var/share/login_finish.jpg', { format: 'jpeg', quality: '100' });
        return resolve();
      };
      page.evaluate(() => {
        $('#username').val('');
        $('#passwd').val('');
        $('.btnLogin.yjM').get(0).click();
      });
    });
  });
};

page.open('https://auctions.yahoo.co.jp/', (status) => {
  clickLoginAnchor()
    .then(() => login())
    .then(() => phantom.exit());
});

