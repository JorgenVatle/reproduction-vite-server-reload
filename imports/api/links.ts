import { Mongo } from 'meteor/mongo';
import { testMessage } from "/imports/methods/links";

export type Link = {
    _id: string;
    title: string;
    url: string;
    createdAt: Date;
};

export const LinksCollection = new Mongo.Collection<Link>('links');

async function test() {
    return await testMessage({});
}
