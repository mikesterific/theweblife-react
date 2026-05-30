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