//Delete from cart
module.exports = (app) => {
    app.get('/delete-from-cart/:id', (req, res) => {
        const cart = req.session.user.cart
        const product = cart.find(item => item.id === req.params.id)
        if(product){
            product.quantity-=1
        }
        if(product.quantity==0){
            cart.splice(cart.indexOf(product),1)
        }
        req.session.user.cart=cart;
        res.redirect('/cart');
    });
    };