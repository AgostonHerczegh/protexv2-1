

module.exports = (app) => {
  app.post('/address', (req, res) => {
    const connection = app.dao.connectionFactory();
    const productsDao = new app.dao.productsDAO(connection);
    const userDao = new app.dao.userDAO(connection);

    if (req.body.id == "") {
      userDao.savePaymentInfo(req.body, req.session.user)
    }

    // Terméklista ID-k a kosárban
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


        res.render('checkout/payment', {
          data: req.body,
          total: total,
          products,
          user: req.session.user,
          csrfToken: req.csrfToken()

        })
      })
      .catch((err) => console.log(err));

  }
  )
  app.get("/saveOrder", async (req, res) => {
    const connection = app.dao.connectionFactory();

    const userDao = new app.dao.userDAO(connection);
    const productsDao = new app.dao.productsDAO(connection);
    const latestId = await productsDao.getLatestId();
    const userID = await userDao.getUserId(req.session.user.email);
    const address_id = req.query.address_id;
    const payment_method = req.query.payment;

    await productsDao.saveOrder(userID, (latestId[0].id + 1), address_id, payment_method == "cash" ? "CASH" : "CARD")

    const cart = req.session.user.cart;

    cart.forEach(async (item) => {
      await productsDao.saveOrderItem(userID, (latestId[0].id + 1), item)
    });
    req.session.user.cart = [];
    res.redirect('/orders');
  })

};