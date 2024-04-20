document.addEventListener("DOMContentLoaded", function() {
    const scheduleData = [
        {
            "id": 1,
            "name": "Йога",
            "time": "10:00 - 11:00",
            "maxParticipants": 15,
            "currentParticipants": 8
        },
        {
            "id": 2,
            "name": "Пилатес",
            "time": "11:30 - 12:30",
            "maxParticipants": 10,
            "currentParticipants": 5
        },
        {
            "id": 3,
            "name": "Кроссфит",
            "time": "13:00 - 14:00",
            "maxParticipants": 20,
            "currentParticipants": 15
        },
        {
            "id": 4,
            "name": "Танцы",
            "time": "14:30 - 15:30",
            "maxParticipants": 12,
            "currentParticipants": 10
        },
        {
            "id": 5,
            "name": "Бокс",
            "time": "16:00 - 17:00",
            "maxParticipants": 8,
            "currentParticipants": 6
        }
    ];

    const scheduleTable = document.getElementById("schedule-table");

    const userSchedule = JSON.parse(localStorage.getItem("userSchedule")) || {};

    function updateLocalStorage() {
        localStorage.setItem("userSchedule", JSON.stringify(userSchedule));
    }

    function renderSchedule() {
        scheduleTable.innerHTML = `
            <tr>
                <th>Название занятия</th>
                <th>Время</th>
                <th>Макс. участников</th>
                <th>Текущие участники</th>
                <th>Действие</th>
            </tr>
        `;

        scheduleData.forEach(course => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.time}</td>
                <td>${course.maxParticipants}</td>
                <td>${course.currentParticipants}</td>
                <td>
                    <button data-id="${course.id}" class="btn-signup">Записаться</button>
                    <button data-id="${course.id}" class="btn-cancel">Отменить запись</button>
                </td>
            `;

            const signupBtn = row.querySelector(".btn-signup");
            const cancelBtn = row.querySelector(".btn-cancel");

            if (userSchedule[course.id]) {
                signupBtn.disabled = true;
                cancelBtn.disabled = false;
            } else {
                signupBtn.disabled = false;
                cancelBtn.disabled = true;
            }

            signupBtn.addEventListener("click", () => {
                if (course.currentParticipants < course.maxParticipants) {
                    userSchedule[course.id] = true;
                    course.currentParticipants++;
                    updateLocalStorage();
                    renderSchedule();
                }
            });

            cancelBtn.addEventListener("click", () => {
                if (userSchedule[course.id]) {
                    delete userSchedule[course.id];
                    course.currentParticipants--;
                    updateLocalStorage();
                    renderSchedule();
                }
            });

            scheduleTable.appendChild(row);
        });
    }

    renderSchedule();
});
