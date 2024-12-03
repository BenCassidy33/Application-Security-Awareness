import { constants } from "../scripts/constants.js"

const darkModeToggleButton = document.getElementById("lightDarkToggleButton")
const root = document.querySelector(':root')
const image = document.getElementById("parallax-img");
const scrollBounds = document.getElementById("scroll-bounds");
//const scrollImgStart = document.getElementsByClassName("talking-point")[0]

document.querySelectorAll('.header-node').forEach(elem => {
    elem.addEventListener('click', function() {
        document.getElementById(elem.dataset.scrollTo).scrollIntoView({ behavior: 'smooth' })
    })
})


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

        document.getElementById("toggle-button-img").setAttribute("src", constants.images.light)

    } else {
        root.addStyles({
            [constants.selectors.background]: constants.black,
            [constants.selectors.text_color]: constants.white
        })

        document.getElementById("toggle-button-img").setAttribute("src", constants.images.dark)
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
    text.innerText = `X: ${left}, Y: ${top}`
}


window.addEventListener('scroll', () => {
    //let centerPos = windowCenter.y;
    let centerPos = window.scrollY + window.innerHeight / 2;
    if (windowCenter.y < scrollBounds.offsetTop) return;
    let styles = getComputedStyle(scrollBounds)

    //scrollImg.style.transform = `translateY(${centerPos - scrollBounds.offsetTop}px)`

    //console.log(scrollBounds.clientHeight - scrollImg.clientHeight)
    //if (windowCenter.y + scrollImg.clientHeight > scrollBounds.offsetTop + scrollBounds.clientHeight) {
    //    scrollImg.style.transform = `translateY(${scrollBounds.clientHeight - scrollImg.clientHeight}px)`
    //
    //}
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
            //talkingPoint.style.filter = `brightness(${brightness * 1.2})`;
            talkingPoint.style.opacity = `${brightness * 1.2}`;
        } else {
            talkingPoint.style.opacity = 0;
            talkingPoint.style.filter = '0';
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

    if (dy > 3000) {
        image.style.transform = `translateY(3000px) scale(1.5)`
    }
})

//document.getElementById("parallax-range").style.marginTop = "13200px"

const navbar = document.getElementById('navbar')
navbar.addEventListener("mouseover", function() {
    navbar.style.opacity = 1
})

navbar.addEventListener("mouseleave", function() {
    setInterval(() => {
        navbar.style.opacity = 1
    }, 3000)
})

window.addEventListener('scroll', function() {
    if (window.scrollY > 1000) {
        navbar.style.opacity = 0
    } else if (window.scrollY < 1000) {
        navbar.style.opacity = 1
    }
})

const modalContainer = document.getElementById('form-modal-container')
const supporters = document.getElementById('supporters')
window.addEventListener('scroll', function() {
    modalContainer.style.transform = `translateY(${window.scrollY - modalContainer.clientHeight / 2}px)`
})

const form = document.getElementById('sign-up-form')


function getOrdinalSuffix(day) {
    if (day % 10 === 1 && day % 100 !== 11) return `${day}st`;
    if (day % 10 === 2 && day % 100 !== 12) return `${day}nd`;
    if (day % 10 === 3 && day % 100 !== 13) return `${day}rd`;
    return `${day}th`;
}

form.addEventListener('submit', function(e) {
    e.preventDefault()


    let formData = Object.fromEntries(new FormData(form))
    let date = new Date(Date.now())

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let nextContent = `
            Signed By ${formData["fname"]} ${formData["lname"]} in ${formData["hometown-input"]} on the ${getOrdinalSuffix(date.getDay())} of ${monthNames[date.getMonth()]}, ${date.getFullYear()}
        `

    if (!supporters.textContent.includes(nextContent)) {
        supporters.innerHTML += `
            <div>${nextContent}</div><br>
        `
        modalContainer.style.display = "flex"
        modalContainer.classList.add('visible')
        modalContainer.style.transform = `translateY(${window.scrollY - modalContainer.clientHeight / 2}px)`
        document.getElementById("message-box").textContent = `Thank You ${formData["fname"]} for showing your support!`
    }

    setTimeout(() => {
        modalContainer.classList.remove('visible')
    }, 2500)
})

document.getElementById('close-modal').addEventListener('click', () => {
    modalContainer.classList.remove('visible')
})

