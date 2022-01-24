REGISTRY_STORAGE_DELETE_ENABLED=True
export REGISTRY_STORAGE_DELETE_ENABLED

if [ ! -d /data/registry ]; then
	mkdir -p /data/registry
fi

if [ ! -f /data/registry/auth.htpasswd ]; then
    touch /data/registry/auth.htpasswd
fi
