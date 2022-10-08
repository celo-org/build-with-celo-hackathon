import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "acd6zch2",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "sknv7fx9xPW7vOfi7Kth5PXsihjqtERTSRzuWQgJLDOzE2TFjgV7fFfP6d2bplzle4Jp8M00KODeY3L57L4eSgV7BpumuPL19YPoYZR81FDRT6N6z4fa9xiIUaYkt5DpoAZI91wLptoosZMgsCPYoTeWeD0ebqxdDIsWO49vltqbf622v3LQ",
  useCdn: true,
});

const build = imageUrlBuilder(client);


export const urlFor = (source) => build.image(source);
