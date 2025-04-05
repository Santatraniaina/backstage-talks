const container = document.querySelector('.container');
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

function scrollToIssue(e) {
    e.preventDefault();
    removeActive();
    issues.forEach(issue => {
        if (issue.id === this.getAttribute('href').substring(1)) {
            issue.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }
    });
    this.classList.add('active');
}

function removeActive() {
    for ( const menu of menus ) {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    }
}

setAutoPaddingX();
window.addEventListener('resize', setAutoPaddingX);

// Scroll sync between container and window
container.addEventListener('scroll', (e) => {
    console.log('scrolling');

});

menus.forEach(menu => menu.addEventListener('click', scrollToIssue));