/* =========================================
   PAGE SYSTEM
========================================= */

let currentPage = 1;

const totalPages = 10;


/* =========================================
   PAGE NUMBER
========================================= */

function updatePageNumber() {

    const number = document.getElementById("pageNumber");

    number.textContent =
        String(currentPage).padStart(2, "0");
}



/* =========================================
   GO TO PAGE
========================================= */

function goToPage(pageNumber) {

    if (pageNumber < 1) {
        pageNumber = 1;
    }

    if (pageNumber > totalPages) {
        pageNumber = totalPages;
    }


    const current =
        document.getElementById(`page${currentPage}`);

    const next =
        document.getElementById(`page${pageNumber}`);


    if (!next) {
        return;
    }


    if (current) {
        current.classList.remove("active");
    }


    next.classList.add("active");


    currentPage = pageNumber;


    updatePageNumber();


    /*
       Return the page to the top when
       moving between pages.
    */

    next.scrollTop = 0;
}



/* =========================================
   OPEN LETTER
========================================= */

function openLetter(number) {

    const envelope =
        document.getElementById(`envelope${number}`);

    const message =
        document.getElementById(`message${number}`);


    if (!envelope || !message) {
        return;
    }


    /*
       Prevent repeatedly triggering
       the animation.
    */

    if (envelope.classList.contains("opened")) {
        return;
    }


    envelope.classList.add("opened");


    setTimeout(function() {

        message.classList.add("show");

    }, 450);


    /*
       Create a small burst of hearts
       when the letter opens.
    */

    createHeartBurst();
}



/* =========================================
   HEART BURST
========================================= */

function createHeartBurst() {

    const hearts = [
        "♡",
        "♡",
        "✦",
        "✧",
        "♡"
    ];


    hearts.forEach(function(symbol, index) {

        const heart =
            document.createElement("span");


        heart.innerHTML = symbol;


        heart.style.position = "fixed";

        heart.style.left = "50%";

        heart.style.top = "50%";

        heart.style.zIndex = "100";

        heart.style.pointerEvents = "none";

        heart.style.fontSize =
            Math.random() * 12 + 15 + "px";

        heart.style.color = "#dce5f5";


        const angle =
            (index / hearts.length) * Math.PI * 2;

        const distance =
            80 + Math.random() * 80;


        document.body.appendChild(heart);


        heart.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",

                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1.2)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${Math.cos(angle) * distance}px),
                            calc(-50% + ${Math.sin(angle) * distance}px)
                        )
                        scale(0.5)`,

                    opacity: 0
                }
            ],

            {
                duration: 1100,

                easing: "ease-out"
            }

        );


        setTimeout(function() {

            heart.remove();

        }, 1200);

    });
}



/* =========================================
   RESTART
========================================= */

function restartWebsite() {

    /*
       Close any opened envelopes.
    */

    document
        .querySelectorAll(".sealed-letter")
        .forEach(function(envelope) {

            envelope.classList.remove("opened");

        });


    document
        .querySelectorAll(".letter-message")
        .forEach(function(message) {

            message.classList.remove("show");

        });


    goToPage(1);
}



/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowRight") {

            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }

        }


        if (event.key === "ArrowLeft") {

            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }

        }

    }
);



/* =========================================
   SWIPE CONTROLS FOR PHONE
========================================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0].screenX;


        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference =
        touchEndX - touchStartX;


    /*
       Swipe left
       = next page
    */

    if (difference < -70) {

        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }

    }


    /*
       Swipe right
       = previous page
    */

    if (difference > 70) {

        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }

    }

}



/* =========================================
   INITIALIZE
========================================= */

updatePageNumber();