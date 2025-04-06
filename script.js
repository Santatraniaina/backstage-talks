const container = document.querySelector('.container');
const issues = document.querySelectorAll('.issue');
const menus = document.querySelectorAll('.footer-menu a');
let lastScrollTop = 0;

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
    removeActive();
    issues.forEach(issue => {
        if (issue.id === this.getAttribute('href').substring(1)) {
            issue.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
            setBackgroundColor(issue.id);
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

function setBackgroundColor(issueName) {
    document.body.style.backgroundColor = `var(--${issueName})`;
}

function captureScroll(e){
    console.log('Scrolling from CONTAINER');
    if (e.target.scrollTop > lastScrollTop) {
        console.log('Scrolling DOWN');
    }
    else {
        console.log('Scrolling UP');
    }
    lastScrollTop = e.target.scrollTop;
}

//TODO : Review auto paddingX resizing
setBackgroundColor('issue-8');
setAutoPaddingX();
window.addEventListener('resize', setAutoPaddingX);

// Scroll sync between container and window
container.addEventListener('scroll', captureScroll);

menus.forEach(menu => menu.addEventListener('click', scrollToIssue));
// issues.forEach(issue => issue.addEventListener('scroll', captureScroll));