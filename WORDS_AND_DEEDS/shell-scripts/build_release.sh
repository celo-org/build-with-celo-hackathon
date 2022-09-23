#!/bin/bash

PUBLIC_URL=/my-deed/

REACT_APP_INDEX_TITLE="Primus Money My Deeds"
REACT_APP_INDEX_CONTENT="Create deeds, manage clauses and transfer ownership"

export PUBLIC_URL
export REACT_APP_INDEX_TITLE
export REACT_APP_INDEX_CONTENT

echo "PUBLIC_URL=$PUBLIC_URL"

export SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "SCRIPT_DIR=$SCRIPT_DIR"

PATH=/usr/local/node/bin:$PATH

# uncommend to have no source map
#GENERATE_SOURCEMAP=false
#export GENERATE_SOURCEMAP

cd $SCRIPT_DIR/../

npm --max-old-space-size=8192 run-script build