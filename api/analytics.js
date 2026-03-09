import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password, range } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const days =
      range === "24h" ? 1 : range === "7d" ? 7 : range === "30d" ? 30 : 3650;
    const fromDate = new Date(Date.now() - days * 86400000).toISOString();

    const [sessionsRes, eventsRes] = await Promise.all([
      supabase
        .from("sessions")
        .select("*")
        .gte("created_at", fromDate)
        .order("created_at", { ascending: false })
        .limit(500),
      supabase
        .from("events")
        .select("*")
        .gte("created_at", fromDate)
        .order("created_at", { ascending: false })
        .limit(5000),
    ]);

    return res.status(200).json({
      sessions: sessionsRes.data || [],
      events: eventsRes.data || [],
    });
  } catch (error) {
    console.error("Analytics error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
