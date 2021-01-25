#!/bin/bash
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$DIR"

rm -Rf ../firefox/changelog/* ../chrome/changelog/*;

cp -r ../core/dist/prod/main.js  ../core/changelog/ ../firefox/
cp -r ../core/dist/prod/main.js  ../core/changelog/ ../chrome/

cat ../CHANGELOG.md  | tail -n +3 | sed --unbuffered -E 's/\s*\*\s*(.*)/<li>\1<\/li>/' > /tmp/sfbecl.txt

sed -i -e '/changelog_placeholder/r /tmp/sfbecl.txt' ../firefox/changelog/index.html
sed -i -e '/changelog_placeholder/r /tmp/sfbecl.txt' ../chrome/changelog/index.html
