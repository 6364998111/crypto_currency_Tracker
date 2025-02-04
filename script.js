document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = '?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false';
    const searchBar = document.getElementById('search-bar');
    const cryptoContainer = document.getElementById('crypto-container');
    let cryptos = [];

    async function fetchCryptoData() {
        try {
            const response = await fetch(apiUrl + params);
            const data = await response.json();
            cryptos = data;
            displayCryptos(data);
        } catch (error) {
            console.error('Error fetching crypto data:', error);
        }
    }

    function displayCryptos(cryptos) {
        cryptoContainer.innerHTML = '';
        cryptos.forEach(crypto => {
            const cryptoCard = document.createElement('div');
            cryptoCard.className = 'col-md-4 crypto-card';
            cryptoCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${crypto.name} (${crypto.symbol.toUpperCase()})</h5>
                        <img src="${crypto.image}" alt="${crypto.name}">
                        <p class="card-text">Price: $${crypto.current_price}</p>
                        <p class="card-text">Market Cap: $${crypto.market_cap}</p>
                        <p class="card-text">24h Change: ${crypto.price_change_percentage_24h}%</p>
                        <p class="card-text">Volume: $${crypto.total_volume}</p>
                    </div>
                </div>
            `;
            cryptoContainer.appendChild(cryptoCard);
        });
    }

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCryptos = cryptos.filter(crypto => 
            crypto.name.toLowerCase().includes(searchTerm) || 
            crypto.symbol.toLowerCase().includes(searchTerm)
        );
        displayCryptos(filteredCryptos);
    });

    fetchCryptoData();
});
