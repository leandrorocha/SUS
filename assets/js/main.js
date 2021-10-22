/* Fixa Menu Superior */
$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() !== $(document).height()) {
    $(".navbar").addClass("fixed-top");
  }

  if ($(window).scrollTop() === 0) {
    $(".navbar").removeClass("fixed-top");
    $("#row-main").css("padding-top", "0%");
    $(".navbar").css("box-shadow", "0px 0px 0px rgba(0,0,0,0.5)")
  } else {
    $(".navbar").addClass("fixed-top");
    $("#row-main").css("padding-top", ($('#menuSuperior').css("height")));
    $(".stepContainer").css("padding-bottom", ($('#menuSuperior').css("height")));
    $(".navbar").css("box-shadow", "0px 2px 2px rgba(0,0,0,0.5)")
  }
});

$(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    var target = $(this.hash);

    if ($('.botaoComecar').attr("aria-expanded") === 'false') {
      $('.mostraAula.collapse').addClass("show");
    }

    $('html,body').stop().animate({
      scrollTop: target.offset().top - 130
    }, 'linear');
  })
});

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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/* Adiciona tooltip (Abas) */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/* Rola tela para o Inicio da Aula*/
$(document).on('click', '.botaoComecar', function (e) {
  e.preventDefault();
  $('html,body').animate({ scrollTop: ($("#topico1").offset().top) }, 500);
});