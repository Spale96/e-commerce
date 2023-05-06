import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: 'z8b8nu1h',
    dataset: 'production',
    apiVersion: '2023-02-20',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});



// to be able to use images
const builder = imageUrlBuilder(client);

// gaining access for images store from Sanity
export const urlFor = (source) => builder.image(source);
