export default async function handler(req, res) {
  // Allow preflight and POST
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Answer the preflight check
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const data = req.body || {};
  // Print it so it shows in the Vercel Logs
  console.log("GRAB:", JSON.stringify(data));
  
  res.status(204).end();
}
