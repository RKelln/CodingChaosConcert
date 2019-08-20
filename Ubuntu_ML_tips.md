# Machine Learning on Ubuntu 18.04
> aka. How I Learned to Stop Worrying and Just Use Intel and NVidia.

I did not have a pleasant time trying to get everything set up to do local ML training. In the end I did manage to get a system working with some work being done by an NVidia graphics card on an Intel system. I tried to get a docker container working to simplify some of the requirements, but that had numerous issues too, but I nearly had something interesting working with Google Colab and 



# Conda and environments

ML researchers like to use (Conda)[https://www.anaconda.com/], which horrifically manages both python libraries and other non-python dependencies all at once [to make their lives easier](https://jakevdp.github.io/blog/2016/08/25/conda-myths-and-misconceptions/) and causing yet another package manager mess (as it somewhat supports/understands `pip`, the python package manager). At the time I was using it the conda eco-system was still changing some basic keywords and required trial and error to get things to work.

First up we need to install some dependencies:
```
$ sudo apt-get install build-essential libasound2-dev libjack-dev
```

I ended up using miniconda and hoping for the best:


```
$ wget https://repo.anaconda.com/miniconda/Miniconda2-latest-Linux-x86_64.sh
$ bash Miniconda2-latest-Linux-x86_64.sh
```
This will prompt for a bunch of information. Complete the sequence.
Close and reopen your terminal. I believe I had to make some edits to `.bashrc` to make things work properly with the install location I set up.

Conda works using "environments" which contain all the libraries and dependencies you need to get things running. I made two environments that I was able to use for the various projects:
* magenta + tensorflow using the gpu using python 2.7
* opencv + tensorflow + etc, no gpu using python 3.5

First check that conda is working and can update itself:
```
conda update conda
```

To get the (NVidia) GPU working, I tried many options and had issues with each, but lost the notes I kept. [This tutorial by Naomi Fridman](https://medium.com/@naomi.fridman/install-conda-tensorflow-gpu-and-keras-on-ubuntu-18-04-1b403e740e25) (written months after I fumbled around) looks the closest to what I did. Sorry!

Let's make some environments, first the magenta GPU one (based on the magenta_install.sh):
```
$ conda create --name magenta_gpu python=2.7
$ activate magenta_gpu
$ pip install jupyter magenta-gpu
$ pip install --pre python-rtmidi
$ deactivate magenta_gpu
```
To remove the environment you can do: `$ conda remove -n magenta_gpu --all`


And another environment for the [Learning To See](https://github.com/RKelln/webcam-pix2pix-tensorflow) project:
```
$ conda create -n learn2see python=3.5
$ activate learn2see
$ pip install tensorflow
$ pip install opencv-python
$ pip install pillow
$ conda install pyqtgraph
$ deactivate learn2see
```

So now when you work on these projects you will need to `activate` one of the conda environments first. Generally `magenta_gpu` for training and magenta-related work, and `learn2see` when running the AI-assisted visuals (`webcam-pix2pix.py`) in performance.






