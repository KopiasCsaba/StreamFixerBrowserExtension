#!/bin/bash
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$DIR"
echo "<FIREFOX COMPILE> ######################"
bash ./copy.sh
cd ../firefox/;
zip -r -FS ../builds/StreamFixerFirefox.xpi  ./* --exclude *.git*.
echo "</FIREFOX COMPILE> ######################"