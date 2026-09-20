// ==========================================
// CAFE FINDER
// ==========================================

// ==========================================
// DOM ELEMENTS
// ==========================================

const searchButton = document.querySelector("#search-button");
const locationInput = document.querySelector("#location-input");
const results = document.querySelector("#results");

const locationButton = document.querySelector("#location-button");
const loading = document.querySelector("#loading");

const modal = document.querySelector("#cafe-modal");
const closeModal = document.querySelector("#close-modal");

const modalCafeName = document.querySelector("#modal-cafe-name");
const modalRating = document.querySelector("#modal-rating");
const modalAddress = document.querySelector("#modal-address");
const modalPhone = document.querySelector("#modal-phone");
const modalWebsite = document.querySelector("#modal-website");
const modalHours = document.querySelector("#modal-hours");
const modalNavigate = document.querySelector("#modal-navigate");
const ratingFilter = document.getElementById("ratingFilter");
const distanceFilter = document.getElementById("distanceFilter");
const openFilter = document.getElementById("openFilter");
let userLatitude = null;
let userLongitude = null;

let selectedCafe = null;
let currentCity = null;

// ==========================================
// CAFE DATABASE
// ==========================================
const areaToCity = {
    // Hyderabad
    "banjara hills": "hyderabad",
    "jubilee hills": "hyderabad",
    "gachibowli": "hyderabad",
    "hitech city": "hyderabad",
    "madhapur": "hyderabad",
    "kondapur": "hyderabad",

    // Bengaluru
    "koramangala": "bengaluru",
    "indiranagar": "bengaluru",
    "hsr layout": "bengaluru",
    "whitefield": "bengaluru",
    "jayanagar": "bengaluru",

    // Vijayawada
    "patamata": "vijayawada",
    "guru nanak colony": "vijayawada",
    "ntr circle": "vijayawada",
    "suryaraopeta": "vijayawada",
    "gandhinagar": "vijayawada",

    // Chennai
    "royapettah": "chennai",
    "gopalapuram": "chennai",
    "adyar": "chennai",
    "t nagar": "chennai",
    "nungambakkam": "chennai"
};

const cafeDetails = {

    vijayawada: [

        {
            name: "Verandah Coffee Roasters and Café",
            image: "images/cafes/verandah.jpg",
            rating: 4.7,
            reviews: 5230,
            address: "54-20-6, Road #1, Guru Nanak Colony, Vijayawada",
            phone: "+91 81792 57535",
            hours: "10 AM – 10 PM",
            latitude: 16.5062,
            longitude: 80.6480
        },

        {
            name: "Café ice magic",
            rating: 4.8,
            reviews: 8045,
            address: "Nirmala Convent Road, NTR Circle, Patamata, Vijayawada",
            phone: "+91 79979 96441",
            hours: "10 AM – 10:30 PM",
            latitude: 16.5120,
            longitude: 80.6350
        },

        {
            name: "CRAB (Restaurant and Cafe)",
            rating: 4.6,
            reviews: 1506,
            address: "Water Tank Road, LIC Colony, Vijayawada",
            phone: "+91 94536 96969",
            hours: "8 AM – 11 PM",
            latitude: 16.4980,
            longitude: 80.6550
        },

        {
            name: "Brew Theory",
            rating: 4.8,
            reviews: 133,
            address: "Plot No 50, CTO Colony, Road Number 1, Gurunanak Nagar",
            phone: "+91 81255 27979",
            hours: "10 AM – 10 PM",
            latitude: null,
            longitude: null
        },

        {
            name: "NPC Nilagiris Premium Coffee",
            rating: 4.8,
            reviews: 165,
            address: "Venkataratnam Street, Suryaraopeta, Governor Peta",
            phone: "+91 95248 72872",
            hours: "5 AM – 10 PM",
            latitude: null,
            longitude: null
        },

        {
            name: "Local Narrative Specialty Coffee",
            rating: 4.5,
            reviews: 215,
            address: "RR Gardens, High School Road, Patamata",
            phone: "+91 91213 11663",
            hours: "7 AM – 10:30 PM",
            latitude: null,
            longitude: null
        },

        {
            name: "Cinema Cafe & Restaurant",
            rating: 4.7,
            reviews: 2913,
            address: "Main Road, opposite Govt ITI College, LIC Colony",
            phone: "+91 91707 07666",
            hours: "10 AM – 11 PM",
            latitude: null,
            longitude: null
        },

        {
            name: "Araku House",
            rating: 4.6,
            reviews: 258,
            address: "108A, Sri Nilaya Apartments, Loyola College Road",
            phone: "+91 80084 06398",
            hours: "10 AM – 11 PM",
            latitude: null,
            longitude: null
        },

        {
            name: "BINGE CAFE PRIVATE THEATERS",
            rating: 4.7,
            reviews: 385,
            address: "Sidharth Nagar, Polyclinic Road",
            phone: "+91 90109 94848",
            hours: "Open 24 hours",
            latitude: null,
            longitude: null
        },

        {
            name: "Froth and Friends Café",
            rating: 4.6,
            reviews: 357,
            address: "93, Maruti Cooperative Colony",
            phone: "+91 97059 81111",
            hours: "11 AM – 11 PM",
            latitude: null,
            longitude: null
        },

        {
            name: "FROOZO CAFE",
            rating: 4.5,
            reviews: 82,
            address: "58-2-15, Panta Kaluva Road, NTR Circle, Patamata",
            phone: "Phone info coming soon",
            hours: "11 AM – 10:30 PM",
            latitude: null,
            longitude: null
        },

        {
            name: "Brewbakes Café",
            rating: 4.6,
            reviews: 85,
            address: "54/16/29 opposite Loyola College Road, Veterinary Colony",
            phone: "+91 92916 51111",
            hours: "6 AM – 10:30 PM",
            latitude: null,
            longitude: null
        }

    ],
        

    // =====================================================
    // HYDERABAD
    // =====================================================

    hyderabad: [

        {
            name: "Roastery Coffee House",
            rating: 4.5,
            reviews: 7094,
            address: "418, Road Number 14, BNR Colony, Venkat Nagar, Banjara Hills, Hyderabad",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: 17.4231912,
            longitude: 78.4315852
        },

        {
            name: "Cafe Niloufer",
            rating: 4.5,
            reviews: 4475,
            address: "11-5-422/C/B, Red Hills Road, Lakdikapul, Hyderabad",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: 17.4007624,
            longitude: 78.4628343
        },

        {
            name: "Autumn Leaf Cafe",
            rating: 4.3,
            reviews: 3400,
            address: "Plot No 823, Road Number 41, Near Peddamma Temple, Jubilee Hills, Hyderabad",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: 17.4338889,
            longitude: 78.4019444
        },

        {
            name: "Heart Cup Coffee",
            rating: 4.2,
            reviews: 7197,
            address: "Plot No. 1179, Road Number 45, Jubilee Hills, Hyderabad",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: 17.4278578,
            longitude: 78.4060627
        },

        {
            name: "The Hole In The Wall Cafe",
            rating: 4.2,
            reviews: 1663,
            address: "Road 45, Jubilee Hills, Hyderabad",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: 17.4237318,
            longitude: 78.4101297
        }
    ],

    // =====================================================
    // BENGALURU
    // =====================================================

    bengaluru: [

        {
            name: "Dyu Art Cafe",
            rating: 4.4,
            reviews: 8964,
            address: "No. 23, KHB MIG Colony, Old 5th Block, Koramangala, Bengaluru",
            phone: "Phone information coming soon",
            hours: "10 AM – 10:30 PM",
            latitude: 12.9373144,
            longitude: 77.6175734
        },

        {
            name: "The Hole In The Wall Cafe",
            rating: 4.4,
            reviews: 11160,
            address: "Door No. 4, 8th Main Road, Koramangala 4th Block, Bengaluru",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: 12.9346047,
            longitude: 77.6255419
        },

        {
            name: "Lavonne Café",
            rating: 4.5,
            reviews: 1317,
            address: "263, 3rd Cross Road, 2nd Stage, Defence Colony, Domlur, Bengaluru",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: 12.966868,
            longitude: 77.636959
        },

        {
            name: "Third Wave Coffee Roasters",
            rating: 4.4,
            reviews: 2837,
            address: "4th Block, 1, 984, 80 Feet Road, Koramangala, Bengaluru",
            phone: "Phone information coming soon",
            hours: "8 AM – 11 PM",
            latitude: 12.9347217,
            longitude: 77.6295729
        },

        {
            name: "The Teal Door Cafe",
            rating: 4.1,
            reviews: 3176,
            address: "618, 2nd Main Road, Binnamangala, Indiranagar, Bengaluru",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: 12.9824855,
            longitude: 77.6392827
        }
    ],

    // =====================================================
    // CHENNAI
    // =====================================================

    chennai: [

        {
            name: "Cafe Mercara Express",
            rating: 4.7,
            reviews: 570,
            address: "ITC Grand Chola, Guindy, Chennai",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: null,
            longitude: null
        },

        {
            name: "Writer's Cafe",
            rating: 4.4,
            reviews: 4730,
            address: "127, Peters Road, Gopalapuram, Chennai",
            phone: "Phone information coming soon",
            hours: "9 AM – 10:30 PM",
            latitude: 13.0542111,
            longitude: 80.2572878
        },

        {
            name: "Amethyst Cafe",
            rating: 4.2,
            reviews: 459,
            address: "28, Whites Road, Royapettah, Chennai",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: 13.0571201,
            longitude: 80.2594242
        },

        {
            name: "Chamiers Cafe",
            rating: 4.2,
            reviews: 142,
            address: "RA Puram, Chennai",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: null,
            longitude: null
        },

        {
            name: "Ciclo Cafe",
            rating: 4.1,
            reviews: 172,
            address: "Kanathur, Chennai",
            phone: "Phone information coming soon",
            hours: "Hours information coming soon",
            latitude: null,
            longitude: null
        }
    ]
};



// ==========================================
// SEARCH
// ==========================================

searchButton.addEventListener("click", searchCafes);


locationInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchCafes();
    }

});


function searchCafes() {

    const location = locationInput.value.trim().toLowerCase();

    if (!location) {

        alert("Please enter a city or area.");

        return;
    }


    showLoading();


    setTimeout(function () {

        hideLoading();


        const city = cafeDetails[location]
            ? location
            : areaToCity[location];

        if (city) {
            currentCity = city;
            displayCafes(cafeDetails[city], city);
        } else {
            results.innerHTML = `
                <div class="no-results">
                    <h2>No cafes found</h2>
                    <p>We don't have cafe data for this location yet.</p>
                </div>
            `;
        }

        

    }, 1200);

}


// ==========================================
// DISPLAY CAFES
// ==========================================
function isCafeOpen(hours) {
    if (!hours || hours.includes("24 hours")) {
        return true;
    }

    const match = hours.match(
        /(\d{1,2})\s*(AM|PM)\s*[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i
    );

    if (!match) return true;

    let openHour = parseInt(match[1]);
    const openPeriod = match[2].toUpperCase();

    let closeHour = parseInt(match[3]);
    const closeMinutes = parseInt(match[4] || "0");
    const closePeriod = match[5].toUpperCase();

    if (openPeriod === "PM" && openHour !== 12) openHour += 12;
    if (openPeriod === "AM" && openHour === 12) openHour = 0;

    if (closePeriod === "PM" && closeHour !== 12) closeHour += 12;
    if (closePeriod === "AM" && closeHour === 12) closeHour = 0;

    const now = new Date();
    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

    const openMinutes = openHour * 60;
    const closeTotalMinutes = closeHour * 60 + closeMinutes;

    return currentMinutes >= openMinutes &&
           currentMinutes <= closeTotalMinutes;
}
let savedFavoriteIds = new Set();
function displayCafes(cafes, location) {
const minRating = parseFloat(ratingFilter.value);

cafes = cafes.filter(cafe => cafe.rating >= minRating);
const maxDistance = parseFloat(distanceFilter.value);

if (maxDistance > 0 && userLatitude !== null && userLongitude !== null) {
    cafes = cafes.filter(cafe => {
        if (cafe.latitude === null || cafe.longitude === null) {
            return true;
        }

        const distance = calculateDistance(
            userLatitude,
            userLongitude,
            cafe.latitude,
            cafe.longitude
        );

        return distance <= maxDistance;
    });
}
const openFilterValue = openFilter.value;

if (openFilterValue === "open") {
    cafes = cafes.filter(cafe => isCafeOpen(cafe.hours));
}

if (openFilterValue === "closed") {
    cafes = cafes.filter(cafe => !isCafeOpen(cafe.hours));
}
    results.innerHTML = `
        <h2>Cafes in ${capitalize(location)}</h2>
        <div class="cards-container"></div>
    `;

    const container =
        results.querySelector(".cards-container");

    cafes.forEach(function (cafe, index) {

        const card = document.createElement("article");

        card.className = "cafe-card";

        // Position of the card inside its row
        const positionInRow = index % 3;

        card.dataset.position = positionInRow;

        card.innerHTML = `
            <div class="cafe-image">
                <img
                    src="${cafe.image}"
                    alt="${escapeHTML(cafe.name)}"
                >
            </div>

            <div class="cafe-info">

                <h3>
                    ${escapeHTML(cafe.name)}
                </h3>

                <p>
                    ⭐ ${cafe.rating}
                    · ${cafe.reviews.toLocaleString()} reviews
                </p>

                <p>
                    📍 ${escapeHTML(cafe.address)}
                </p>

                <p>
                    📏 ${getDistanceText(
                        cafe.latitude,
                        cafe.longitude
                    )}
                </p>

                <div class="cafe-buttons">

                    <button
                        class="favorite-button ${savedFavoriteIds.has(cafe.name.toLowerCase().replace(/[^a-z0-9]/g, "-")) ? "liked" : ""}"
                        data-cafe="${index}"
                    >
                    ${savedFavoriteIds.has(cafe.name.toLowerCase().replace(/[^a-z0-9]/g, "-")) ? "♥" : "♡"}
                    </button>

                    <button
                        class="navigate-button"
                        data-cafe="${index}"
                    >
                        🧭 Navigate
                    </button>

                    <button
                        class="details-button"
                        data-cafe="${index}"
                    >
                        See More
                    </button>

                </div>

            </div>
        `;

        // Smooth entrance
        card.style.animationDelay =
            `${index * 0.08}s`;

        container.appendChild(card);

    });
}

ratingFilter.addEventListener("change", function () {
    const location = currentCity;

    if (location && cafeDetails[location]) {
        displayCafes(cafeDetails[location], location);
    }
});

distanceFilter.addEventListener("change", function () {
    const location = currentCity;

    if (location && cafeDetails[location]) {
        displayCafes(cafeDetails[location], location);
    }
});

openFilter.addEventListener("change", function () {
    const location = currentCity;

    if (location && cafeDetails[location]) {
        displayCafes(cafeDetails[location], location);
    }
});


// ==========================================
// CARD BUTTONS
// ==========================================

results.addEventListener("click", function (event) {

    const button = event.target.closest("button");


    if (!button) {
        return;
    }


    const cafeIndex = Number(button.dataset.cafe);


    if (Number.isNaN(cafeIndex)) {
        return;
    }


   const location =
    currentCity ||
    locationInput.value.trim().toLowerCase();

    if (!cafeDetails[location]) {
        return;
    }


    const cafe = cafeDetails[location][cafeIndex];


    if (!cafe) {
        return;
    }


    
        
        // Favorite - instant heart update
        if (button.classList.contains("favorite-button")) {
            const user = auth.currentUser;

            if (!user) {
                alert("Please sign in with Google first!");
                return;
            }

            const favoriteId = cafe.name
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "-");

            const favoriteRef = db
                .collection("users")
                .doc(user.uid)
                .collection("favorites")
                .doc(favoriteId);

            // Update the heart immediately
            const wasLiked = button.classList.contains("liked");
            const nowLiked = !wasLiked;
            if (nowLiked) {
                savedFavoriteIds.add(favoriteId);
            } else {
                savedFavoriteIds.delete(favoriteId);
            }

            button.classList.toggle("liked", nowLiked);
            button.textContent = nowLiked ? "♥" : "♡";
            button.disabled = true;

            const saveAction = nowLiked
                ? favoriteRef.set({
                    ...cafe,
                    savedAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                : favoriteRef.delete();

            saveAction
                .catch(error => {
                    console.error("Favorite error:", error);

                    // Undo the visual change if Firebase fails
                    button.classList.toggle("liked", wasLiked);
                    button.textContent = wasLiked ? "♥" : "♡";

                    alert("Could not update favorite. Please try again.");
                })
                .finally(() => {
                    button.disabled = false;
                });

            return;
        }


    // Navigate
    if (button.classList.contains("navigate-button")) {

        navigateToCafe(cafe);

        return;
    }


    // Details
    if (button.classList.contains("details-button")) {

        openCafeModal(cafe);

    }

});


// ==========================================
// LOCATION
// ==========================================

locationButton.addEventListener("click", function () {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported by your browser.");

        return;
    }


    showLoading();


    navigator.geolocation.getCurrentPosition(

        async function (position) {

            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;


            try {

                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLatitude}&lon=${userLongitude}`
                );


                const data = await response.json();


                const address = data.address || {};


                const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.city_district ||
    "";


                locationInput.value = city;


                const cityKey = city.toLowerCase().trim();
                console.log("Detected city:", city);
console.log("City key:", cityKey);


                if (cafeDetails[cityKey]) {

                    displayCafes(
                        cafeDetails[cityKey],
                        cityKey
                    );

                } else {

                    results.innerHTML = `
                        <div class="no-results">
                            <h2>Location detected</h2>
                            <p>
                                ${escapeHTML(city || "Your location")}
                            </p>
                            <p>
                                We don't have cafe data for this location yet.
                            </p>
                        </div>
                    `;

                }

            } catch (error) {

                alert("Location detected, but we couldn't identify your city.");

            }


            hideLoading();

        },


        function (error) {

            hideLoading();

            alert(
                "Unable to access your location. Please allow location permission."
            );

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

});


// ==========================================
// DISTANCE
// ==========================================

function calculateDistance(lat1, lon1, lat2, lon2) {

    const earthRadius = 6371;


    const latitudeDifference =
        degreesToRadians(lat2 - lat1);

    const longitudeDifference =
        degreesToRadians(lon2 - lon1);


    const a =
        Math.sin(latitudeDifference / 2) ** 2 +
        Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(longitudeDifference / 2) ** 2;


    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return earthRadius * c;

}


function degreesToRadians(degrees) {

    return degrees * Math.PI / 180;

}


function getDistanceText(cafeLat, cafeLon) {

    if (
        !Number.isFinite(userLatitude) ||
        !Number.isFinite(userLongitude) ||
        !Number.isFinite(cafeLat) ||
        !Number.isFinite(cafeLon)
    ) {

        return "Distance unavailable";

    }


    return (
        calculateDistance(
            userLatitude,
            userLongitude,
            cafeLat,
            cafeLon
        ).toFixed(1) + " km away"
    );

}


// ==========================================
// GOOGLE MAPS NAVIGATION
// ==========================================

function navigateToCafe(cafe) {

    const query =
        `${cafe.name}, ${cafe.address}`;


    const mapsURL =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;


    window.open(
        mapsURL,
        "_blank"
    );

}


// ==========================================
// MODAL
// ==========================================

function openCafeModal(cafe) {

    selectedCafe = cafe;


    modalCafeName.textContent =
        cafe.name;


    modalRating.innerHTML =
        `⭐ <strong>${cafe.rating}</strong> · ${cafe.reviews.toLocaleString()} reviews`;


    modalAddress.textContent =
        `📍 ${cafe.address}`;


    modalPhone.textContent =
        `📞 ${cafe.phone}`;


    modalWebsite.textContent =
        "🌐 Website information coming soon";


    modalHours.textContent =
        `🕐 ${cafe.hours}`;


    modal.style.display = "flex";


    requestAnimationFrame(function () {

        modal.classList.add("show");

    });


    document.body.style.overflow = "hidden";

}


function closeCafeModal() {

    modal.classList.remove("show");


    setTimeout(function () {

        modal.style.display = "none";

    }, 350);


    document.body.style.overflow = "";

}


closeModal.addEventListener(
    "click",
    closeCafeModal
);


modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        closeCafeModal();

    }

});


document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        modal.classList.contains("show")
    ) {

        closeCafeModal();

    }

});


modalNavigate.addEventListener("click", function () {

    if (selectedCafe) {

        navigateToCafe(selectedCafe);

    }

});


// ==========================================
// LOADING
// ==========================================

function showLoading() {

    loading.style.display = "flex";


    requestAnimationFrame(function () {

        loading.classList.add("active");

    });

}


function hideLoading() {

    loading.classList.remove("active");


    setTimeout(function () {

        loading.style.display = "none";

    }, 300);

}


// ==========================================
// HELPERS
// ==========================================

function capitalize(text) {

    return text
        .charAt(0)
        .toUpperCase() +
        text.slice(1);

}


function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// INTRO + VIDEO
// ==========================================

const introScreen =
    document.getElementById("intro-screen");

const backgroundVideo =
    document.getElementById("background-video");


// Reveal the homepage while the intro fades.
window.addEventListener("load", function () {

    setTimeout(function () {

        document.body.classList.add("intro-finished");

    }, 3000);

});


// ==========================================
// SMOOTH VIDEO LOOP
// ==========================================

let loopRestarting = false;


backgroundVideo.addEventListener(
    "timeupdate",
    function () {

        if (
            !loopRestarting &&
            Number.isFinite(backgroundVideo.duration) &&
            backgroundVideo.duration > 1 &&
            backgroundVideo.currentTime >=
                backgroundVideo.duration - 0.65
        ) {

            loopRestarting = true;


            backgroundVideo.classList.add(
                "loop-fade"
            );


            setTimeout(function () {

                backgroundVideo.currentTime = 0;


                const playPromise =
                    backgroundVideo.play();


                if (playPromise) {

                    playPromise.catch(function () {});

                }


                requestAnimationFrame(function () {

                    backgroundVideo.classList.remove(
                        "loop-fade"
                    );

                    loopRestarting = false;

                });

            }, 350);

        }

    }
);

const googleSignInButton = document.getElementById("google-signin");
const googleSignOutButton = document.getElementById("google-signout");
const userInfo = document.getElementById("user-info");

const googleProvider = new firebase.auth.GoogleAuthProvider();

googleSignInButton.addEventListener("click", () => {
    auth.signInWithPopup(googleProvider)
        .catch(error => {
            console.error("Google sign-in error:", error);
            alert("Sign-in failed: " + error.message);
        });
});

googleSignOutButton.addEventListener("click", () => {
    auth.signOut();
});

auth.onAuthStateChanged(async user => {
    if (user) {
        userInfo.textContent = "Hi, " + user.displayName;
        googleSignInButton.hidden = true;
        googleSignOutButton.hidden = false;

        try {
            const snapshot = await db
                .collection("users")
                .doc(user.uid)
                .collection("favorites")
                .get();

            savedFavoriteIds.clear();

            snapshot.forEach(doc => {
                savedFavoriteIds.add(doc.id);
            });

            // Refresh cafe hearts after loading saved favorites
            const location = currentCity;

            if (location && cafeDetails[location]) {
                displayCafes(cafeDetails[location], location);
            }

        } catch (error) {
            console.error("Could not load favorites:", error);
        }

    } else {
        userInfo.textContent = "";
        googleSignInButton.hidden = false;
        googleSignOutButton.hidden = true;

        savedFavoriteIds.clear();

        const location = currentCity;

        if (location && cafeDetails[location]) {
            displayCafes(cafeDetails[location], location);
        }
    }
});

 // MY FAVORITES PAGE

const favoritesLink = document.getElementById("favorites-link");
const favoritesSection = document.getElementById("favorites-section");
const favoritesResults = document.getElementById("favorites-results");
const mainSection = document.querySelector("main");

favoritesLink.addEventListener("click", async function (event) {
    event.preventDefault();

    const user = auth.currentUser;

    if (!user) {
        alert("Please sign in with Google first!");
        return;
    }

    mainSection.hidden = true;
    favoritesSection.hidden = false;
    favoritesResults.innerHTML = "<p>Loading favorites...</p>";

    try {
        const snapshot = await db
            .collection("users")
            .doc(user.uid)
            .collection("favorites")
            .get();

        favoritesResults.innerHTML = "";

        if (snapshot.empty) {
            favoritesResults.innerHTML =
                "<p>You haven't saved any cafes yet.</p>";
            return;
        }

        snapshot.forEach(doc => {
            const cafe = doc.data();

            const card = document.createElement("div");
            card.className = "cafe-card";

            const name = document.createElement("h3");
            name.textContent = cafe.name || "Cafe";

            const rating = document.createElement("p");
            rating.textContent = "⭐ Rating: " + (cafe.rating ?? "N/A");

            const address = document.createElement("p");
            address.textContent = cafe.address || "Address unavailable";

            card.append(name, rating, address);

const navigateButton = document.createElement("button");
navigateButton.className = "navigate-button";
navigateButton.textContent = "🧭 Navigate";

navigateButton.addEventListener("click", function () {
    const destination = cafe.latitude && cafe.longitude
        ? `${cafe.latitude},${cafe.longitude}`
        : cafe.address;

    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

    window.open(mapsUrl, "_blank");
});

card.appendChild(navigateButton);
const removeButton = document.createElement("button");
removeButton.className = "remove-favorite-button";
removeButton.textContent = "❤️ Remove from Favorites";

removeButton.addEventListener("click", async function () {
    const favoriteId = doc.id;

    try {
        await db.collection("users")
            .doc(user.uid)
            .collection("favorites")
            .doc(favoriteId)
            .delete();

        savedFavoriteIds.delete(favoriteId);
        card.remove();
    } catch (error) {
        console.error("Remove favorite failed:", error);
        alert("Could not remove favorite. Please try again.");
    }
});

card.appendChild(removeButton);
// Add the cafe card to the Favorites page
favoritesResults.appendChild(card);
});
    } catch (error) {
        console.error("Loading favorites failed:", error);
        favoritesResults.textContent =
            "Could not load favorites. Please try again.";
    }
});

const exploreLink = document.getElementById("explore-link");

exploreLink.addEventListener("click", function (event) {
    event.preventDefault();

    favoritesSection.hidden = true;
    mainSection.hidden = false;
});

document.getElementById("back-to-explore")
    .addEventListener("click", function () {
        favoritesSection.hidden = true;
        mainSection.hidden = false;
    });
    const backToExploreButton =
    document.getElementById("back-to-explore");

backToExploreButton.addEventListener("click", function () {
    document.getElementById("favorites-section").hidden = true;
    document.querySelector("main").hidden = false;
});