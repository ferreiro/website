const axios = require("axios");
const urllib = require("url-lib");
const cache = require("memory-cache");

import blogRepository from "../../../api/repository/blog";

import { createViewPath } from "../create-view-path";

const CACHE_YOUTUBE_KEY = "youtube-latest-video";

const CACHED_TIME_MS = 60 * 60 * 24;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_ENDPOINT = urllib.formatUrl(
  "https://www.googleapis.com/youtube/v3/search",
  {
    part: "snippet", // overwrites existing `sort` param in URL
    channelId: YOUTUBE_CHANNEL_ID,
    maxResults: 1,
    order: "date",
    type: "video",
    key: YOUTUBE_API_KEY,
  }
);

const getLatestVideo = () => {
  return new Promise((resolve, reject) => {
    try {
      const cachedLatestVideo = cache.get(CACHE_YOUTUBE_KEY);

      if (!cachedLatestVideo) {
        return axios.get(YOUTUBE_API_ENDPOINT).then((youtubeResponse) => {
          const latestVideo = youtubeResponse.data.items[0];

          cache.put(CACHE_YOUTUBE_KEY, latestVideo, CACHED_TIME_MS);

          return resolve(latestVideo);
        });
      }

      return resolve(cachedLatestVideo);
    } catch (error) {
      return resolve([]);
    }
  });
};

export const getLinksPage = async (_, res) => {
  try {
    const posts = await blogRepository.getMostRecentPosts();
    const latestPost = posts[0];

    const latestVideo = await getLatestVideo();
    const pinnedLink = {
      url: "https://developersindepth.com/",
      title: "Get your invite to Developers In Depth!",
    };
    const projects = [
      {
        url:
          "https://ferreiro.me/?utm_source=links&utm_medium=cta&utm_campaign=links-ferreiro",
        title: "Ferreiro.me",
        image: "/links_jorge_ferreiro_project.jpg",
      },
      {
        url:
          "https://www.developersindepth.com/?utm_source=links&utm_medium=cta&utm_campaign=links-ferreiro",
        title: "Developers In Depth",
        image: "/links_developers_in_depth_by_jorge_ferreiro_project.jpg",
      },
    ];

    return res.render(createViewPath("links", "links.pug"), {
      title: "Links Jorge Ferreiro",
      path: "links",
      pinnedLink,
      latestPost,
      latestVideo,
      projects,
    });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};
