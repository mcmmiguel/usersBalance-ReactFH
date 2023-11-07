/**
 * @returns {Object} quote info
 */
const fetchQuote = async () => {
    const resp = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
    const data = await resp.json();
    console.log(data[0]);
    return data[0];
};

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingBadApp = async (element) => {

    document.querySelector('#app-title').innerHTML = 'Breaking Bad App'
    element.innerHTML = 'Loading';

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const newQuoteButton = document.createElement('button');

    newQuoteButton.innerText = 'Next quote';

    const renderQuote = (data) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;

        element.replaceChildren(quoteLabel, authorLabel, newQuoteButton);

    };

    newQuoteButton.addEventListener('click', async () => {

        element.innerHTML = 'Loading';

        const nextQuote = await fetchQuote();

        renderQuote(nextQuote);

    });

    fetchQuote()
        .then(renderQuote)
        .catch(error => console.log(error));

};