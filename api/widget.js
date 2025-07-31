export default async function handler(req, res) {
  const email = req.query.email;
  const HUDU_API_KEY = "gAhGLUAioZb6Dbvk1FA6fgHD";
  const HUDU_BASE_URL = "https://get-mor.huducloud.com";

  res.setHeader("Content-Type", "text/html");

  if (!email) {
    res.status(400).send(`<h3>שגיאה</h3><p>לא סופק מייל.</p>`);
    return;
  }

  try {
    // שלב 1: חיפוש משתמש לפי אימייל
    const contactResp = await fetch(`${HUDU_BASE_URL}/api/v1/contacts/search?email=${email}`, {
      headers: { "x-api-key": HUDU_API_KEY }
    });

    const contact = await contactResp.json();
    if (!contact || !contact.id) {
      res.status(404).send(`<h3>לא נמצא משתמש</h3><p>לא נמצא איש קשר עם המייל: ${email}</p>`);
      return;
    }

    // שלב 2: שליפת הנכסים של אותו contact
    const assetsResp = await fetch(`${HUDU_BASE_URL}/api/v1/assets?contact_id=${contact.id}`, {
      headers: { "x-api-key": HUDU_API_KEY }
    });

    const assets = await assetsResp.json();
    const peopleAssets = assets.filter(asset => asset.asset_layout_name === "People");

    // שלב 3: הצגת הנכסים
    let html = `
      <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 10px; }
          h2 { margin-top: 0; }
          table { border-collapse: collapse; width: 100%; }
          th, td { pa
