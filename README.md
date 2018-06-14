# SOCKET TO ME

As i find myself working on several machines where i can't install any communication software or log into services due to the machines is to be shipped to production without containing my credentials or applications.

Often i found myself needing to share system logs or other investigative information from a machine i was working on to my own work station.
To avoid installing applications on a client or production device or even logging into services to share information, i scrambled this easy to run project / docker image project that basically runs the socket.io chat example slightly modified to allow sharing textual data between devices running from one device, and allowing other devices on the same LAN to access the same socket.io instance, providing the firewall allows for access.

Please note that this project is intended to run on a LAN network and offers no authentication or even persistence.
It is however the fastest and easiest way for me to share text and information between two or more machines.

1. spin up a docker image that runs this socket.io chat server
2. access your local machines IP on port 5555.
3. exchange text data.



![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Scrot")
