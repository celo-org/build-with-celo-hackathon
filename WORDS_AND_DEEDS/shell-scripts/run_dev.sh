#!/bin/bash

export SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "SCRIPT_DIR=$SCRIPT_DIR"

PATH=/usr/local/node/bin:$PATH

cd $SCRIPT_DIR/../


PUBLIC_URL=/my-deed/

REACT_APP_INDEX_TITLE="Primus Money My Deeds DEV"
REACT_APP_INDEX_CONTENT="Create deeds, manage clauses and transfer ownership"

export PUBLIC_URL
export REACT_APP_INDEX_TITLE
export REACT_APP_INDEX_CONTENT


npm run-script start