// (function() {
//     var thumbnail = document.querySelector(".pdm-thumbnail-img"),
//         video = document.querySelector("#video");

//         thumbnail.addEventListener("touchend", startVideo, false);
//         function startVideo(){
//             video.play();
//             thumbnail.style.display = "none";
//         }
// })();
var smrtObserver = (function () {
    function add(selectors, callback, options) {
        
        if (typeof selectors !== "string" || typeof callback !== "function" || (typeof options !== "object" && options !== null)) {
            console.error("smrtObserver error 1433", selectors, callback, options);
        }
        var selectorArry = document.querySelectorAll(selectors);
        
        document.querySelectorAll(selectors).forEach(selector => {
            let observer = new IntersectionObserver(callback, options);
            observer.observe(selector);
        });


    }
    function isHidden(el) {
        return (el.offsetParent === null)
    }
    return {
        add: add,
        isHidden: isHidden
    };
})();
smrtObserver.add(".pd-dw-item", function (entries, observer) {
    if (entries[0].isIntersecting) {
        entries[0].target.classList.add("pdm-activate-img");
    } else {
        entries[0].target.classList.remove("pdm-activate-img")
    }
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.5
});
smrtObserver.add("#video", function (entries, observer) {
    var videoHasPlayed = false;
    if (entries[0].isIntersecting) {
        entries[0].target.play();
        videoHasPlayed = true;
    }else if(videoHasPlayed) {
        entries[0].target.pause();
    }
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 1
});
smrtObserver.add(".pdm-sp-item", function (entries, observer) {
    if (entries[0].isIntersecting) {
        entries[0].target.classList.add("pdm-ps-item-active");
    }else {
        entries[0].target.classList.remove("pdm-ps-item-active");
    }
}, {
    rootMargin: '0px 0px -30% 0px',
    threshold: 1
});