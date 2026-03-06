#!/bin/sh
export PATH="/usr/local/bin:$PATH"
cd /Users/iker.snyder/Projects/ikersnyder-site
exec node ./node_modules/.bin/next dev --port 3001 --webpack
