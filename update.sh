#!/bin/bash

git fetch upstream
git merge upstream/develop
git pull
git push
