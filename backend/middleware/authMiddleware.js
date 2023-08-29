// Require and setup Webtoken for authentication
const jwt = require("jsonwebtoken");

// Create "Authorize" function
function authorize(req, res, next) {
  console.log("authorizing...");

  try {
    // Look for token in Authorization header
    let token = req.header("Authorization");

    // If (not/no) token, then do this
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    // check the token in the console
    console.log(token);

    // cleanup token string
    token = token.replace("Bearer ", "");

    // Check token validity
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log(payload);

    // If payload.error has a value (evaluates to truthy so the function will run) display error
    if (payload.error) {
      return res.status(403).json({ error: payload.error });
    }

    // Attach payload from token to the req (requested object)

    req.id = payload.id;
    req.username = payload.username;

    // Continue to the next step in the route

    next();
  } catch (err) {
    console.log(err.message);
    res.status(403).json({ error: err.message });
  }
}

// Export module
module.exports = {
  authorize,
};
