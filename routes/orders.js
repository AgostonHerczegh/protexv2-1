module.exports = (app) => {
    app.get('/orders', async (req, res) => {
        let success; let warning = app.helpers.msg(req);
        let orders;
        const connection = app.dao.connectionFactory();
        const userDao = new app.dao.userDAO(connection);
        const userId = await userDao.getUserId(req.session.user.email)
        await userDao.getOrders(userId)
            .then((result) => orders = result)
            .catch((err) => warning = 'Nem lehetett betölteni a rendeléseket');
        //Megvárja a kategóriák és a termékek betöltését, majd rendereli a home/index.js-t

        const render = () => res.status(200).render('orders/index', {
            title: 'Rendelések | Protex',
            orders,
            success, warning,
            user: req.session['user'],
        });

        setTimeout(render, 100);

    });
}