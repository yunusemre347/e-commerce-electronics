//import { SanityClient } from "@sanity/client";
//import sanityClient from '@sanity/client';

import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'xb2rc1si',
  dataset: 'production',
  apiVersion: '2023-04-11',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
