#!/bin/sh

# make forever system reboot-proof with cron job
if [ $(ps aux | grep $USER | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
  cd ~/projects/lab
  export PORT=80
  export NODE_ENV=production
  export PATH=/usr/local/bin:$PATH
  forever start --spinSleepTime 10000 app.js
fi
