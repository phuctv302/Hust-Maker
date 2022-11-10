import { DataTypes } from 'sequelize';
import MariaDbSequelize from './sequelize.js';




const Component = MariaDbSequelize.getInstance().getSequelize().define('Components', {
	component_id: {type: DataTypes.STRING, allowNull: false, defaultValue: true},
	office_map_id: {type: DataTypes.STRING, allowNull: false, defaultValue: true},
	properties: {type: DataTypes.STRING, allowNull: false, defaultValue: true},
});



export default Component;

