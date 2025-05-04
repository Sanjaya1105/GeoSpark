#!/bin/bash

# Install terser explicitly
echo "Installing terser as a dependency before build..."
npm install --save-dev terser

# Run the build command
echo "Running build command..."
npm run build 