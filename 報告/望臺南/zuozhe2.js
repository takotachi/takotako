fetch('zuozhe.json')
    .then(response => response.json())
    .then(authors => {
        const container = document.getElementById('authors-container');
        authors.forEach(author => {
            const card = document.createElement('div');
            card.className = 'author-card';
            card.innerHTML = `
                <img src="${author.照片}" alt="${author.名字}">
                <h3>${author.名字}</h3>
                <p>${author.班級}</p>
                <a href="${author.網頁}" target="_blank">作者網頁</a>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => console.error('無法加載作者資料:', error));