# Lando Rabbitmq

Rabbitmq service for the [Lando](https://docs.lando.dev/) development environment. Uses the offical [Rabbitmq image](https://hub.docker.com/_/rabbitmq).

## Requirements

1. Lando

## Installation


### Bash
```bash
rm -rf ~/.lando/plugins/lando-rabbitmq && \
mkdir -p ~/.lando/plugins && \
curl https://github.com/melvinversluijs/lando-rabbitmq/archive/refs/tags/0.1.0.tar.gz -O /tmp/lando-rabbitmq.tar.gz && \ 
tar -xf /tmp/lando-rabbitmq.tar.gz --directory ~/.lando/plugins/lando-rabbitmq && \
rm -rf /tmp/lando-rabbitmq.tar.gz
```

### Manual

1. Download the plugin (here)[https://github.com/melvinversluijs/lando-rabbitmq/archive/refs/tags/0.1.0.zip]
2. Move the zip file to `~/.lando/plugins` (Create the directory if it does not yet exist).
3. Unzip the file.

### Rename the plugin after installation

There is currently a (bug in Lando)[https://github.com/lando/lando/issues/3394] which prevents us from using a `-` in the plugin name. So you should temporarily rename the plugin to something like `lando_rabbitmq` or `landorabbitmq`.

```bash
mv ~/.lando/plugins/lando-rabbitmq ~/.lando/plugins/lando_rabbitmq
```

## Usage

After installing the plugin you can easily add the service to your Lando environment by using `type: rabbitmq` for your service.

### Configuration

1. `version` - To specify which Rabbitmq version you want to install. Currently 3.9, 3.10 and 3.11 are supported. (Default: 3.11)
2. `management` - To specify if you want to include the management dashboard of Rabbitmq. Can be true or false. (Default: true)
3. `alpine` - Whether to use an Alpine image or a regular one. Can be true or false. (Default: true)


### Example

```yaml
name: my-lando-environment-using-rabbitmq

config:
  webroot: .

services:
  rabbitmq:
    type: rabbitmq
    version: '3.9'
    management: true
    alpine: false

# You can use the proxy to view the Management panel using a proper url.
proxy:
  rabbitmq:
    - rabbitmq.lando-sandbox.lndo.site:15672

```