
## Creating azure node app
http://gregtrowbridge.com/deploying-a-bower-dependent-node-app-on-windows-azure/
```
$ azure site deploymentscript --node

```

### Emails: configure nodemailer with Gmail and Microsoft azure

1. Go to routes/contact.js. Inside this document there is the configuration user and password for gmail.


```Node.js
transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '<yourGMAILAccount>',
        pass: '<yourGMAILPassword>'
    }
});
```

2. There is not a good idea to publish this private data into github publicily. So you have to configure Enviroments variables.

3. Create config.json and set process Enviroments variables into nodeemailr.

  http://stackoverflow.com/questions/5869216/how-to-store-node-js-deployment-settings-configuration-files

4. Launch your application and pass your local Enviroments variable
  ```bash
  GMAIL_PASSWD=YOURPASSWOED npm start
  ```
5. Now, we can say azure to work with this Enviroments vairbales.

  From: http://tstringer.github.io/nodejs/azure/2015/11/24/get-and-set-node-azure-web-app-env-vars.html

  ```Bash
  $ npm install --global azure
  $ azure login
  $ azure site appsetting list your-web-app-name
  $ azure site appsetting add NEW_ENVIRONMENT_VAR=yourValue your-web-app-name

  $ azure site appsetting delete GMAIL_PASSWD newferreiro
  $ azure site appsetting add GMAIL_PASSWD=<GMAILPASSWORD>;
  ```

**In order to work on your server** (in this case Microsoft azure) you have also add those variables into the server Enviroments variables

# How to Setup a Custom Domain Name Registered With Gandi on an Azure Website

http://gunnariauvinen.com/how-to-configure-custom-domain-name-from-gandi-on-an-azure-website/

https://wiki.gandi.net/en/dns/zone/a-record

type A (@) points to your sever XXX.XX.XX.XXX
type (WWW) points to name.azurewebsites.net

# Dont redirect home

http://searchengineland.com/seo-when-your-domain-homepage-are-not-the-same-131592
