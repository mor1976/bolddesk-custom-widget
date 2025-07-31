const fetch = require("node-fetch");

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
    res.status(400).send("<h3>שגיאה</h3><p>לא התקבלה כתובת מייל מהטיקט</p>");
    return;
  }

  try {
    const response = await fetch(`${HUDU_BASE_URL}/api/v1/people/search?email=${email}`, {
      method: "GET",
      headers: {
        "X-API-KEY": HUDU_API_KEY,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Hudu API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      res.send(`<h3>לא נמצאו אנשים</h3><p>עבור המייל: ${email}</p>`);
      return;
    }

    const person = data[0];
    res.send(`
      <h3>נמצא משתמש</h3>
      <p>שם: ${person.name}</p>
      <p>מייל: ${person.email}</p>
      <p>חברה: ${person.company_name}</p>
      <p>תפקיד: ${person.job_title || "לא צויין"}</p>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("<h3>שגיאה בשרת</h3><p>בדוק את הלוגים או את הגדרות ה־API</p>");
  }
};
