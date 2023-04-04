module.exports = (app) => {
  app.get('/sign-up', (req, res) => {
    let success; const warning = app.helpers.msg(req);

    if (req.session['user'] || req.session['user'] != null) {
      req.session['warning'] = 'You are not able to access this area!';
      return res.redirect('/');
    }

    res.render('sign/up', {
      title: 'Sign Up',
      success, warning,
      csrfToken: req.csrfToken(),
    });
  });

  app.post('/sign-up', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;


    const errosInValidation = req.validationErrors();
    if (errosInValidation) {
      req.session['warning'] = errosInValidation[0].msg;
      res.redirect('/sign-up');
    };

    const connection = app.dao.connectionFactory();
    const UserDao = new app.dao.userDAO(connection);

    UserDao.saveUser(username, email, password)
      .then((result) => {
        req.session['success'] = result;
        // Create Session
        req.session['user'] = {
          username: username,
          email: email,
          admin: false,
          cart: [],
        };
        app.locals.user = req.session['user'];
        res.redirect('/');
      })
      .catch((err) => {
        req.session['warning'] = err;
        res.redirect('/sign-up');
      });
  });
};
