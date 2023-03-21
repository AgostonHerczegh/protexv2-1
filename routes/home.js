module.exports = (app) => {
  app.get('/', (req, res) => {
    let success; let warning = app.helpers.msg(req);
    let categories; let products;
    const connection = app.dao.connectionFactory();
    const categoriesDAO = new app.dao.categoriesDAO(connection);
    const productsDAO = new app.dao.productsDAO(connection);

    categoriesDAO.list()
        .then((result) => categories = result)
        .catch((err) => warning = 'Nem lehetett betölteni a kategóriákat');
    productsDAO.list(9)
        .then((result) => products = result)
        .catch((err) => warning = 'Nem lehetett betölteni a termékeket');
        
    //Megvárja a kategóriák és a termékek betöltését, majd rendereli a home/index.js-t
        const render = () => res.status(200).render('home/index', {
      title: 'Termékek | Protex',
      categories, products,
      success, warning,
      user: req.session['user'],
    });

    setTimeout(render, 100);
  });
};
