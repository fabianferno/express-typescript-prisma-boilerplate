import * as jwks from "jwks-rsa";
import * as jwt from "express-jwt";

var jwtAuthCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${
      process.env.AUTH0_ISSUER_BASE_URL // "https://fabianferno.us.auth0.com/"
    }.well-known/jwks.json`,
  }),
  audience: process.env.APP_BASE_URL, // "http://localhost:5000",
  issuer: process.env.AUTH0_ISSUER_BASE_URL, // "https://fabianferno.us.auth0.com/",
  algorithms: ["RS256"],
});

export default jwtAuthCheck;
