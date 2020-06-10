import express from "express";
import { uriPathInHTMLData } from "xss-filters";

const router = express.Router();

// TODO: Move this into a database and let the admin of ferreiro.me to
// create more urls as they need on the go
const SHORT_URL_TO_URL = {
  hackathon:
    "https://www.ferreiro.me/blog/part-1-the-definitive-guide-to-making-the-most-of-college-tech-hackathons?utm_source=ferreiro.me-hackathon-part-2&utm-source=ferreiro&utm-campaign=go-hackathon",
  remote:
    "https://www.youtube.com/watch?v=7XAvIKBBeAE&utm-source=ferreiro&utm-campaign=remote",
  didlaunch:
    "https://developersindepth.com/?utm_source=ferreiro-blog&utm-campaign=did-launch&utm-medium=blog",
  dailyfocus:
    "https://www.slideshare.net/jgferreiro/redis-76234580?qid=4408d51d-497d-44b1-8a7a-b688dbd51f83&v=&b=",
  perfomance:
    "https://www.ferreiro.me/blog/speed-up-your-website-frontend-8-practical-tips",
  ian:
    "https://www.youtube.com/watch?v=R5Gzv7dwXKA&list=PLaN1b7vXPDt63YJVL2F7cmq7FZm1olKIn",
  rahma:
    "https://www.youtube.com/playlist?list=PLaN1b7vXPDt6f3jYSdFbVeeEixCxWSepj",
  redis:
    "https://www.slideshare.net/jgferreiro/redis-76234580?qid=4408d51d-497d-44b1-8a7a-b688dbd51f83&v=&b=",
  roundabout:
    "https://speakerdeck.com/ferreiro/web-performance-jorge-ferreiro-twitter-london-js-roundabout",
  "roundabout-feedback": "https://forms.gle/8uiSR2wz2VEs8qp47",
};

const MOVED_PERMANETLY_STATUS_CODE = 301;

// TODO: Move this into the API repository.
const getShortenedUrl = (permalink) =>
  new Promise((resolve, reject) => {
    const url = SHORT_URL_TO_URL[permalink];

    if (!url) {
      return reject("No URL found");
    }

    return resolve(url);
  });

router.get("/:permalink", async (req, res) => {
  // TODO: Get the permalink from the url.
  // TODO: Scape bad XSS guys from here.
  const permalink = uriPathInHTMLData(req.params.permalink);

  // TODO: Implement in the DB repository a read-only getter.
  getShortenedUrl(permalink)
    .then((url) => res.redirect(MOVED_PERMANETLY_STATUS_CODE, url))
    .catch((error) => res.render(error));
});

module.exports = router;
