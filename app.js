const AFFILIATE_DEFAULT = "YOURTAG-20";

// Sample product data with branding
const sampleData = {
  "kits": [
    {
      "name": "🌟 Beginner's Magic Kit",
      "items": [
        "Magic Detangling Brush",
        "Gentle Shampoo & Conditioner",
        "Rainbow Hair Clips Set",
        "Leave-in Conditioner Spray"
      ],
      "description": "Perfect starter kit for kids new to hair styling!",
      "badge": "My Pick!"
    },
    {
      "name": "✨ Styling Pro Kit",
      "items": [
        "Kids Curl Cream",
        "Heat Protectant Spray",
        "Silk Hair Scrunchies",
        "Volumizing Mousse"
      ],
      "description": "Everything you need for amazing hairstyles!",
      "badge": "Popular"
    },
    {
      "name": "💖 Complete Care Kit",
      "items": [
        "Professional Hair Dryer",
        "Mini Hair Straightener",
        "Fun Hair Chalk Set",
        "Sparkle Hair Ties"
      ],
      "description": "The ultimate hair care and styling collection!",
      "badge": "Best Value"
    }
  ],
  "products": [
    {
      "name": "Magic Detangling Brush",
      "image": "https://via.placeholder.com/200x200/FF6B3D/FFFFFF?text=🪄+Brush",
      "link": "https://amazon.com/dp/example1",
      "category": "Hair Tools",
      "badge": "My Pick!",
      "rating": "4.8",
      "reviews": "1247"
    },
    {
      "name": "Rainbow Hair Clips Set",
      "image": "https://via.placeholder.com/200x200/C44569/FFFFFF?text=🌈+Clips",
      "link": "https://amazon.com/dp/example2",
      "category": "Accessories",
      "badge": "My Pick!",
      "rating": "4.7",
      "reviews": "892"
    },
    {
      "name": "Kids Curl Cream",
      "image": "https://via.placeholder.com/200x200/00D2D3/FFFFFF?text=🌀+Cream",
      "link": "https://amazon.com/dp/example3",
      "category": "Styling Products",
      "badge": "My Pick!",
      "rating": "4.9",
      "reviews": "1156"
    },
    {
      "name": "Gentle Shampoo & Conditioner Set",
      "image": "https://via.placeholder.com/200x200/F3B500/FFFFFF?text=🧴+Set",
      "link": "https://amazon.com/dp/example4",
      "category": "Hair Care",
      "badge": "My Pick!",
      "rating": "4.8",
      "reviews": "2341"
    },
    {
      "name": "Silk Hair Scrunchies",
      "image": "https://via.placeholder.com/200x200/FF6B3D/FFFFFF?text=🎀+Silk",
      "link": "https://amazon.com/dp/example5",
      "category": "Accessories",
      "badge": "My Pick!",
      "rating": "4.7",
      "reviews": "789"
    },
    {
      "name": "Heat Protectant Spray",
      "image": "https://via.placeholder.com/200x200/C44569/FFFFFF?text=🛡️+Spray",
      "link": "https://amazon.com/dp/example6",
      "category": "Hair Care",
      "badge": "My Pick!",
      "rating": "4.6",
      "reviews": "1034"
    }
  ]
};

async function loadProducts() {
  try {
    // Try to load from products.json, fallback to sample data
    let data;
    try {
      const res = await fetch("products.json");
      data = await res.json();
    } catch (e) {
      console.log("Using sample data");
      data = sampleData;
    }
    
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";
    
    data.products.forEach(p => {
      const aTag = p.link.includes("amazon") ? 
        p.link + "?tag=" + (localStorage.getItem("affiliate") || AFFILIATE_DEFAULT) : 
        p.link;
      
      const div = document.createElement("div");
      div.className = "card";
      
      const badgeHtml = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';
      const ratingHtml = p.rating ? `
        <div class="product-rating">
          <span class="stars">${'⭐'.repeat(Math.floor(p.rating))}</span>
          <span class="rating-text">${p.rating} (${p.reviews} reviews)</span>
        </div>
      ` : '';
      
      div.innerHTML = `
        ${badgeHtml}
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/200x200/FF6B3D/FFFFFF?text=🎨+Product'">
        <h3>${p.name}</h3>
        ${ratingHtml}
        <a href="${aTag}" target="_blank" rel="noopener">Get This Product! ✨</a>
      `;
      
      grid.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

async function loadKits() {
  try {
    let data;
    try {
      const res = await fetch("products.json");
      data = await res.json();
    } catch (e) {
      console.log("Using sample data for kits");
      data = sampleData;
    }
    
    const kits = document.getElementById("kits");
    kits.innerHTML = "";
    
    data.kits.forEach(kit => {
      const div = document.createElement("div");
      div.className = "card";
      
      const badgeHtml = kit.badge ? `<div class="product-badge">${kit.badge}</div>` : '';
      const descriptionHtml = kit.description ? `<p class="kit-description">${kit.description}</p>` : '';
      
      div.innerHTML = `
        ${badgeHtml}
        <h3>${kit.name}</h3>
        ${descriptionHtml}
        <ul class="kit-items">${kit.items.map(i => `<li>✨ ${i}</li>`).join("")}</ul>
        <button class="kit-button">Explore These Products 🌟</button>
      `;
      
      kits.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading kits:", error);
  }
}

// Add some interactive features
function addInteractivity() {
  // Add sparkle effect on button hover
  document.addEventListener('mouseover', (e) => {
    if (e.target.matches('button, .btn-primary, .btn-secondary, .card a')) {
      createSparkle(e.target);
    }
  });
  
  // Smooth scrolling for internal links
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

function createSparkle(element) {
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.fontSize = '1rem';
  sparkle.style.zIndex = '1000';
  sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
  
  const rect = element.getBoundingClientRect();
  sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
  sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

// Add CSS for sparkle animation
const sparkleCSS = `
  @keyframes sparkleFloat {
    0% {
      opacity: 1;
      transform: translateY(0) scale(0.5);
    }
    100% {
      opacity: 0;
      transform: translateY(-30px) scale(1);
    }
  }
  
  .product-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: linear-gradient(45deg, #F3B500, #FFD700);
    color: #333;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(243, 181, 0, 0.4);
    z-index: 10;
  }
  
  .product-rating {
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }
  
  .stars {
    margin-right: 0.5rem;
  }
  
  .rating-text {
    color: #666;
  }
  
  .kit-description {
    color: #666;
    font-style: italic;
    margin: 0.5rem 0;
  }
  
  .kit-items {
    text-align: left;
    margin: 1rem 0;
    padding-left: 1rem;
  }
  
  .kit-items li {
    margin: 0.3rem 0;
    color: #C44569;
  }
  
  .kit-button {
    background: linear-gradient(45deg, #00D2D3, #40E0D0);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .kit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 210, 211, 0.4);
  }
`;

// Add the CSS to the page
const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadKits();
  addInteractivity();
  
  // Enhanced search functionality
  document.getElementById("search").addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll("#products-grid .card").forEach(c => {
      const text = c.innerText.toLowerCase();
      const isVisible = text.includes(term);
      c.style.display = isVisible ? "" : "none";
      
      // Add a subtle animation when showing/hiding
      if (isVisible) {
        c.style.animation = "fadeIn 0.3s ease-in";
      }
    });
  });
  
  // Add fade-in animation
  const fadeInCSS = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  
  const fadeStyle = document.createElement('style');
  fadeStyle.textContent = fadeInCSS;
  document.head.appendChild(fadeStyle);
});

