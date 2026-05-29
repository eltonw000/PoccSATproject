export default async function handler(req, res) {
  try {
    const query = new URLSearchParams({
      ...req.query,
      api_key: process.env.SERPAPI_KEY,
    });

    const response = await fetch(
      `https://serpapi.com/search?${query}`
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}