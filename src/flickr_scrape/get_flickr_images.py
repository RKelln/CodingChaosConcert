#!/usr/bin/env python2
# -*- coding: utf-8 -*-
## run
## > python get_flickr_images.py file_containing_url_csv

import csv
import requests
import os
import sys
import time
import io

def put_images(csv_file, wait=0.25):
    urls=[]
    with io.open(csv_file, 'r', newline="") as csvfile:
        doc = csv.reader(csvfile, delimiter=",")
        for row in doc:
            if row[1].startswith("https"):
                urls.append(row[1])
    if not os.path.isdir(os.path.join(os.getcwd(),csv_file.split("_")[0])):
        os.mkdir(csv_file.split("_")[0])

    t0=time.time()
    for url in enumerate(urls):
        print("Downloading {} of {}".format(url[0]+1, len(urls)))
        try:
            resp=requests.get(url[1],stream=True)
            path_to_write = os.path.join(os.getcwd(),csv_file.split("_")[0],url[1].split("/")[-1])
            outfile = open(path_to_write,'wb')
            outfile.write(resp.content)
            outfile.close()
            #print("Done downloading {} of {}".format(url[0]+1, len(urls)))
        except:
            print("Failed to download url number {}".format(url[0]+1))
        time.sleep(wait)

    t1=time.time()
    print("Done with download, job took {} seconds".format(t1-t0))

def main():
    csv_file=sys.argv[1]
    put_images(csv_file)

if __name__=='__main__':
    main()
