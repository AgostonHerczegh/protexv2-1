module.exports = (app) => {
    app.get('/payment', (req, res) => {
        const method = req.body.method;

        res.render('checkout/payment', {
            data: req.body,
            /*total: (method == "cash") ? total + 400 : total,*/
            products,
            user: req.session.user,
            csrfToken: req.csrfToken()

        })
    })
}