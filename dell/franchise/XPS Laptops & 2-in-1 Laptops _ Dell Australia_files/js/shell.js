"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define("Siema", [], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Siema = t() : e.Siema = t();
}("undefined" != typeof self ? self : void 0, function () {
  return function (e) {
    function t(r) {
      if (i[r]) return i[r].exports;
      var n = i[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }

    var i = {};
    return t.m = e, t.c = i, t.d = function (e, i, r) {
      t.o(e, i) || Object.defineProperty(e, i, {
        configurable: !1,
        enumerable: !0,
        get: r
      });
    }, t.n = function (e) {
      var i = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return t.d(i, "a", i), i;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 0);
  }([function (e, t, i) {
    "use strict";

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    },
        s = function () {
      function e(e, t) {
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      return function (t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
      };
    }(),
        l = function () {
      function e(t) {
        var i = this;
        if (r(this, e), this.config = e.mergeSettings(t), this.selector = "string" == typeof this.config.selector ? document.querySelector(this.config.selector) : this.config.selector, null === this.selector) throw new Error("Something wrong with your selector 😭");
        this.resolveSlidesNumber(), this.selectorWidth = this.selector.offsetWidth, this.innerElements = [].slice.call(this.selector.children), this.currentSlide = this.config.loop ? this.config.startIndex % this.innerElements.length : Math.max(0, Math.min(this.config.startIndex, this.innerElements.length - this.perPage)), this.transformProperty = e.webkitOrNot(), ["resizeHandler", "touchstartHandler", "touchendHandler", "touchmoveHandler", "mousedownHandler", "mouseupHandler", "mouseleaveHandler", "mousemoveHandler", "clickHandler"].forEach(function (e) {
          i[e] = i[e].bind(i);
        }), this.init();
      }

      return s(e, [{
        key: "attachEvents",
        value: function value() {
          window.addEventListener("resize", this.resizeHandler), this.config.draggable && (this.pointerDown = !1, this.drag = {
            startX: 0,
            endX: 0,
            startY: 0,
            letItGo: null,
            preventClick: !1
          }, this.selector.addEventListener("touchstart", this.touchstartHandler), this.selector.addEventListener("touchend", this.touchendHandler), this.selector.addEventListener("touchmove", this.touchmoveHandler), this.selector.addEventListener("mousedown", this.mousedownHandler), this.selector.addEventListener("mouseup", this.mouseupHandler), this.selector.addEventListener("mouseleave", this.mouseleaveHandler), this.selector.addEventListener("mousemove", this.mousemoveHandler), this.selector.addEventListener("click", this.clickHandler));
        }
      }, {
        key: "detachEvents",
        value: function value() {
          window.removeEventListener("resize", this.resizeHandler), this.selector.removeEventListener("touchstart", this.touchstartHandler), this.selector.removeEventListener("touchend", this.touchendHandler), this.selector.removeEventListener("touchmove", this.touchmoveHandler), this.selector.removeEventListener("mousedown", this.mousedownHandler), this.selector.removeEventListener("mouseup", this.mouseupHandler), this.selector.removeEventListener("mouseleave", this.mouseleaveHandler), this.selector.removeEventListener("mousemove", this.mousemoveHandler), this.selector.removeEventListener("click", this.clickHandler);
        }
      }, {
        key: "init",
        value: function value() {
          this.attachEvents(), this.selector.style.overflow = "hidden", this.selector.style.direction = this.config.rtl ? "rtl" : "ltr", this.buildSliderFrame(), this.config.onInit.call(this);
        }
      }, {
        key: "buildSliderFrame",
        value: function value() {
          var e = this.selectorWidth / this.perPage,
              t = this.config.loop ? this.innerElements.length + 2 * this.perPage : this.innerElements.length;
          this.sliderFrame = document.createElement("div"), this.sliderFrame.style.width = e * t + "px", this.enableTransition(), this.config.draggable && (this.selector.style.cursor = "-webkit-grab");
          var i = document.createDocumentFragment();
          if (this.config.loop) for (var r = this.innerElements.length - this.perPage; r < this.innerElements.length; r++) {
            var n = this.buildSliderFrameItem(this.innerElements[r].cloneNode(!0));
            i.appendChild(n);
          }

          for (var s = 0; s < this.innerElements.length; s++) {
            var l = this.buildSliderFrameItem(this.innerElements[s]);
            i.appendChild(l);
          }

          if (this.config.loop) for (var o = 0; o < this.perPage; o++) {
            var a = this.buildSliderFrameItem(this.innerElements[o].cloneNode(!0));
            i.appendChild(a);
          }
          this.sliderFrame.appendChild(i), this.selector.innerHTML = "", this.selector.appendChild(this.sliderFrame), this.slideToCurrent();
        }
      }, {
        key: "buildSliderFrameItem",
        value: function value(e) {
          var t = document.createElement("div");
          return t.style.cssFloat = this.config.rtl ? "right" : "left", t.style.float = this.config.rtl ? "right" : "left", t.style.width = (this.config.loop ? 100 / (this.innerElements.length + 2 * this.perPage) : 100 / this.innerElements.length) + "%", t.appendChild(e), t;
        }
      }, {
        key: "resolveSlidesNumber",
        value: function value() {
          if ("number" == typeof this.config.perPage) this.perPage = this.config.perPage;else if ("object" === n(this.config.perPage)) {
            this.perPage = 1;

            for (var e in this.config.perPage) {
              window.innerWidth >= e && (this.perPage = this.config.perPage[e]);
            }
          }
        }
      }, {
        key: "prev",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              t = arguments[1];

          if (!(this.innerElements.length <= this.perPage)) {
            var i = this.currentSlide;

            if (this.config.loop) {
              if (this.currentSlide - e < 0) {
                this.disableTransition();
                var r = this.currentSlide + this.innerElements.length,
                    n = this.perPage,
                    s = r + n,
                    l = (this.config.rtl ? 1 : -1) * s * (this.selectorWidth / this.perPage),
                    o = this.config.draggable ? this.drag.endX - this.drag.startX : 0;
                this.sliderFrame.style[this.transformProperty] = "translate3d(" + (l + o) + "px, 0, 0)", this.currentSlide = r - e;
              } else this.currentSlide = this.currentSlide - e;
            } else this.currentSlide = Math.max(this.currentSlide - e, 0);

            i !== this.currentSlide && (this.slideToCurrent(this.config.loop), this.config.onChange.call(this), t && t.call(this));
          }
        }
      }, {
        key: "next",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              t = arguments[1];

          if (!(this.innerElements.length <= this.perPage)) {
            var i = this.currentSlide;

            if (this.config.loop) {
              if (this.currentSlide + e > this.innerElements.length - this.perPage) {
                this.disableTransition();
                var r = this.currentSlide - this.innerElements.length,
                    n = this.perPage,
                    s = r + n,
                    l = (this.config.rtl ? 1 : -1) * s * (this.selectorWidth / this.perPage),
                    o = this.config.draggable ? this.drag.endX - this.drag.startX : 0;
                this.sliderFrame.style[this.transformProperty] = "translate3d(" + (l + o) + "px, 0, 0)", this.currentSlide = r + e;
              } else this.currentSlide = this.currentSlide + e;
            } else this.currentSlide = Math.min(this.currentSlide + e, this.innerElements.length - this.perPage);

            i !== this.currentSlide && (this.slideToCurrent(this.config.loop), this.config.onChange.call(this), t && t.call(this));
          }
        }
      }, {
        key: "disableTransition",
        value: function value() {
          this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, this.sliderFrame.style.transition = "all 0ms " + this.config.easing;
        }
      }, {
        key: "enableTransition",
        value: function value() {
          this.sliderFrame.style.webkitTransition = "all " + this.config.duration + "ms " + this.config.easing, this.sliderFrame.style.transition = "all " + this.config.duration + "ms " + this.config.easing;
        }
      }, {
        key: "goTo",
        value: function value(e, t) {
          if (!(this.innerElements.length <= this.perPage)) {
            var i = this.currentSlide;
            this.currentSlide = this.config.loop ? e % this.innerElements.length : Math.min(Math.max(e, 0), this.innerElements.length - this.perPage), i !== this.currentSlide && (this.slideToCurrent(), this.config.onChange.call(this), t && t.call(this));
          }
        }
      }, {
        key: "slideToCurrent",
        value: function value(e) {
          var t = this,
              i = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide,
              r = (this.config.rtl ? 1 : -1) * i * (this.selectorWidth / this.perPage);
          e ? requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              t.enableTransition(), t.sliderFrame.style[t.transformProperty] = "translate3d(" + r + "px, 0, 0)";
            });
          }) : this.sliderFrame.style[this.transformProperty] = "translate3d(" + r + "px, 0, 0)";
        }
      }, {
        key: "updateAfterDrag",
        value: function value() {
          var e = (this.config.rtl ? -1 : 1) * (this.drag.endX - this.drag.startX),
              t = Math.abs(e),
              i = this.config.multipleDrag ? Math.ceil(t / (this.selectorWidth / this.perPage)) : 1,
              r = e > 0 && this.currentSlide - i < 0,
              n = e < 0 && this.currentSlide + i > this.innerElements.length - this.perPage;
          e > 0 && t > this.config.threshold && this.innerElements.length > this.perPage ? this.prev(i) : e < 0 && t > this.config.threshold && this.innerElements.length > this.perPage && this.next(i), this.slideToCurrent(r || n);
        }
      }, {
        key: "resizeHandler",
        value: function value() {
          this.resolveSlidesNumber(), this.currentSlide + this.perPage > this.innerElements.length && (this.currentSlide = this.innerElements.length <= this.perPage ? 0 : this.innerElements.length - this.perPage), this.selectorWidth = this.selector.offsetWidth, this.buildSliderFrame();
        }
      }, {
        key: "clearDrag",
        value: function value() {
          this.drag = {
            startX: 0,
            endX: 0,
            startY: 0,
            letItGo: null,
            preventClick: this.drag.preventClick
          };
        }
      }, {
        key: "touchstartHandler",
        value: function value(e) {
          -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(e.target.nodeName) || (e.stopPropagation(), this.pointerDown = !0, this.drag.startX = e.touches[0].pageX, this.drag.startY = e.touches[0].pageY);
        }
      }, {
        key: "touchendHandler",
        value: function value(e) {
          e.stopPropagation(), this.pointerDown = !1, this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag();
        }
      }, {
        key: "touchmoveHandler",
        value: function value(e) {
          if (e.stopPropagation(), null === this.drag.letItGo && (this.drag.letItGo = Math.abs(this.drag.startY - e.touches[0].pageY) < Math.abs(this.drag.startX - e.touches[0].pageX)), this.pointerDown && this.drag.letItGo) {
            e.preventDefault(), this.drag.endX = e.touches[0].pageX, this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, this.sliderFrame.style.transition = "all 0ms " + this.config.easing;
            var t = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide,
                i = t * (this.selectorWidth / this.perPage),
                r = this.drag.endX - this.drag.startX,
                n = this.config.rtl ? i + r : i - r;
            this.sliderFrame.style[this.transformProperty] = "translate3d(" + (this.config.rtl ? 1 : -1) * n + "px, 0, 0)";
          }
        }
      }, {
        key: "mousedownHandler",
        value: function value(e) {
          -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT"].indexOf(e.target.nodeName) || (e.preventDefault(), e.stopPropagation(), this.pointerDown = !0, this.drag.startX = e.pageX);
        }
      }, {
        key: "mouseupHandler",
        value: function value(e) {
          e.stopPropagation(), this.pointerDown = !1, this.selector.style.cursor = "-webkit-grab", this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag();
        }
      }, {
        key: "mousemoveHandler",
        value: function value(e) {
          if (e.preventDefault(), this.pointerDown) {
            "A" === e.target.nodeName && (this.drag.preventClick = !0), this.drag.endX = e.pageX, this.selector.style.cursor = "-webkit-grabbing", this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, this.sliderFrame.style.transition = "all 0ms " + this.config.easing;
            var t = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide,
                i = t * (this.selectorWidth / this.perPage),
                r = this.drag.endX - this.drag.startX,
                n = this.config.rtl ? i + r : i - r;
            this.sliderFrame.style[this.transformProperty] = "translate3d(" + (this.config.rtl ? 1 : -1) * n + "px, 0, 0)";
          }
        }
      }, {
        key: "mouseleaveHandler",
        value: function value(e) {
          this.pointerDown && (this.pointerDown = !1, this.selector.style.cursor = "-webkit-grab", this.drag.endX = e.pageX, this.drag.preventClick = !1, this.enableTransition(), this.updateAfterDrag(), this.clearDrag());
        }
      }, {
        key: "clickHandler",
        value: function value(e) {
          this.drag.preventClick && e.preventDefault(), this.drag.preventClick = !1;
        }
      }, {
        key: "remove",
        value: function value(e, t) {
          if (e < 0 || e >= this.innerElements.length) throw new Error("Item to remove doesn't exist 😭");
          var i = e < this.currentSlide,
              r = this.currentSlide + this.perPage - 1 === e;
          (i || r) && this.currentSlide--, this.innerElements.splice(e, 1), this.buildSliderFrame(), t && t.call(this);
        }
      }, {
        key: "insert",
        value: function value(e, t, i) {
          if (t < 0 || t > this.innerElements.length + 1) throw new Error("Unable to inset it at this index 😭");
          if (-1 !== this.innerElements.indexOf(e)) throw new Error("The same item in a carousel? Really? Nope 😭");
          var r = t <= this.currentSlide > 0 && this.innerElements.length;
          this.currentSlide = r ? this.currentSlide + 1 : this.currentSlide, this.innerElements.splice(t, 0, e), this.buildSliderFrame(), i && i.call(this);
        }
      }, {
        key: "prepend",
        value: function value(e, t) {
          this.insert(e, 0), t && t.call(this);
        }
      }, {
        key: "append",
        value: function value(e, t) {
          this.insert(e, this.innerElements.length + 1), t && t.call(this);
        }
      }, {
        key: "destroy",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              t = arguments[1];

          if (this.detachEvents(), this.selector.style.cursor = "auto", e) {
            for (var i = document.createDocumentFragment(), r = 0; r < this.innerElements.length; r++) {
              i.appendChild(this.innerElements[r]);
            }

            this.selector.innerHTML = "", this.selector.appendChild(i), this.selector.removeAttribute("style");
          }

          t && t.call(this);
        }
      }], [{
        key: "mergeSettings",
        value: function value(e) {
          var t = {
            selector: ".siema",
            duration: 200,
            easing: "ease-out",
            perPage: 1,
            startIndex: 0,
            draggable: !0,
            multipleDrag: !0,
            threshold: 20,
            loop: !1,
            rtl: !1,
            onInit: function onInit() {},
            onChange: function onChange() {}
          },
              i = e;

          for (var r in i) {
            t[r] = i[r];
          }

          return t;
        }
      }, {
        key: "webkitOrNot",
        value: function value() {
          return "string" == typeof document.documentElement.style.transform ? "transform" : "WebkitTransform";
        }
      }]), e;
    }();

    t.default = l, e.exports = t.default;
  }]);
});
"use strict";

var cssLoader = function () {
  function load(href) {
    var ss = window.document.createElement('link'),
        ref = window.document.getElementsByTagName('head')[0];
    ss.rel = 'stylesheet';
    ss.href = href; // temporarily, set media to something non-matching to ensure it'll
    // fetch without blocking render

    ss.media = 'only x';
    ref.parentNode.insertBefore(ss, ref);
    setTimeout(function () {
      // set media back to `all` so that the stylesheet applies once it loads
      ss.media = 'all';
    }, 0);
  }

  return {
    load: load
  };
}();
"use strict";

// Lazy load background images
var backgroundImageLoader = function (cfVars) {
  if (!cssLoader || !cfVars || !cfVars.hasOwnProperty('storyTellingsOne')) {
    console.error("cssBackgroundLoader.js error");
    return {
      loadIt: function loadIt() {}
    };
  }

  var head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style'),
      payload = [],
      c = 0;

  if (window.innerWidth > cfVars.desktopExperienceWidth) {
    payload[c++] = '[story-id="2"] {background-image: url(' + cfVars.storyTellingsOne.desktopSrc + ')}';
    payload[c++] = '[story-id="3"] {background-image: url(' + cfVars.storyTellingsTwo.desktopSrc + ')}';
  } else {
    payload[c++] = '[story-id="2"] {background-image: url(' + cfVars.storyTellingsOne.mobileSrc + ')}';
    payload[c++] = '[story-id="3"] {background-image: url(' + cfVars.storyTellingsTwo.mobileSrc + ')}';
  }

  style.innerHTML = payload.join("");

  function loadIt() {
    head.appendChild(style);
  }

  return {
    loadIt: loadIt
  };
}(cfVars);
"use strict";

var mjObserver = function (document) {
  var dBody = document.body,
      t = 0,
      mainPane = document.getElementById("cfsf_main_pane"),
      storyBottom = document.querySelector(".cfsf-story-bottom"),
      imgs = document.querySelectorAll("img[data-src]"),
      imgArry = Array.prototype.slice.call(imgs),
      backgroundImagesFired = false,
      scrollToLink = document.querySelector(".cfsf-page-scroller"),
      stories = [{
    el: document.querySelector("[story-id='1']"),
    class: "cfsf-animation-one",
    scrollTo: "#story-tellings-2"
  }, {
    el: document.querySelector("[story-id='2']"),
    class: "cfsf-animation-two",
    scrollTo: "#story-tellings-3"
  }, {
    el: document.querySelector("[story-id='3']"),
    class: "cfsf-animation-three",
    scrollTo: "#brand-features-4"
  }, {
    el: document.querySelector("[story-id='4']"),
    class: "cfsf-animation-four",
    scrollTo: "#brand-features-5"
  }, {
    el: document.querySelector("[story-id='5']"),
    class: "cfsf-animation-five",
    scrollTo: "#reviews_section"
  }, {
    el: document.querySelector("#reviews_section"),
    class: "cfsf-animation-six",
    scrollTo: "#compare-module"
  }, {
    el: document.querySelector("#compare-module"),
    class: "cfsf-animation-seven",
    scrollTo: "#mh-footer"
  }, {
    el: document.querySelector("#mh-footer"),
    class: "cfsf-animation-eight",
    scrollTo: "#"
  }];

  function init(wWidth) {
    if (!wWidth || isNaN(wWidth)) {
      return;
    }

    if (wWidth < cfVars.desktopExperienceWidth) {
      activateMobileScroll(stories[0].el, stories[3].el, stories[4].el);
      mobileScrollRunner(stories[0].el, stories[3].el, stories[4].el);
    } else {
      activateDesktopScroll();
      desktopScrollRunner(stories);
    }
  }

  function activateMobileScroll() {
    var mTimeout;
    dBody.setAttribute("class", "");
    mainPane.addEventListener('scroll', function (event) {
      if (mTimeout) {
        window.cancelAnimationFrame(mTimeout);
      }

      mTimeout = window.requestAnimationFrame(function () {
        if (window.innerWidth > cfVars.desktopExperienceWidth) {
          return;
        }

        mobileScrollRunner(stories[0].el, stories[3].el, stories[4].el);

        if (!backgroundImagesFired) {
          backgroundImageLoader.loadIt();
          backgroundImagesFired = true;
        }
      });
    }, false);
  }

  function activateDesktopScroll() {
    var dTimeout;
    dBody.setAttribute("class", "");
    window.addEventListener('scroll', function (event) {
      if (dTimeout) {
        window.cancelAnimationFrame(dTimeout);
      }

      dTimeout = window.requestAnimationFrame(function () {
        if (window.innerWidth < cfVars.desktopExperienceWidth) {
          return;
        }

        desktopScrollRunner(stories);

        if (!backgroundImagesFired) {
          backgroundImageLoader.loadIt();
          backgroundImagesFired = true;
        }
      });
    }, false);
  }

  function mobileScrollRunner(storyOne, storyFour, storyFive) {
    playMobileAnimationOne(storyOne);
    playMobileAnimationFour(storyFour);
    setScrollPos();
    manageStoryBottom(storyFive);
    watchImages();
  }

  function desktopScrollRunner(stories) {
    enterViewPort(stories);
    setScrollPos();
    watchImages();
  } // ------------------------
  // Lazy Load Images
  // ------------------------


  function watchImages() {
    if (!imgArry || !imgArry.length) {
      return;
    }

    for (var i = 0; i < imgArry.length; i++) {
      var img = imgArry[i],
          src = img.getAttribute("data-src");

      if (src && img.getBoundingClientRect().top - returnWindowHeight() < returnWindowHeight()) {
        img.setAttribute("src", src);
        imgArry.splice(i, 1);
      }
    }
  }

  watchImages(); // ------------------------
  // Desktop Animations
  // ------------------------

  function enterViewPort(storyArry) {
    if (!storyArry || !storyArry.length) {
      return;
    }

    for (var i = 0; i < storyArry.length; i++) {
      var story = storyArry[i];

      if (!story.el || !story.class) {
        return;
      }

      var top = story.el.getBoundingClientRect().top + 10;

      if (top < returnWindowHeight()) {
        dBody.classList.add(story.class);
      } else {
        dBody.classList.remove(story.class);
      }

      if (top < returnWindowHeight() * 3 / 5) {
        scrollToLink.setAttribute("href", story.scrollTo);
      }
    }
  } // ------------------------
  // Mobile Animations
  // ------------------------


  function playMobileAnimationOne(story) {
    if (story.getBoundingClientRect().top + 10 < returnWindowHeight() * .6) {
      dBody.classList.add("cfsf-animation-one");
    } else {
      dBody.classList.remove("cfsf-animation-one");
    }
  }

  function playMobileAnimationFour(story) {
    if (story.getBoundingClientRect().top < returnWindowHeight() - storyBottom.offsetHeight) {
      dBody.classList.add("cfsf-animation-four");
    } else {
      dBody.classList.remove("cfsf-animation-four");
    }
  }

  function manageStoryBottom(story) {
    if (story.getBoundingClientRect().top < returnWindowHeight()) {
      dBody.classList.add("cfsf-hide-story-bottom");
      dBody.classList.add("cfsf-animation-five");
    } else {
      dBody.classList.remove("cfsf-hide-story-bottom");
      dBody.classList.remove("cfsf-animation-five");
    }
  } // ------------------------
  // General Functions
  // ------------------------


  function returnWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || 0;
  }

  function setScrollPos() {
    var scrllTop = window.scrollTop;
    var pos = Math.ceil(scrllTop / 120);
    pos = pos + 2;

    if (t <= scrllTop) {
      dBody.classList.add("cfsf-down");
      dBody.classList.remove("cfsf-up");
    } else {
      dBody.classList.remove("cfsf-down");
      dBody.classList.add("cfsf-up");
    }

    setTimeout(function () {
      t = scrllTop;
    }, 0);
  }

  return {
    init: init
  };
}(document);

mjObserver.init(window.innerWidth || document.documentElement.clientWidth);
"use strict";

var awards = function () {
  document.body.addEventListener("click", function (event) {
    var target = event.target;

    if (cfVars.isIe) {
      return;
    } // Awards view more button


    if (target.hasAttribute("view-more")) {
      toggleAwards(target);
    }

    function toggleAwards(btn) {
      var parent = document.querySelector(".cfsf-awards-wrap"),
          pClassList = parent.classList,
          awards = parent.querySelectorAll(".cfsf-a-card"),
          currentlyShownCount = parent.querySelectorAll('[style*="display: flex"]').length,
          step = 2,
          startIndex = currentlyShownCount === 0 ? 1 : currentlyShownCount;

      function showMore() {
        awards.forEach(function (el, i) {
          i < startIndex + step ? el.style.display = "flex" : el.style.display = "none";
        });

        if (startIndex + step >= awards.length) {
          pClassList.add("cfsf-view-less");
          btn.innerText = btn.getAttribute("view-less");
        }
      }

      function showLess() {
        awards.forEach(function (el, i) {
          i === 0 ? el.style.display = "flex" : el.style.display = "none";
        });
        pClassList.remove("cfsf-view-less");
        btn.innerText = btn.getAttribute("view-more");
      }

      pClassList.contains("cfsf-view-less") ? showLess() : showMore();
    }
  });

  function initMobile() {
    var cards = document.querySelectorAll(".cfsf-a-card");
    cards.forEach(function (el, i) {
      i === 0 ? el.style.display = "flex" : el.style.display = "none";
    });
  }

  function enableCarousel() {
    var carouselWrap = document.querySelector(".cfsf-a-carousel-wrap"),
        cards = document.querySelectorAll(".cfsf-a-card"),
        clickCounter = 0;

    if (!cards || cards.length <= 3) {
      return;
    }

    carouselWrap.setAttribute("show-next", "true");
    var awardsCarousel = new Siema({
      selector: '.cfsf-a-cards-wrap',
      duration: 200,
      easing: 'ease-out',
      perPage: 3,
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      threshold: 20,
      loop: false,
      rtl: false,
      onInit: function onInit() {
        return addAwardsPaginator(3);
      }
    });
    document.querySelector(".cfsf-a-c-prev").addEventListener("click", function (e) {
      awardsCarousel.prev(3);
      clickCounter--;
      manageButtonState();
      manangeIndicatorState();
    });
    document.querySelector(".cfsf-a-c-next").addEventListener("click", function (e) {
      awardsCarousel.next(3);
      clickCounter++;
      manageButtonState();
      manangeIndicatorState();
    });

    function manageButtonState() {
      if (clickCounter > 0) {
        carouselWrap.setAttribute("show-prev", "true");
      } else {
        carouselWrap.setAttribute("show-prev", "false");
      }

      if ((clickCounter + 1) * 3 >= cards.length) {
        carouselWrap.setAttribute("show-next", "false");
      } else {
        carouselWrap.setAttribute("show-next", "true");
      }
    }

    function addAwardsPaginator(perPage) {
      // add page indicators
      var pageIndicators = "<ul class='cfsf-awards-paginator'>";

      for (var i = 0; i < perPage; i++) {
        if (i === 0) {
          pageIndicators += "<li aria-label='awards page ".concat(i, "' class='cfsf-awards-pager current' data-page=\"").concat(i * perPage, "\"></li>");
        } else {
          pageIndicators += "<li aria-label='awards page ".concat(i, "' class='cfsf-awards-pager' data-page=\"").concat(i * perPage, "\"></li>");
        }
      }

      pageIndicators += "</ul>";
      document.querySelector(".cfsf-awards-wrap").insertAdjacentHTML("afterend", pageIndicators); // listen for clicks and scroll to page targets

      document.querySelector(".cfsf-awards-paginator").addEventListener("click", function (e) {
        if (e.target.classList.contains("cfsf-awards-pager")) {
          awardsCarousel.goTo(e.target.dataset.page);
          clickCounter = e.target.dataset.page / perPage;
          manageButtonState();
          manangeIndicatorState();
        }
      });
    }

    function manangeIndicatorState() {
      document.querySelector(".cfsf-awards-pager.current").classList.remove("current");
      document.querySelectorAll(".cfsf-awards-pager")[clickCounter].classList.add("current");
    }
  }

  return {
    enableCarousel: enableCarousel,
    initMobile: initMobile
  };
}();

if (window.innerWidth > cfVars.desktopExperienceWidth) {
  awards.enableCarousel();
} else {
  awards.initMobile();
}
"use strict";

(function () {
  document.body.addEventListener("click", function (e) {
    // toggle brand menu when button clicked
    if (e.target.classList.contains('brand-menu-toggle')) {
      var brandMenu = document.querySelector(".cfsf-brand-subnav");
      var isExpanded = e.target.getAttribute('aria-expanded');
      brandMenu.classList.toggle('expanded');
      e.target.setAttribute('aria-expanded', !JSON.parse(isExpanded));
    } else {
      // close brand menu if something else clicked while it's expanded
      var _brandMenu = document.querySelector(".cfsf-brand-subnav");

      var btn = _brandMenu.querySelector('.brand-menu-toggle');

      _brandMenu.classList.remove("expanded");

      btn.setAttribute('aria-expanded', false);
    }
  });
  window.addEventListener("scroll", function () {
    // if brand menu exanded and scrolling, close the menu
    var brandMenu = document.querySelector(".cfsf-brand-subnav");

    if (brandMenu.classList.contains("expanded")) {
      brandMenu.classList.remove("expanded");
    }
  });
})();
"use strict";

// Accessibilty hack by the MJ's
(function () {
  document.body.addEventListener("keydown", function (e) {
    if (e.which == 9) {
      document.body.classList.add("cfsf-tab-used");
      document.body.classList.remove("cfsf-mouse-used");
    }
  });
  document.body.addEventListener("click", function (e) {
    document.body.classList.remove("cfsf-tab-used");
    document.body.classList.add("cfsf-mouse-used");
  });
})();
"use strict";

var hmxConfig = {
  "products": {
    "XPS-13-9300": {
      "name": "XPS-13",
      "url": "assets/XPS-13-9300_13INCH/"
    },
    "XPS-15-9500": {
      "name": "XPS-15",
      "url": "assets/XPS-15-9500_15INCH/"
    },
    "XPS-17-9700": {
      "name": "XPS-17",
      "url": "assets/XPS-17-9700_17INCH/"
    }
  },
  "shared": {
    "env": "assets/_shared/"
  },
  "initial": ["XPS-15-9500", "XPS-17-9700"],
  "positions": [{
    "name": "Reset",
    "gotopos": [0, 0, 0, 0, 0]
  }, {
    "name": "Back",
    "gotopos": [2.5466, -0.14, -2, 2, -30]
  }, {
    "name": "Screen",
    "gotopos": [5.6365, -0.0933, -2.0000, 2.0000, -35]
  }, {
    "name": "Left Port",
    "gotopos": [4.0365, -0.3602, -3, 6.0667, -45]
  }, {
    "name": "Right Port",
    "gotopos": [1.0567, -0.3495, -1.5, 6, -45]
  }],
  "cameramatrix": [0.823533, 0, -0.567269, 0, -0.113289, 0.979855, -0.164468, 0, 0.555841, 0.19971, 0.806943, 0, 71.8376, 29.4249, 101.436, 1]
};
console.log(hmxConfig);

(function () {
  document.body.addEventListener("click", function (e) {
    var target = e.target;

    if (target.getAttribute("action") === "launch-compare") {
      cssLoader.load("/css/hmx.css"); // jsLoader.load("/js/hmx.js");
    }
  });
})();
"use strict";

var jsLoader = function () {
  function load(src) {
    var ss = window.document.createElement('script'),
        ref = window.document.getElementsByTagName('head')[0];
    ss.src = src;
    ref.parentNode.insertBefore(ss, ref);
  }

  return {
    load: load
  };
}();
"use strict";

(function (cfVars) {
  if (!cssLoader || !cfVars || !cfVars.hasOwnProperty('css') || !cfVars.css.hasOwnProperty('lazyload')) {
    console.error("lazyLoadCss.js error");
    return;
  }

  cssLoader.load(cfVars.css.lazyload.baseStyles);

  if (window.innerWidth > cfVars.desktopExperienceWidth) {
    cssLoader.load(cfVars.css.lazyload.desktopStyles);
  }
})(cfVars);
"use strict";

(function () {
  var timeout,
      desktopCssLoaded = false,
      initialBreakPoint = window.innerWidth < cfVars.desktopExperienceWidth ? "mobile" : "desktop";
  console.log(initialBreakPoint);
  window.addEventListener('resize', function (event) {
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(function () {
      var currentBreakPoint = window.innerWidth < cfVars.desktopExperienceWidth ? "mobile" : "desktop";
      console.log(currentBreakPoint);
      mjObserver.init(window.innerWidth || document.documentElement.clientWidth);

      if (!desktopCssLoaded && window.innerWidth > cfVars.desktopExperienceWidth) {
        cssLoader.load('build/css/desktop-styles.css');
        desktopCssLoaded = true;
      }

      if (initialBreakPoint !== currentBreakPoint) {
        location.reload();
      }
    });
  }, false);
})();
"use strict";

(function () {
  function returnWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || 0;
  }

  function clearLinksHighlights(modules) {
    if (modules && modules.length) {
      for (var i = 0; i < modules.length; i++) {
        var module = modules[i];

        if (module.link) {
          module.link.classList.remove("cfsf-s-link-hover");
        }
      }
    }
  }

  function handleLinkHighlight() {
    if (window.innerWidth < 980) return;
    var timeout,
        highlightClass = "cfsf-s-link-hover",
        modules = [{
      target: document.querySelector("#story-module"),
      link: document.querySelector(".cfsf-s-link-wrap a[href='#story-module']")
    }, {
      target: document.querySelector("#features-module"),
      link: document.querySelector(".cfsf-s-link-wrap a[href='#features-module']")
    }, {
      target: document.querySelector("#reviews_section"),
      link: document.querySelector(".cfsf-s-link-wrap a[href='#reviews_section']")
    }, {
      target: document.querySelector("#compare-module"),
      link: document.querySelector(".cfsf-s-link-wrap a[href='#compare-module']")
    }];
    window.addEventListener('scroll', function (event) {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }

      timeout = window.requestAnimationFrame(function () {
        if (modules && modules.length) {
          for (var i = 0; i < modules.length; i++) {
            var module = modules[i];

            if (module.target && module.link) {
              if (module.target.getBoundingClientRect().top < returnWindowHeight() / 2) {
                clearLinksHighlights(modules);
                module.link.classList.add(highlightClass);
              } else {
                module.link.classList.remove(highlightClass);
              }
            }
          }
        }
      });
    }, false);
  }

  document.body.addEventListener("click", function (e) {
    var target = event.target;

    if (!cfVars.isIe && target.closest(".cfsf-s-link-wrap")) {
      var tt = document.querySelector(".cfsf-s-link-wrap .cfsf-s-link-hover");

      if (tt) {
        tt.classList.remove("cfsf-s-link-hover");
      }

      target.classList.add("cfsf-s-link-hover");
    }
  });
  handleLinkHighlight();
})();
"use strict";

(function () {
  document.body.addEventListener("click", function (event) {
    var target = event.target; // Button Story

    if (target.hasAttribute("select-message")) {
      updateArticle(target.getAttribute("select-message"));
    }

    if (!cfVars.isIe && target.closest("button") && target.closest("button").hasAttribute("select-message")) {
      updateArticle(target.closest("button").getAttribute("select-message"));
    }

    function updateArticle(message) {
      var parent = target.closest(".cfsf-button-article");

      if (parent && message) {
        parent.setAttribute("show-message", message);
      }
    }
  });
})();
//# sourceMappingURL=../maps/shell.js.map
