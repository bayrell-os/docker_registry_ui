#!/bin/bash

#openssl req -x509 -days 7300 -newkey rsa:4096 -nodes -sha256 -keyout private.pem -out public.pem

openssl genrsa -out private.pem 4096
openssl req -new -key private.pem -out public.req
openssl x509 -req -days 7300 -in public.req -signkey private.pem -out public.pem

chmod 600 private.pem
chmod 600 public.req
chmod 600 public.pem

openssl dhparam -out dh4096.pem 4096



