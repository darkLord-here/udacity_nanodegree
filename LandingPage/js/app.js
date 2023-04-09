const nav = document.getElementById('navbar__list');
const sections = document.getElementsByTagName('section');
let sectionPositions = []
let selectedSection = ''

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function refreshState(idx){
    for (let i = 0; i < sections.length; i++) {
		if (idx === i) {
            // console.log(idx, i)
			document.querySelector(`#menu_link${idx + 1}`).classList.add("active");
			document.querySelector(`#section${idx + 1}`).classList.add("your-active-class");
		} else {
			document.querySelector(`#menu_link${i + 1}`).removeAttribute("class");
			document.querySelector(`#section${i + 1}`).removeAttribute("class");
		}
	}
}


function scrollOffset(x, y){
    window.scrollTo(x, y);
}

function jumpToSection(event){
    event.preventDefault();
    selectedSection = '';
    selectedSection = event.target.innerText;
    // console.log(event)
    let idx = Array.from(sections).findIndex((element) => element.getAttribute('data-nav') === selectedSection);
    // console.log(`selected ${idx}`);
    document.querySelector(`[data-nav='${selectedSection}']`).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

    refreshState(idx);
}


// Create DocumentFragment to avoid multiple repaint and reflows
let tempDocument = new DocumentFragment();

for(let [index,section] of Array.from(sections).entries()){
    // get data-nav attribute from the section as it contains the section name
    let name = section.getAttribute('data-nav');
    // get the area of the section
    let offset = section.getBoundingClientRect();

    // Create element and assign required attributes
    let tag = document.createElement('li');
    tag.setAttribute("id", `menu_link${index+1}`);
    tag.setAttribute("class", "menu_link");

    tag.style.color = 'black';
    tag.innerHTML = `<p>${name}</p>`
    // tag.innerHTML = `<a onClick="scrollOffset(${offset.x}, ${offset.y})">${name}</a>`
    
    // Add the element to Document Fragment
    tempDocument.appendChild(tag);
}

// Append DocumentFragment as child to nav
nav.appendChild(tempDocument);


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
document.addEventListener('scroll', ()=>{
    sectionPositions = []
    Array.from(sections).forEach((section)=> sectionPositions.push(section.getBoundingClientRect().top)+30);
    let idx = sectionPositions.findIndex((element) => element >= 0);
    refreshState(idx);
}, true);


// Jump to section
nav.addEventListener('click', jumpToSection, true);


