const crypto = require('crypto');
const db = require('../config/db');

exports.dashboard = (req, res) => {
  const userId = req.query.id;
  db.query(`
    SELECT User.*, ApiKey.key, ApiKey.out_of_date
    FROM User LEFT JOIN ApiKey ON User.api_key_id = ApiKey.id
    WHERE User.id = ?`, [userId], (err, result) => {
      if (err) throw err;
      res.render('dashboard_user', { user: result[0] });
  });
};

exports.createApiKey = (req, res) => {
  const userId = req.body.userId;
  const apiKey = crypto.randomBytes(16).toString('hex');
  const outOfDate = new Date();
  outOfDate.setMonth(outOfDate.getMonth() + 1);

  db.query('INSERT INTO ApiKey (`key`, out_of_date) VALUES (?, ?)', [apiKey, outOfDate], (err, result) => {
    if (err) throw err;
    const apiKeyId = result.insertId;
    db.query('UPDATE User SET api_key_id = ? WHERE id = ?', [apiKeyId, userId], (err2) => {
      if (err2) throw err2;
      res.redirect(`/user/dashboard?id=${userId}`);
    });
  });
};
