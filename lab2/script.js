document.addEventListener("DOMContentLoaded", function () {
    const lessons = [
        { id: 1, title: "Основи граматики", description: "Вивчіть базові правила граматики.", video: "E:\\ДАУНлодс\\There is - There are - Grammar with Exercise- Learn English For Kids.mp4" },
        { id: 2, title: "Розмовні фрази", description: "Ознайомтеся з основними розмовними фразами.", video: "https://www.youtube.com/embed/LsHC-H1gpeE" },
        { id: 3, title: "Слухання та вимова", description: "Практичні вправи на сприйняття мовлення.", video: "https://www.youtube.com/embed/7Cru6h7HsSQ" }
    ];

    const lessonsList = document.getElementById("lessons-list");
    const completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || [];

    for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i];
        const lessonDiv = document.createElement("div");
        lessonDiv.classList.add("lesson");
        lessonDiv.innerHTML = `
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
            <div class="video-container">
                ${lesson.video.startsWith("https") ? 
                    `<iframe src="${lesson.video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : 
                    `<video controls>
                        <source src="${lesson.video}" type="video/mp4">
                    </video>`
                }
            </div>
            <button class="complete-btn" data-id="${lesson.id}">
                ${completedLessons.includes(lesson.id) ? "Пройдено" : "Відзначити як пройдений"}
            </button>
        `;

        if (completedLessons.includes(lesson.id)) {
            lessonDiv.style.opacity = "0.6";
        }

        lessonsList.appendChild(lessonDiv);
    }

    document.querySelectorAll(".complete-btn").forEach(function(button) {
        button.addEventListener("click", function () {
            const lessonId = parseInt(this.dataset.id);
            if (completedLessons.includes(lessonId)) {
                const index = completedLessons.indexOf(lessonId);
                completedLessons.splice(index, 1);
                this.textContent = "Відзначити як пройдений";
                this.parentElement.style.opacity = "1"; 
            } else {
                completedLessons.push(lessonId);
                this.textContent = "Пройдено";
                this.parentElement.style.opacity = "0.6"; 
            }

            localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
        });
    });
});
