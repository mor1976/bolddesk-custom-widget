export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  const HUDU_API_KEY = "VKdnhF1jpJQVzWSNqVyxi4F6";
  const HUDU_BASE_URL = "https://get-mor.huducloud.com";

  console.log("📦 Payload שהתקבל:", JSON.stringify(req.body, null, 2));

  const email = req.body?.ticket?.requester?.email;

  res.setHeader("Content-Type", "text/html");

  if (!email) {
    res.status(400).send(`
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
        <body style="font-family:Arial; color:red; padding:20px;">
          <h2>⚠️ לא נמצא אימייל בטיקט</h2>
          <p>לא ניתן לחפש משתמש ללא אימייל.</p>
        </body>
      </html>
    `);
    return;
  }

  try {
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

    if (data.length === 0) {
      res.send(`
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
          <body style="font-family:Arial; padding:20px;">
            <h2>🙁 משתמש לא נמצא</h2>
            <p>לא נמצאה תוצאה עבור: <b>${email}</b></p>
          </body>
        </html>
      `);
      return;
    }

    const person = data[0];

    res.send(`
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
        <head>
          <meta charset="UTF-8" />
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { color: green; }
            .field { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h2>✅ משתמש נמצא</h2>
          <div class="field"><strong>שם:</strong> ${person.name}</div>
          <div class="field"><strong>אימייל:</strong> ${person.email}</div>
          ${person.phone ? `<div class="field"><strong>טלפון:</strong> ${person.phone}</div>` : ""}
        </body>
      </html>
    `);

  } catch (err) {
    console.error("❌ שגיאה:", err.message);
    res.status(500).send(`
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
        <body style="font-family:Arial; color:red; padding:20px;">
          <h2>❌ שגיאה פנימית</h2>
          <p>${err.message}</p>
        </body>
      </html>
    `);
  }
}
