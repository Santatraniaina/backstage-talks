const issues = document.querySelectorAll('.issue');
const menus = document.querySelectorAll('.footer-menu a');

// Dynamic paddingX for issues
function setAutoPaddingX() {
    issues.forEach( (issue) => {
        const padding = (window.innerHeight - issue.offsetHeight) / 2;
        issue.style.paddingTop = `${padding}px`;
        issue.style.paddingBottom = `${padding}px`;
    });
}

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

//TODO : Review auto paddingX resizing
setAutoPaddingX();
window.addEventListener('resize', setAutoPaddingX);
menus.forEach(menu => menu.addEventListener('click', scrollToIssue));
issues.forEach(issue => observer.observe(issue));