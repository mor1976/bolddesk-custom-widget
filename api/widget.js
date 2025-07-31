export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  const HUDU_API_KEY = "gAhGLUAioZb6Dbvk1FA6fgHD";
  const HUDU_BASE_URL = "https://get-mor.huducloud.com";

  const email = req.body?.ticket?.requester?.email;

  res.setHeader("Content-Type", "text/html");

  if (!email) {
    res.status(400).send(`<h3>שגיאה</h3><p>לא התקבלה כתובת מייל מהטיקט.</p>`);
    return;
  }

  try {
    const contactRes = await fetch(`${HUDU_BASE_URL}/api/v1/contacts/search?email=${email}`, {
      headers: { "x-api-key": HUDU_API_KEY }
    });
    const contact = await contactRes.json();

    if (!contact?.id) {
      res.status(404).send(`<h3>לא נמצא משתמש</h3><p>לא נמצא איש קשר עם המייל: ${email}</p>`);
      return;
    }

    const assetsRes = await fetch(`${HUDU_BASE_URL}/api/v1/assets?contact_id=${contact.id}`, {
      headers: { "x-api-key": HUDU_API_KEY }
    });
    const assets = await assetsRes.json();
    const peopleAssets = assets.filter(asset => asset.asset_layout_name === "People");

    let html = `
      <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 10px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { padding: 8px; border: 1px solid #ccc; }
        </style>
      </head>
      <body>
        <h2>נכסים עבור ${email}</h2>
    `;

    if (peopleAssets.length === 0) {
      html += `<p>לא נמצאו נכסים מסוג People</p>`;
    } else {
      html += `<table><tr><th>שם</th><th>קישור</th></tr>`;
      peopleAssets.forEach(asset => {
        html += `<tr><td>${asset.name}</td><td><a href="${HUDU_BASE_URL}/a/${asset.asset_layout_name.toLowerCase()}/${asset.id}" target="_blank">פתח</a></td></tr>`;
      });
      html += `</table>`;
    }

    html += `</body></html>`;
    res.send(html);

  } catch (e) {
    res.status(500).send(`<h3>שגיאה</h3><p>${e.message}</p>`);
  }
}
