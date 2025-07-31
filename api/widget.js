module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  console.log("BODY:", req.body); // אפשר גם למחוק את זה אחרי הדיבוג

  // בדיקה בסיסית:
  if (!req.body || !req.body.ticket || !req.body.ticket.requester || !req.body.ticket.requester.email) {
    res.status(400).json({ error: "Missing requester email", body: req.body });
    return;
  }

  const email = req.body.ticket.requester.email;

  res.status(200).send(`<h3>האימייל שהתקבל:</h3><p>${email}</p>`);
};
