
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
var body = document.body


async function getJson(url){
  try {
    var res = await fetch(url)
    return await res.json()
  } catch (error) {
    console.log(error);
  }
}

async function renderProjects(){
  var url = "../../projects.json"
  var projects = await getJson(url)
  projects.forEach((p) => {
    createACard(p.img, p.title, p.description, p.link, p.alt)
    createAProjectModal(p.alt, p.title, p.img, p.description, p.technologies, p.isResponsive, p.link)
  })
}
renderProjects()

async function renderTechs(){
  var url = "../../technologies.json"
  var techs = await getJson(url)
  techs.forEach((t) => {
    createATech(t.img, t.name)
  })
}
renderTechs() 

function createACard(img, title, desc, link, modalTarget){
  img = img ? img : "portfolio-3.jpg"
  var html = `<div class="col-lg-4 col-md-6"><div class="card">
  <img src="assets/img/portfolio/${img}" class="card-img" alt="${title}">
  <div class="card-img-overlay">
    <h5 class="card-title">${title}</h5>
    <p class="card-text"><small>${desc}</small></p>
    <p class="card-text"><a href="${link}" target="_blank">Visit website</a></p>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalTarget}">See more</button>
  </div>
</div></div>`

projectsSection.innerHTML += html

}

function createAProjectModal(id, title, img, desc, tecs, isResponsive, link){
  var responsive = isResponsive ? "Yes" : "No";
  var technologies = tecs.join(", ");
  var html = `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
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

body.innerHTML += html
}

function createATech(img, alt){
  html = `<div class="col-lg-3 col-md-4 col-6 d-flex align-items-center justify-content-center" data-aos="zoom-in">
  <img src="assets/img/technologies/${img}" class="img-fluid tech-logo" alt="${alt}">
</div>`

technologiesSection.innerHTML += html
}