// Mock Data for Products
const productsData = [
    {
        id: 1,
        title: "Apple iPhone 15 Pro (256GB) - Natural Titanium",
        category: "mobile",
        image: "https://www.apple.com/in/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/",
        prices: {
            amazon: { price: 119900, link: "#" },
            flipkart: { price: 120990, link: "#" },
            croma: { price: 118990, link: "#" }
        }
    },
    {
        id: 2,
        title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 512GB)",
        category: "mobile",
        image: "https://m.media-amazon.com/images/I/71CXhVhpM0L._SX679_.jpg",
        prices: {
            amazon: { price: 139999, link: "#" },
            flipkart: { price: 139999, link: "#" },
            croma: { price: 141000, link: "#" }
        }
    },
    {
        id: 3,
        title: "MacBook Air M2 (16GB RAM, 512GB SSD)",
        category: "laptop",
        image: "https://m.media-amazon.com/images/I/41gS7SS9hSL._SY300_SX300_QL70_FMwebp_.jpg",
        prices: {
            amazon: { price: 124900, link: "#" },
            flipkart: { price: 121990, link: "https://dl.flipkart.com/s/0TYWg0NNNN" },
            croma: { price: 125000, link: "#" }
        }
    },
    {
        id: 4,
        title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        category: "headphones",
        image: "https://m.media-amazon.com/images/I/61vJtKbAssL._SX679_.jpg",
        prices: {
            amazon: { price: 29990, link: "#" },
            flipkart: { price: 31990, link: "#" },
            croma: { price: 29500, link: "#" }
        }
    },
    {
        id: 5,
        title: "Dell XPS 15 9530 (13th Gen Core i7, 16GB, 1TB SSD)",
        category: "laptop",
        image: "https://m.media-amazon.com/images/I/519vo9n4S7L._SY300_SX300_QL70_FMwebp_.jpg",
        prices: {
            amazon: { price: 215000, link: "https://amzn.in/d/02MDyb6E" },
            flipkart: { price: 218000, link: "#" },
            croma: { price: 214500, link: "#" }
        }
    },
    {
        id: 6,
        title: "Sony Alpha ILCE-7M4 Full-Frame Mirrorless Camera",
        category: "camera",
        image: "https://m.media-amazon.com/images/I/71dBB+T7p9L._SX679_.jpg",
        prices: {
            amazon: { price: 204990, link: "#" },
            flipkart: { price: 206990, link: "#" },
            croma: { price: 205000, link: "#" }
        }
    },
    {
        id: 7,
        title: "GoPro HERO12 Black Action Camera",
        category: "camera",
        image: "https://m.media-amazon.com/images/I/61I2119n+tL._SX679_.jpg",
        prices: {
            amazon: { price: 34990, link: "#" },
            flipkart: { price: 34500, link: "#" },
            croma: { price: 35000, link: "#" }
        }
    },
    {
        id: 8,
        title: "Bose QuietComfort Ultra Wireless Earbuds",
        category: "headphones",
        image: "https://m.media-amazon.com/images/I/51e3y3UWeeL._SX679_.jpg",
        prices: {
            amazon: { price: 25900, link: "#" },
            flipkart: { price: 26500, link: "#" },
            croma: { price: 25900, link: "#" }
        }
    }
];

// Utility function to format price as INR
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
};

// Function to get the best price details
const getBestPrice = (prices) => {
    let bestStore = '';
    let lowestPrice = Infinity;

    for (const [store, data] of Object.entries(prices)) {
        if (data.price < lowestPrice) {
            lowestPrice = data.price;
            bestStore = store;
        }
    }

    return { store: bestStore, price: lowestPrice };
};

// Function to calculate a mock "original price" to show a discount
const getOriginalPrice = (bestPrice) => {
    // Add 10-20% to create a fake original price for the UI
    const multiplier = 1 + (Math.random() * 0.1 + 0.1);
    return Math.round(bestPrice * multiplier);
};

// Map store names to FontAwesome icons
const storeIcons = {
    amazon: 'fa-brands fa-amazon',
    flipkart: 'fa-solid fa-cart-shopping', // Using cart as generic for flipkart
    croma: 'fa-solid fa-store' // Using store as generic for croma
};

// Render Products
const renderProducts = (productsToRender) => {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (productsToRender.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">No products found matching your criteria.</div>';
        return;
    }

    productsToRender.forEach(product => {
        const bestDeal = getBestPrice(product.prices);
        const originalPrice = getOriginalPrice(bestDeal.price);
        const discountPercent = Math.round(((originalPrice - bestDeal.price) / originalPrice) * 100);

        // Generate HTML for price comparisons
        let pricesHtml = '';
        const stores = ['amazon', 'flipkart', 'croma'];

        stores.forEach(store => {
            if (product.prices[store]) {
                const isBest = store === bestDeal.store;
                pricesHtml += `
                    <div class="retailer-price ${isBest ? 'best-price' : ''}">
                        <div class="retailer-info">
                            <i class="${storeIcons[store]}"></i>
                            <span class="retailer-name" style="text-transform: capitalize;">${store}</span>
                        </div>
                        <span class="price-value">${formatPrice(product.prices[store].price)}</span>
                    </div>
                `;
            }
        });

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrap">
                <div class="discount-badge">${discountPercent}% OFF</div>
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-content">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                
                <div class="price-comparison">
                    ${pricesHtml}
                </div>
                
                <button class="btn-compare">Get Best Deal at ${bestDeal.store.charAt(0).toUpperCase() + bestDeal.store.slice(1)}</button>
            </div>
        `;
        grid.appendChild(card);
    });
};

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productsData);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultsTitle = document.getElementById('resultsTitle');

    const handleSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query === '') {
            renderProducts(productsData);
            resultsTitle.textContent = 'Trending Deals';
            return;
        }

        const filtered = productsData.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );

        renderProducts(filtered);
        resultsTitle.textContent = `Search Results for "${query}"`;

        // Scroll to results
        document.getElementById('deals').scrollIntoView({ behavior: 'smooth' });
    };

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Category Filtering
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            searchInput.value = ''; // Clear search

            const filtered = productsData.filter(p => p.category === category);
            renderProducts(filtered);

            // Format title
            const title = category.charAt(0).toUpperCase() + category.slice(1) + ' Deals';
            resultsTitle.textContent = title;

            // Scroll to results
            document.getElementById('deals').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Simple sort functionality (mock)
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', (e) => {
        const currentProducts = [...productsData]; // In a real app, you'd sort the currently filtered array
        const sortType = e.target.value;

        if (sortType === 'price-low') {
            currentProducts.sort((a, b) => getBestPrice(a.prices).price - getBestPrice(b.prices).price);
        } else if (sortType === 'price-high') {
            currentProducts.sort((a, b) => getBestPrice(b.prices).price - getBestPrice(a.prices).price);
        }

        renderProducts(currentProducts);
    });
});
