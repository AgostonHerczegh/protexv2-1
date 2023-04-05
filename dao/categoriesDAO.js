class categoriesDAO {
  constructor(connection) {
    this.connection = connection;
  }
  list() {
    return new Promise((resolve, reject) => {
      this.connection
        .query('select * from product_categories',
          (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });

    });
  }

  getCountries() {
    return new Promise((resolve, reject) => {
      this.connection.query('select * from countries', (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.connection.query('delete from product_categories where idcategory = ?', id,
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  }
  save(category) {
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO `product_categories`(`category_name`) VALUES (?)', category.category_name,
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  }
}

module.exports = () => categoriesDAO;
