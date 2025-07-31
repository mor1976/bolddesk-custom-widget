export const config = {
  api: {
    bodyParser: true,
  },
};

module.exports = async (req, res) => {
  const HUDU_API_KEY = "gAhGLUAioZb6Dbvk1FA6gFHD";
  const HUDU_BASE_URL = "https://get-mor.huducloud.com";

  const email = req.body?.ticket?.requester?.email;

  if (!email) {
    res.status(400).send(`<h3>שגיאה</h3><p>לא הוזן אימייל תקין</p>`);
    return;
  }

  // שליפת כל האנשים
  const response = await fetch(`${HUDU_BASE_URL}/api/v1/people`, {
    headers: {
      'x-api-key': HUDU_API_KEY,
      'Accept': 'application/json'
    }
  });

  const people = await response.json();

  // סינון לפי כתובת מייל
  const person = people.find(p => p.email?.toLowerCase() === email.toLowerCase());

  if (!person) {
    res.send(`<h3>לא נמצא משתמש עם כתובת:</h3><p>${email}</p>`);
    return;
  }

  res.send(`
    <h3>פרטי משתמש</h3>
    <ul>
      <li>שם: ${person.name}</li>
      <li>טלפון: ${person.phone}</li>
      <li>מייל: ${person.email}</li>
      <li>חברה: ${person.company_name}</li>
    </ul>
  `);
};
