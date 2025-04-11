const issues = document.querySelectorAll('.issue');
const menus = document.querySelectorAll('.footer-menu a');


// Scroll to the issue on related menu click
function scrollToIssue(e) {
    e.preventDefault();
    issues.forEach(issue => {
        if (issue.id === this.getAttribute('href').substring(1)) {
            issue.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }
    });
}

function removeActive() {
    for ( const menu of menus ) {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    }
}

function setBackgroundColor(issueName) {
    document.body.style.backgroundColor = `var(--${issueName})`;
}

// Observe the current issue that is in view and set
// the background color and active menu based on it
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const issue = entry.target;
                setBackgroundColor(issue.id);
                removeActive();
                Array.from(menus).filter(
                    menu => menu.getAttribute('href').substring(1) === issue.id
                )[0].classList.add('active');
            }
        })
    },
    {
        threshold: 0.65
    }
);

menus.forEach(menu => menu.addEventListener('click', scrollToIssue));
issues.forEach(issue => observer.observe(issue));