const btn = document.getElementById('get-user-btn');
const content = document.getElementById('content');

const img = document.getElementById('user-img');
const firstNameEl = document.getElementById('first-name');
const lastNameEl = document.getElementById('last-name');
const genderEl = document.getElementById('gender');
const ageEl = document.getElementById('age');
const dobEl = document.getElementById('dob');
const cityEl = document.getElementById('city');
const countryEl = document.getElementById('country');
const fullAddressEl = document.getElementById('full-address');

const countryNameEl = document.getElementById('country-name');
const countryCapitalEl = document.getElementById('country-capital');
const countryLanguagesEl = document.getElementById('country-languages');
const countryCurrenciesEl = document.getElementById('country-currencies');
const countryFlagEl = document.getElementById('country-flag');
const exchangeTextEl = document.getElementById('exchange-text');

const newsListEl = document.getElementById('news-list');

btn.addEventListener('click', async () => {
    try {
        const res = await fetch('/random-user');
        if (!res.ok) {
            const text = await res.text();
            console.error('API error:', res.status, text);
            alert('Failed to load data');
            return;
        }

        const payload = await res.json();
        const user = payload.user;
        const country = payload.country;
        const exchange = payload.exchange;
        const news = payload.news || [];

        img.src = user.profilePicture;
        img.alt = `${user.firstName} ${user.lastName}`;

        firstNameEl.textContent = user.firstName;
        lastNameEl.textContent = user.lastName;
        genderEl.textContent = user.gender;
        ageEl.textContent = user.age;

        const dobDate = new Date(user.dob);
        if (!isNaN(dobDate.getTime())) {
            dobEl.textContent = dobDate.toISOString().split('T')[0];
        } else {
            dobEl.textContent = 'Unknown';
        }

        cityEl.textContent = user.city;
        countryEl.textContent = user.country;
        fullAddressEl.textContent = user.fullAddress;

        if (country) {
            countryFlagEl.src = country.flag || '';
            countryFlagEl.alt = `${country.name} flag`;

            countryNameEl.textContent = country.name;
            countryCapitalEl.textContent = country.capital;

            countryLanguagesEl.textContent = country.languages
                ? country.languages.join(', ')
                : 'Unknown';

            if (country.currencies && country.currencies.length > 0) {
                const curStrings = country.currencies.map(
                    (c) => `${c.code} (${c.name}${c.symbol ? ' ' + c.symbol : ''})`
                );
                countryCurrenciesEl.textContent = curStrings.join(', ');
            } else {
                countryCurrenciesEl.textContent = 'Unknown';
            }
        } else {
            countryNameEl.textContent = 'Unknown';
            countryCapitalEl.textContent = 'Unknown';
            countryLanguagesEl.textContent = 'Unknown';
            countryCurrenciesEl.textContent = 'Unknown';
            countryFlagEl.removeAttribute('src');
        }

        // --- exchange ---
        if (exchange && exchange.toUSD && exchange.toKZT) {
            const base = exchange.base;
            const usd = exchange.toUSD.toFixed(2);
            const kzt = exchange.toKZT.toFixed(2);
            exchangeTextEl.textContent = `1 ${base} = ${usd} USD, 1 ${base} = ${kzt} KZT`;
        } else {
            exchangeTextEl.textContent = 'Exchange rate data not available';
        }

        // --- news ---
        newsListEl.innerHTML = '';
        if (news.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No news found.';
            newsListEl.appendChild(p);
        } else {
            news.forEach((item) => {
                const wrapper = document.createElement('article');
                wrapper.className = 'news-item';

                if (item.imageUrl) {
                    const img = document.createElement('img');
                    img.className = 'news-thumb';
                    img.src = item.imageUrl;
                    img.alt = item.title;
                    wrapper.appendChild(img);
                } else {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'news-thumb';
                    wrapper.appendChild(placeholder);
                }

                const contentDiv = document.createElement('div');
                contentDiv.className = 'news-content';

                const title = document.createElement('h3');
                title.className = 'news-title';
                title.textContent = item.title;
                contentDiv.appendChild(title);

                if (item.description) {
                    const desc = document.createElement('p');
                    desc.className = 'news-desc';
                    desc.textContent = item.description;
                    contentDiv.appendChild(desc);
                }

                const link = document.createElement('a');
                link.className = 'news-link';
                link.href = item.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = item.sourceName || 'View article';
                contentDiv.appendChild(link);

                wrapper.appendChild(contentDiv);
                newsListEl.appendChild(wrapper);
            });
        }

        content.classList.remove('hidden');
    } catch (err) {
        console.error(err);
        alert('Unexpected error');
    }
});
