import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password, session_id } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const [messagesRes, eventsRes] = await Promise.all([
      supabase
        .from("messages")
        .select("*")
        .eq("session_id", session_id)
        .order("message_index", { ascending: true }),
      supabase
        .from("events")
        .select("*")
        .eq("session_id", session_id)
        .order("created_at", { ascending: true }),
    ]);

    return res.status(200).json({
      messages: messagesRes.data || [],
      events: eventsRes.data || [],
    });
  } catch (error) {
    console.error("Messages error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
