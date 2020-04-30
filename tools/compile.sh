DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$DIR"

bash ./chromecompile.sh
bash ./firefoxcompile.sh