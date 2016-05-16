FROM node:latest
WORKDIR /home/moonblade/workspace/node/front/
ADD . /home/moonblade/workspace/node/front/
RUN \
	npm install -g bower http-server&& \
    npm install && \
    bower install --allow-root
CMD ["http-server","-p","8080"]