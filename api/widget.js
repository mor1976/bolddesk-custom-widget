export const config = {
  api: {
    bodyParser: true,
  },
};

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html");

  const email = req.body?.ticket?.requester?.email;

  if (!email) {
    res.status(400).send(`<h3>שגיאה</h3><p>לא התקבלה כתובת מייל מהטיקט</p><pre>${JSON.stringify(req.body, null, 2)}</pre>`);
    return;
  }

  res.send(`<h3>האימייל שהתקבל:</h3><p>${email}</p>`);
};
