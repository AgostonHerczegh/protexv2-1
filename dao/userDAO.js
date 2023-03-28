const bcrypt = require('bcrypt-nodejs');

class UserDAO {
  constructor(connection) {
    this.connection = connection;
  }
  saveUser(username, email, password) {
    return new Promise((resolve, reject) => {
      const cryptedPassword = bcrypt.hashSync(password);
      this.connection
          .query('select email from users where email = ? OR username = ?', [email, username],
              (err, result) => {
                const emailNotExist = Object.entries(result).length === 0;
                if (emailNotExist) {
                  this.connection
                      .query('INSERT INTO `users` (`id`, `username`, `email`, `password`,`user_type`) VALUES (null, ?, ?, ?,"USER")',
                          [username, email, cryptedPassword],
                          (err, result) => {
                            if (err) return reject(err);
                            return resolve('Sikeres regisztráció!');
                          });
                } else if (err) return reject(err);
                else return reject('Már létezik ilyen felhasználó!');
              });
    });
  }
  login(email, password) {
    return new Promise((resolve, reject) => {
      this.connection.query('select * from users where email = ?', email,
          (err, result) => {
            if (err) return reject(err);

            const emailNotExist = Object.entries(result).length === 0;
            if (emailNotExist) return reject('Nincs ilyen felhasználó!');

            else {
              const IsPasswordCorrect = bcrypt.compareSync(password, result[0].password);
              if (IsPasswordCorrect) return resolve('Üdvözöllek a Protex webshopban!');
              else return reject('Helytelen jelszó!');
            }
          });
    });
  }
  getUser(email) {
    return new Promise((resolve, reject) => {
      this.connection.query('select * from users where email = ?', email,
          (err, result) => {
            if (err) return reject(err);
            return resolve(result[0]);
          });
    });
  }

  async getUserId(email) {
    return new Promise((resolve, reject) => {
      this.connection.query('select id from users where email = ?', email,
          (err, result) => {
            if (err) return reject(err);
            return resolve(result[0].id);
          });
    });
  }
  async getCountryId(country) {
    return new Promise((resolve, reject) => {
      this.connection.query('select id from countries where name = ?', country,
          (err, result) => {
            if (err) return reject(err);
            return resolve(result[0].id);
          });
    });
  }
  async savePaymentInfo(data,req) {
    console.log(data,req)
    const userID= await this.getUserId(req.email).then((userId) => userId)
    const countryID = await this.getCountryId(data.country).then((countryId) => countryId)
    return new Promise((resolve, reject) => {
      this.connection
          .query('INSERT INTO `address`(`user_id`, `address_name`, `city`, `address`, `country_id`, `region`, `postal`, `tel`) VALUES  (?, ?, ?, ?, ?, ?, ?, ?)',
              [userID, data.name,data.city, data.address, countryID,data.state, data["zip-code"], data.number],
              (err, result) => {
                if (err) return reject(err);
                return resolve('Sikeres rendelés!');
              });
    });
  }
  async getPaymentInfo(req) {
    const userID= await this.getUserId(req.email).then((userId) => userId)
    return new Promise((resolve, reject) => {
      this.connection.query('select * from address where user_id = ?', userID,
          (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
    });
  }
}

module.exports = () => UserDAO;
