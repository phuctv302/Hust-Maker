import { ComponentType, Component } from "./component.js";
import { RotatableComponent } from "./rotatable.component.js";


class ComponentFactory {
	static create(props) {
		if (props.type == ComponentType.DEFAULT) {
			return new Component(props);
		}

		if (props.type == ComponentType.ROTATABLE) {
			return new RotatableComponent(props);
		}

		return null;
	}
}

export { ComponentFactory };
