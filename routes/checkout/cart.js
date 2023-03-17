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

    productsDao.getByIdWithQuantity(productsInCartIds)
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


  app.get('/add-to-cart/:id', (req, res,next) => {
    
    const cart = req.session.user.cart
    const product = cart.find(item => item.id === req.params.id)
    if(product){
        product.quantity+=1
    }else{
        const productId = {id:req.params.id,quantity:1}
        cart.push(productId)
    }
    req.session.user.cart=cart;
    console.log(req.session.user.cart)
    res.redirect('/');
  });
};
