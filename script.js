// 视频控制（完全保留）
const video = document.querySelector('video');
if (video) {
    video.addEventListener('play', () => {
        console.log('视频开始播放');
        video.style.borderColor = '#28a745';
    });
    video.addEventListener('pause', () => {
        console.log('视频暂停播放');
        video.style.borderColor = '#8B4513';
    });
}

// 滚动监听：卷轴背景透明度随滚动变化（完全保留）
const scrollArea = document.querySelector('.scroll-content-area');
const juanzhouLayer = document.querySelector('.juanzhou-layer');
scrollArea.addEventListener('scroll', () => {
    const scrollRatio = scrollArea.scrollTop / (scrollArea.scrollHeight - scrollArea.clientHeight);
    // 卷轴图层轻微透明度变化
    juanzhouLayer.style.opacity = 1 - (scrollRatio * 0.1);
    // 云朵随滚动轻微缩放，增强层次感
    const cloudLayer = document.querySelector('.cloud-layer');
    cloudLayer.style.transform = `scale(${1 + scrollRatio * 0.05}) ${cloudLayer.style.transform.split('scale')[0]}`;
});

// 瓦猫鼠标跟随效果（增强交互，完全保留）
document.addEventListener('mousemove', (e) => {
    const wamaoLayer = document.getElementById('wamao-clickable');
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    // 瓦猫轻微跟随鼠标移动，保留晃动动画
    const rotateVal = wamaoLayer.style.transform.split('rotate(')[1] || '0deg';
    wamaoLayer.style.transform = `translate(${x}px, ${y}px) rotate(${rotateVal})`;
    
    // 云朵也轻微跟随鼠标，增强沉浸感
    const cloudLayer = document.querySelector('.cloud-layer');
    const cloudX = (e.clientX / window.innerWidth - 0.5) * 5;
    const cloudY = (e.clientY / window.innerHeight - 0.5) * 5;
    const cloudScale = cloudLayer.style.transform.split('scale')[1] || '';
    cloudLayer.style.transform = `translate(${cloudX}px, ${cloudY}px) scale(${cloudScale})`;
});

// 瓦猫对话气泡功能：仅绑定到小范围点击区，不改动布局
const wamaoHitArea = document.getElementById('wamao-hit-area');
const bubbleElement = document.getElementById('wamao-bubble');
const bubbleText = document.getElementById('bubble-text');

// 瓦猫对话内容列表（完全保留）
const wamaoDialogues = [
    "我是瓦猫，守护一方平安～",
    "吞邪纳福，镇宅护院😺",
    "我来自云南，是非遗神兽哦！",
    "不同地方的我长得不一样呢～",
    "匠人手工烧制，超有温度的！",
    "摸摸我，带来好运～"
];

// 点击瓦猫右下角区域 显示气泡（仅计算位置，不改动布局）
wamaoHitArea.addEventListener('click', (e) => {
    // 阻止事件冒泡，避免触发页面其他点击逻辑
    e.stopPropagation();

    // 1. 随机选择一句对话
    const randomIndex = Math.floor(Math.random() * wamaoDialogues.length);
    bubbleText.textContent = wamaoDialogues[randomIndex];

    // 2. 动态计算气泡位置：基于点击区域的位置（适配原布局）
    const hitRect = wamaoHitArea.getBoundingClientRect();
    // 读取气泡偏移变量（仅控制位置，不影响布局）
    const bubbleYOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bubble-y-offset'));
    const bubbleXOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bubble-x-offset'));

    // 气泡位置：点击区正上方（仅偏移，不改动瓦猫布局）
    const bubbleX = hitRect.left + (hitRect.width / 2) + bubbleXOffset;
    const bubbleY = hitRect.top + bubbleYOffset + window.scrollY;

    // 设置气泡位置（仅改气泡，不改瓦猫）
    bubbleElement.style.left = `${bubbleX}px`;
    bubbleElement.style.top = `${bubbleY}px`;

    // 3. 显示气泡
    bubbleElement.classList.add('show');

    // 4. 瓦猫点击反馈动画（仅加缩放，不改动布局）
    const wamaoLayer = document.getElementById('wamao-clickable');
    const originalTransform = wamaoLayer.style.transform || 'translate(-50%, -50%) rotate(0deg)';
    wamaoLayer.style.transform = originalTransform + ' scale(1.05)';
    setTimeout(() => {
        wamaoLayer.style.transform = originalTransform;
    }, 300);

    // 5. 3秒后自动隐藏气泡
    clearTimeout(window.bubbleTimer);
    window.bubbleTimer = setTimeout(() => {
        bubbleElement.classList.remove('show');
    }, 3000);
});

// 点击其他区域关闭气泡（完全保留）
document.addEventListener('click', () => {
    bubbleElement.classList.remove('show');
});

// 下一步按钮点击事件
const nextButton = document.getElementById('nextButton');
if (nextButton) {
    nextButton.addEventListener('click', () => {
        window.location.href = 'process1.html';
    });
}