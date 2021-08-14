'use strict';

const express = require(`express`);
const app = express();
const routes = require(`./routes`);
const path = require(`path`);
const port = 8080;
const PUBLIC_DIR = `public`;

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(routes);

app.listen(port, () => console.log(`server is running on port ${port}`));
