const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).send("Method Not Allowed");

  const { product, description, audience, platform, tone } = req.body || {};

  const prompt = `
你是台灣市場的文案生成器 CopyEngine。
請依以下資訊生成高品質行銷文案：

產品名稱：${product}
產品描述：${description}
目標客群：${audience}
使用平台：${platform}
語氣：${tone}

請給我：
1. 三個 Hook
2. 一段短文案（ < 60 字）
3. 一段長文案（100–250 字）
4. CTA
5. 10 個 Hashtag
`;

  const ENDPOINT = process.env.GEMINI_API_ENDPOINT;
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    const resp = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        max_output_tokens: 800,
      }),
    });

    const json = await resp.json();
    const text =
      json.output?.[0]?.content?.[0]?.text ||
      json.result ||
      JSON.stringify(json);

    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
