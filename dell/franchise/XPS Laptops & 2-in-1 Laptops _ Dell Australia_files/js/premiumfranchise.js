"use strict";

Dell.BrandFeatures = Dell.BrandFeatures || {};

(function ($, document, window) {
  'use strict';

  (function () {
    var timeout;
    var $isDevice = false;
    var $this = this;
    var featureSections = [];
    var sectionElements = document.querySelectorAll('.cfsf-features-section');

    var getTop = function getTop(section) {
      if ($isDevice) {
        if (section && section.image) {
          return section.image.getBoundingClientRect().top;
        }
      } else {
        if (section && section.specs.length > 0) {
          return section.specs[0].getBoundingClientRect().top;
        }
      }

      return undefined;
    };

    this.isCurrentSection = function (section) {
      var top = getTop(section);
      return top !== undefined && top >= 0 && top < document.documentElement.clientHeight;
    };

    var showIntroduction = function showIntroduction(introduction) {
      if (introduction) {
        $(introduction).removeClass('cfsf-features-hidden');
        $(introduction).addClass('cfsf-features-show');
        $(introduction).removeClass('cfsf-features-y-60-transformed');
        $(introduction).addClass('cfsf-features-none-transformed');
      }
    };

    var hideIntroduction = function hideIntroduction(introduction) {
      if (introduction) {
        $(introduction).removeClass('cfsf-features-show');
        $(introduction).addClass('cfsf-features-hidden');
        $(introduction).removeClass('cfsf-features-none-transformed');
        $(introduction).addClass('cfsf-features-y-60-transformed');
      }
    };

    var showSpecs = function showSpecs(specs) {
      if (specs && specs.length > 0) {
        for (var i = 0; i < specs.length; i++) {
          var spec = specs[i];
          var specContainer = spec.querySelector('.cfsf-features-spec');

          if (specContainer) {
            $(specContainer).removeClass('cfsf-features-hidden');
            $(specContainer).addClass('cfsf-features-show');
            var specTitle = spec.querySelector('.cfsf-features-spec-title');

            if (specTitle) {
              $(specTitle).removeClass('cfsf-features-y-45-transformed');
              $(specTitle).addClass('cfsf-features-none-transformed');
            }

            var specDescription = spec.querySelector('.cfsf-features-spec-description');

            if (specDescription) {
              $(specDescription).removeClass('cfsf-features-y-55-transformed');
              $(specDescription).addClass('cfsf-features-none-transformed');
            }
          }
        }
      }
    };

    var hideSpecs = function hideSpecs(specs) {
      if (specs && specs.length > 0) {
        for (var i = 0; i < specs.length; i++) {
          var spec = specs[i];
          var specContainer = spec.querySelector('.cfsf-features-spec');

          if (specContainer) {
            $(specContainer).removeClass('cfsf-features-show');
            $(specContainer).addClass('cfsf-features-hidden');
            var specTitle = spec.querySelector('.cfsf-features-spec-title');

            if (specTitle) {
              $(specTitle).removeClass('cfsf-features-none-transformed');
              $(specTitle).addClass('cfsf-features-y-45-transformed');
            }

            var specDescription = spec.querySelector('.cfsf-features-spec-description');

            if (specDescription) {
              $(specDescription).removeClass('cfsf-features-none-transformed');
              $(specDescription).addClass('cfsf-features-y-55-transformed');
            }
          }
        }
      }
    };

    var moveImage = function moveImage(section) {
      if (section.image && section.layout) {
        var imagePositionClass = 'cfsf-features-image-transformed-' + section.layout;
        $(section.image).removeClass(imagePositionClass);
        $(section.image).addClass('cfsf-features-none-transformed');
      }
    };

    var resetImage = function resetImage(section) {
      if (section.image && section.layout) {
        var imagePositionClass = 'cfsf-features-image-transformed-' + section.layout;
        $(section.image).removeClass('cfsf-features-none-transformed');
        $(section.image).addClass(imagePositionClass);
      }
    };

    this.getWindowScreenWidth = function () {
      return window.screen.width;
    };

    var getDeviceIdentification = function getDeviceIdentification() {
      $isDevice = $this.getWindowScreenWidth() < 768;
    };

    var initDeviceDetection = function initDeviceDetection() {
      getDeviceIdentification();
      window.addEventListener('resize', function () {
        getDeviceIdentification();
      });
    };

    var setupCurrentSectionForDesktop = function setupCurrentSectionForDesktop(section) {
      if (section.image && section.layout) {
        moveImage(section);
      }

      if (section.introduction) {
        showIntroduction(section.introduction);
      }

      if (section.specs) {
        showSpecs(section.specs);
      }
    };

    var resetCurrentSectionForDesktop = function resetCurrentSectionForDesktop(section) {
      if (section.image && section.layout) {
        resetImage(section);
      }

      if (section.introduction) {
        hideIntroduction(section.introduction);
      }

      if (section.specs) {
        hideSpecs(section.specs);
      }
    };

    var setOpacityValue = function setOpacityValue(element, opacity) {
      $(element).css('opacity', opacity);
    };

    var getSectionOverTopPercent = function getSectionOverTopPercent(section) {
      var top = section.getBoundingClientRect().top;
      var outerHeight = $(section).outerHeight(true);
      var percent = 0;

      if (top < 0) {
        percent = Math.abs(top) / outerHeight;
      }

      return percent;
    };

    var handleTextContainerAnimation = function handleTextContainerAnimation(textContainer, percent, destinationY) {
      var introductionStartPercent = 0.08;
      var introductionEndPercent = 0.12;

      if (percent < introductionStartPercent) {
        setOpacityValue(textContainer, 1);
      }

      if (textContainer) {
        $(textContainer).css('top', destinationY + 'px');
      }

      if (percent >= introductionStartPercent && percent < introductionEndPercent) {
        var opacity = (introductionEndPercent - percent) / (introductionEndPercent - introductionStartPercent);
        setOpacityValue(textContainer, opacity);
      }

      if (percent >= introductionEndPercent) {
        setOpacityValue(textContainer, 0);
      }
    };

    var handleSpecsAnimation = function handleSpecsAnimation(sectionContainer, percent, destinationY) {
      var specNavigator = $(sectionContainer).find('.cfsf-features-specs-navigator')[0];
      var specSeparatorContainer = $(sectionContainer).find('.cfsf-features-specs-seperate-container')[0];
      var navigatorStartPercent = 0;
      var navigatorEndPercent = 0.1;
      var destinationOffsetY = destinationY + 100;

      if (percent < navigatorStartPercent) {
        setOpacityValue(specNavigator, 0);
        setOpacityValue(specSeparatorContainer, 0);
      }

      if (percent >= navigatorStartPercent && percent < navigatorEndPercent) {
        var opacity = 1 - (navigatorEndPercent - percent) / (navigatorEndPercent - navigatorStartPercent);
        setOpacityValue(specNavigator, opacity);
        setOpacityValue(specSeparatorContainer, opacity);
        $(specNavigator).css('top', destinationY + 'px');
        $(specSeparatorContainer).css('top', destinationOffsetY + 'px');
      }

      if (percent >= navigatorEndPercent) {
        setOpacityValue(specNavigator, 1);
        setOpacityValue(specSeparatorContainer, 1);
        $(specNavigator).css('top', destinationY + 'px');
        $(specSeparatorContainer).css('top', destinationOffsetY + 'px');
      }
    };

    var handleIntroductionAnimation = function handleIntroductionAnimation(imgContainer, introductionContainer) {
      if (!imgContainer) return;
      var sectionContainer = $(imgContainer).closest('.cfsf-features-section')[0];
      var hasAnimation = $(sectionContainer).hasClass('animation');

      if (hasAnimation) {
        var imgContainerBottom = $(imgContainer).position().top + $(imgContainer).outerHeight(true);
        var destinationY = imgContainerBottom + 40;
        var textContainer = introductionContainer ? $(introductionContainer).closest('.cfsf-features-section-text-container')[0] : undefined;
        var percent = getSectionOverTopPercent(sectionContainer);

        if (textContainer) {
          handleTextContainerAnimation(textContainer, percent, destinationY);
        }

        handleSpecsAnimation(sectionContainer, percent, destinationY);
      }
    };

    var setupCurrentSectionForDevice = function setupCurrentSectionForDevice(section) {
      var imgContainer = section.image;
      var introductionContainer = section.introduction;

      if (section.introduction) {
        showIntroduction(section.introduction);
      }

      if (imgContainer) {
        moveImage(section);
      }

      handleIntroductionAnimation(imgContainer, introductionContainer);
    };

    var resetCurrentSectionForDevice = function resetCurrentSectionForDevice(section) {
      if (section.image) {
        resetImage(section);
      }
    };

    var initDefaultSpecItems = function initDefaultSpecItems() {
      var defaultSpecItems = $('.cfsf-features-spec-item._1');

      for (var i = 0; i < defaultSpecItems.length; i++) {
        $(defaultSpecItems[i]).show();
      }
    };

    var resetSelectedClass = function resetSelectedClass() {
      $('.cfsf-features-specs-navigator-order').removeClass('selected');
      $('.cfsf-features-specs-navigator-order-container').removeClass('selected');
    };

    var setSelectedClass = function setSelectedClass(targetElement) {
      var orderElement = $(targetElement).find('.cfsf-features-specs-navigator-order');

      if (orderElement) {
        orderElement.addClass('selected');
      }

      var orderContainerElement = $(targetElement).find('.cfsf-features-specs-navigator-order-container');

      if (orderContainerElement) {
        $(orderContainerElement).addClass('selected');
      }
    };

    var initSpecNavigatorHandler = function initSpecNavigatorHandler() {
      $('.cfsf-features-specs-navigator-item').click(function ($event) {
        var targetElement = $event.currentTarget;

        if (targetElement) {
          resetSelectedClass();
          setSelectedClass(targetElement);
          var order = $(targetElement).data('spec-order');
          var specItems = $(targetElement).closest('.cfsf-features-section').find('.cfsf-features-spec-item');

          for (var i = 0; i < specItems.length; i++) {
            $(specItems[i]).hide();
          }

          var mappingSpecItem = $(targetElement).closest('.cfsf-features-section').find('.cfsf-features-spec-item.' + order);

          if (mappingSpecItem && mappingSpecItem.length > 0) {
            $(mappingSpecItem).show();
          }
        }
      });
    };

    this.onScroll = function () {
      for (var i = 0; i < featureSections.length; i++) {
        var section = featureSections[i];

        if ($this.isCurrentSection(section)) {
          if ($isDevice) {
            setupCurrentSectionForDevice(section);
          } else {
            setupCurrentSectionForDesktop(section);
          }
        } else {
          if ($isDevice) {
            resetCurrentSectionForDevice(section);
          } else {
            resetCurrentSectionForDesktop(section);
          }
        }
      }
    };

    $(document).ready(function () {
      if (sectionElements && sectionElements.length > 0) {
        for (var i = 0; i < sectionElements.length; i++) {
          var sectionElement = sectionElements[i];
          var introductionContainer = sectionElement.querySelector('.cfsf-features-introduction-container');
          var specElements = sectionElement.querySelectorAll('.cfsf-feature-spec-container');
          var layout = $(sectionElement).data('layout');
          var imageContainer = sectionElement.querySelector('.cfsf-features-section-image-container');
          var section = {
            image: imageContainer,
            introduction: introductionContainer,
            specs: specElements,
            layout: layout
          };
          featureSections.push(section);
        }
      }

      if (featureSections.length > 0) {
        initDeviceDetection();
        window.addEventListener('scroll', function (event) {
          if (timeout) {
            window.cancelAnimationFrame(timeout);
          }

          timeout = window.requestAnimationFrame(function () {
            $this.onScroll();
          });
        }, false);
        initDefaultSpecItems();
        initSpecNavigatorHandler();
      }
    });
  }).call(Dell.BrandFeatures);
})(jQuery, document, window);
"use strict";

Dell.BrandNavigation = Dell.BrandNavigation || {};

(function ($, document) {
  'use strict';

  (function () {
    var brandnavigation = document.querySelector(".cfsf-brand-navigation-container");
  }).call(Dell.BrandNavigation);
})(jQuery, document);
"use strict";

Dell.FranchiseCarousel = Dell.FranchiseCarousel || {};

(function ($, window, document) {
  (function () {
    var queryAllDots = function queryAllDots($navDot) {
      var parent = $($navDot).closest('.cfsf-carousel-container');
      var dots = $(parent).find('.cfsf-carousel-controls__dot');
      return dots;
    };

    var navigatorClickHandler = function navigatorClickHandler($navDot) {
      var $slide = document.querySelector($($navDot).data('slide'));
      if (!$slide) return;
      $(queryAllDots($navDot)).removeClass('active');
      $($navDot).addClass('active');
      var parent = $($navDot).closest('.cfsf-carousel-container');
      var carousel = $(parent).find('.cfsf-carousel')[0];

      if (carousel) {
        var currentScrollLeft = $(carousel).scrollLeft();
        var distance = $($slide).position().left;
        var targetLeft = currentScrollLeft + distance;
        $(carousel).scrollLeft(targetLeft);
      }

      var currentIndex = getCurrentIndex(parent);
      var prevButton = parent.find('.cfsf-carousel-prev');
      var nextButton = parent.find('.cfsf-carousel-next');
      validatePrevButton(prevButton, currentIndex);
      validateNextButton(nextButton, currentIndex);
    };

    var setDefaultActive = function setDefaultActive() {
      var containers = $('.cfsf-carousel-container');

      if (containers.length > 0) {
        for (var i = 0; i < containers.length; i++) {
          var container = containers[i];
          var defaultElement = $(container).find('.cfsf-carousel-controls__dot')[0];

          if (defaultElement) {
            $(defaultElement).addClass('active');
          }

          var defaultPrevButton = $(container).find('.cfsf-carousel-prev');
          $(defaultPrevButton).hide();
        }
      }
    };

    var getCurrentIndex = function getCurrentIndex(parent) {
      var dot = $(parent).find('.cfsf-carousel-controls__dot.active');
      var dots = $(parent).find('.cfsf-carousel-controls__dot');
      var currentIndex = 0;

      if (dot && dot.length > 0) {
        currentIndex = $(dots).index(dot);
      }

      return currentIndex;
    };

    var clickNavDot = function clickNavDot(parent, targetIndex) {
      var dots = $(parent).find('.cfsf-carousel-controls__dot');

      if (dots.length > 0) {
        var targetDot = dots[targetIndex];
        navigatorClickHandler(targetDot);
      }
    };

    var validatePrevButton = function validatePrevButton($prevButton, currentIndex) {
      if (currentIndex <= 0) {
        $($prevButton).hide();
      } else {
        $($prevButton).css('display', 'flex');
      }
    };

    var validateNextButton = function validateNextButton($nextButton, currentIndex) {
      var parent = $($nextButton).closest('.cfsf-carousel-container');
      var totalSlides = $(parent).find('.cfsf-carousel-controls__dot').length;

      if (currentIndex >= totalSlides - 1) {
        $($nextButton).hide();
      } else {
        $($nextButton).css('display', 'flex');
      }
    };

    var isIndexValid = function isIndexValid(parent, index) {
      var totalSlides = $(parent).find('.cfsf-carousel-controls__dot').length;
      return index < totalSlides && index >= 0;
    };

    $(document).ready(function () {
      setDefaultActive();
      $('.cfsf-carousel-controls').click(function (event) {
        event.preventDefault();
        navigatorClickHandler(event.target);
      });
      $('.cfsf-carousel-prev').click(function (event) {
        event.preventDefault();
        var parent = $(event.target).closest('.cfsf-carousel-container');
        var currentIndex = getCurrentIndex(parent);
        var targetIndex = currentIndex - 1;

        if (isIndexValid(parent, targetIndex)) {
          clickNavDot(parent, targetIndex);
        }
      });
      $('.cfsf-carousel-next').click(function (event) {
        event.preventDefault();
        var parent = $(event.target).closest('.cfsf-carousel-container');
        var currentIndex = getCurrentIndex(parent);
        var targetIndex = currentIndex + 1;

        if (isIndexValid(parent, targetIndex)) {
          clickNavDot(parent, targetIndex);
        }
      });
    });
  }).call(Dell.FranchiseCarousel);
})(jQuery, window, document);
"use strict";

Dell.InPageNavigation = Dell.InPageNavigation || {};

(function ($, document, window) {
  'use strict';

  (function () {
    var checking = false,
        contexts,
        $this = this,
        nav = document.querySelector(".cfsf-inpage-navigation"),
        tabContainer = document.querySelector(".cfsf-tab-container");

    function getTop(element) {
      return element ? element.getBoundingClientRect().top : 0;
    }

    function getBottom(element) {
      return element ? element.getBoundingClientRect().bottom : 0;
    }

    this.getDocumentClientHeight = function () {
      return document.documentElement.clientHeight;
    };

    function checkNav() {
      if (getTop(tabContainer) + 100 < $this.getDocumentClientHeight()) {
        nav.classList.add("cfsf-inpage-navigation--sticky");
      } else {
        nav.classList.remove("cfsf-inpage-navigation--sticky");
      }

      for (var key in contexts) {
        var context = contexts[key];

        if ($this.isElementInView(context.target, .6)) {
          context.link.classList.add("cfsf-inpage-navigation__link--active");
        } else {
          context.link.classList.remove("cfsf-inpage-navigation__link--active");
        }
      }

      checking = false;
    }

    function getLinkContext() {
      var links = document.querySelectorAll(".cfsf-inpage-navigation a");
      var context = Object.create(null);
      Array.prototype.map.call(links, function (link) {
        var id = link.getAttribute("href");

        if (id) {
          var target = document.querySelector(id);
          context[id] = {
            link: link,
            target: target
          };
        }
      });
      return context;
    } // pencentage is between 0 to 1


    this.isElementInView = function (el, pencentage) {
      if (el) {
        var top = getTop(el);
        var bottom = getBottom(el);
        var windowHeight = window.innerHeight;

        if (bottom < 0 || top > windowHeight) {
          return false;
        }

        if (top > 0 && bottom > windowHeight) {
          return top + windowHeight * pencentage < windowHeight;
        }

        if (top < 0 && bottom <= windowHeight) {
          return bottom + windowHeight * pencentage >= windowHeight;
        }

        return true;
      }

      return false;
    };

    $(document).ready(function () {
      contexts = getLinkContext();
      window.addEventListener("scroll", function () {
        if (!checking) {
          window.requestAnimationFrame(checkNav);
        }

        checking = true;
      });
      checkNav();
    });
  }).call(Dell.InPageNavigation);
})(jQuery, document, window);
"use strict";

Dell.NavigationContainer = Dell.NavigationContainer || {};

(function ($, document, window) {
  'use strict';

  (function () {
    var container = document.querySelector(".fixed_navigation_container"),
        buyNowContainer = $(".buy_now_container"),
        compareContainer = $(".compare_cta_banner"),
        shopContainer = $(".shop_cta"),
        brandsContainer = $("#brands_container_pc"),
        brandImage = $("#brands_container_pc .image-95.dropdown"),
        brandListContainer = $("#brands_container_pc .div-block-327"),
        brandList = $(brandListContainer).children(".brand_links"),
        dropDownBg = $("#brands_container_pc .product_dropdown_bg"),
        dropDownIcon = $("#brands_container_pc .dds__icons.brand_drop_down"),
        dropDown2 = $("#brands_container_pc2"),
        brandsContainerMobile = $("#brands_container_mobile .anchor_link_container"),
        $this = this,
        checkPoint = 200,
        containerPoint1 = 60,
        containerPoint2 = 140;

    this.getScrollTop = function () {
      return $(window).scrollTop();
    };

    this.GetValue = function (start, end, factor) {
      return start + (end - start) * factor;
    };

    this.onScroll = function () {
      var scrollTop = $this.getScrollTop();

      if (scrollTop < checkPoint) {
        var factor = scrollTop / checkPoint * 1.0;
        var y = factor * (containerPoint1 - containerPoint2);
        var transform = "translateY(" + y + "px)";
        $(container).css({
          'transform': transform
        });
        var buyNowColor = 'rgba(' + factor * 255 + ', ' + factor * 255 + ', ' + factor * 255 + ', ' + factor * 1 + ')';
        $(buyNowContainer).css('background-color', buyNowColor);
        $(compareContainer).css('opacity', factor);
        var shopColor = 'rgb(' + $this.GetValue(0, 255, factor) + ', ' + $this.GetValue(68, 255, factor) + ', ' + $this.GetValue(124, 255, factor) + ')';
        $(shopContainer).css('color', shopColor);
        var shopBgColor = 'rgba(' + 0 + ', ' + factor * 68 + ', ' + factor * 124 + ', ' + factor * 1 + ')';
        $(shopContainer).css('background-color', shopBgColor);
        var width = $this.GetValue(160, 500, factor) + 'px';
        $(brandsContainer).css('width', width);
        $(brandsContainer).css('opacity', 1 - factor);
        var imageWidth = $this.GetValue(120, 60, factor) + 'px';
        var imageInvert = 'invert(' + $this.GetValue(0, 100, factor) + '%)';
        $(brandImage).css('width', imageWidth);
        $(brandImage).css('filter', imageInvert);
        $(brandListContainer).css('opacity', 1 - factor);
        var transXList = [0, -54, -135, -219];

        for (var i = 0; i < $(brandList).length; i++) {
          var brand = $(brandList)[i];
          var transX = transXList[i];
          var trans = 'translate3d(' + $this.GetValue(0, transX, factor) + 'px,0px,0px)';
          $(brand).css('transform', trans);
          $(brand).css('opacity', 1 - factor);
        }

        $(dropDownBg).css('opacity', factor);
        var trans = 'translate3d(' + $this.GetValue(0, -341, factor) + 'px,0px,0px)';
        $(dropDownIcon).css('transform', trans);
        $(dropDownIcon).css('opacity', factor);

        if ($(brandsContainer).css('display') != 'none') {
          $(dropDown2).css('opacity', factor);
        } else {
          $(dropDown2).css('opacity', 1);
        }

        var trans = 'translate3d(0px,' + $this.GetValue(-343, 0, factor) + 'px,0px)';
        $(brandsContainerMobile).css('transform', trans);
        $(brandsContainerMobile).css('opacity', factor);
      } else {
        var transform = "translateY(" + (containerPoint1 - containerPoint2) + "px)";
        $(container).css({
          transform: transform
        });
        $(buyNowContainer).css('background-color', 'rgba(255,255,255,1)');
        $(compareContainer).css('opacity', 1);
        $(shopContainer).css('color', 'rgb(255,255,255)');
        $(shopContainer).css('background-color', 'rgba(0,68,124,1)');
        $(brandsContainer).css('width', '500px');
        $(brandsContainer).css('opacity', '0');
        $(brandImage).css('width', '60px');
        $(brandImage).css('filter', 'invert(100%)');
        $(brandListContainer).css('opacity', 0);
        var transXList = [0, -54, -135, -219];

        for (var i = 0; i < $(brandList).length; i++) {
          var brand = $(brandList)[i];
          var transX = transXList[i];
          var trans = 'translate3d(' + transX + 'px,0px,0px)';
          $(brand).css('transform', trans);
          $(brand).css('opacity', 0);
        }

        $(dropDownBg).css('opacity', 1);
        $(dropDownIcon).css('transform', 'translate3d(-341px,0px,0px)');
        $(dropDownIcon).css('opacity', 1);
        $(dropDown2).css('opacity', 1);
        $(brandsContainerMobile).css('transform', 'translate3d(0px,0px,0px)');
        $(brandsContainerMobile).css('opacity', 1);
      }
    };

    $(document).ready(function () {
      $(".brands_container.dropdown").each(function () {
        var container = $(this);
        var button = container.children(".div-block-370").children(".dds__icons.brand_drop_down.alt");
        var dropDuration = 150;
        var duration = 300;
        var clickNum = 0;
        button.click(function (event) {
          event.preventDefault();

          if (clickNum == 0) {
            $(this).animate({}, duration, function () {
              $(this).css('transform', 'rotateZ(-90deg)');
            });
            $(".anchor_link_container.mobile").animate({
              height: '208px'
            }, duration);
            container.children(".product_dropdown_bg.dropdown").animate({
              height: '190px'
            }, dropDuration);
            container.children(".div-block-327.dropdown").children(".brand_links.dropdown").each(function () {
              $(this).css('display', 'block');
              $(this).animate({
                opacity: 1
              }, duration);
            });
            clickNum = 1;
          } else {
            $(this).animate({}, duration, function () {
              $(this).css('transform', 'rotateZ(0deg)');
            });
            $(".anchor_link_container.mobile").animate({
              height: '60px'
            }, duration);
            container.children(".product_dropdown_bg.dropdown").animate({
              height: '60px'
            }, dropDuration);
            container.children(".div-block-327.dropdown").children(".brand_links.dropdown").each(function () {
              $(this).animate({
                opacity: 0
              }, duration);
            });
            clickNum = 0;
          }

          ;
        });
      });
      window.addEventListener('scroll', function (event) {
        $this.onScroll();
      }, false);
    });
  }).call(Dell.NavigationContainer);
})(jQuery, document, window);
"use strict";

Dell.Reviews = Dell.Reviews || {};

(function ($, window, document) {
  'use strict';

  (function () {
    var $this = this,
        index = 0,
        step = 2,
        awardList = $(".cscf-award-2-1"),
        len = awardList.length;

    this.updateButton = function () {
      $(".cscf-awards-showmore").css('display', awardList == null || index == len - 1 ? 'none' : 'flex');
      $(".cscf-awards-showless").css('display', awardList != null && index == len - 1 ? 'flex' : 'none');
      $('.cscf-award-lists').focus();
    };

    $.each(awardList, function (i, award) {
      $(this).css('display', i == 0 ? 'flex' : 'none');
    });
    $(".cscf-awards-showmore").click(function () {
      var end = index + step >= len - 1 ? len - 1 : index + step;

      for (var i = index + 1; i <= end; ++i) {
        awardList.eq(i).css('display', 'flex');
      }

      index = end;
      $this.updateButton();
    });
    $(".cscf-awards-showless").click(function () {
      var end = 0;

      for (var i = index; i > end; --i) {
        awardList.eq(i).css('display', 'none');
      }

      index = end;
      $this.updateButton();
    });
  }).call(Dell.Reviews);
})(jQuery, window, document);
"use strict";

Dell.sharedContactDrawerModule = Dell.sharedContactDrawerModule || {};

(function ($, window, document) {
  (function () {
    var $this = this;

    $this.initSharedContactDrawer = function () {
      if (typeof Dell !== 'undefined' && typeof Dell.ContactDrawer !== 'undefined') {
        var $sharedcontactdrawer = $('#shared-contact-drawer');
        Dell.ContactDrawer.init({
          country: $sharedcontactdrawer.data("cfCountry"),
          language: $sharedcontactdrawer.data("cfLanguage"),
          segment: $sharedcontactdrawer.data("cfSegment"),
          pageId: 'buyer_configure'
        });
      }
    };

    $(function () {
      $this.initSharedContactDrawer();
    });
  }).call(Dell.sharedContactDrawerModule);
})(jQuery, window, document);
"use strict";

Dell.Story = Dell.Story || {};

(function ($, document, window) {
  'use strict';

  (function () {
    var $isDevice = false,
        $storySections = [],
        $this = this,
        timeout,
        featureContainer = document.querySelector(".cfsf-brand-features");

    this.getWindowScreenWidth = function () {
      return window.screen.width;
    };

    var getDeviceIdentification = function getDeviceIdentification() {
      $isDevice = $this.getWindowScreenWidth() < 992;
    };

    var initDeviceDetection = function initDeviceDetection() {
      getDeviceIdentification();
      window.addEventListener('resize', function () {
        getDeviceIdentification();
      });
    };

    var initStorySections = function initStorySections() {
      var storySections = document.querySelectorAll('.cfsf-story-text-content');

      if (storySections && storySections.length > 0) {
        for (var i = 0; i < storySections.length; i++) {
          var storySection = storySections[i];
          var background = $(storySection).data('background');
          var deviceBackground = $(storySection).data('device-background');
          var layout = $(storySection).data('layout');

          if (!layout) {
            layout = 'cfsf-text-left';
          }

          $storySections.push({
            storySection: storySection,
            background: background,
            deviceBackground: deviceBackground,
            layout: layout
          });
        }
      }
    };

    var getTop = function getTop(storySection) {
      return storySection.getBoundingClientRect().top;
    };

    this.isCurrentSection = function (section) {
      var top = getTop(section);
      return top !== undefined && top >= 0 && top < document.documentElement.clientHeight;
    };

    var setBackgroundImage = function setBackgroundImage(selector, storySection) {
      var imageUrl = $isDevice ? storySection.deviceBackground : storySection.background;

      if (imageUrl) {
        $(selector).css("background-image", "url(" + imageUrl + ")");
      } else {
        $(selector).css("background-image", "none");
      }
    };

    var resetTextLeftAnimation = function resetTextLeftAnimation() {
      $('.cfsf-story-fixed-middle-layer.cfsf-text-left').removeClass('cfsf-show-background');
      $('.cfsf-story-fixed-cover-layer.cfsf-text-left').removeClass('cfsf-show-background');
    };

    var resetTextRightAnimation = function resetTextRightAnimation() {
      $('.cfsf-story-fixed-middle-layer.cfsf-text-right').removeClass('cfsf-show-background');
      $('.cfsf-story-fixed-cover-layer.cfsf-text-right').removeClass('cfsf-show-background');
    };

    var triggerTextLeftAnimation = function triggerTextLeftAnimation() {
      $('.cfsf-story-fixed-middle-layer.cfsf-text-left').addClass('cfsf-show-background');
      $('.cfsf-story-fixed-cover-layer.cfsf-text-left').addClass('cfsf-show-background');
    };

    var triggerTextRightAnimation = function triggerTextRightAnimation() {
      $('.cfsf-story-fixed-middle-layer.cfsf-text-right').addClass('cfsf-show-background');
      $('.cfsf-story-fixed-cover-layer.cfsf-text-right').addClass('cfsf-show-background');
    };

    var handleDesktopAnimation = function handleDesktopAnimation(story) {
      var layout = story.layout;
      var backgroundSelector = '.cfsf-story-fixed-cover-layer' + '.' + layout;
      setBackgroundImage(backgroundSelector, story);

      if (layout === 'cfsf-text-left') {
        resetTextRightAnimation();
        triggerTextLeftAnimation();
      } else if (layout === 'cfsf-text-right') {
        resetTextLeftAnimation();
        triggerTextRightAnimation();
      }
    };

    var showDeviceLayer = function showDeviceLayer(layerSelector, enterTop, destinationOffset, targetBottomPercent) {
      var screenHeight = document.documentElement.clientHeight;
      var startTop = screenHeight;
      var destinationTop = screenHeight - destinationOffset;
      var layer = $(layerSelector)[0];

      if (enterTop <= startTop && enterTop > destinationTop) {
        var percent = (startTop - enterTop) / destinationOffset;
        var bottom = 100 - Math.floor(percent * (100 - targetBottomPercent));

        if (layer) {
          $(layer).css('bottom', bottom + '%');
        }
      }

      if (enterTop <= destinationTop) {
        $(layer).css('bottom', targetBottomPercent + '%');
      }
    };

    var handleDeviceAnimation = function handleDeviceAnimation() {
      var targetMiddleLayerBottom = 40;
      var targetCoverLayerBottom = 43;
      var storySectionsCount = $storySections.length;

      if (storySectionsCount > 0) {
        var enterSection = $storySections[0].storySection;

        if (enterSection && $this.isCurrentSection(enterSection)) {
          var enterSectionTop = getTop(enterSection);
          var enterSectionHeight = $(enterSection).outerHeight(true);
          showDeviceLayer('.cfsf-story-fixed-background-container-device .cfsf-story-fixed-middle-layer', enterSectionTop, enterSectionHeight / 2, targetMiddleLayerBottom);
          showDeviceLayer('.cfsf-story-fixed-background-container-device .cfsf-story-fixed-cover-layer', enterSectionTop + enterSectionHeight / 2, enterSectionHeight / 3, targetCoverLayerBottom);
        }

        for (var i = 0; i < storySectionsCount; i++) {
          var section = $storySections[i];

          if (section.storySection && $this.isCurrentSection(section.storySection)) {
            setBackgroundImage('.cfsf-story-fixed-background-container-device .cfsf-story-fixed-cover-layer', section);
          }
        }
      }
    };

    var hideFixedBackgroundLayer = function hideFixedBackgroundLayer(parentSelector) {
      if (parentSelector) {
        $(parentSelector).hide();
      }

      var selector = parentSelector ? parentSelector + ' .cfsf-story-fixed-background' : '.cfsf-story-fixed-background';
      $(selector).css('opacity', 0);
    };

    var showFixedBackgroundLayer = function showFixedBackgroundLayer(parentSelector) {
      if (parentSelector) {
        $(parentSelector).show();
      }

      var selector = parentSelector ? parentSelector + ' .cfsf-story-fixed-background' : '.cfsf-story-fixed-background';
      $(selector).css('opacity', 1);
    };

    var hideDesktopFixedBackground = function hideDesktopFixedBackground() {
      if (!featureContainer) return;

      if (featureContainer.getBoundingClientRect().top <= 0) {
        resetTextLeftAnimation();
        resetTextRightAnimation();
        hideFixedBackgroundLayer('.cfsf-story-fixed-background-container');
      } else {
        showFixedBackgroundLayer('.cfsf-story-fixed-background-container');
      }
    };

    var hideDeviceLayer = function hideDeviceLayer(layerSelector, enterTop, destinationOffset, originBottomPercent) {
      var screenHeight = document.documentElement.clientHeight;
      var startTop = screenHeight;
      var destinationTop = screenHeight - destinationOffset;
      var layer = $(layerSelector)[0];

      if (enterTop <= startTop && enterTop > destinationTop) {
        var percent = (startTop - enterTop) / destinationOffset;
        var bottom = originBottomPercent + Math.floor(percent * (100 - originBottomPercent));

        if (layer) {
          $(layer).css('bottom', bottom + '%');
        }
      }

      if (enterTop > startTop) {
        $(layer).css('bottom', originBottomPercent + '%');
      }
    };

    var hideDeviceFixedBackground = function hideDeviceFixedBackground() {
      var storySectionsCount = $storySections.length;

      if (storySectionsCount > 0) {
        var exitSection = $storySections[storySectionsCount - 1].storySection;

        if (exitSection && $this.isCurrentSection(exitSection)) {
          var exitSectionHeight = $(exitSection).outerHeight(true);
          var exitSectionBottom = getTop(exitSection) + $(exitSection).outerHeight(true);
          var middleBottomPercent = 40;
          var coverBottomPercent = 43;
          hideDeviceLayer('.cfsf-story-fixed-background-container-device .cfsf-story-fixed-cover-layer', exitSectionBottom, exitSectionHeight * 1.5, coverBottomPercent);
          hideDeviceLayer('.cfsf-story-fixed-background-container-device .cfsf-story-fixed-middle-layer', exitSectionBottom + exitSectionHeight, exitSectionHeight * 1.5, middleBottomPercent);
        }
      }

      if (!featureContainer) return;

      if (featureContainer.getBoundingClientRect().top <= 0) {
        hideFixedBackgroundLayer('.cfsf-story-fixed-background-container-device');
      } else {
        showFixedBackgroundLayer('.cfsf-story-fixed-background-container-device');
      }
    };

    this.onScroll = function () {
      if ($isDevice) {
        handleDeviceAnimation();
      } else {
        for (var i = 0; i < $storySections.length; i++) {
          var story = $storySections[i];
          var storySectionElement = story.storySection;

          if ($this.isCurrentSection(storySectionElement)) {
            handleDesktopAnimation(story);
          }
        }
      }

      if ($isDevice) {
        hideDeviceFixedBackground();
      } else {
        hideDesktopFixedBackground();
      }
    };

    $(document).ready(function () {
      initDeviceDetection();
      initStorySections();
      window.addEventListener('scroll', function (event) {
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(function () {
          $this.onScroll();
        });
      }, false);
    });
  }).call(Dell.Story);
})(jQuery, document, window);
"use strict";

Dell.TopBanner = Dell.TopBanner || {};

(function ($, document, window) {
  'use strict';

  (function () {
    $(document).ready(function () {
      $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
      });

      var setBackgroundImage = function setBackgroundImage(selector) {
        var imageUrl = $(selector).data("background");

        if (imageUrl) {
          $(selector).css("background-image", "url(" + imageUrl + ")");
        }
      };

      setBackgroundImage('.cfsf-topbanner');
    });
  }).call(Dell.TopBanner);
})(jQuery, document, window);
//# sourceMappingURL=../maps/premiumfranchise.js.map
