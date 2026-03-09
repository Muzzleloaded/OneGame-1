import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { action, data } = req.body;

    if (action === "create_session") {
      const { error } = await supabase.from("sessions").insert({
        id: data.session_id,
        consent_messages: data.consent_messages || false,
      });
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    if (action === "update_session") {
      const { session_id, ...updates } = data;
      updates.last_activity = new Date().toISOString();
      const { error } = await supabase
        .from("sessions")
        .update(updates)
        .eq("id", session_id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    if (action === "track_event") {
      const { error } = await supabase.from("events").insert({
        session_id: data.session_id,
        event_type: data.event_type,
        screen: data.screen,
        event_data: data.event_data || {},
      });
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    if (action === "track_message") {
      const { error } = await supabase.from("messages").insert({
        session_id: data.session_id,
        role: data.role,
        content: data.content,
        message_index: data.message_index,
      });
      if (error) throw error;
      await supabase
        .from("sessions")
        .update({
          message_count: data.message_index + 1,
          last_activity: new Date().toISOString(),
        })
        .eq("id", data.session_id);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (error) {
    console.error("Track error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
