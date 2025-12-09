#!/bin/bash
cat - <<FIN
#
#   ▄▀▀█▄▄  
#  █ ▄▀   █ 
#  ▐ █    █ 
#    █    █ eploy
#   ▄▀▄▄▄▄▀ 
#  █     ▐  
#  ▐ 
#
FIN

echo "...."
echo "Please Wait please for node_modules folder checking..."
if [ -d "node_modules" ]; then
    rm -R node_modules
    echo "node_modules folder has deleted."
fi

echo "...."
echo "Please Wait please for .next folder checking..."
if [ -d ".next" ]; then
    rm -R .next
    echo ".next folder has deleted."
fi

echo "...."
echo "Please Wait please for .next folder checking..."
if [ -d "public" ]; then
    rm -R public
    echo "public folder has deleted."
fi

echo "...."
echo "Please Wait please for yarn.lock file checking..."
if [ -f "yarn.lock" ]; then
    rm yarn.lock
    echo "yarn.lock file has deleted."
fi

echo "...."
echo "INSTALL APP"
echo "Please Wait please for yarn install"
yarn install
echo "All dependencies are instaled"

echo "...."
echo "BUILD APP"
echo "Please Wait please for yarn ndmn-build"
yarn ndmn-build
echo "The app are builded"

echo "...."
echo "Copy design"
cp deploy/img/* public/
echo "Design OP"

echo "...."
echo "START APP"
echo "Please Wait please for yarn ndmn-start"
yarn ndmn-start