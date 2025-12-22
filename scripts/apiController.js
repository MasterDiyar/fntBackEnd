const EXCHANGE_API_KEY = 'c14458a54c3aa5badd4d426c';
const NEWS_API_KEY = 'aa26d4ae1c3643df8e2f5374f2fe8b37';
async function getCountryInfoByName(countryName) {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
        countryName
    )}?fullText=true&fields=name,capital,languages,currencies,flags,cca2`;
    const res = await fetch(url);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }
    const c = data[0];

    const languages = c.languages ? Object.values(c.languages) : [];
    const currencies = c.currencies
        ? Object.entries(c.currencies).map(([code, cur]) => ({
            code,
            name: cur.name,
            symbol: cur.symbol || '',
        }))
        : [];

    return {
        name: c.name?.common || countryName,
        capital: c.capital ? c.capital[0] : 'Unknown',
        languages,
        currencies,
        flag: c.flags?.svg || c.flags?.png || '',
        iso2: c.cca2 || '',
    };
}

async function getExchangeRates(baseCurrencyCode) {
    if (!baseCurrencyCode) return null;

    const url = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${encodeURIComponent(
        baseCurrencyCode
    )}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.result !== 'success') {
        return null;
    }

    const rates = data.conversion_rates || {};
    const toUSD = rates['USD'];
    const toKZT = rates['KZT'];

    return {
        base: baseCurrencyCode,
        toUSD,
        toKZT,
    };
}

async function getNewsByCountryName(countryName) {
    if (!countryName) return [];
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        countryName
    )}&language=en&pageSize=5&apiKey=${NEWS_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== 'ok' || !Array.isArray(data.articles)) {
        return [];
    }

    return data.articles.map((a) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        imageUrl: a.urlToImage,
        sourceName: a.source?.name || '',
    }));
}

exports.getRandomUserFull = async (req, res) => {
    try {
        const ruRes = await fetch('https://randomuser.me/api/');
        const ruData = await ruRes.json();
        const u = ruData.results[0];

        const countryName = u.location.country;

        const countryInfo = await getCountryInfoByName(countryName);
        const mainCurrencyCode = countryInfo?.currencies?.[0]?.code || null;

        // $ -> T
        const exchangeRates = mainCurrencyCode
            ? await getExchangeRates(mainCurrencyCode)
            : null;

        const news = await getNewsByCountryName(countryInfo?.name || countryName);

        res.json({
            user: {
                firstName: u.name.first,
                lastName: u.name.last,
                gender: u.gender,
                profilePicture: u.picture.large,
                age: u.dob.age,
                dob: u.dob.date,
                city: u.location.city,
                country: countryName,
                fullAddress: `${u.location.street.name} ${u.location.street.number}`,
            },
            country: countryInfo,
            exchange: exchangeRates,
            news,
        });
    } catch (err) {
        console.error(err);
    }
};
