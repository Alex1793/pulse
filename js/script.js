// Slider

const next = document.querySelector('.carousel__next'),
      prev = document.querySelector('.carousel__prev'),
      slides = document.querySelectorAll('.carousel__slide');

let sideIndex = 0;


function hideSlides () {
    slides.forEach(item => {
        item.style.display = 'none';
    })
}

function showSlide (sideIndex = 0) {
    slides[sideIndex].style.display = 'block';
} 

hideSlides();
showSlide();
  

next.addEventListener('click', () => {
    sideIndex++;

    if(sideIndex >= slides.length) {
        sideIndex = 0;
    }

    hideSlides();
    showSlide(sideIndex);
})

prev.addEventListener('click', () => {
    sideIndex--;

    if(sideIndex < 0) {
        sideIndex = slides.length - 1;
    }

    hideSlides();
    showSlide(sideIndex);
})


// Cards
const btnMoreInfo = document.querySelectorAll('.catalog-item__link'),
      listInfo = document.querySelectorAll('.catalog-item__list'),
      content = document.querySelectorAll('.catalog-item__content'),
      btnBack = document.querySelectorAll('.catalog-item__back');

btnMoreInfo.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        item.closest('.catalog-item__content').classList.remove('catalog-item__content_active');

        item.closest('.catalog-item__content').nextElementSibling.classList.add('catalog-item__list_active');
    });
})

btnBack.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        item.closest('.catalog-item__list').classList.remove('catalog-item__list_active');

        item.closest('.catalog-item__list').previousElementSibling.classList.add('catalog-item__content_active');
    })
})

// Tabs

const tabsContainer = document.querySelector('.catalog__tabs'),
      tabContent = document.querySelectorAll('.catalog__content'),
      tabs = document.querySelectorAll('.catalog__tab');

    
    function hideTabContent () {
        tabContent.forEach(item => {
            item.classList.add('catalog__content_hide');
        })

        tabs.forEach(item => {
            item.classList.remove('catalog__tab_active');
        })
    }

    function showTabContent (tabIndex = 0) {
        tabContent[tabIndex].classList.remove('catalog__content_hide');
        tabContent[tabIndex].classList.add('catalog__content');
        tabs[tabIndex].classList.add('catalog__tab_active');
    }

    hideTabContent();
    showTabContent();

tabsContainer.addEventListener('click', (e) => {
    const target = e.target;
    
    if(target.closest('.catalog__tab')) {
        tabs.forEach((item, i) => {
            if(target.closest('.catalog__tab') == item) {
                hideTabContent();
                showTabContent(i);
            }
        })
    }
})


// Modal


function modal (btn, modalSelector, closeSelector) {
    const btnCall = document.querySelectorAll(btn),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          overlay = modal.closest('.overlay');


    function controlModal (display, overflow) {
        modal.style.display = display;
        overlay.style.display = display;
        document.documentElement.style.overflow = overflow;
    }

    btnCall.forEach(item => {
        item.addEventListener('click', () => {

            if (modal.getAttribute('id') === 'order') {
                const descr = item.closest('.catalog-item__footer').previousElementSibling.previousElementSibling.firstElementChild.children[1].textContent;
        
                document.querySelector('#order .modal__descr').textContent = descr;
            }

            controlModal('block', 'hidden');
        })
    })

    close.addEventListener('click', () => {
        controlModal('none', '')
    });

    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) {
            controlModal('none', '');
        }
    })

}

modal('[data-modal="consultation"]', '#consultation', '#consultation  .modal__close');
modal('.button_mini', '#order', '#order .modal__close');




// Scroll up

const promoSection = document.querySelector('.promo'),
      arrowUp = document.querySelector('.arrow');


const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if(!entry.isIntersecting) {
        arrowUp.style.display = 'block';
    } else {
        arrowUp.style.display = 'none';
    }
}, {
    root: null,
    threshold: 0
});

observer.observe(promoSection);


arrowUp.addEventListener('click', () => {
    promoSection.scrollIntoView({behavior: "smooth"});
});