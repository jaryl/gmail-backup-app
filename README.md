# gmail-backup-app
Seamless backup from Gmail, with a familiar and user friendly interface to access to your backed up emails.

Setup Instructions
---

In your terminal, clone the repository and install project dependencies:
```
git clone git@github.com:jaryl/gmail-backup-app.git
cd gmail-backup-app
npm install
```

Run the server:
```
npm start
```

System Design
---

This app (the main Express instance) is composed of 3 nested apps (also Express instances), as follows:

* root [See README](app/root/README.md)
* frontend [See README](app/frontend/README.md)
* api [See README](app/api/README.md)

The root app is what you will see when you access the root url of where you've deployed the app to, and will be used for setup and configuration.

The frontend app (implemented with Vue.js) will work in conjunction with the api app (served over a GraphQL interface), to be the viewer of backed up emails (read-only access).
