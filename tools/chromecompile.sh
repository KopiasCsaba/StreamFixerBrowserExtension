#!/bin/bash
DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$DIR"

bash ./copy.sh
cd ../chrome/;
zip -r -FS ../builds/StreamFixerChrome.zip ./* --exclude *.git*.