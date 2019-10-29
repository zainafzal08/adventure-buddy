#!/bin/bash

cp index.html dist/index.html
cp manifest.json dist/manifest.json
cp service-worker.js dist/service-worker.js
cp -r icons/ dist/icons
rollup -c
