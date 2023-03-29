module.exports = (app) => {
  app.get('/sign-in', (req, res) => {
    let success; const warning = app.helpers.msg(req);

    if (req.session['user'] || req.session['user'] != null) {
      req.session['warning'] = 'Nincs engedélye megtekinteni ezt az oldalt!';
      return res.redirect('/home');
    }

    res.render('sign/in', {
      title: 'Bejelentkezés',
      success, warning,
      csrfToken: req.csrfToken(),
    });
  });

  app.post('/sign-in', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    req.checkBody('email', 'Érvényes email-t adjon meg!').notEmpty().isEmail();
    req.checkBody('password', 'Minimum 4 karakteres jelszavat adjon meg!')
      .notEmpty().isLength({ min: 4 });
    const errorsInValidation = req.validationErrors();
    if (errorsInValidation) {
      req.session['warning'] = errorsInValidation[0].msg;
      res.redirect('/sign-in');
    }

    const connection = app.dao.connectionFactory();
    const userDao = new app.dao.userDAO(connection);

    userDao.login(email, password)
      .then((result) => {

        userDao.getUser(email).then((user) => {
          req.session['success'] = result;
          req.session['user'] = {
            username: user.username,
            email: email,
            admin: user.user_type == "ADMIN" ? true : false,
            cart: [],
          };
          console.log(req.session['user']);
          res.redirect('/');

        });
      })
      .catch((err) => {
        req.session['warning'] = err;
        res.redirect('/sign-in');
      });
  });
};
