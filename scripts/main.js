import { constants } from "../scripts/constants.js"

const darkModeToggleButton = document.getElementById("lightDarkToggleButton")
const root = document.querySelector(':root')

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

function addTestBlock(top, left) {
    let block = document.getElementById('test-block')

    block.style.display = "block"
    block.style.top = `${top}px`
    block.style.left = `${left ? left : window.innerWidth / 2}px`
}


// TODO: impliment scrolling behaviour

window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY;
    let contentContainer = document.getElementById("content-image")
    let scrollBounds = document.getElementById("scroll-bounds");
    let bottomBound = scrollBounds.offsetTop + scrollBounds.clientHeight

    contentContainer.style.transform = `translateY(${Math.min(scrollPos, bottomBound)}px)`
})


window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + window.innerHeight / 2;

    let image = document.getElementById("parallax-img")
    let imageCenter = image.offsetTop + image.clientHeight / 2

    if (scrollPos < imageCenter) return;
    let dy = (scrollPos - imageCenter)
    let ds = 0.4 + dy * 0.0005
    console.log(dy)

    image.style.transform = `translateY(${dy}px) scale(${Math.min(1, ds)})`

    if (dy > 5000) {
        image.style.transform = `translateY(5000px)`
    }
})
