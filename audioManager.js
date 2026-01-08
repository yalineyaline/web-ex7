const AudioManager = (() => {
    let audio = null;
    const AUDIO_URL = "琥珀琴师Louis - 旅行青蛙-主题曲 (钢琴改编版) [mqms2] (V0).mp3";
    const STORAGE_KEY_TIME = 'audioCurrentTime';
    const STORAGE_KEY_PAUSED = 'audioPaused';

    const initAudio = () => {
        if (audio) return audio;
        
        audio = new Audio(AUDIO_URL);
        audio.loop = true;
        
        // 从localStorage恢复播放进度
        const savedTime = localStorage.getItem(STORAGE_KEY_TIME);
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }
        
        // 保存播放进度到localStorage
        audio.ontimeupdate = () => {
            localStorage.setItem(STORAGE_KEY_TIME, audio.currentTime);
        };
        
        return audio;
    };

    const togglePlay = () => {
        const audio = initAudio();
        
        if (audio.paused) {
            audio.play().catch(error => {
                console.error('音频播放失败:', error);
            });
        } else {
            audio.pause();
        }
        
        // 保存播放状态到localStorage
        localStorage.setItem(STORAGE_KEY_PAUSED, audio.paused);
        
        // 更新音频图标
        updateAudioIcon(audio.paused);
    };

    const updateAudioIcon = (isPaused) => {
        const audioIcon = document.getElementById('audioIcon');
        if (!audioIcon) return;
        
        if (isPaused) {
            // 静音图标
            audioIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
        } else {
            // 播放图标（带波浪线）
            audioIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
        }
    };

    const initAudioState = () => {
        const audio = initAudio();
        // 首次加载时默认播放，忽略localStorage中的paused状态
        const savedPaused = localStorage.getItem(STORAGE_KEY_PAUSED);
        const isPaused = savedPaused === 'true';
        
        if (!isPaused) {
            // 尝试自动播放，如果失败则等待用户交互后再播放
            audio.play().catch(error => {
                console.error('音频自动播放失败:', error);
                // 监听用户交互事件，当用户首次与页面交互时播放音频
                const playOnInteraction = () => {
                    audio.play().catch(e => {
                        console.error('交互后音频播放失败:', e);
                    });
                    // 移除事件监听器，避免重复触发
                    document.removeEventListener('click', playOnInteraction);
                    document.removeEventListener('touchstart', playOnInteraction);
                    document.removeEventListener('keydown', playOnInteraction);
                };
                // 添加多种交互事件监听
                document.addEventListener('click', playOnInteraction);
                document.addEventListener('touchstart', playOnInteraction);
                document.addEventListener('keydown', playOnInteraction);
            });
        }
        
        updateAudioIcon(isPaused);
    };

    // 初始化音频
    initAudio();

    return {
        togglePlay,
        initAudio,
        initAudioState
    };
})();

// 页面加载完成后初始化音频状态
window.addEventListener('DOMContentLoaded', () => {
    AudioManager.initAudioState();
});