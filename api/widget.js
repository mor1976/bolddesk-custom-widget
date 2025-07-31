export default function handler(req, res) {
  const { email } = req.query;

  res.setHeader("Content-Type", "text/html");
  res.send(`
    <html>
      <head>
        <title>BoldDesk Widget</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
        </style>
      </head>
      <body>
        <h3>📩 מידע על לקוח</h3>
        <p>כתובת מייל: <strong>${email || "לא התקבל"}</strong></p>
        <p>כאן ניתן להוסיף קריאה ל-API של Hudu, CRM או בסיס נתונים</p>
      </body>
    </html>
  `);
}
