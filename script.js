const issues = document.querySelectorAll('.issue');
const menus = document.querySelectorAll('.footer-menu a');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const footerMenu = document.querySelector('.footer-menu');

// Scroll to the issue on related menu click
function scrollToIssue(e) {
    e.preventDefault();
    issues.forEach(issue => {
        const href = this.getAttribute('href').substring(1);
        if (issue.id === href) {
            issue.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
            toggleMenu();
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

function toggleMenu() {
    hamburgerMenu.classList.toggle('active');
    if (footerMenu.classList.contains('float-menu')) {
        footerMenu.classList.toggle('active');
    }
}

function handleResize() {
    if (window.matchMedia('(max-width: 650px)').matches) {
        footerMenu.classList.add('float-menu');
    } else {
        footerMenu.classList.remove('float-menu');
        footerMenu.classList.remove('active');
        hamburgerMenu.classList.remove('active');
    }
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
hamburgerMenu.addEventListener('click', toggleMenu);
window.addEventListener('resize', handleResize);
handleResize();