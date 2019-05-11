## Live Pulse server

### Docker
* In the `Dockerfile` file, supply values for the necessary environment variables.
* To build the image: `docker image build -t <image_name> .`
* To see the contents of the built image: `docker run -it --rm <image_name> sh`
    * You can then use your usual file commands like `cd` and `ls` to inspect the file system.
* To run the image in a container: `docker container run -p <host-port>:<container-port> [--rm] <image_name>`
    * Note that the default value for `<container-port>` is `3000`.
