import { DataTypes } from 'sequelize';
import MariaDbSequelize from './sequelize.js';


const OfficeMap = MariaDbSequelize.getInstance().getSequelize().define('OfficeMaps', {
	office_map_id: {type: DataTypes.STRING, allowNull: false, defaultValue: true},
	name: {type: DataTypes.STRING, allowNull: false, defaultValue: true}
});



export default OfficeMap;
