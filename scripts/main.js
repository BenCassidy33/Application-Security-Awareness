import { constants } from "../scripts/constants.js"

const darkModeToggleButton = document.getElementById("lightDarkToggleButton")
const root = document.querySelector(':root')

const image = document.getElementById("parallax-img");

const scrollImg = document.getElementById("content-image");
const scrollBounds = document.getElementById("scroll-bounds");
const scrollImgStart = document.getElementsByClassName("talking-point")[0]
scrollImg.style.transform = `translateY(${scrollImgStart.clientHeight / 2}px)`

let windowCenter = { x: window.innerWidth / 2, y: window.scrollY + (window.innerHeight / 2) }

window.addEventListener('scroll', function() {
    windowCenter.y = window.scrollY + (window.innerHeight / 2)

})

let toggleState = 0
darkModeToggleButton.onclick = () => {
    toggleState = 1 - toggleState

    if (toggleState) {
        root.addStyles({
            [constants.selectors.background]: constants.white,
            [constants.selectors.text_color]: constants.black
        })

    } else {
        root.addStyles({
            [constants.selectors.background]: constants.black,
            [constants.selectors.text_color]: constants.white
        })
    }
}


function addTestBlock(top = windowCenter.y, left = windowCenter.x, border = 0, padding = { x: 0, y: 0 }) {
    let container = document.getElementById('testing')
    let text = document.getElementById('test-text')

    container.style.display = "flex"
    container.style.top = `${top}px`
    container.style.left = `${left}px`
    container.style.border = `${border}px solid white`
    container.style.padding = `${padding.y}px ${padding.x}px ${padding.y}px ${padding.x}px`
    //container.style.transform = `translate(${left}px, ${top}px)`
    text.innerText = `X: ${left}, Y: ${top}`
}


window.addEventListener('scroll', () => {
    //let centerPos = windowCenter.y;
    let centerPos = window.scrollY + window.innerHeight / 2;
    if (windowCenter.y < scrollBounds.offsetTop) return;
    let styles = getComputedStyle(scrollBounds)

    scrollImg.style.transform = `translateY(${centerPos - scrollBounds.offsetTop}px)`

    console.log(scrollBounds.clientHeight - scrollImg.clientHeight)
    if (windowCenter.y + scrollImg.clientHeight > scrollBounds.offsetTop + scrollBounds.clientHeight) {
        scrollImg.style.transform = `translateY(${scrollBounds.clientHeight - scrollImg.clientHeight}px)`

    }
})


const talkingPoints = document.getElementsByClassName("talking-point")

window.addEventListener('scroll', function() {
    for (const talkingPoint of talkingPoints) {
        let elemHeight = talkingPoint.clientHeight
        let elemCenter = talkingPoint.offsetTop + elemHeight / 2
        let maxRange = elemHeight * 2

        const distance = Math.abs(windowCenter.y - elemCenter);
        if (distance <= maxRange) {
            const normalizedDistance = distance / maxRange;
            const brightness = 1 - normalizedDistance;

            talkingPoint.style.opacity = brightness;
            talkingPoint.style.filter = `brightness(${brightness * 1.2})`;
        } else {
            talkingPoint.style.opacity = 0.2;
            talkingPoint.style.filter = 'brightness(0.2)';
        }
    }
})



window.addEventListener('scroll', () => {
    let scrollPos = windowCenter.y;
    let imageCenter = image.offsetTop + image.clientHeight / 2

    if (scrollPos < imageCenter) return;
    let dy = (scrollPos - imageCenter)
    let ds = 0.4 + dy * 0.0005

    image.style.transform = `translateY(${dy}px) scale(${Math.min(1.5, ds)})`

    if (dy > 5000) {
        image.style.transform = `translateY(5000px) scale(1.5)`
    }
})

document.getElementById("parallax-range").style.marginTop = "13200px"

