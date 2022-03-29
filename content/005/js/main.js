var appendAttr = function (visibility, click) {
    var num = 1;
    return {
        viewArea: function () {
            var sectionList = document.querySelectorAll('section');
            Array.prototype.slice.call(sectionList).forEach(function (section) {
                section.classList.add(visibility + num++);
            });
            return num = 1;
        },
        cvArea: function () {
            var btnList = document.querySelectorAll('[data-type="click"]');
            Array.prototype.slice.call(btnList).forEach(function (btn) {
                btn.classList.add(click + num++);
            });
            return num = 1;
        },
        setRel: function () {
            var aList = document.querySelectorAll('a');
            Array.prototype.slice.call(aList).forEach(function (els) {
                if (els.hasAttribute('target') === false) {
                    return;
                }
                if (els.getAttribute('target') !== '_blank') {
                    return;
                }
                els.setAttribute('rel', 'noopener noreferrer');
            });
        }
    };
}('view_area_', 'cv_area_');
appendAttr.viewArea();
appendAttr.cvArea();
appendAttr.setRel();

const swiper01 = new Swiper('.swiper--01', {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 6500,
  },
  slidesPerView: 1,
  speed: 2000,
  allowTouchMove: false,
});

const swiper02 = new Swiper('.swiper--02', {
  loop: true,
  autoplay: {
    delay: 0,
  },
  slidesPerView: 0.3,
  speed: 24000,
  allowTouchMove: false,
  breakpoints: {
    1206: {
      slidesPerView: 1.5,
    }
  },
});

const swiper03 = new Swiper('.swiper--03', {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 0,
  },
  slidesPerView: 1.5,
  speed: 6000,
  allowTouchMove: false,
  breakpoints: {
    1206: {
      spaceBetween: 40,
      slidesPerView: 5,
    }
  },
});

const $headerNav = $('.header__nav');
const $headerBtn = $('.header__btn');
$headerBtn.on('click', (e) => {
  $(e.currentTarget).parent().add($headerNav).toggleClass('is-active');
})

const $header = $('.header');
const $sec01 = $('.sec01');
const $sec02 = $('.sec02');
const $sec08 = $('.sec08');
const $float = $('.float');
const $jsBtn01 = $('.js-btn01');
const $jsBtn02 = $('.js-btn02');
const breakPoint = 1206;
const speed = 500;
let showPoint;
let sec01Position;
let sec02Position;
let sec08Position;
let scroll;
let flg;
let windowWidth;

$(window).on('load resize', () => {
  sec01Position = $sec01.offset().top;
  sec02Position = $sec02.offset().top;
  sec08Position = $sec08.offset().top;
  showPoint = $header.height();
  windowWidth = window.innerWidth;
  if(windowWidth < breakPoint) {
    flg = 1;
    sec02Position -= 50;
    sec08Position -= 50;
  } else {
    sec02Position -= 93;
    sec08Position -= 93;
  }
  if($header.hasClass=('is-active')) {
    $header.removeClass('is-active');
  }
});

$(window).on('scroll', () => {
  scroll = $(this).scrollTop();
  if(flg === 1) {
    if(scroll > showPoint) {
      $header.addClass('is-active');
    } else {
      $header.removeClass('is-active');
    }
    if(scroll > sec01Position && scroll < sec08Position) {
      $float.addClass('is-active');
    } else {
      $float.removeClass('is-active');
    }
  }
});

$jsBtn01.on('click', (e) => {
  e.preventDefault();
  $("html,body").animate({scrollTop:sec02Position},speed);
  if(flg === 1) {
    $headerBtn.parent().add($headerNav).removeClass('is-active');
  }
});

$jsBtn02.on('click', (e) => {
  e.preventDefault();
  $("html,body").animate({scrollTop:sec08Position},speed);
});