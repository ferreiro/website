import fs from 'fs';

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
        stripQuerystring: options.stripQuerystring || false,
        filepath: options.filepath || null,
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

const _start = (options) => (
    new Promise(async (resolve, reject) => {
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
                fs.writeFile(path, generatedXmlSitemap, (err) => {
                    if (err) {
                        throw err;
                    }
                    return resolve(generatedXmlSitemap);
                });
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

const SitemapGenerator = (options) => {
    // TODO: Check validity of the options object.
    // Example: hostname is provided and required!

    // TODO: Also check if user default values are valid:
    // priority should be [0-1]
    // changeFreq should be one of the constants above
    // otherwise, sets the default values: DEFAULT_CHANGE_FREQ and DEFAULT_PRIORITY
    
    // TOOD: If hasCacheActivated
    // 1) Read the file...
    // 2) Check last time generated the file...

    return {
        start: () => _start(options)
    }
}

module.exports = SitemapGenerator