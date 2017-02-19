# xkcd-store-watcher
Will scrape the xkcd store for a specific item and trigger a webhook when it is available

----------------

There is [one item](https://store.xkcd.com/products/self-reference) from the xkcd store I want, and it's never available.
After wasting time checking for availability I wrote this script that does it for me, and pings me on Slack using the 
[incoming webhooks](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) integration.

# Install

You need node and npm installed on your machine.

```bash
npm install
cd node_modules/spooky/
npm install
cd ../..
```

Configurations (item store page, webhook adress, ...) are in the `config.js` file.

# Launch

```bash
node main.js
```
