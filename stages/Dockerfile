FROM registry:2.7

ADD app /srv/app
ADD docker/supervisor.d/ /etc/supervisor.d/
ADD docker/nginx/ /etc/nginx/
ADD docker/run.sh /root/run.sh


RUN echo "[1] Install system components"; \
    apk update; \
    apk add bash git curl nano mc nginx supervisor; \
	chmod +x /root/run.sh


EXPOSE 80 443
ENTRYPOINT ["/bin/bash"]
CMD ["/root/run.sh"]
