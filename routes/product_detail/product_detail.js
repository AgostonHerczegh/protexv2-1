module.exports = (app) => {
    app.get('/product-detail/:url', (req, res) => {
        let success; const warning = app.helpers.msg(req);
        const url = req.params.url;
        const connection = app.dao.connectionFactory();
        const productsDao = new app.dao.productsDAO(connection);
        productsDao.getByUrl(url)
            .then((result) => {
                res.render('product_detail/index', {
            product: result[0],
            success, warning,
            })})
            .catch((err) => console.log(err));
    });

}
