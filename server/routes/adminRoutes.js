import express from 'express';

const router = express.Router();

// Verify admin passcode
router.post('/verify', (req, res) => {
  const { key } = req.body;
  const headerKey = req.headers['x-admin-key'];
  const passToTest = key || headerKey;
  const expectedKey = process.env.ADMIN_KEY || 'admin123';

  if (passToTest && passToTest === expectedKey) {
    return res.json({
      success: true,
      message: 'Admin access verified'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid admin passcode'
  });
});

export default router;
