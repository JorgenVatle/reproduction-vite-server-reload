import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { _createClientMethod } from "meteor/zodern:relay/client";
import { FilesCollection } from "meteor/ostrio:files";
import { WebAppInternals } from "meteor/webapp";
import { getConfig } from "meteor/jorgenvatle:vite-bundler/loading/vite-connection-handler";
_createClientMethod("links.get");
_createClientMethod("testing.zodern");
const LinksCollection = new Mongo.Collection("links");
const FileCollection = new FilesCollection({
  storagePath: `images`,
  collectionName: "images",
  // Disallow Client to execute remove, use the Meteor.method
  allowClientCode: false
});
if (Meteor.isDevelopment) {
  WebAppInternals.registerBoilerplateDataCallback(
    "react-preamble",
    async (request, data) => {
      const { host, port } = await getConfig();
      data.dynamicHead = data.dynamicHead || "";
      data.dynamicHead += `
<script type="module">
  import RefreshRuntime from "http://${host}:${port}/@react-refresh"
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
<\/script>
    `;
    }
  );
}
async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: /* @__PURE__ */ new Date() });
}
Meteor.startup(async () => {
  FileCollection.find();
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: "Do the Tutorial",
      url: "https://www.meteor.com/tutorials/react/creating-an-app"
    });
    await insertLink({
      title: "Follow the Guide",
      url: "https://guide.meteor.com"
    });
    await insertLink({
      title: "Read the Docs",
      url: "https://docs.meteor.com"
    });
    await insertLink({
      title: "Discussions",
      url: "https://forums.meteor.com"
    });
  }
  Meteor.publish("links", function() {
    return LinksCollection.find();
  });
});
//# sourceMappingURL=meteor.server.mjs.map
