const HUDU_API_KEY = "VKdnHFjpJQvZNsNQyvxi4F6";
const HUDU_BASE_URL = "https://get-mor.huducloud.com";

module.exports = async function handler(req, res) {
  try {
    const email = req.body?.ticket?.requester?.email;

    res.setHeader("Content-Type", "text/html");

    if (!email) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
          <body style="font-family:Arial; color:red; padding:20px;">
            <h2>⚠️ לא נמצא אימייל בטיקט</h2>
            <p>המשתמש כנראה פתח קריאה ללא אימייל תקין</p>
          </body>
        </html>
      `);
    }

    const response = await fetch(`${HUDU_BASE_URL}/api/v1/people/search?query=${email}`, {
      method: "GET",
      headers: {
        "X-API-KEY": HUDU_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Hudu API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return res.send(`
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
          <body style="font-family:Arial; padding:20px;">
            <h2>😕 לא נמצאה התאמה</h2>
            <p>לא נמצאו משתמשים עבור האימייל: <b>${email}</b></p>
          </body>
        </html>
      `);
    }

    const person = data[0];
    const name = person.name || "ללא שם";
    const phone = person.phone || "לא צויין";
    const title = person.title || "לא צויין";

    return res.send(`
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
        <body style="font-family:Arial; padding:20px;">
          <h2>👤 פרטי איש קשר</h2>
          <p><b>שם:</b> ${name}</p>
          <p><b>טלפון:</b> ${phone}</p>
          <p><b>תפקיד:</b> ${title}</p>
        </body>
      </html>
    `);

  } catch (error) {
    console.error("שגיאה:", error);

    return res.status(500).send(`
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
        <body style="font-family:Arial; color:red; padding:20px;">
          <h2>❌ שגיאת שרת</h2>
          <p>התרחשה שגיאה פנימית: ${error.message}</p>
        </body>
      </html>
    `);
  }
};
