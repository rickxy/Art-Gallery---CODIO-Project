#!/bin/bash

type=${CODIO_TYPE:-assignment}
echo type

if [ $type = "lab" ];
then
	echo "YOU ARE TRYING TO RUN THIS IN A CODIO LAB"
	echo "script should only be run in your assignment box"
	exit 1
fi

echo "script running"
