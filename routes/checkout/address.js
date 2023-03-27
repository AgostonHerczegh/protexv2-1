
module.exports = (app) => {
  app.post('/address', (req, res) => {
    const connection = app.dao.connectionFactory();
    const productsDao = new app.dao.productsDAO(connection);
   
  console.log(req.body)
    // if (req.body.id==undefined) {
    //   UserDAO.savePaymentInfo(req.body, req.session.user)
    // }

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

        res.render('checkout/payment', {
          data: req.body,
          total,
          products,
          user: req.session.user,
          csrfToken: req.csrfToken()

        });
      })
      .catch((err) => console.log(err));

  }
  )
};