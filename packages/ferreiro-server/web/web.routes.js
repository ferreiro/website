import express from "express";
import admin from "./pages/admin/admin.routes";
import about from "./pages/about/about.routes";
import blog from "./pages/blog/blog.routes";
import contact from "./pages/contact/contact.routes";
import gifts from "./pages/landings/gifts.routes";
import go from "./pages/go/go.routes";
import home from "./pages/home/home.routes";
import newsletter from "./pages/newsletter/newsletter.routes";
import portfolio from "./pages/portfolio/portfolio.routes";
import resume from "./pages/resume/resume.routes";
import stats from "./pages/stats/stats.routes";
import talks from "./pages/talks/talks.routes";
import university from "./pages/university/university.routes";

const router = express.Router();

function comingSoon(req, res) {
  return res.render("comingSoon");
}

function recap2019(req, res) {
  return res.render("./pages/landings/2019");
}

// leave this, backwards compatibility
function redirectProjectsToPortfolio(req, res) {
  return res.redirect("/portfolio");
}

function redirectFeedbackToContact(req, res) {
  return res.redirect("/contact/feedback");
}

function redirectToGifts(req, res) {
  return res.redirect("/gifts");
}

function redirectMeetupLondon(req, res) {
  return res.redirect(
    "https://www.meetup.com/es-ES/The-JS-Roundabout/events/259864908/"
  );
}

function surveySpanish(req, res) {
  return res.render("./UIComponents/encuesta");
}

function surveyEnglish(req, res) {
  return res.render("./UIComponents/survey");
}

// Mounting more subroutes.
router.get("/", home); // Home shows about page
router.use("/about", about);
router.use("/admin", admin);
router.use("/blog", blog);
router.get("/coming", comingSoon); // Home shows about page
router.use("/contact", contact);
router.use("/encuesta", surveySpanish);
router.use("/survey", surveyEnglish);
router.get("/feedback", redirectFeedbackToContact);
router.use("/gifts", gifts);
router.use("/2019", recap2019);
router.use("/go", go);
router.use("/london", redirectMeetupLondon);
router.use("/newsletter", newsletter);
router.use("/portfolio", portfolio);
router.get("/projects", redirectProjectsToPortfolio);
router.get("/regalo", redirectToGifts);
router.use("/resume/jorge_ferreiro_resume.pdf", resume);
router.use("/stats", stats);
router.use("/talks", talks);
router.use("/university", university);

module.exports = router;
