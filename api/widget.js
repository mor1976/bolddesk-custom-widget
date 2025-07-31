export const config = {
  api: {
    bodyParser: true,
  },
};

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html");

  const body = req.body;

  res.send(`
    <h3>Payload שהתקבל מהטיקט:</h3>
    <pre>${JSON.stringify(body, null, 2)}</pre>
  `);
};
