const issues = document.querySelectorAll('.issue');
const menus = document.querySelectorAll('.footer-menu a');
const hamburgerMenu = document.querySelector('.hamburger-menu');

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
    /*if (document.querySelector('.footer-menu').classList.contains('float-menu')) {
        for (const menu of menus) {
            // menu.style.backgroundColor = `var(--${issueName})`;
            // TODO : Color more pronounced
            menu.style.color = `var(--${issueName})`;
        }
    }*/
}

// Observe the current issue that is in view and set
// the background color and active menu based on it
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('credit')) {
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
hamburgerMenu.addEventListener('click', () => {
    const floatMenu = document.querySelector('.float-menu');
    hamburgerMenu.classList.toggle('active');
    floatMenu.classList.toggle('active');
});