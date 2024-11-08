import jwt from 'jsonwebtoken';
const { verify } = jwt;
const authorizationRequired = "Authorization required";
const invalidCredentials = "Invalid credentials";

const auth = (req, res, next) => {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
        res.statusMessage = authorizationRequired;
        return res.status(401).json({ message: authorizationRequired });
    }

    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1]; // Assuming "Bearer <token>"
        
        if (!token) {
            return res.status(401).json({ message: authorizationRequired });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.statusMessage = invalidCredentials;
                return res.status(403).json({ message: invalidCredentials });
            }
            // Attach the decoded user data to the request object
            req.user = decoded;
            next(); // Proceed to the next middleware or route handler
        });
    } catch (err) {
        res.statusMessage = invalidCredentials;
        return res.status(403).json({ message: invalidCredentials });
    }
};

export { auth };