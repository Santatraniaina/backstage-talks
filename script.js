const container = document.querySelector('.container');
const issues = document.querySelectorAll('.issue');

// Dynamic paddingX for issues
function setAutoPaddingX() {
    issues.forEach( (issue) => {
        const padding = (window.innerHeight - issue.offsetHeight) / 2;
        issue.style.paddingTop = `${padding}px`;
        issue.style.paddingBottom = `${padding}px`;
    });
}

setAutoPaddingX();
window.addEventListener('resize', setAutoPaddingX);

// Scroll sync between container and window
document.addEventListener('scroll', function() {
    console.log('scrolling');
});