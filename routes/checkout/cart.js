const consign = require("consign");

module.exports = (app) => {
  app.get('/cart', (req, res, next) => {
    console.log(app.locals)

    let success; const warning = app.helpers.msg(req);
    const connection = app.dao.connectionFactory();
    const productsDao = new app.dao.productsDAO(connection);

    // Terméklista ID-k a kosárban
    if (!req.session.user) {
      res.redirect('/sign-in')
    }
    const productsInCartIds = req.session.user.cart
    if (productsInCartIds.length == 0) {
      res.render('checkout/cart', {
        title: 'Kosár',
        warning: 'Nincs még termék a kosaradban!',
      });
    }

    productsDao.getByIdWithQuantity(productsInCartIds)
      .then((products) => {
        const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        console.log(products)

        res.render('checkout/cart', {
          title: 'Kosár',
          success, warning, total,
          products,
          user: req.session.user
        });
      })
      .catch((err) => console.log(err));
  });
  app.get('/remove-from-cart/:id', (req, res, next) => {
    const cart = req.session.user.cart
    const product = cart.find(item => item.id === req.params.id)
    if (product) {
      product.quantity -= 1
      if (product.quantity == 0) {
        const index = cart.indexOf(product)
        cart.splice(index, 1)
      }
    }
    req.session.user.cart = cart;
    res.redirect('/cart');
  })

  app.get('/add-to-cart/:id', (req, res, next) => {

    const cart = req.session.user.cart
    const product = cart.find(item => item.id === req.params.id)
    if (product) {
      product.quantity += 1
    } else {
      const productId = { id: req.params.id, quantity: 1 }
      cart.push(productId)
    }
    req.session.user.cart = cart;
    res.redirect('/');
  });

  app.get('/address', async (req, res) => {
    const connection = app.dao.connectionFactory();
    const userDao = new app.dao.userDAO(connection);
    const categoriesDAO = new app.dao.categoriesDAO(connection)
    const savedPayments = await userDao.getPaymentInfo(req.session.user).then((result) => result)

    categoriesDAO.getCountries().then((result) => {
      const countries = result;
      res.render('checkout/address', {
        savedPayments,
        countries,
        title: 'Szállítási cím megadása',
        csrfToken: req.csrfToken()
      });

    });

  });
  app.get("/empty-cart", (req, res) => {
    req.session.user.cart = [];
    res.render('checkout/cart', { user: req.session.user });
  })
  app.get("increase-quantity/:id", (req, res) => {
    const cart = req.session.user.cart
    const product = cart.find(item => item.id === req.params.id)
    if (product) {
      product.quantity += 1
    }
    req.session.user.cart = cart;
    res.locals.session.user.cart = cart;

    console.log(req.session.user.cart)
    res.render('checkout/cart');
  })
  app.get("decrease-quantity/:id", (req, res) => {
    const cart = req.session.user.cart
    const product = cart.find(item => item.id === req.params.id)
    if (product) {
      product.quantity -= 1
    }
    req.session.user.cart = cart;
    res.locals.session.user.cart = cart;
    res.render('checkout/cart');
  })
};
