var homepage = (function () {

    function init() {
        startHeroAnimation(4000);
        addSmartObservers();
    }

    function startHeroAnimation(interval = 3000) {
        var slides = $(".hp-h-img-frame");
        var count = 1;
        setInterval(() => {
            if (!slides.length) { console.log("Hero Animation has no slide"); return; }
            if (slides.length > count) {
                $(".full-opacity").removeClass("full-opacity");
                slides.eq(count).addClass("full-opacity");
                count++;

            } else {
                $(".full-opacity").removeClass("full-opacity");
                count = 1;
            }
        }, interval);
    }
    function addSmartObservers() {
        if (!smrtObserver) { console.log("smartObserver problem"); return; }
        var categoryBar = document.querySelector("#category-bar");
        smrtObserver.add(".hp-hero-wrap", function (entries, observer) {
            if (entries[0].isIntersecting) {
                document.body.classList.remove("hp-cat-sticky");
            } else {
                document.body.classList.add("hp-cat-sticky");


            }
        }, {
            rootMargin: '0px 0px 0px 0px',
            threshold: 0
        });
        smrtObserver.add("[lazy-load]", function (entries, observer) {
            var img = entries[0].target;
            if (entries[0].isIntersecting && img.getAttribute("is-loaded") !== "true") {
                img.setAttribute("src", img.getAttribute("lazy-load"))
                img.setAttribute("srcset", img.getAttribute("lazy-load"))
                img.setAttribute("is-loaded", "true");
                observer.unobserve(img);
                console.log(img.getAttribute("src"));
            }
        }, {
            rootMargin: '300px',
            threshold: 0
        });
    }

    return {
        init: init
    }
})();
homepage.init();