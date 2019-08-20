#!/usr/bin/env python3
# -*- coding: utf-8 -*-
## run
## > python get_flickr_urls.py tag number_of_images_to_attempt_to_download [urls_to_ignore.csv]

"""
Creates two csv files:

TAG_urls_DATETIME.csv : used to download iamges with get_flicker_images.py
TAG_ids_DATETIME.csv  : used to record which photos have already been scraped, to be passed in as the ignore list
                        note that the ids from the current run will be *appended*

This allows for usage like:

$ python get_flickr_urls.py sunrise 500
- creates sunrise_urls_date1.csv
$ python get_flickr_images.py sunrise_urls_date1.csv
- check out the images, delete bad ones, see how many you have left

$ python get_flickr_urls.py sunrise 500 sunrise_ids_date.csv
- creates sunrise_urls_date2.csv
$ python get_flickr_images.py sunrise_urls_date2.csv
- gets another 500 new images
"""

from flickrapi import FlickrAPI
import pandas as pd
import sys
import time
import csv
from datetime import datetime
from urlparse import urlparse
import re

"""
You'll need your own Flickr API key that you can get by applying here:
https://www.flickr.com/services/apps/create/apply


"""
key='put your key here'
secret='put your secret here'

"""
Photo Source URLs
https://www.flickr.com/services/api/flickr.photos.search.html
https://www.flickr.com/services/api/misc.urls.html

url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o

url_l = best option for 1024 sized images?

s   small square 75x75
q   large square 150x150
t   thumbnail, 100 on longest side
m   small, 240 on longest side
n   small, 320 on longest side
-   medium, 500 on longest side
z   medium 640, 640 on longest side
c   medium 800, 800 on longest side†
b   large, 1024 on longest side*
h   large 1600, 1600 on longest side†
k   large 2048, 2048 on longest side†
o   original image, either a jpg, gif or png, depending on source format

"""

def url_to_id(url):
    # could be a csv list item: [row#, url]
    if isinstance(url, list):
        url = url[1]

    if url.isdigit():
        return url

    result = urlparse(url)
    m = re.search("/\d+/(\d+)_", result.path)
    if m is None:
        raise RuntimeError("Cannot find id from {}".format(url))
    #print("{} to id: {}".format(result.path, m.group(1)))
    return m.group(1)


def get_urls(image_tag, max_count, ignore_ids=[]):
    extra_url = "url_l"

    flickr = FlickrAPI(key, secret)
    photos = flickr.walk(text=image_tag,
                            tag_mode='all',
                            tags=image_tag,
                            extras=extra_url, # see url_ options above
                            per_page=50,
                            content_type=1,   # photos only
                            is_commons=True,  # no licence restrictons
                            orientation='landscape',
                            dimension_search_mode='min',
                            height='640',
                            width='640',
                            sort='relevance')
    count = 0
    urls = []
    for photo in photos:
        url = photo.get(extra_url)
        if url == None:
            continue
        photo_id = url_to_id(url)
        if photo_id not in ignore_ids:
            if count <  max_count:
                print("Fetching url for image number {}".format(count))
                try:
                    url = photo.get(extra_url)
                    print("Retrieved url: {}".format(url))
                    if url == '' or url == None:
                        print("Url could not be fetched")
                    else:
                        urls.append(url)
                        ignore_ids.append(photo_id)
                        count += 1
                except:
                    print("Url fetch failed")
            else:
                print("Done fetching urls, fetched {} urls out of {}".format(len(urls), max_count))
                break

    # urls to csv
    urls = pd.Series(urls)
    now = datetime.now().strftime('%Y-%m-%d_%H%M%S')
    csv_filename = image_tag+"_urls_"+now+".csv"
    print("Writing out the urls to ", csv_filename)
    urls.to_csv(csv_filename)

    # ignore ids to csv
    ids = pd.Series(ignore_ids)
    ids_filename = image_tag+"_ids_"+now+".csv"
    print("Writing out the ids to ", ids_filename)
    ids.to_csv(ids_filename)

    print("Done!!!")

def main():
    tag = sys.argv[1]
    max_count = int(sys.argv[2])
    ignore_ids = []
    if len(sys.argv) == 4:
        with open(sys.argv[3], 'rb') as f:
            reader = csv.reader(f)
            # strip, just keep the number
            ignore_ids = [url_to_id(v) for v in list(reader)]

    get_urls(tag,  max_count, ignore_ids)

if __name__=='__main__':
    main()
