/** @format */

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../configs/connectDb');

class List extends Model {
	static associate(models) {
		List.hasMany(models.Card, { foreignKey: 'ListId' });
	}
}

List.init(
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		position: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		boardId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'List',
	}
);

sequelize.sync();

module.exports = List;
