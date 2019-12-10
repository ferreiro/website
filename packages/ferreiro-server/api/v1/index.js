import express from "express"
import blog from "./blog/blog.routes"
import contact from "./contact/contact.routes"
import videos from "./videos/videos.routes"
import github from "./github/github.routes"
import imageUploader from "./imageUploader/imageUploader.routes"
import { isAuthenticated } from "../../web/pages/admin/is-authenticated"

const router = express()

router.use("/blog", blog)
router.use("/contact", contact)
router.use("/github", github)
router.use("/upload-image", isAuthenticated, imageUploader)
router.use("/videos", videos)

module.exports = router
