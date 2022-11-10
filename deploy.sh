#!/bin/sh


main() {

	WORKING_DIR='/home/hieulc/projects/nodejs/office'

	echo "Change working directory to office-authoritative-server"
	cd $WORKING_DIR/office-authoritative-server

	echo "apply patch file to package.json"
	patch < ./../package.patch
	echo "packing modules using webpack"
	npm run build
	echo "restore package.json"
	cp ../package.json ./
	sed -i 's/`/0/g' ./dist/modules.js
	cat dist/modules.js > /public/projects/trueroot/success/office/apt/static/js/canvas.module/modules.js




	echo "Change working directory to $WORKING_DIR"
	cd $WORKING_DIR

	echo "Docker build"
	docker compose build &
	echo "Docker down"
	docker compose down
	echo "Docker up"
	docker compose up -d
}

time main

