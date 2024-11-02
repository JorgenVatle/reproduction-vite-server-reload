import { createMethod } from "meteor/zodern:relay";
import { LinksCollection } from "/imports/api/links";
import { z } from "zod";
import { Meteor } from "meteor/meteor";

export const getLinks = createMethod({
    name: "links.get",
    schema: z.object({}),
    run: async () => {
        return await LinksCollection.find().fetchAsync();
    },
});

Meteor.methods({
    "testing.regular": () => {
        return "Hello World";
    },
});

export const testMessage = createMethod({
    name: "testing.zodern",
    schema: z.object({}),
    run: async () => {
        return "Hello World Cool!";
    },
});
