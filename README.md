# 📡 Gather.town Websocket API interaction examples

Simple examples on how to interact with Gather.town Web Socket API 

## How to Develop

```bash
# Copy .env.example to .env
cp .env.example .env

# Set the environment variables on .env
# Get GATHER_API_KEY from https://gather.town/apiKeys
# Get GATHER_SPACE_ID from your space URL.
# Eg: 5jnhRfDYRIUyDmbF/my-space
# Get GATHER_MAP_ID from Mapmaker's Rooms panel

# Install dependencies
npm install

# Run server
npm run dev
```

## Tips

### Finding the event name and payload you wish to use
Go to `node_modules/@gathertown/gather-game-common/src/events.proto` and check `ServerClientEvent` message.  
You might want to add this [extension](https://marketplace.visualstudio.com/items?itemName=zxh404.vscode-proto3) for syntax highlight.  
On VSCode, select the the event name such as `MapSetObjects`, press `Ctrl+D` and find its payload.  
You can also `Ctrl+Click` on the payload class names to check their content. In this case, `WireObject`.


## References

* [Gather WebSocket API Documentation](https://gathertown.notion.site/Gather-Websocket-API-bf2d5d4526db412590c3579c36141063)
* [Gather HTTP API Documentation](https://www.notion.so/Gather-HTTP-API-3bbf6c59325f40aca7ef5ce14c677444)
* [The Forest API Interaction Example](https://github.com/gathertown/the-forest)
* [Gather Forum](https://forum.gather.town/c/developers/api-questions/9)
