const fetch = require('node-fetch');  // ← הוספה חשובה

export const config = {
  api: {
    bodyParser: true,
  },
};

module.exports = async (req, res) => {
  const HUDU_API_KEY = "🔑 כאן שים את המפתח שלך";
  const HUDU_BASE_URL = "https://get-mor.huducloud.com";

  const email = req.body?.ticket?.requester?.email;

  res.setHeader("Content-Type", "text/html");

  if (!email) {
    res.status(400).send("<h3>לא נמצא אימייל בטיקט</h3>");
    return;
  }

  try {
    const response = await fetch(`${HUDU_BASE_URL}/api/v1/people/search?query=${email}`, {
      method: "GET",
      headers: {
        "X-API-KEY": HUDU_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Hudu API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      res.send(`<h3>לא נמצא משתמש עבור</h3><p>${email}</p>`);
      return;
    }

    const person = data[0];
    res.send(`<h3>נמצא משתמש</h3><p>${person.name} - ${person.email}</p>`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`<h3>שגיאה בשרת</h3><p>${err.message}</p>`);
  }
};
