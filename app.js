const AFFILIATE_DEFAULT = "YOURTAG-20";

async function loadProducts() {
  const res = await fetch("products.json");
  const data = await res.json();
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";
  data.products.forEach(p => {
    const aTag = p.link.includes("amazon") ? p.link + "?tag=" + (localStorage.getItem("affiliate") || AFFILIATE_DEFAULT) : p.link;
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<img src="${p.image}" alt="${p.name}"><h3>${p.name}</h3><a href="${aTag}" target="_blank">Buy</a>`;
    grid.appendChild(div);
  });
}

async function loadKits() {
  const res = await fetch("products.json");
  const data = await res.json();
  const kits = document.getElementById("kits");
  data.kits.forEach(kit => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${kit.name}</h3><ul>${kit.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    kits.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadKits();
  document.getElementById("search").addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll("#products-grid .card").forEach(c => {
      c.style.display = c.innerText.toLowerCase().includes(term) ? "" : "none";
    });
  });
});