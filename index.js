// const express = require('express');
// require('./module/checkVersion');
// const createtable = require("./database/createtable")
// const cors = require('cors');
// const errorHandlers = require('./handlers/errorHandlers');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const crypto = require('crypto');
// const nonce = crypto.randomBytes(16).toString('hex');

// const app = express();
// const SERVERPORT = process.env.SERVERPORT || 4000;
// const SESSION_SECRET = process.env.SESSION_SECRET;

// app.use(
//     session({
//         /* This is a secret key that is used to encrypt the session. */

//         // Name for the session ID cookie. Defaults to 'connect.sid'.
//         name: 'session_id',

//         // Whether to force-save unitialized (new, but not modified) sessions
//         // to the store. Defaults to true (deprecated). For login sessions, it
//         // makes no sense to save empty sessions for unauthenticated requests,
//         // because they are not associated with any valuable data yet, and would
//         // waste storage. We'll only save the new session once the user logs in.
//         saveUninitialized: true,

//         // Whether to force-save the session back to the store, even if it wasn't
//         // modified during the request. Default is true (deprecated). We don't
//         // need to write to the store if the session didn't change.
//         resave: false,

//         // Whether to force-set a session ID cookie on every response. Default is
//         // false. Enable this if you want to extend session lifetime while the user
//         // is still browsing the site. Beware that the module doesn't have an absolute
//         // timeout option (see https://github.com/expressjs/session/issues/557), so
//         // you'd need to handle indefinite sessions manually.
//         // rolling: false,

//         // Secret key to sign the session ID. The signature is used
//         // to validate the cookie against any tampering client-side.
//         secret: SESSION_SECRET, // Secret key,
//         // Settings object for the session ID cookie. The cookie holds a
//         // session ID ref in the form of 's:{SESSION_ID}.{SIGNATURE}' for example:
//         // s%3A9vKnWqiZvuvVsIV1zmzJQeYUgINqXYeS.nK3p01vyu3Zw52x857ljClBrSBpQcc7OoDrpateKp%2Bc

//         // It is signed and URL encoded, but NOT encrypted, because session ID is
//         // merely a random string that serves as a reference to the session. Even
//         // if encrypted, it still maintains a 1:1 relationship with the session.
//         // OWASP: cookies only need to be encrypted if they contain valuable data.
//         // See https://github.com/expressjs/session/issues/468
//         cookie: {
//             // Path attribute in Set-Cookie header. Defaults to the root path '/'.
//             path: '/',

//             // Domain attribute in Set-Cookie header. There's no default, and
//             // most browsers will only apply the cookie to the current domain.
//             // domain: null,

//             // HttpOnly flag in Set-Cookie header. Specifies whether the cookie can
//             // only be read server-side, and not by JavaScript. Defaults to true.
//             httpOnly: true,

//             // Expires attribute in Set-Cookie header. Set with a Date object, though
//             // usually maxAge is used instead. There's no default, and the browsers will
//             // treat it as a session cookie (and delete it when the window is closed).
//             // expires: new Date(...)

//             // Preferred way to set Expires attribute. Time in milliseconds until
//             // the expiry. There's no default, so the cookie is non-persistent.
//             // maxAge: 1000 * 60 * 60 * 24, // Setting the cookie to expire in 24 hours.
//             maxAge: 1 * 60 * 1000,

//             // SameSite attribute in Set-Cookie header. Controls how cookies are sent
//             // with cross-site requests. Used to mitigate CSRF. Possible values are
//             // 'strict' (or true), 'lax', and false (to NOT set SameSite attribute).
//             // It only works in newer browsers, so CSRF prevention is still a concern.
//             sameSite: 'none',

//             // Secure attribute in Set-Cookie header. Whether the cookie can ONLY be
//             // sent over HTTPS. Can be set to true, false, or 'auto'. Default is false.
//             secure: true,
//             // HostOnly: true,
//         },
//     }),
// );
// app.use(
//     cors({
//         credentials: true,
//         origin: true,
//     })
// );

// app.use(express.json());

// app.use(bodyParser.json());
// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     }),
// );
// app.use(cookieParser(SESSION_SECRET));

// const defaultvalues = require('./routes/DefaultValues');
// const backendparameter = require('./routes/BackendParameter');
// const futhergeneration = require('./routes/FutherGeneration');
// // const authRouter = require('./routes/auth');
// // app.use('/api/users', authRouter);
// app.use('/api/defaultvalues', defaultvalues);
// app.use('/api/backendparameter', backendparameter);
// app.use('/api/futhergeneration', futhergeneration);

// app.use(express.static("./public"));

// // Error handling middleware
// // app.use(errorHandlers.notFound);

// if (app.get('env') === 'development') {
//     app.use(errorHandlers.developmentErrors);
// }

// app.use(errorHandlers.productionErrors);
// // Start the server
// const server = app.listen(SERVERPORT, () => {
//     console.log(`Express running → On PORT ${server.address().port}`);
// });]

const express = require("express");
const app = express();
const port = 3001;
const axios = require("axios");
const cors = require("cors");

app.use(cors());

app.get("/api/finviz", async (req, res) => {
  console.log("ss")
  try {
    const response = await axios.get("https://finviz.com/screener.ashx?v=111");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching Finviz data:", error);
    res.status(500).send("Failed to fetch data"); // Send error response
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
