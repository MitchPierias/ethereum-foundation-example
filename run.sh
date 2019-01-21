#!/bin/bash
NA='\033[0m'
CYAN='\033[1;36m'

if [ `npm list -g | grep -c ganache-cli` -eq 0 ];
then
    echo -e "${CYAN}Installing Ethereum blockchain by Ganesh"
    npm install ganache-cli -g
else
    echo -e "${NA}Ethereum blockchain installed"
fi

if [ ! -d node_modules ];
then
    echo -e "${CYAN}Installing required dependencies"
    npm install
else
    echo -e "${NA}Dependencies installed. Update with `npm install`"
fi

echo -e "${CYAN}Starting Foreman"
npm start