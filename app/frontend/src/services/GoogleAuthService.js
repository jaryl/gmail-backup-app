// const { OAuth2Client } = require('google-auth-library');

// const http = require('http');
// const url = require('url');
// const opn = require('opn');
// const destroyer = require('server-destroy');

// const keys = require('../../config/oauth2.keys');

// const getAuthenticatedClient = () => {
//   return new Promise((resolve, reject) => {
//     const oAuth2Client = new OAuth2Client(
//       keys.web.client_id,
//       keys.web.client_secret,
//       keys.web.redirect_uris[0],
//     );

//     const authorizeUrl = oAuth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: 'https://www.googleapis.com/auth/gmail.readonly',
//     });

//     const server = http
//       .createServer(async (req, res) => {
//         try {
//           if (req.url.indexOf('/oauth2callback') > -1) {
//             // acquire the code from the querystring, and close the web server.
//             const qs = new url.URL(req.url, 'http://localhost:3000')
//               .searchParams;
//             const code = qs.get('code');
//             console.log(`Code is ${code}`);
//             res.end('Authentication successful! Please return to the console.');
//             server.destroy();

//             // Now that we have the code, use that to acquire tokens.
//             const r = await oAuth2Client.getToken(code);
//             // Make sure to set the credentials on the OAuth2 client.
//             oAuth2Client.setCredentials(r.tokens);
//             console.info('Tokens acquired.');
//             resolve(oAuth2Client);
//           }
//         } catch (e) {
//           reject(e);
//         }
//       })
//       .listen(3000, () => {
//         // open the browser to the authorize url to start the workflow
//         opn(authorizeUrl, { wait: false }).then(cp => cp.unref());
//       });

//     destroyer(server);

//   });
// };

// const setup = async () => {
//   const oAuth2Client = await getAuthenticatedClient();
// };

// export default { setup };
