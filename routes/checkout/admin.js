module.exports = (app) => {
    app.get('/admin', (req, res) => {
        if (req.session.user && req.session.user.admin) {
            const connection = app.dao.connectionFactory();
            const categoriesDAO = new app.dao.categoriesDAO(connection);
            const productsDAO = new app.dao.productsDAO(connection);
            let categories; let products;
            categoriesDAO.list()
                .then((result) => categories = result)
                .catch((err) => warning = 'Nem lehetett betölteni a kategóriákat');
            productsDAO.list(9)
                .then((result) => products = result)
                .catch((err) => warning = 'Nem lehetett betölteni a termékeket');

            const render = () => res.status(200).render('admin/index', {
                title: 'Admin | Protex',
                categories, products,
                user: req.session['user'],
                csrfToken: req.csrfToken()
            });

            setTimeout(render, 100);
        }
        else {
            res.redirect('/')
        }
    })

    app.get('/admin/delete-item/:id', (req, res) => {
        if (req.session.user && req.session.user.admin) {
            const connection = app.dao.connectionFactory();
            const productsDAO = new app.dao.productsDAO(connection);
            productsDAO.delete(req.params.id)
                .then((result) => {
                    res.redirect('/admin')
                })
                .catch((err) => console.log(err));
        }


    })
    app.post('/admin/add-item', (req, res) => {

        if (req.session.user && req.session.user.admin) {
            const connection = app.dao.connectionFactory();
            const productsDAO = new app.dao.productsDAO(connection);
            productsDAO.save(req.body, req.file.originalname)
                .then((result) => {

                    res.redirect('/admin')
                })
                .catch((err) => console.log(err));
        }
    })
}