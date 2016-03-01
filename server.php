What is the safest way to clean up /boot partition?


Graphical method:

You can use Ubuntu Tweak, it's an easy-to-use graphical tool that let you tweak ubuntu, and also, into the "Janitor" section you can clean the system, as well as remove older kernels. You can take it from here: http://ubuntu-tweak.com/
Command line method:

First check your kernel version, so you won't delete the in-use kernel image, running:

uname -r

Now run this command for a list of installed kernels:

sudo dpkg --list 'linux-image*'

and delete the kernels you don't want/need anymore by running this:

sudo apt-get remove linux-image-VERSION

Replace VERSION with the version of the kernel you want to remove.

When you're done removing the older kernels, you can run this to remove ever packages you won't need anymore:

sudo apt-get autoremove

And finally you can run this to update grub kernel list:

sudo update-grub

