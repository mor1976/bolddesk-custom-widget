export default async function handler(req, res) {
  try {
    const HUDU_API_KEY = "XYZ";
    const HUDU_BASE_URL = "https://...";

    console.log("📩 Payload שהתקבל:", JSON.stringify(req.body, null, 2));

    const email = req.body?.ticket?.requester?.email;
    if (!email) {
      res.status(400).send("<h2>⚠️ לא נמצא אימייל בטיקט</h2>");
      return;
    }

    // כאן תבצע את הפנייה ל-Hudu (fetch)
    const huduRes = await fetch(`${HUDU_BASE_URL}/api/v1/people/search?email=${email}`, {
      headers: {
        "x-api-key": HUDU_API_KEY,
        "Content-Type": "application/json"
      }
    });

    const people = await huduRes.json();
    res.setHeader("Content-Type", "text/html");
    res.send(`<h2>נמצאו ${people.length} תוצאות</h2>`);

  } catch (err) {
    console.error("🔥 שגיאה:", err);
    res.status(500).send(`<pre>שגיאה פנימית: ${err.message}</pre>`);
  }
}
