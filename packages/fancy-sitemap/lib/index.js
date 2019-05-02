import fs from 'fs';
import util from 'util';
import moment from 'moment';

const SitemapCrawler = require('sitemap-generator');
const Generator = require('sitemap')

const CHANGE_FREQ_ALWAYS = 'always'
const CHANGE_FREQ_HOURLY = 'hourly'
const CHANGE_FREQ_DAILY = 'daily'
const CHANGE_FREQ_WEEKLY = 'weekly'
const CHANGE_FREQ_MONTHLY = 'monthly'
const CHANGE_FREQ_YEARLY = 'yearly'
const CHANGE_FREQ_NEVER = 'never'

const DEFAULT_CHANGE_FREQ = CHANGE_FREQ_MONTHLY
const DEFAULT_PRIORITY = 0.5

const CACHE_TIME = 600000

/**
 * Gets all the URLS that a website has accessible by users.
 * 
 * @param {*} options
 */
const runCrawler = (options) => {
    let urls = [];
    let errors = [];

    const {hostname} = options;

    // NB: We use SitemapCrawler generator to create all the sitemap tree.
    // filepath should be null, so it doesn't generate an xml file.
    const crawlerOptions = {
        stripQuerystring: options.stripQuerystring || true,
        filepath: null,
    }

    const crawler = SitemapCrawler(hostname, crawlerOptions);

    return new Promise((resolve, reject) => {
        crawler.start();

        crawler.on('add', (url) => {
            urls.push(url)
        });

        crawler.on('error', (error) => {
            errors.push(error)
        });

        crawler.on('done', () => {
            resolve([urls, errors])
        });
    })
}

const getXmlUrls = (options, generatedUrls = []) => {
    const {rules = [], defaultPriority, defaultChangeFreq} = options;

    const urls = generatedUrls.map((url) => {
        const foundRule = rules.find(({path}) => (
            RegExp(path,'g').exec(url) !== null
        )) || {}

        // TODO: Once we check the validity of the values and set the correct ones
        // we can remove the last condition ||
        return {
            url,
            changefreq: foundRule.changeFreq || defaultChangeFreq || DEFAULT_CHANGE_FREQ,
            priority: foundRule.priority || defaultPriority || DEFAULT_PRIORITY,
        }
    })

    return urls
}

const generateXmlSitemap = (options, generatedUrls = []) => {
    const urls = getXmlUrls(options, generatedUrls)
    const sitemapGenerator = Generator.createSitemap ({
        cacheTime: CACHE_TIME,        // 600 sec - cache purge period
        urls,
    })

    return new Promise((resolve, reject) => {
        sitemapGenerator.toXML((err, xml) => {
            if (err) {
                return reject(err)
            }

            return resolve(xml)
        })
    })
}

const createSitemapFile = (path, fileContent) => (
    new Promise((resolve, reject) => (
        fs.writeFile(path, fileContent, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        })
    ))
)

const shouldReturnCachedFile = (path, maxCacheDays) => (
    new Promise((resolve, reject) => (
        fs.stat(path, (err, stats) => {
            if (err) {
                return resolve(false)
            }

            const today = moment(new Date(), 'YYYY-MM-DD')
            const fileModifiedDate = moment(new Date(util.inspect(stats.mtime)), 'YYYY-MM-DD')
            const creationDays = moment.duration(today.diff(fileModifiedDate)).asDays()

            return resolve(parseInt(creationDays) < maxCacheDays)
        })
    ))
)

const getFileXmlSitemap = (path) => (
    new Promise((resolve, reject) => (
        fs.readFile(path, (error, fileContent) => {
            if (error) {
                return reject(error)
            }

            return resolve(fileContent)
        })
    ))
)

const start = (options) => (
    // TODO: Check validity of the options object.
    // Example: hostname is provided and required!

    // TODO: Also check if user default values are valid:
    // priority should be [0-1]
    // changeFreq should be one of the constants above
    // otherwise, sets the default values: DEFAULT_CHANGE_FREQ and DEFAULT_PRIORITY

    new Promise(async (resolve, reject) => {
        const {maxCacheDays} = options;

        // TODO: Clean this logic... Probably put it inside a method?
        if (maxCacheDays && maxCacheDays > 0) {
            const {path} = options;

            try {
                const hasCachedFile = await shouldReturnCachedFile(path, maxCacheDays)

                if (hasCachedFile) {
                    const fileXmlSitemap = await getFileXmlSitemap(path);
                    return resolve(fileXmlSitemap);
                }

                // SKIP Cached version: Generate the file again
            } catch (error) {
                console.log('Trying to get file from cached failed...')
                console.log('error', error)
                // SKIP Cached version: Generate the file again
            }
        }

        // Generate file...
        let urls;
        let errors;    

        try {
            [urls, errors] = await runCrawler(options)
        } catch (error) {
            return reject(error);
        }

        // TODO: Do something with the errors???

        try {
            const generatedXmlSitemap = await generateXmlSitemap(options, urls);
            const {path} = options;

            if (path) {
                // NB: If it returns an error, we don't care.
                await createSitemapFile(path, generatedXmlSitemap);

                return resolve(generatedXmlSitemap);
            } else {
                return resolve(generatedXmlSitemap);
            }
        }
        catch (error) {
            console.log(error)
            return reject(error);
        }
    })
)

const SitemapGenerator = {
    start,
}

module.exports = SitemapGenerator