const Sequelize = require('sequelize');

const sequelize = new Sequelize('SmallShopsPlatform', 'hamdy01', 'Password@1234', {
	dialect: 'mssql',
	host: 'smallshopsplatform.database.windows.net',
	dialectOptions: {
    options:{

      encrypt: true
    }
	}
});

// const sequelize = new Sequelize('Garduation-Project', 'omnia', 'omnia123', {
//    	dialect: 'mssql',
//    	host: 'localhost',
// })

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
