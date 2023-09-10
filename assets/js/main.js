(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
  })

})()

var projectsSection = document.querySelector("#projects .row")
var technologiesSection = document.querySelector("#technologies .row")
//zao mi je sto moram ovo da uradim, sori
var projects = [
  {
      "id": 1,
      "title": "Zest",
      "alt": "zest",
      "img": "zest.png",
      "description": "A restaurant website",
      "link": "https://blumrj.github.io/zest/#1",
      "technologies": ["HTML", "CSS", "JavaScript"],
      "isResponsive": true
  },
  {
      "id": 2,
      "title": "Bike Garage",
      "alt": "bikeGarage",
      "img": "garage.jpg",
      "description": "Bike garage website",
      "link": "https://blumrj.github.io/garage/",
      "technologies": ["HTML", "CSS"],
      "isResponsive": false
  },
  {
      "id": 3,
      "title": "Bookwise",
      "alt": "bookwise",
      "img": "bookwise.jpg",
      "description": "Online bookstore",
      "link": "https://blumrj.github.io/random-quotes/",
      "technologies": ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      "isResponsive": true
  },
  {
      "id": 4,
      "title": "StreamVault",
      "alt": "streamVault",
      "img": "randomQuoteGenerator.jpg",
      "description": "Online movie and series website",
      "link": "https://blumrj.github.io/random-quotes/",
      "technologies": ["Vue","HTML", "CSS", "JavaScript", "Bootstrap"],
      "isResponsive": true
  },
  {
      "id": 5,
      "title": "Random quote generator",
      "alt": "randomQuoteGenerator",
      "img": "randomQuoteGenerator.jpg",
      "description": "Random Quote Generator",
      "link": "https://blumrj.github.io/random-quotes/",
      "technologies": ["HTML", "CSS", "JavaScript", "Bootstrap"],
      "isResponsive": true
  },
  {
      "id": 6,
      "title": "PHP Register Authentification",
      "alt": "registerAuthentification",
      "img": "randomQuoteGenerator.jpg",
      "description": "Login and registration form with e-mail authentification",
      "link": "https://blumrj.github.io/random-quotes/",
      "technologies": ["PHP", "HTML", "CSS", "JavaScript"],
      "isResponsive": true
  }
]
var techs = [
  {
      "id": 1,
      "name": "HTML",
      "img": "html.png"
  },
  {
      "id": 2,
      "name": "CSS",
      "img": "css.png"
  },
  {
      "id": 3,
      "name": "JavaScript",
      "img": "js.png"
  },
  {
      "id": 4,
      "name": "PHP",
      "img": "php.png"
  },
  {
      "id": 5,
      "name": "Vue",
      "img": "vue.png"
  },
  {
      "id": 6,
      "name": "Node.js",
      "img": "node.png"
  },
  {
      "id": 7,
      "name": "Bootstrap",
      "img": "bootstrap.png"
  },
  {
      "id": 8,
      "name": "MySQL",
      "img": "mysql.png"
  }
]

async function renderProjects(){
  projects.forEach((p) => {
    createACard(p.img, p.title, p.description, p.link, p.alt)
    createAProjectModal(p.alt, p.title, p.img, p.description, p.technologies, p.isResponsive, p.link)
  })
}
renderProjects()

async function renderTechs(){
  techs.forEach((t) => {
    createATech(t.img, t.name)
  })
}
renderTechs() 

function createACard(img, title, desc, link, modalTarget){
  img = img ? img : "portfolio-3.jpg"
  var html = `
  <div class="col">
    <div class="card h-100">
      <img src="assets/img/portfolio/${img}" class="card-img" alt="${title}">
      <div class="card-body d-grid">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${desc}</p>
        <div class="align-self-end">
          <a href="${link}" target="_blank" class="btn btn-primary">Visit website</a>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalTarget}">See more</button>
        </div>
      </div>
    </div>
  </div>`

projectsSection.innerHTML += html

}

function createAProjectModal(id, title, img, desc, tecs, isResponsive, link){
  var responsive = isResponsive ? "Yes" : "No";
  var technologies = tecs.join(", ");
  var html = `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="${id}Label">${title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img src="assets/img/portfolio/${img}" alt="${title}" class="img-fluid">
        <div class="mt-3">
          <p>Description: ${desc}</p>
          <p>Technologies used: ${technologies}</p>
          <p>Responsive: ${responsive}</p>
        </div>
      </div>
      <div class="modal-footer">
        <a href="${link}" target="_blank" class="btn btn-primary">Visit website</a>
      </div>          
    </div>
  </div>
</div>`

document.querySelector("#modals").innerHTML += html
}

function createATech(img, alt){
  html = `<div class="col-lg-3 col-md-4 col-6 d-flex align-items-center justify-content-center" data-aos="zoom-in">
  <img src="assets/img/technologies/${img}" class="img-fluid tech-logo" alt="${alt}">
</div>`

technologiesSection.innerHTML += html
}