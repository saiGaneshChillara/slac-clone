export const protectRoute = (req, res, next) => {
  if (!req.auth().isAuthenticated) {
    return res.status(404).json({
      message: "Unauthorized - user not logged in",
    });
  }

  next();
};