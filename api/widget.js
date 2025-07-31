const HUDU_API_KEY = "VKdnHFjpJQvZNsNQyvxi4F6";
const HUDU_BASE_URL = "https://get-mor.huducloud.com";

// אם אתה צריך fetch: זה מביא את fetch גם בסביבת Node
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async function (req, res) {
  try {
    const email = req.body?.ticket?.requester?.email;
    res.setHeader("Content-Type", "text/html");

    if (!email) {
      return res.status(400).send(`
        <html dir="rtl"><body>
          <h2>⚠️ לא נמצא אימייל</h2>
        </body></html>
      `);
    }

    const response = await fetch(`${HUDU_BASE_URL}/api/v1/people/search?query=${email}`, {
      method: "GET",
      headers: {
        "X-API-KEY": HUDU_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    if (!response.ok) throw new Error(`Hudu API Error: ${response.status}`);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return res.send(`
        <html dir="rtl"><body>
          <h2>😕 ל
