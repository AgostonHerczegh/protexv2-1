const consign = require("consign");

module.exports = (app) => {
  app.get('/cart', (req, res) => {
    let success; const warning = app.helpers.msg(req);
    const connection = app.dao.connectionFactory();
    const productsDao = new app.dao.productsDAO(connection);

    // Terméklista ID-k a kosárban
    const productsInCartIds = req.session.user.cart
    console.log(productsInCartIds)
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
    console.log(req.session.user.cart)
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
    console.log(req.session.user.cart)
    res.redirect('/');
  });

  app.get('/address', async (req, res) => {
    const connection = app.dao.connectionFactory();
    const userDao = new app.dao.userDAO(connection);
    const categoriesDAO = new app.dao.categoriesDAO(connection)
    const savedPayments = await userDao.getPaymentInfo(req.session.user).then((result) => result)

    console.log(savedPayments)
    categoriesDAO.getCountries().then((result) => {
      const countries = result;
      res.render('checkout/address', {
        savedPayments,
        countries,
        title: 'Cím',
        csrfToken: req.csrfToken()
      });

    });

  });

};
