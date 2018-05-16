FROM registry:2.6

ADD app /srv/app
ADD docker/supervisor.d/ /etc/supervisor.d/
ADD docker/nginx/conf.d/ /etc/nginx/conf.d/
ADD docker/nginx/nginx.conf /etc/nginx/nginx.conf
ADD docker/run.sh /root/run.sh


RUN echo "[1] Install system components"; \
    apk update; \
    apk add bash git curl nano mc nginx supervisor; \
	chmod +x /root/run.sh


EXPOSE 80
ENTRYPOINT ["/bin/bash"]
CMD ["/root/run.sh"]

