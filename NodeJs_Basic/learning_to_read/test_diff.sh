#!bin/bash

node stream_concat_data.js > diff_one.txt
diff diff_one.txt bible.txt > diff.txt ; wc -l diff.txt
rm diff.txt diff_one.txt &