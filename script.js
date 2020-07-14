const quote = document.getElementById('quote');
const author = document.getElementById('author');
const quoteContainer = document.getElementById('quote-container')
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const showLoader = () => {
    quoteContainer.hidden = true;
    loader.hidden = !quoteContainer.hidden;
}

const hideLoader = () => {
    quoteContainer.hidden = false;
    loader.hidden = !quoteContainer.hidden;
}

const getQuote = async () => {
    showLoader();
    try {
        const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
        const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
        const response = await fetch(corsAnywhere + apiUrl)
        const data = await response.json();
        quote.innerText = data.quoteText;
        if (!data.quoteAuthor) {
            author.innerHTML = 'Unknown';
        }
        else {
            author.innerHTML = data.quoteAuthor;
        }

        if (data.quoteText.length > 120) {
            quoteContainer.classList.add('long-quote');
        }
        else {
            quoteContainer.classList.remove('long-quote');
        }
    }
    catch (error) {
        quote.innerText = 'These errors are what we show when we have no quotes';
        author.innerText = 'The programmer';
    }
    finally {
        hideLoader();
    }
}

getQuote();

const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.innerText} -${author.innerText}`;
    window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);