export const config = {
  api: {
    bodyParser: true,
  },
};

module.exports = async (req, res) => {
  const body = req.body;

  res.setHeader("Content-Type", "text/html");

  // בדיקה בסיסית להצגת כל הנתונים שנשלחו מהטיקט
  res.send(`
    <h3>Payload שהתקבל מהטיקט:</h3>
    <pre>${JSON.stringify(body, null, 2)}</pre>
  `);
};
