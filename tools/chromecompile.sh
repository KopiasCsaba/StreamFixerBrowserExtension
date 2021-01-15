#!/bin/bash
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$DIR"
echo "<CHROME COMPILE> ######################"
bash ./copy.sh
cd ../chrome/;
zip -r -FS ../builds/StreamFixerChrome.zip ./* --exclude *.git*.
echo "</CHROME COMPILE> ######################"
