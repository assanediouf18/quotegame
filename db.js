const { Sequelize, DataTypes } = require('sequelize');
path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite')
});

const Quote = sequelize.define('Quote', {
    quote: {
        type: DataTypes.STRING,
        allowNull: false
    },
    movie: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    // Other model options go here
});

module.exports = {
    sequelize: sequelize,
    model: {
        Quote: Quote,
    }
}