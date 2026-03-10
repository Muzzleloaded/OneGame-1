export default async function handler(req, res) {
  const apiKey = process.env.KIT_API_KEY;
  
  try {
    const response = await fetch(
      "https://api.convertkit.com/v3/forms?api_key=" + apiKey
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
