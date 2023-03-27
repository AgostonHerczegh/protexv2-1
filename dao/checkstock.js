const connectionFactory = require("./connectionFactory");

function getStock(productId) {
  // Execute a SQL query to retrieve the stock value for the given product ID
  const query = `
    SELECT db FROM stock JOIN products ON products.id = stock.product_id
    WHERE products.id = ${productId}
  `;
  // Execute the query and get the stock value
  const result = connectionFactory.execute(query);
  const stock = result[0].amount;
  return stock;
}