// Expanded database with more categories and hashtags
const hashtagDatabase = [
    { keyword: "travel", hashtags: ["#travel", "#wanderlust", "#explore", "#adventure", "#vacation", "#tourism", "#travelling", "#instatravel"] },
    { keyword: "fitness", hashtags: ["#fitness", "#gym", "#workout", "#fitfam", "#muscle", "#healthylifestyle", "#fitnessmotivation", "#fitlife"] },
    { keyword: "food", hashtags: ["#food", "#foodie", "#yummy", "#delicious", "#instafood", "#foodporn", "#foodlover", "#cooking"] },
    { keyword: "music", hashtags: ["#music", "#musician", "#musiclover", "#instamusic", "#song", "#playlist", "#newmusic", "#rock"] },
    { keyword: "fashion", hashtags: ["#fashion", "#style", "#ootd", "#streetstyle", "#fashionista", "#fashionblogger", "#trendy", "#fashiondesign"] },
    { keyword: "technology", hashtags: ["#tech", "#innovation", "#gadgets", "#technology", "#startup", "#futuretech", "#technews", "#AI"] },
    { keyword: "sports", hashtags: ["#sports", "#soccer", "#basketball", "#football", "#athlete", "#fitness", "#sportsmanship", "#workout"] },
    { keyword: "photography", hashtags: ["#photography", "#photooftheday", "#photographer", "#instaphoto", "#portrait", "#landscape", "#naturephotography", "#photoart"] },
    { keyword: "education", hashtags: ["#education", "#learning", "#onlineeducation", "#student", "#knowledge", "#teacher", "#studygram", "#studytips"] },
    { keyword: "gaming", hashtags: ["#gaming", "#gamer", "#videogames", "#gaminglife", "#instagaming", "#esports", "#gamerlife", "#playstation"] }
];



// Set up Fuse.js for fuzzy searching
const options = {
    includeScore: true,
    keys: ["keyword"]
};
const fuse = new Fuse(hashtagDatabase, options);

// Generate hashtags based on keyword
function generateHashtags() {
    const keyword = document.getElementById("keyword").value.toLowerCase().trim();
    const resultDiv = document.getElementById("hashtags-output");
    const copyAllButton = document.getElementById("copy-all-btn");
    
    resultDiv.innerHTML = ""; // Clear previous results
    
    if (keyword === "") {
        resultDiv.innerHTML = "<p>Please enter a keyword.</p>";
        return;
    }
    
    // Perform fuzzy search using Fuse.js
    const results = fuse.search(keyword);
    
    if (results.length > 0) {
        const bestMatch = results[0].item; // The best match from fuzzy search
        displayHashtags(bestMatch.hashtags);
        copyAllButton.style.display = 'inline-block'; // Show the "Copy All" button
    } else {
        resultDiv.innerHTML = "<p>No matching hashtags found. Try a different keyword.</p>";
        copyAllButton.style.display = 'none'; // Hide the "Copy All" button if no results
    }
}

// Display hashtags on the page
function displayHashtags(hashtags) {
    const resultDiv = document.getElementById("hashtags-output");
    
    hashtags.forEach(hashtag => {
        const hashtagElement = document.createElement("div");
        hashtagElement.classList.add("hashtag");
        hashtagElement.textContent = hashtag;
        resultDiv.appendChild(hashtagElement);
    });
}

// Copy all hashtags to clipboard
function copyAllHashtags() {
    const hashtags = Array.from(document.querySelectorAll("#hashtags-output .hashtag"));
    
    if (hashtags.length > 0) {
        const allHashtags = hashtags.map(tag => tag.textContent).join(" "); // Concatenate all hashtags with space
        
        // Copy to clipboard
        navigator.clipboard.writeText(allHashtags).then(() => {
            alert(`Copied all hashtags: ${allHashtags}`);
        }).catch(err => {
            console.error("Error copying to clipboard:", err);
        });
    }
}
