#!/usr/bin/env bash
# index.html banane ke liye:  bash build.sh
set -e
cd "$(dirname "$0")"
cat src/part-a.html src/part-b.html src/part-c.js src/part-d.js > index.html
printf '\n</script>\n</body>\n</html>\n' >> index.html
echo "index.html ban gaya: $(wc -c < index.html) characters"
