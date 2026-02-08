document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation (Intersection Observer)
    const sections = document.querySelectorAll('.section .content, .section p, .section h2, .section .choco-grid, .section .promise-list');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.classList.remove('hidden');

                // Specific logic for Promise Day list items
                if (entry.target.classList.contains('promise-list')) {
                    const items = entry.target.querySelectorAll('li');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 500); // Staggered delay
                    });
                }
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        section.classList.add('hidden'); // Ensure initial state is hidden
        observer.observe(section);
    });

    // Propose Day: "No" Button Logic
    const noBtn = document.getElementById('no-btn');
    if (noBtn) {
        const moveBtn = (e) => {
            if (e.type === 'click') e.preventDefault();

            // Move within the parent container (constrained area)
            const container = noBtn.parentElement;
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;

            // Calculate max positions
            const maxLeft = containerWidth - btnWidth;
            const maxTop = containerHeight - btnHeight;

            let newLeft, newTop;
            let attempts = 0;
            // Ensure significant movement (at least 30px)
            do {
                newLeft = Math.random() * maxLeft;
                newTop = Math.random() * maxTop;
                attempts++;

                const currentLeft = noBtn.offsetLeft;
                const currentTop = noBtn.offsetTop;
                // Simple distance check
                const dx = newLeft - currentLeft;
                const dy = newTop - currentTop;
                if (Math.sqrt(dx * dx + dy * dy) > 50) break;
            } while (attempts < 10);

            noBtn.style.position = 'absolute';
            noBtn.style.left = `${newLeft}px`;
            noBtn.style.top = `${newTop}px`;
        };

        noBtn.addEventListener('mouseover', moveBtn);
        noBtn.addEventListener('click', moveBtn);
    }
});

// Chocolate Day: Reveal Message
function revealMessage(element, message) {
    if (!element.classList.contains('revealed')) {
        element.textContent = message;
        element.classList.add('revealed');
    }
}

// Hug Day: Hug Animation
function giveHug() {
    const leftBear = document.getElementById('hug-left');
    const rightBear = document.getElementById('hug-right');
    const hugGif = document.getElementById('hug-gif');
    const hugImg = document.getElementById('hug-reveal-img');

    // Show initial elements
    leftBear.style.display = 'inline-block';
    rightBear.style.display = 'inline-block';

    // Ensure GIF is visible initially if hidden by CSS class
    hugGif.style.display = 'inline-block';
    hugGif.style.opacity = '1';

    // Move closer
    leftBear.style.transform = 'translateX(20px)';
    rightBear.style.transform = 'translateX(-20px)';

    // Reset bears and start fade sequence
    setTimeout(() => {
        leftBear.style.transform = 'translateX(0)';
        rightBear.style.transform = 'translateX(0)';

        // Fade out GIF
        hugGif.style.opacity = '0';

        // After fade out, switch to image
        setTimeout(() => {
            hugGif.style.display = 'none';
            if (hugImg) {
                hugImg.style.display = 'inline-block';
                // Trigger reflow
                void hugImg.offsetWidth;
                hugImg.style.opacity = '1';
            }
            alert("Sending you a BIG warm hug! 🤗");
        }, 1000); // Wait for opacity transition (1s)
    }, 2000); // Wait 2s before starting fade
}

// Valentine's Day: Open Letter
function openLetter() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('love-letter');

    envelope.style.display = 'none';
    letter.style.display = 'block';

    // Add a nice fade-in effect via CSS class or inline
    letter.style.opacity = 0;
    let op = 0.1;
    let timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        letter.style.opacity = op;
        letter.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}
