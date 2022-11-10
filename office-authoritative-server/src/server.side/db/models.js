
import MariaDbSequelize from "./sequelize.js";
import Component from "./component.model.js";
import OfficeMap from "./officemap.model.js";


MariaDbSequelize.getInstance().sync();

export { MariaDbSequelize, Component, OfficeMap };
