document.getElementById("generate").addEventListener("click", async () => {
  const product = document.getElementById("product").value;
  const description = document.getElementById("description").value;
  const audience = document.getElementById("audience").value;
  const platform = document.getElementById("platform").value;
  const tone = document.getElementById("tone").value;

  document.getElementById("output").innerText = "生成中…";

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product, description, audience, platform, tone }),
  });

  const data = await res.json();
  document.getElementById("output").innerText = data.text || data.error;
});
