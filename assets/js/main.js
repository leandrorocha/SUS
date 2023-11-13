/*Controla funções no Menu Lateral*/
$(function () {
  class Accordion {
    constructor(el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;

      let links = this.el.find('.link');
      let modulos = this.el.find('.modulo');

      links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown);
      modulos.on('click', { el: this.el, multiple: this.multiple }, this.dropdown);
    }
    dropdown(e) {
      let $el = e.data.el;
      let $this = $(this);
      let $next = $this.next();
      let isModulo = $(this).hasClass("modulo");
      let isLink = $(this).hasClass("link");

      $next.slideToggle("fast");
      $this.parent().toggleClass('open');

      if (!e.data.multiple) {
        $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
      };

      if (isLink) {
        let lastAulaOpen = $next.parent().parent().parent().find(".step:last-child .contentMenu").hasClass("open");

        if (lastAulaOpen) {
          $next.parent().parent().parent().parent().find(".step:last-child .line").show();
        } else {
          $next.parent().parent().parent().parent().find(".step:last-child .line").hide();
        }
      }

      if (isModulo) {
        let lastAulaOpen = $next.parent().find(".step:last-child .contentMenu").hasClass("open");

        if (lastAulaOpen) {
          $next.parent().find(".step:last-child .line").show();
        } else {
          $next.parent().find(".step:last-child .line").hide();
        }
      }
    }
  };

  new Accordion($('#accordion'), false);
});

/* Deixa a aula atual aberta */
if (!$('#modulo1').find(".step:last-child .contentMenu").hasClass("open")) {
  $("#modulo1 .step:last-child .line").hide();
}
if (!$('#modulo2').find(".step:last-child .contentMenu").hasClass("open")) {
  $("#modulo2 .step:last-child .line").hide();
}
if (!$('#modulo3').find(".step:last-child .contentMenu").hasClass("open")) {
  $("#modulo3 .step:last-child .line").hide();
}

/* Adiciona suavidade na rolagem da ancoragem */
/*
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
*/

/* Adiciona tooltip (Abas) */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/* Rola tela para o Inicio da Aula*/
$(document).on('click', '.botaoComecar', function (e) {
  e.preventDefault();
  $('html,body').animate({ scrollTop: ($("#topico1").offset().top) }, 500);
});

/* Flip Cards */
$(".flipper").click(function (e) {
  var target = $(e.target);
  if (target.is("a")) {
    //follow that link
    return true;
  } else {
    $(this).toggleClass("flip");
  }
  return false;
});

/* COMPONENTE ACCORDION */
var accordion = $('body').find('[data-behavior="accordion"]');
var expandedClass = 'is-expanded';

$.each(accordion, function () {
  var accordionItems = $(this).find('[data-binding="expand-accordion-item"]');
  $.each(accordionItems, function () {
    var $this = $(this);
    var triggerBtn = $this.find('[data-binding="expand-accordion-trigger"]');

    var setHeight = function (nV) {
      // set height of inner content for smooth animation
      var innerContent = nV.find('.accordion__content-inner')[0],
        maxHeight = $(innerContent).outerHeight(),
        content = nV.find('.accordion__content')[0];

      if (!content.style.height || content.style.height === '0px') {
        $(content).css('height', maxHeight);
      } else {
        $(content).css('height', '0px');
      }
    };

    var toggleClasses = function (event) {
      var clickedItem = event.currentTarget;
      var currentItem = $(clickedItem).parent();
      var clickedContent = $(currentItem).find('.accordion__content')
      $(currentItem).toggleClass(expandedClass);
      setHeight(currentItem);

      if ($(currentItem).hasClass('is-expanded')) {
        $(clickedItem).attr('aria-selected', 'true');
        $(clickedItem).attr('aria-expanded', 'true');
        $(clickedContent).attr('aria-hidden', 'false');

      } else {
        $(clickedItem).attr('aria-selected', 'false');
        $(clickedItem).attr('aria-expanded', 'false');
        $(clickedContent).attr('aria-hidden', 'true');
      }
    }

    triggerBtn.on('click', event, function (e) {
      e.preventDefault();
      toggleClasses(event);
    });

    // open tabs if the spacebar or enter button is clicked whilst they are in focus
    $(triggerBtn).on('keydown', event, function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        toggleClasses(event);
      }
    });
  });

});

const players = Plyr.setup('.js-player', {
  loop: { active: false }
});

window.player = players;