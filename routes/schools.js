const express = require('express');
const router = express.Router();
const createConnection = require('../config/db');

router.post('/addSchool', async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const connection = await createConnection();
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(sql, [name, address, latitude, longitude]);
    await connection.end();

    res.json({ message: 'School added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/listSchools', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Please provide latitude and longitude query parameters' });
  }

  try {
    const connection = await createConnection();
    const [schools] = await connection.query('SELECT * FROM schools');
    await connection.end();

    function getDistance(lat1, lon1, lat2, lon2) {
      const toRad = (x) => (x * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    schools.sort((a, b) => {
      const distA = getDistance(latitude, longitude, a.latitude, a.longitude);
      const distB = getDistance(latitude, longitude, b.latitude, b.longitude);
      return distA - distB;
    });

    res.json(schools);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

module.exports = router;