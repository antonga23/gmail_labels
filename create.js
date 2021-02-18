const {google} = require('googleapis');
const gmail = google.gmail('v1');
const {authenticate} = require('@google-cloud/local-auth');
const path = require('path');

async function main() {
      // Obtain user credentials to use for the request
const auth = await authenticate({
keyfilePath: path.join(__dirname, 'oauth2.keys.json'),
scopes: [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.labels',
    'https://www.googleapis.com/auth/gmail.modify',
    ],
});
google.options({auth});
// const auth = new google.auth.GoogleAuth({
//     // Scopes can be specified either as an array or as a single, space-delimited string.
//     scopes: [
//     'https://mail.google.com/',
//     'https://www.googleapis.com/auth/gmail.labels',
//     'https://www.googleapis.com/auth/gmail.modify',
//     ],
// });

// Acquire an auth client, and bind it to all future calls
// const authClient = await auth.getClient();
// google.options({auth: authClient});

// Do the magic
const res = await gmail.users.labels.create({
    // The user's email address. The special value `me` can be used to indicate the authenticated user.
    userId: 'luke@gqm-services.com',
    requestBody:
        {
            "labelListVisibility": "labelShow",
            "messageListVisibility": "show",
            "name": "thisisateslabel"
        }
});
console.log(res.data);
}

main().catch(e => {
    console.error(e);
    throw e;
  });
