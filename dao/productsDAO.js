class productsDAO {
  constructor(connection) {
    this.connection = connection;
  }
  list(limit=null) {
    return new Promise((resolve, reject) => {
      if (limit) {
        this.connection
            .query('select * from products LIMIT ?', limit,
                (err, result) => {
                  if (err) return reject(err);
                  return resolve(result);
                }
            );
      }
      // End Queries for limits
      else {
        this.connection
            .query('select * from products',
                (err, result) => {
                  if (err) return reject(err);
                  return resolve(result);
                }
            );
      }
    });
  }
  orderedList(order=null) {
    return new Promise((resolve, reject) => {
      if (order == 'low-price') {
        this.connection.query('select * from products ORDER BY price ASC',
            (err, result) => {
              if (err) return reject(err);
              return resolve(result);
            });
      }
      this.connection.query('select * from products ORDER BY ?? DESC', order,
          (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
    });
  }
  filteredList(filter) {
    return new Promise((resolve, reject) => {

    });
  }

  getByUrl(url) {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM products WHERE product_url = "${url}"`,
          (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
    });
  }
  getByIdWithQuantity(idQuantities) {
    return new Promise((resolve, reject) => {
      const ids = idQuantities.map(item => item.id);
      this.connection.query(`SELECT * FROM products WHERE id IN (${ids})`,
        (err, result) => {
          if (err) return reject(err);
  
          const productsWithQuantity = result.map(product => {
            const item = idQuantities.find(i => String(i.id) === String(product.id));
            if (item) {
              return {
                ...product,
                quantity: item.quantity
              };
            } else {
              return product;
            }
          });
  
          return resolve(productsWithQuantity);
        });
    });
  }
  
}


module.exports = () => productsDAO;
