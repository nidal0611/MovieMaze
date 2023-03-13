
var called;
function loadsearch(){

  // Get the value of the input from localStorage
  var inputVal = localStorage.getItem('inputVal');
  
  // Set the value of the output element
  document.getElementById('searchBox').value = inputVal;
  
  // Remove the value from localStorage to prevent it from being used again
  localStorage.removeItem('inputVal');
   called=true;

  search();
}
  /* searchbar function*/
  function search() {
    /* if movie not found */
    var msg = document.getElementById("msg");
    msg.style.display = "none";

    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchBox");
    /* makes search input and movie names uppercase to avoid conflicts */
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName("movie-card");
    /* var to check if movie is found */
    var c = 0;
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h3")[0];
      txtValue = a.textContent;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        c++;
      } else {
        /* hide movies not matching */
        li[i].style.display = "none";
      }
    }
    /* when movie not found display message */
    if (c == 0 && event.key === "Enter" ||(c==0 && called)) {

      msg.style.display = "block";
      called=false;
    }
  }
  /* categories filter  function */
  function hideElementsOnSelectChange(selectId, elementClass) {
    /* automatically detect genres and append them to the list */
    const select = document.getElementById(selectId);
    const elements = document.getElementsByClassName(elementClass);
    let optionValues = [];

    for (let i = 0; i < elements.length; i++) {
      let category = elements[i].getAttribute('data-category');
      if (!optionValues.includes(category) && category) {
        optionValues.push(category);
        let option = document.createElement('option');
        option.value = category;
        option.text = category;
        /* add the detected genre as an option is the select element */
        select.appendChild(option);
      }
    }
    /* apply filter */
    /* activates when option change detected */
    select.addEventListener('change', function () {
      input = document.getElementById("searchBox");
      input.value="";
      var hide = document.getElementById("msg");
      msg.style.display = "none";
      let selectValue = this.value;
      let showElements = [];
      let hideElements = [];

      for (let i = 0; i < elements.length; i++) {
        let category = elements[i].getAttribute('data-category');
        if (category === selectValue) {
          showElements.push(elements[i]);
        } else {
          hideElements.push(elements[i]);
        }
      }

      if (selectValue === 'genres') {
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = '';
        }
      } else {
        for (let i = 0; i < showElements.length; i++) {
          showElements[i].style.display = '';
        }

        for (let i = 0; i < hideElements.length; i++) {
          hideElements[i].style.display = 'none';
        }
      }
    });

  }
  /* erase filters and search values */
  function refresh() {
    location.reload();
  }
  /* open login page in new window */
  function login() {
    window.open("login.html");
  }
 /* sort movies function */
 function sortMovies() {
  const radios = document.getElementsByName('grade');
  let selectedRadio;
  /* detect selected radio */
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedRadio = radios[i];
      break;
    }
  }
  /* create an array containing the movies */
  const movies = document.getElementsByClassName('movie-card');
  const moviesArray = Array.from(movies);
  /* by popularity */
  if (selectedRadio.value === 'popular') {
    moviesArray.sort((a, b) => {
      const aPopularity = parseInt(a.getAttribute('data-popularity'));
      const bPopularity = parseInt(b.getAttribute('data-popularity'));
      return bPopularity - aPopularity;
    });
    /* by release date */
  } else if (selectedRadio.value === 'newest') {
    moviesArray.sort((a, b) => {
      const aReleaseDate = new Date(a.getAttribute('data-release-date'));
      const bReleaseDate = new Date(b.getAttribute('data-release-date'));
      return bReleaseDate - aReleaseDate;
    });
    /* by rating */
  } else if (selectedRadio.value === 'rate') {
    moviesArray.sort((a, b) => {
      const arate = parseFloat(a.getAttribute('data-rate'));
      const brate = parseFloat(b.getAttribute('data-rate'));
      return brate - arate;
    });
  }
  /* empty movielist then refill it with sorted movies using appendchild */
  const movieList = document.getElementById('movie-list');
  movieList.innerHTML = '';
  moviesArray.forEach(movie => {
    movieList.appendChild(movie);
  });
}
/* detect radio change and trigger function */
const sortRadios = document.getElementsByName('grade');
sortRadios.forEach(radio => {
  radio.addEventListener('change', sortMovies);
});

 //scroll to top 

 var to_top_button = document.getElementById("to_top");

 window.onscroll = function () { scroll_detect() };

 function scroll_detect() {
   if (document.documentElement.scrollTop > 169) {
     to_top_button.style.display = "block";
   } else {
     to_top_button.style.display = "none";
   }
 }
 function scroll_to_top() {
   window.scrollTo({
     top: 0,
     behavior: "smooth"
   });
 }
 function search2() {
  var inputVal = document.getElementById('searchBox').value;
  localStorage.setItem('inputVal', inputVal);



  // go to search results
  const targetElement ="index.html#viewSearch";
  window.location.href = targetElement;
}
//


// variables for navbar menu toggle
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbarMenuBtn = document.querySelector('.navbar-menu-btn');

// variables for navbar search toggle
const navbarForm = document.querySelector('.navbar-form');
const navbarFormCloseBtn = document.querySelector('.navbar-form-close');
const navbarSearchBtn = document.querySelector('.navbar-search-btn');


// navbar menu toggle function
//add 'active' to the class name 
function navIsActive() {
  header.classList.toggle('active');
  nav.classList.toggle('active');
  navbarMenuBtn.classList.toggle('active');
}

navbarMenuBtn.addEventListener('click', navIsActive);



// navbar search toggle function
function searchBarIsActive () {
 navbarForm.classList.toggle('active');
}
navbarSearchBtn.addEventListener('click', searchBarIsActive);
navbarFormCloseBtn.addEventListener('click', searchBarIsActive);
