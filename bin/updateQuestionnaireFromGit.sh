#!/bin/bash
. bin/config.inc

FILENAME=$1
TMP_FILENAME="$TMP/questionnaire.yml"

wget $REMOTE_QUESTIONNAIRE_GIT_FILE -O $TMP_FILENAME
if [[ $? -eq 0 ]]
then
   rsync -av $TMP_FILENAME $FILENAME
fi

rm $TMP_FILENAME
