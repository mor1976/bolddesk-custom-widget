export const config = {
  api: {
    bodyParser: true,
  },
};

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="he">
    <head>
      <meta charset="UTF-8">
      <title>Widget</title>
    </head>
    <body>
      <h2>הכל עובד 🎉</h2>
      <p>זוהי תגובה בסיסית מתוך האפליקציה</p>
    </body>
    </html>
  `);
};
