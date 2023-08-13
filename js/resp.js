var search = document.getElementById('search');
var data = `<input type="text" name="search" id="search"><img src="img/search2.png" alt="search" srcset="" >`;
function input() {
    search.innerHTML = data; 
}

burger = document.querySelector('.burger');
navbar = document.querySelector('.navbar');
navList = document.querySelector('.nav-list');
rightNav = document.querySelector('.right-nav');
burger.addEventListener('click',()=>{
    rightNav.classList.toggle('v-class');
    navList.classList.toggle('v-class');
});