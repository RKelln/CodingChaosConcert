# Get images from Flickr

Get a Flickr API key. Clone this repo if you haven't already. Edit src/flickr_scrape/get_flickr_urls.py and add API key info. Image retrieval happens in two steps, first finding the URLs of images that match the tag searched for, then downloading those URLs. The first command looks like: python get_flickr_urls.py tag number_of_images_to_attempt_to_download [urls_to_ignore.csv] So you can do something like:

    $ cd src/flickr_scrape
    $ python get_flickr_urls.py sunrise 500

This creates sunrise_urls_DATE1.csv (where DATE1 is the actual date and time).

    $ python get_flickr_images.py sunrise_urls_DATE1.csv

View the images, delete bad ones, see how many you have left. Get more images if needed (this will get 500 new images that weren't already fetched once:

    $ python get_flickr_urls.py sunrise 500 sunrise_ids_DATE1.csv

This creates sunrise_urls_DATE2.csv (where DATE2 is the actual date and time), it will automatically append the ignored urls from DATE1 to DATE2.

    $ python get_flickr_images.py sunrise_urls_DATE2.csv

Gets another 500 new images, etc. Finally, once all images have been vetted move the images to a more appropriate folder, etc.