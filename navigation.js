function initNavigation() {
    const items = document.querySelectorAll(".sidebar ul li, .sidebar h2");
    const pages = document.querySelectorAll(".page");
    let currentPage = pages[0];

    items.forEach(item => {
        item.addEventListener("click", () => {
            const target = item.getAttribute("data-target");
            const nextPage = document.getElementById(target);

            if (currentPage !== nextPage) {
                currentPage.classList.add("exit");

                currentPage.addEventListener("animationend", function handleCurrentPageAnimationEnd() {
                    currentPage.classList.remove("active", "exit");
                    currentPage.style.display = "none";
                    currentPage.removeEventListener("animationend", handleCurrentPageAnimationEnd);

                    nextPage.style.display = "block";
                    requestAnimationFrame(() => {
                        nextPage.classList.add("active");
                        nextPage.classList.add("enter");
                    });

                    nextPage.addEventListener("animationend", function handleNextPageAnimationEnd() {
                        nextPage.classList.remove("enter");
                        nextPage.removeEventListener("animationend", handleNextPageAnimationEnd);
                    }, { once: true });

                    currentPage = nextPage;
                }, { once: true });

                items.forEach(item => {
                    item.classList.remove("active");
                });
                item.classList.add("active");
            }
        });
    });

    if (pages.length > 0) {
        items[0].classList.add("active");
        currentPage.classList.add("active");
        currentPage.style.display = "block";
    }
}
