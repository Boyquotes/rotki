#!/bin/bash

source /usr/local/bin/virtualenvwrapper.sh
#mkvirtualenv rotki -p /usr/bin/python3.10 &&
workon rotki
cd ..
pip3 install -e .
cd -
pnpm run dev:web
tail -f /dev/null
