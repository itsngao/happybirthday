// Get current date in UTC+7 (Hanoi time zone)
const getHanoiTime = () => {
    const now = new Date();
    
    // Get the UTC time in milliseconds
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    
    // Create a new date object with UTC+7 offset (Hanoi)
    const hanoiTime = new Date(utcTime + (7 * 3600000));
    
    return hanoiTime;
};

// Check if it's June 3rd in Hanoi time
const checkBirthdayDate = () => {
    const hanoiTime = getHanoiTime();
    const isBirthday = hanoiTime.getMonth() === 5 && hanoiTime.getDate() === 3; // June is month 5 (0-indexed)
    return isBirthday;
};

// Calculate time remaining until next birthday (in Hanoi time)
const getTimeRemaining = (endtime) => {
    const hanoiNow = getHanoiTime();
    const total = Date.parse(endtime) - Date.parse(hanoiNow);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
};

// Initialize and update the countdown clock
const initializeClock = (nextBirthday) => {
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    countdownElement.innerHTML = `
        <img src="./img/maianhhome.jpg" id="gif"></img>
        <h1>m.anh's Birthday Countdown</h1>
        <div class="countdown-timer">
            <div class="countdown-item">
                <span class="days">00</span>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-item">
                <span class="hours">00</span>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-item">
                <span class="minutes">00</span>
                <div class="countdown-label">Minutes</div>
            </div>
            <div class="countdown-item">
                <span class="seconds">00</span>
                <div class="countdown-label">Seconds</div>
            </div>
        </div>
        <p>until mai anh's birthday on June 3rd!</p>
        <p class="timezone-info">(Vietnam time - UTC+07)</p>
    `;
    document.querySelector('.container').innerHTML = '';
    document.querySelector('.container').appendChild(countdownElement);
    
    const daysSpan = document.querySelector('.days');
    const hoursSpan = document.querySelector('.hours');
    const minutesSpan = document.querySelector('.minutes');
    const secondsSpan = document.querySelector('.seconds');
    
    // Update clock function
    function updateClock() {
        const t = getTimeRemaining(nextBirthday);
        
        // Add leading zeros
        daysSpan.innerHTML = t.days.toString().padStart(2, '0');
        hoursSpan.innerHTML = t.hours.toString().padStart(2, '0');
        minutesSpan.innerHTML = t.minutes.toString().padStart(2, '0');
        secondsSpan.innerHTML = t.seconds.toString().padStart(2, '0');
        
        if (t.total <= 0) {
            clearInterval(timeinterval);
            // Refresh page to show birthday content if it's June 3rd
            if (checkBirthdayDate()) {
                window.location.reload();
            }
        }
    }
    
    updateClock(); // Run once immediately
    const timeinterval = setInterval(updateClock, 1000);
};

// Show birthday content only on June 3rd or if override is set
const showBirthdayContent = () => {
    // Check for debug parameter in URL to override date check
    const urlParams = new URLSearchParams(window.location.search);
    const debugMode = urlParams.get('debug') === 'true';
    
    if (checkBirthdayDate() || debugMode) {
        // Birthday - show content and ask about music
        Swal.fire({
            title: 'Happy Birthday mai anh!',
            text: 'Do you want to play music in the background?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                document.querySelector('.song').play();
                animationTimeline();
            } else {
                animationTimeline();
            }
        });
    } else {
        // Not birthday - show countdown
        document.querySelector('.container').style.visibility = 'visible';
        
        // Calculate next birthday in Hanoi time
        const hanoiTime = getHanoiTime();
        const nextBirthday = new Date(hanoiTime);
        nextBirthday.setMonth(5); // June
        nextBirthday.setDate(3);
        
        // If this year's birthday has passed, set for next year
        if (nextBirthday < hanoiTime) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        
        // Set time to midnight Hanoi time
        nextBirthday.setHours(0, 0, 0, 0);
        
        // Initialize the countdown clock
        initializeClock(nextBirthday);
    }
};

// trigger when page loads
window.addEventListener('load', showBirthdayContent);

// animation timeline
const animationTimeline = () => {
    // Mobile check - adjust animations for smaller screens
    const isMobile = window.innerWidth <= 768;
    
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();

    tl.to(".container", 0.6, {
        visibility: "visible"
    })
    .from(".one", 0.7, {
        opacity: 0,
        y: 10
    })
    .from(".two", 0.4, {
        opacity: 0,
        y: 10
    })
    .to(".one",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3.5")
    .to(".two",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "-=1")
    .from(".three", 0.7, {
        opacity: 0,
        y: 10
    })
    .to(".three",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3")
    .from(".four", 0.7, {
        scale: 0.2,
        opacity: 0,
    })
    .from(".fake-btn", 0.3, {
        scale: 0.2,
        opacity: 0,
    })
    .staggerTo(
        ".hbd-chatbox span",
        1.5, {
            visibility: "visible",
        },
        0.05
    )
    .to(".fake-btn", 0.1, {
        backgroundColor: "rgb(127, 206, 248)",
    },
    "+=4")
    .to(
        ".four",
        0.5, {
            scale: 0.2,
            opacity: 0,
            y: -150
        },
    "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
        ".idea-5",
        0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        },
        "+=1.5"
    )
    .to(
        ".idea-5 span",
        0.7, {
            rotation: 90,
            x: 8,
        },
        "+=1.4"
    )
    .to(
        ".idea-5",
        0.7, {
            scale: 0.2,
            opacity: 0,
        },
        "+=2"
    )
    .staggerFrom(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        },
        0.2
    )
    .staggerTo(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        },
        0.2,
        "+=1.5"
    )
    .staggerFromTo(
        ".baloons img",
        2.5, {
            opacity: 0.9,
            y: 1400,
        }, {
            opacity: 1,
            y: isMobile ? -500 : -1000, // Adjust for mobile
        },
        0.2
    )
    .from(
        ".profile-picture",
        0.5, {
            scale: isMobile ? 2 : 3.5, // Smaller scale on mobile
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        },
        "-=2"
    )
    .from(".hat", 0.5, {
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0,
    })
    .staggerFrom(
        ".wish-hbd span",
        0.7, {
            opacity: 0,
            y: -50,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
        },
        0.1
    )
    .staggerFromTo(
        ".wish-hbd span",
        0.7, {
            scale: 1.4,
            rotationY: 150,
        }, {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: Expo.easeOut,
        },
        0.1,
        "party"
    )
    .from(
        ".wish h5",
        0.5, {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
        },
        "party"
    )
    .staggerTo(
        ".eight svg",
        1.5, {
            visibility: "visible",
            opacity: 0,
            scale: isMobile ? 40 : 80, // Smaller scale on mobile
            repeat: 3,
            repeatDelay: 1.4,
        },
        0.3
    )
    .to(".six", 0.5, {
        opacity: 0,
        y: 30,
        zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
        ".last-smile",
        0.5, {
            rotation: 90,
        },
        "+=1"
    );

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });
};