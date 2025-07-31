export const config = {
  api: {
    bodyParser: true,
  },
};

module.exports = async (req, res) => {
  const HUDU_API_KEY = "gAhGLUAioZb6Dbvk1FA6fgHD";
  const HUDU_BASE_URL = "https://get-mor.huducloud.com";

  const email = req.body?.ticket?.requester?.email;
  res.setHeader("Content-Type", "text/html");

  if (!email) {
    res.status(400).send(`<h3>שגיאה</h3><p>לא התקבלה כתוב
