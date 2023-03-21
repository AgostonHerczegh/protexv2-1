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
  getUsername(email) {
    return new Promise((resolve, reject) => {
      this.connection.query('select username from users where email = ?', email,
          (err, result) => {
            if (err) return reject(err);
            return resolve(result[0].username);
          });
    });
  }
  checkUserType(user_type) {
    return new Promise((resolve, reject) => {
      this.connection.query('select user_type from users where user_type = ?', user_type,
          (err, result) => {
            if (err) return reject(err);
            return resolve(result[0].user_type);
          });
    });
  }
}

module.exports = () => UserDAO;
