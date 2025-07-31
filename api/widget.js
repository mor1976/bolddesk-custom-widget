export const config = {
  api: {
    bodyParser: true,
  },
};

module.exports = async (req, res) => {
  const HUDU_API_KEY = "הכנס כאן את המפתח שלך";
  const HUDU_BASE_URL = "https://get-mor.huducloud.com";

  const email = req.body?.ticket?.requester?.email;

  if (!email) {
    res.status(400).send("<h3>לא התקבלה כתובת מייל</h3>");
    return;
  }

  try {
    const response = await fetch(`${HUDU_BASE_URL}/api/v1/people/search?query=${email}`, {
      method: "GET",
      headers: {
        "x-api-key": HUDU_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Hudu API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      res.send(`<h3>לא נמצאו אנשים עבור המייל:</h3><p>${email}</p>`);
      return;
    }

    const person = data[0];
    res.send(`
      <h3>מידע שנמצא עבור ${email}:</h3>
