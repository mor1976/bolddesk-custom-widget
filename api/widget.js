export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  const HUDU_API_KEY = "🔑 פה שים את המפתח שלך";
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
        "Accept": "application/json",
