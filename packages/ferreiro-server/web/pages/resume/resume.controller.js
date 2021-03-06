import {renderPdf} from './render-pdf'
import {join} from 'path'

const PDF_PUBLIC_ASSETS_PATH = '/../../public/dst/pdf'
const RESUME_FILE_NAME = 'Jorge_Ferreiro_resume_april_2019.pdf'

export const getResume = (req, res) => {
    const {download = false} = req.query
    const resumePdfFilePath = join(__dirname, PDF_PUBLIC_ASSETS_PATH, RESUME_FILE_NAME)

    // TODO: Track or emit a metric to keep tracking on resume downloads?

    if (download) {
        return res.download(resumePdfFilePath)
    }

    return renderPdf(resumePdfFilePath, res)
}
