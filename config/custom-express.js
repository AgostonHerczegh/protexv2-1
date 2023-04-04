const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const validator = require('express-validator');
const cors = require('cors');
const multer = require('multer');
const { unless } = require('express-unless');
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");


class AppController {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/img/products') // fájl feltöltésének helye
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    });
    function myLogger(req, res, next) {
      if (!req.session.user) {
        res.redirect('/sign-in')
      }
      else {
        next()
      }
    }
    myLogger.unless = unless
    this.app.use(express.json());
    this.app.use(multer({ storage: storage }).single('image'));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(session({
      secret: 'secretpasscryp',
      resave: false,
      saveUninitialized: true,
    }));
    this.app.use(cors())
    this.app.use(csrf({ cookie: true }));
    this.app.use(validator());
    this.app.use(myLogger.unless({ path: ["/", "/product-detail", "/sign-in", "/sign-up", pathToRegexp("/product-detail/:name")], ext: ["css", "png", "jpg", "webp", "js"] }));


    this.app.engine('hbs', hbs({
      helpers: {
        dateFormat: require('handlebars-dateformat'),
        json: function (context) {
          return JSON.stringify(context);
        },
        if_eq: function (a, b, opts) {
          if (a == b) {
            return opts.fn(this);
          } else {
            return opts.inverse(this);
          }
        },
        //if bigger than
        gt: function (a, b) {
          return (a > b);
        }
      },
      extname: 'hbs',
      defaultLayout: 'layout',
      layoutsDir: 'views/layouts/',
    }
    ));
    this.app.set('view engine', 'hbs');

  }

  routes() {
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.use(express.static(path.join(__dirname, '../public')));

    consign()
      .include('routes')
      .then('dao')
      .then('helpers')
      .into(this.app);
  }
  errors() {
    this.app.use((req, res, next) => {
      return res.status(404)
        .render('errors/404', { title: 'Az oldal nem található :(  404' });
    });
    // this.app.use((erros, req, res, next) => {
    //   return res.status(500)
    //     .render('errors/500', {title: 'Error - 500'});
    // });
  }
}

module.exports = new AppController().app;
