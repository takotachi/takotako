document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const backToTopButton = document.getElementById('back-to-top');
    const menuIcon = document.querySelector('.menu-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // 顯示/隱藏下拉選單
    menuIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('visible');
    });

    // 點擊「關於作者」顯示提示框
    document.getElementById('about-author').addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5500/zuozhe3.html';
    });

    // 點擊「調整背景顏色」
    document.getElementById('change-bg-color').addEventListener('click', () => {
        const currentColor = document.body.style.backgroundColor;
        document.body.style.backgroundColor = (currentColor === 'lightblue' ? '#f9f9f9' : 'lightblue');
    });

    // 載入 JSON 資料
    fetch('wangtainan.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(place => {
                const card = document.createElement('div');
                card.classList.add('card-item');
                card.innerHTML = `
                    <img src="${place.圖片檔}" alt="${place.名字}" class="zoomable">
                    <div class="info">
                        <h3>${place.名字}</h3>
                        <p>分類: ${place.地點分類}</p>
                        <p>市話: ${place.市話 || "無"}</p>
                        <a href="${place.網址}" target="_blank">更多資訊</a>
                    </div>
                `;
                cardContainer.appendChild(card);
            });

            // 添加圖片放大效果
            document.querySelectorAll('.zoomable').forEach(img => {
                img.addEventListener('click', () => {
                    const overlay = document.createElement('div');
                    overlay.classList.add('overlay');
                    overlay.innerHTML = `
                        <img src="${img.src}" alt="${img.alt}">
                        <span class="close-btn">&times;</span>
                    `;
                    document.body.appendChild(overlay);

                    // 關閉放大視圖
                    overlay.querySelector('.close-btn').addEventListener('click', () => {
                        document.body.removeChild(overlay);
                    });

                    overlay.addEventListener('click', (event) => {
                        if (event.target === overlay) {
                            document.body.removeChild(overlay);
                        }
                    });
                });
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));

    // 返回頂部按鈕邏輯
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});