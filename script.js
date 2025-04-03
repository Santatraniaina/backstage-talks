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
    console.log(e)
    removeActive()
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
document.addEventListener('scroll', function() {
    console.log('scrolling');
});

menus.forEach(menu => menu.addEventListener('click', scrollToIssue));