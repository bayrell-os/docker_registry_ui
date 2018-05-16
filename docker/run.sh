#!/bin/bash


REGISTRY_HTTP_ADDR=127.0.0.1:5000
REGISTRY_STORAGE_DELETE_ENABLED=True
export REGISTRY_HTTP_ADDR
export REGISTRY_STORAGE_DELETE_ENABLED


if [ ! -f /var/lib/registry/auth.htpasswd ]; then
    touch /var/lib/registry/auth.htpasswd
fi


sleep 2
/usr/bin/supervisord -c /etc/supervisord.conf

sleep 5
/bin/bash
 
