const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const koajwt = require("koa-jwt");
const koacor = require("koa-cors");

var index = require("./routes/index");
var user = require("./routes/user");

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


app.use(function*(next) {
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log("%s %s - %s", this.method, this.url, ms);
});

app.use(require("koa-static")(__dirname + "/public"));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());
// cors
app.use(koacor());
// auth
// logger
app.use(async (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: "-2000",
        desc: "登陆过期，请重新登陆"
      };
    } else {
      throw err;
    }
  });
});

app.use(
  koajwt({
    secret: "secret"
  }).unless({
    path: [/^\/user\/regist/, /^\/user\/login/]
  })
);
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
