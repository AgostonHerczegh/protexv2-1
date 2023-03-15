module.exports = (app) => {
  app.get('/cart', (req, res) => {
    let success; const warning = app.helpers.msg(req);
    const connection = app.dao.connectionFactory();
    const productsDao = new app.dao.productsDAO(connection);

    // Get list of ID of product in cart
    const productsInCartIds = req.session.user.cart
    console.log(productsInCartIds)
    if (productsInCartIds.length == 0) {
      res.render('checkout/cart', {
        title: 'Cart',
        warning: 'You do not have items in your cart!',
      });
    }

    productsDao.getById(productsInCartIds)
        .then((products) => {
          res.render('checkout/cart', {
            title: 'Cart',
            success, warning,
            products,
            user:req.session.user
          });
        })
        .catch((err) => console.log(err));
  });


  app.get('/add-to-cart/:id', (req, res) => {
    const productId = req.params.id;
    const cart = req.session.user.cart
    cart.push(productId)
      req.session.user.cart=cart;

      res.redirect('/')
  });
};
