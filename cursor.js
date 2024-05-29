function initCursor() {
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    const items = document.querySelectorAll(".sidebar ul li");

    items.forEach(item => {
        item.classList.add("hover-target");

        item.addEventListener("mouseenter", (e) => {
            cursor.classList.add("hover");
            const rect = item.getBoundingClientRect();
            cursor.style.left = `${rect.left + rect.width / 2}px`;
            cursor.style.top = `${rect.top + rect.height / 2}px`;
            cursor.style.width = `${rect.width}px`;
            cursor.style.height = `${rect.height}px`;
            cursor.style.borderRadius = `8px`;

            // 根据鼠标位置和目标元素位置设置吸附方向
            const cursorX = e.clientX;
            const cursorY = e.clientY;
            const itemCenterX = rect.left + rect.width / 2;
            const itemCenterY = rect.top + rect.height / 2;
            const deltaX = itemCenterX - cursorX;
            const deltaY = itemCenterY - cursorY;

            cursor.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        item.addEventListener("mouseleave", () => {
            cursor.classList.remove("hover");
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderRadius = '50%';
            cursor.style.transform = 'translate(0, 0)';
        });
    });

    const iframe = document.querySelector(".embed-container iframe");
    if (iframe) {
        iframe.addEventListener("mouseenter", () => {
            cursor.style.display = 'none';
        });

        iframe.addEventListener("mouseleave", () => {
            cursor.style.display = 'block';
        });
    }
}
