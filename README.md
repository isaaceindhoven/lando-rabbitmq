# Lando Rabbitmq

Rabbitmq service for the [Lando](https://docs.lando.dev/) development environment. Uses the offical [Rabbitmq image](https://hub.docker.com/_/rabbitmq).

## Requirements

1. Lando

## Installation

### Manual

1. Download the plugin [here](https://github.com/isaaceindhoven/lando-rabbitmq/archive/refs/tags/0.1.2.zip)
2. Move the zip file to `~/.lando/plugins` (Create the directory if it does not yet exist).
3. Unzip the file.

### Bash

```bash
# Remove existing/old plugin.
rm -rf ~/.lando/plugins/lando-rabbitmq

# Make sure the plugins directory exists.
mkdir -p ~/.lando/plugins

# Download the plugin to /tmp.
curl -L https://github.com/isaaceindhoven/lando-rabbitmq/archive/refs/tags/0.1.2.tar.gz --output /tmp/lando-rabbitmq.tar.gz

# Unzip the plugin.
tar -xf /tmp/lando-rabbitmq.tar.gz --directory ~/.lando/plugins/

# Move the plugin to the Lando plugins directory.
mv ~/.lando/plugins/lando-rabbitmq-0.1.2 ~/.lando/plugins/lando_rabbitmq

# Remove the zip file.
rm -rf /tmp/lando-rabbitmq.tar.gz
```

### Bash oneliner

```bash
rm -rf ~/.lando/plugins/lando-rabbitmq && \
mkdir -p ~/.lando/plugins && \
curl -L https://github.com/isaaceindhoven/lando-rabbitmq/archive/refs/tags/0.1.2.tar.gz --output /tmp/lando-rabbitmq.tar.gz && \
tar -xf /tmp/lando-rabbitmq.tar.gz --directory ~/.lando/plugins/ && \
mv ~/.lando/plugins/lando-rabbitmq-0.1.2 ~/.lando/plugins/lando_rabbitmq && \
rm -rf /tmp/lando-rabbitmq.tar.gz
```

### Rename the plugin after installation

There is currently a [bug in Lando](https://github.com/lando/lando/issues/3394) which prevents us from using a `-` in the plugin name. So you should temporarily rename the plugin to something like `lando_rabbitmq` or `landorabbitmq`.

```bash
mv ~/.lando/plugins/lando-rabbitmq ~/.lando/plugins/lando_rabbitmq
```

## Usage

After installing the plugin you can easily add the service to your Lando environment by using `type: rabbitmq` for your service.

### Configuration

1. `version` - To specify which Rabbitmq version you want to install. Currently 3.9, 3.10 and 3.11 are supported.
2. `management` - To specify if you want to include the management dashboard of Rabbitmq. Can be true or false. (Default: true)
3. `alpine` - Whether to use an Alpine image or a regular one. Can be true or false. (Default: true)
4. `creds` - You can pass a `user` and `password` for the Rabbitmq instance. (Default user: 'user', Default password: 'user')

### Example

```yaml
name: my-lando-environment-using-rabbitmq

config:
  webroot: .

services:
  rabbitmq:
    type: rabbitmq
    version: '3.11'
    management: true
    alpine: false
    creds:
      user: landorabbitmq
      password: my-super-secret-password

# You can use the proxy to view the Management panel using a proper url.
proxy:
  rabbitmq:
    - rabbitmq.lando-sandbox.lndo.site:15672

```