// Admin authorization middleware using header x-admin-key
export const requireAdmin = (req, res, next) => {
  const clientKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_KEY || 'admin123';

  if (!clientKey || clientKey !== expectedKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Admin authentication key required'
    });
  }

  next();
};
