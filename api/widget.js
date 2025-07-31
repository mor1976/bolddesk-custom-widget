export const config = {
  api: {
    bodyParser: true,
  },
};

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html");

  try {
    const body = req.body;

    res.status(200).send(`
      <h3>BoldDesk Widget Debug</h3>
      <p>קיבלנו את הפנייה בהצלחה.</p>
      <pre>${JSON.stringify(body, null, 2)}</pre>
    `);
  } catch (err) {
    res.status(500).send(`<h3>שגיאה בשרת:</h3><pre>${err.message}</pre>`);
  }
};
