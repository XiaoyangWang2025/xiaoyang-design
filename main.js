document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initNavigation();

    const slider = document.getElementById('vertical-slider');
    const content = document.querySelector('.content');
    const maxScroll = content.scrollHeight - content.clientHeight;

    function updateSlider() {
        const scrollPercentage = content.scrollTop / maxScroll;
        const sliderHeight = (content.clientHeight / content.scrollHeight) * content.clientHeight;
        slider.style.height = `${sliderHeight}px`;
        slider.style.top = `${scrollPercentage * 100}%`;
    }

    slider.addEventListener('mousedown', (e) => {
        const startY = e.clientY;
        const startScrollTop = content.scrollTop;
        
        function onMouseMove(e) {
            const deltaY = e.clientY - startY;
            const scrollAmount = (deltaY / content.clientHeight) * maxScroll;
            content.scrollTop = startScrollTop + scrollAmount;
        }
        
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    content.addEventListener('scroll', updateSlider);
    window.addEventListener('resize', updateSlider); // 调整窗口大小时更新Slider

    document.addEventListener('wheel', (e) => {  // 更改为document级别监听器
        const delta = e.deltaY;
        content.scrollTop += delta;
        updateSlider();  // 确保滚轮滚动时更新slider
    });

    updateSlider();
});
