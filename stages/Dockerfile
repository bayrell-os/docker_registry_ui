ARG ARCH=
FROM ${ARCH}registry:2.7.1

RUN echo "[1] Install system components"; \
	echo "" > /etc/apk/repositories; \
	echo "https://mirror.yandex.ru/mirrors/alpine/v3.11/main" >> /etc/apk/repositories; \
	echo "https://mirror.yandex.ru/mirrors/alpine/v3.11/community" >> /etc/apk/repositories; \
    apk update; \
    apk upgrade; \
    apk add bash git curl nano mc nginx supervisor; \
	echo 'Ok'

ADD app /srv/app
ADD files /src/files
RUN cd ~; \
	rm -f /etc/nginx/conf.d/default.conf; \
	yes | cp -f /src/files/entrypoint.sh /entrypoint.sh; \
	cp -rf /src/files/etc/* /etc/; \
	cp -rf /src/files/root/* /root/; \
	rm -rf /src/files; \
	mkdir -p /data; \
	chmod +x /entrypoint.sh; \
	chmod +x /root/run.sh; \
	echo 'Ok'
	

CMD ["/root/run.sh"]
