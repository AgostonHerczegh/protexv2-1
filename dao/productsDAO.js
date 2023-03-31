class productsDAO {
  constructor(connection) {
    this.connection = connection;
  }
  list(searchTerm = null) {
    return new Promise((resolve, reject) => {
      if (searchTerm) {
        this.connection
          .query(`SELECT * FROM products INNER JOIN stock on stock.product_id=products.id WHERE name LIKE "%${searchTerm}%"`,
            (err, result) => {
              if (err) return reject(err);
              return resolve(result);
            }
          );
      } else {
        this.connection
          .query('SELECT * FROM products INNER JOIN stock on stock.product_id=products.id',
            (err, result) => {
              if (err) return reject(err);
              return resolve(result);
            }
          );
      }
    });
  }
  orderedList(order = null) {
    return new Promise((resolve, reject) => {
      if (order == 'low-price') {
        this.connection.query('SELECT * FROM products INNER JOIN stock on stock.product_id=products.id ORDER BY price ASC',
          (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
      }
      this.connection.query('SELECT * FROM products INNER JOIN stock on stock.product_id=products.id ORDER BY ?? DESC', order,
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  }
  async listByCategory(idcategory) {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM products p JOIN stock s ON p.id = s.product_id WHERE p.category = ${idcategory}`,
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
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
  delete(id) {
    return new Promise((resolve, reject) => {

      //drop from stock table
      this.connection.query('DELETE FROM stock WHERE product_id = ?', id,)
      this.connection.query('DELETE FROM products WHERE id = ?', id,
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  }
  save(product, image) {
    return new Promise((resolve, reject) => {
      this.connection.query("INSERT INTO `products`(`name`, `description`, `price`, `img_url`, `category`, `product_url`) VALUES (?,?,?,?,?,?)", [product.name, product.desc, product.price, image, product.category, product.product_url],
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  }

  getCategory(category) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT `idcategory`, `category_name` FROM `product_categories` WHERE `category_name` = ?', [category],
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  }

  async getLatestId() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT id FROM `orders` ORDER By id DESC LIMIT 1;',
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  }

  async saveOrder(userID, order_id, address_id, payment) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO `orders`(`id`, `user_id`, `order_time`,`address_id`,`payment_type`) VALUES (?,?,NOW(),?,?)",
        [order_id, userID, address_id, payment],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        }
      );
    })
  }

  async saveOrderItem(user_id, order_id, product) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO `order_items`(`id`, `order_id`, `product_id`, `quantity`) VALUES (?,?,?,?)",
        [user_id, order_id, product.id, product.quantity],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        }
      );
    })
  }

}












module.exports = () => productsDAO;
