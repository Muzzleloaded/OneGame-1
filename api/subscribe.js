export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = "9187753";

  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const response = await fetch(
      "https://api.convertkit.com/v3/forms/" + formId + "/subscribe",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          email: email,
          first_name: name || "",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

6. Commit

**Task 2: Update `vercel.json`**

1. Click on `vercel.json` in your repo
2. Click the pencil to edit
3. Add this line after the `kit-test` line:
```
{ "source": "/api/subscribe", "destination": "/api/subscribe" },
