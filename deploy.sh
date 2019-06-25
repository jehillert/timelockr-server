#!/usr/bin/env bash
set -e
git add --all
git status
git commit --allow-empty -m "Updating heroku deployment with code modifications on $(date)"
git push heroku master
echo -e "\e[32mDeployment updated."
