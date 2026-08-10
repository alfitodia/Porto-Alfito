// ================= MODAL =================

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("videoModal");

// Jalankan hanya jika elemen modal ada di halaman
if (openModal && closeModal && modal) {

    openModal.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("flex");
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("flex");
            modal.classList.add("hidden");
        }
    });

}


// ================= WEATHER =================

function loadWeather() {

    const weatherElement = document.getElementById("weather");

    if (!weatherElement) return;

    fetch("https://wttr.in/Malang?format=j1")
        .then(response => response.json())
        .then(data => {

            const temp = data.current_condition[0].temp_C;
            const weather = data.current_condition[0].weatherDesc[0].value;

            weatherElement.textContent =
                `Cuaca di Malang: ${weather} (${temp}°C)`;

        })
        .catch(() => {

            weatherElement.textContent =
                "Cuaca tidak tersedia";

        });

}

loadWeather();

setInterval(loadWeather, 600000);

// ================= Transisi Ketik =================
const texts = [
    "Frontend Developer",
    "Video Editor/3D Designer",
    "Mathematics Student",
    "Entrepreneur/Business Owner",
    "Internet of Things Developer",
    "Investor"
];

const typingText = document.getElementById("typing-text");

if (typingText) {

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentText = texts[textIndex];

        if (!isDeleting) {

            typingText.textContent =
                currentText.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentText.length) {

                isDeleting = true;

                setTimeout(typeEffect, 1500);

                return;
            }

        } else {

            typingText.textContent =
                currentText.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                isDeleting = false;

                textIndex =
                    (textIndex + 1) % texts.length;
            }
        }

        setTimeout(
            typeEffect,
            isDeleting ? 50 : 100
        );
    }

    typeEffect();
}

// ================= SKILL DAN ACHIEVEMENT =================

const btnSkill = document.getElementById("btnSkill");
const btnAchievement = document.getElementById("btnAchievement");

const skillContent = document.getElementById("skillContent");
const achievementContent = document.getElementById("achievementContent");

if (
    btnSkill &&
    btnAchievement &&
    skillContent &&
    achievementContent
) {

    skillContent.classList.remove("hidden");
    achievementContent.classList.remove("hidden");

    skillContent.style.display = "block";
    achievementContent.style.display = "block";

    const sliderWrapper = document.createElement("div");

    sliderWrapper.style.display = "grid";
    sliderWrapper.style.gridTemplateColumns = "1fr";
    sliderWrapper.style.position = "relative";
    sliderWrapper.style.overflow = "hidden";

    const parent = skillContent.parentNode;

    parent.insertBefore(sliderWrapper, skillContent);

    sliderWrapper.appendChild(skillContent);
    sliderWrapper.appendChild(achievementContent);

    [skillContent, achievementContent].forEach(el => {

        el.style.gridColumn = "1 / 2";
        el.style.gridRow = "1 / 2";

        el.style.transition =
            "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

        el.style.willChange = "transform, opacity";
    });

    skillContent.style.transform = "translateX(0)";
    skillContent.style.opacity = "1";
    skillContent.style.pointerEvents = "auto";

    achievementContent.style.transform = "translateX(100%)";
    achievementContent.style.opacity = "0";
    achievementContent.style.pointerEvents = "none";

    const activeClass = [
        "bg-black/25",
        "border",
        "border-black/20",
        "backdrop-blur-[20px]"
    ];

    btnSkill.classList.add(...activeClass);
    btnAchievement.classList.remove(...activeClass);

    function switchPanel(from, to, direction) {

        if (direction === "left") {
            to.style.transform = "translateX(100%)";
        } else {
            to.style.transform = "translateX(-100%)";
        }

        to.style.opacity = "0";
        to.style.pointerEvents = "none";

        void from.offsetWidth;

        if (direction === "left") {
            from.style.transform = "translateX(-100%)";
        } else {
            from.style.transform = "translateX(100%)";
        }

        from.style.opacity = "0";
        from.style.pointerEvents = "none";

        to.style.transform = "translateX(0)";
        to.style.opacity = "1";
        to.style.pointerEvents = "auto";
    }

    btnSkill.addEventListener("click", () => {

        if (
            achievementContent.style.opacity === "1" ||
            achievementContent.style.transform === "translateX(0)"
        ) {
            switchPanel(
                achievementContent,
                skillContent,
                "right"
            );

            btnSkill.classList.add(...activeClass);
            btnAchievement.classList.remove(...activeClass);
        }

    });

    btnAchievement.addEventListener("click", () => {

        if (
            skillContent.style.opacity === "1" ||
            skillContent.style.transform === "translateX(0)"
        ) {
            switchPanel(
                skillContent,
                achievementContent,
                "left"
            );

            btnAchievement.classList.add(...activeClass);
            btnSkill.classList.remove(...activeClass);
        }

    });

}

// ================= ACHIEVEMENT SLIDE (PAGINATION) =================
const grid = document.getElementById("certificateGrid");

if (grid) {
    const cards = document.querySelectorAll(".certificate-card");
    const cardsPerPage = 6;
    let currentPage = 1;
    const grid = document.getElementById("certificateGrid");

    // Bungkus grid dengan wrapper overflow-hidden
    const gridWrapper = document.createElement("div");
    gridWrapper.style.overflow = "hidden";
    grid.parentNode.insertBefore(gridWrapper, grid);
    gridWrapper.appendChild(grid);

    // Atur transisi grid
    grid.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    grid.style.willChange = "transform, opacity";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(3, 1fr)";
    grid.style.gap = "1.25rem";

    // --- Fungsi pindah halaman ---
    function showPage(page, direction) {
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;

    let outTransform, inTransform;
    if (page > currentPage) {
        outTransform = "translateX(-100%)";
        inTransform = "translateX(0%)";
    } else {
        outTransform = "translateX(100%)";
        inTransform = "translateX(0%)";
    }

    // Animasi keluar
    grid.style.transform = outTransform;
    grid.style.opacity = "0";

    const onTransitionEnd = () => {
        grid.removeEventListener('transitionend', onTransitionEnd);

        // Update kartu
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        cards.forEach((card, index) => {
        card.style.display = (index >= start && index < end) ? 'flex' : 'none';
        });

        // Animasi masuk
        grid.style.transform = inTransform;
        grid.style.opacity = "1";

        const onInEnd = () => {
        grid.removeEventListener('transitionend', onInEnd);
        grid.style.transform = "";
        grid.style.opacity = "";
        };
        grid.addEventListener('transitionend', onInEnd);
    };

    grid.addEventListener('transitionend', onTransitionEnd);
    void grid.offsetWidth;
    grid.style.transform = outTransform;
    grid.style.opacity = "0";

    currentPage = page;
    updatePagination();
    }

    function updatePagination() {
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    document.getElementById("pageNumber").innerText = currentPage;
    document.getElementById("btnPrev").disabled = currentPage === 1;
    document.getElementById("btnNext").disabled = currentPage === totalPages;
    }

    document.getElementById("btnPrev").onclick = () => {
    if (currentPage > 1) showPage(currentPage - 1);
    };

    document.getElementById("btnNext").onclick = () => {
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    if (currentPage < totalPages) showPage(currentPage + 1);
    };

    function initPage() {
    const start = 0;
    const end = cardsPerPage;
    cards.forEach((card, index) => {
        card.style.display = (index >= start && index < end) ? 'flex' : 'none';
    });
    currentPage = 1;
    updatePagination();
    grid.style.transform = "";
    grid.style.opacity = "";
    }
    initPage();
}

//--------------- Animasi Reveal ---------------------
const reveals = document.querySelectorAll(".reveal");

reveals.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(80px) scale(.97)";
    el.style.filter = "blur(10px)";
    el.style.transition = `
        opacity .8s cubic-bezier(.22,1,.36,1),
        transform .8s cubic-bezier(.22,1,.36,1),
        filter .8s cubic-bezier(.22,1,.36,1)
    `;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
            entry.target.style.filter = "blur(0)";
        }

    });
}, {
    threshold: 0.15
});

reveals.forEach(el => observer.observe(el));

(function () {
    const navigation =
        performance.getEntriesByType("navigation")[0];

    const navigationType =
        navigation ? navigation.type : "navigate";

    const referrer =
        document.referrer;

    let fromInternalPage = false;

    if (referrer) {
        try {
            const previousURL =
                new URL(referrer);
            fromInternalPage =
                previousURL.origin === window.location.origin;
        } catch (error) {
            fromInternalPage = false;
        }
    }

    let shouldShowPreloader = true;

    if (fromInternalPage) {
        shouldShowPreloader = false;
    }

    if (navigationType === "reload") {
        shouldShowPreloader = true;
    }

    if (!shouldShowPreloader) {
        return;
    }

    const preloaderFrame =
        document.createElement("iframe");

    preloaderFrame.id =
        "preloader-frame";

    preloaderFrame.src =
        "./preloader.html";

    preloaderFrame.className = `
        fixed
        inset-0
        z-[99999]
        h-screen
        w-full
        border-0
    `;

    document.body.prepend(
        preloaderFrame
    );

    window.addEventListener(
        "message",
        function (event) {
            if (
                event.data !==
                "preloader-finished"
            ) {
                return;
            }

            const frame =
                document.getElementById(
                    "preloader-frame"
                );

            if (!frame) {
                return;
            }

            frame.style.pointerEvents =
                "none";

            setTimeout(() => {
                frame.remove();
            }, 100);
        }
    );
})();

// =============== ANIMASI BINTANG ===============

const bintangKiri = document.getElementById("bintang-kiri");
const bintangKanan = document.getElementById("bintang-kanan");

if (bintangKiri && bintangKanan) {

    let rotationKiri = 0;
    let rotationKanan = 0;

    function rotateBintang() {

        rotationKiri += 0.1;
        rotationKanan -= 0.08;

        bintangKiri.style.transform =
            `rotate(${rotationKiri}deg)`;

        bintangKanan.style.transform =
            `rotate(${rotationKanan}deg)`;

        requestAnimationFrame(rotateBintang);
    }

    rotateBintang();
}

// ================= GITHUB ACTIVITY =================
async function loadGithubActivity() {
    const calendar = document.getElementById("github-calendar");
    const total = document.getElementById("github-total");
    const months = document.getElementById("github-months");

    if (!calendar || !total || !months) {
        return;
    }

    const username = "alfitodia";

    try {
        // ================= DATA TAHUN SAAT INI =================
        const currentYear = new Date().getFullYear();

        const response = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=${currentYear}`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        console.log(`GitHub Activity ${currentYear}:`, data);

        if (data.error || !Array.isArray(data.contributions)) {
            throw new Error(
                data.error || "Format data tidak dikenali"
            );
        }

        // ================= TOTAL KONTRIBUSI =================
        let totalCount = 0;

        if (data.total && typeof data.total === "object") {

            // Cari total berdasarkan tahun saat ini
            totalCount =
                Number(data.total[currentYear]) ||
                Object.values(data.total).reduce(
                    (sum, val) => sum + (Number(val) || 0),
                    0
                );

        } else if (Array.isArray(data.contributions)) {

            totalCount = data.contributions.reduce(
                (sum, day) => sum + (Number(day.count) || 0),
                0
            );
        }

        total.textContent =
            Number(totalCount).toLocaleString("en-US");

        // ================= SUSUN DATA HARI =================
        const days = [...data.contributions].sort(
            (a, b) =>
                new Date(a.date) - new Date(b.date)
        );

        // ================= BUAT MINGGU =================
        const weeks = [];
        let currentWeek = [];

        if (days.length > 0) {
            const firstDate =
                new Date(
                    days[0].date + "T00:00:00"
                );

            const firstDow =
                firstDate.getDay();

            // Padding sebelum tanggal pertama
            for (let i = 0; i < firstDow; i++) {
                currentWeek.push(null);
            }

            days.forEach((day) => {

                const date =
                    new Date(
                        day.date + "T00:00:00"
                    );

                const dow =
                    date.getDay();

                currentWeek.push(day);

                // Sabtu = akhir minggu
                if (dow === 6) {

                    weeks.push(currentWeek);

                    currentWeek = [];
                }
            });

            if (currentWeek.length > 0) {

                while (currentWeek.length < 7) {
                    currentWeek.push(null);
                }

                weeks.push(currentWeek);
            }
        }

        // ================= GRID =================
        calendar.innerHTML = "";

        weeks.forEach((week) => {

            const column =
                document.createElement("div");

            column.className =
                "flex flex-col gap-[4px] shrink-0";

            week.forEach((day) => {

                const cell =
                    document.createElement("div");

                cell.className =
                   "w-[17px] h-[17px] rounded-[3px] shrink-0";

                if (!day) {

                    cell.classList.add(
                        "bg-transparent"
                    );

                    column.appendChild(cell);

                    return;
                }

                const level =
                    Number(day.level) || 0;


                if (level === 0) {

                    cell.classList.add(
                        "bg-[#8B5E3C]/5"
                    );

                } else if (level === 1) {

                    cell.classList.add(
                        "bg-[#8B5E3C]/20"
                    );

                } else if (level === 2) {

                    cell.classList.add(
                        "bg-[#8B5E3C]/40"
                    );

                } else if (level === 3) {

                    cell.classList.add(
                        "bg-[#8B5E3C]/65"
                    );

                } else {

                    cell.classList.add(
                        "bg-[#8B5E3C]"
                    );
                }

                cell.title =
                    `${day.count || 0} contributions on ${day.date}`;
                column.appendChild(cell);
            });
            calendar.appendChild(column);
        });

        // ================= BULAN JAN - DES ===============
        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        months.innerHTML = "";

        const colWidth = 21;

        months.style.display = "flex";
        months.style.marginLeft = "3.3rem";
        months.style.position = "relative";
        months.style.height = "18px";

        weeks.forEach((week, weekIndex) => {

            const firstValidDay =
                week.find(
                    (day) => day !== null
                );

            if (!firstValidDay) {
                return;
            }

            const date =
                new Date(
                    firstValidDay.date + "T00:00:00"
                );

            const month =
                date.getMonth();

            const previousWeek =
                weekIndex > 0
                    ? weeks[weekIndex - 1]
                    : null;

            let previousMonth = null;

            if (previousWeek) {
                const previousValidDay =
                    previousWeek.find(
                        (day) => day !== null
                    );
                if (previousValidDay) {

                    previousMonth =
                        new Date(
                            previousValidDay.date +
                            "T00:00:00"
                        ).getMonth();
                }
            }

            if (
                weekIndex === 0 ||
                month !== previousMonth
            ) {
                const span =
                    document.createElement("span");

                span.textContent =
                    monthNames[month];

                span.style.position =
                    "absolute";

                span.style.left =
                    `${weekIndex * colWidth}px`;

                span.style.width =
                    `${colWidth * 4}px`;

                span.style.textAlign =
                    "left";

                span.style.whiteSpace =
                    "nowrap";

                months.appendChild(span);
            }
        });

        console.log(
            `GitHub Activity ${currentYear} berhasil dimuat.`
        );

    } catch (error) {

        console.error(
            "GitHub Activity gagal dimuat:",
            error
        );

        total.textContent = "—";

        calendar.innerHTML = `
            <p class="text-xs text-[#77716A]">
                GitHub activity gagal dimuat.
            </p>
        `;
    }
}

loadGithubActivity();

// ================= INVESTMENT PORTFOLIO =================
const investmentData = {
    nvidia: {
        name: "Nvidia Corp",
        percentage: 57.9,
        color: "#006041"
    },
    solana: {
        name: "Solana",
        percentage: 26.3,
        color: "#8B5E3C"
    },
    ethereum: {
        name: "Ethereum",
        percentage: 15.8,
        color: "#C89B3C"
    }
};


// ================= DONUT =================
function updateInvestmentDonut() {

    const donut = document.getElementById("investment-donut");

    if (!donut) return;

    const size = 340;
    const center = size / 2;

    // Radius donut
    const outerRadius = 170;
    const innerRadius = 85;

    let currentAngle = -90;

    const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
    svg.setAttribute("class", "w-full h-full overflow-visible");

    const segments = [];

    // ================= CREATE SEGMENTS =================
    Object.entries(investmentData).forEach(([key, asset]) => {
        const angle = asset.percentage * 3.6;

        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;

        function polarToCartesian(
            cx,
            cy,
            radius,
            angleInDegrees
        ) {
            const angleInRadians =
                angleInDegrees * Math.PI / 180;

            return {
                x: cx + radius * Math.cos(angleInRadians),
                y: cy + radius * Math.sin(angleInRadians)
            };
        }
        const outerStart = polarToCartesian(
            center,
            center,
            outerRadius,
            startAngle
        );
        const outerEnd = polarToCartesian(
            center,
            center,
            outerRadius,
            endAngle
        );
        const innerStart = polarToCartesian(
            center,
            center,
            innerRadius,
            endAngle
        );
        const innerEnd = polarToCartesian(
            center,
            center,
            innerRadius,
            startAngle
        );
        const largeArcFlag = angle > 180 ? 1 : 0;
        const pathData = `
            M ${outerStart.x} ${outerStart.y}

            A ${outerRadius} ${outerRadius}
            0 ${largeArcFlag} 1
            ${outerEnd.x} ${outerEnd.y}

            L ${innerStart.x} ${innerStart.y}

            A ${innerRadius} ${innerRadius}
            0 ${largeArcFlag} 0
            ${innerEnd.x} ${innerEnd.y}

            Z
        `;
        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        path.setAttribute("d", pathData);
        path.setAttribute("fill", asset.color);

        path.dataset.asset = key;
        // ================= ANIMATION =================
        path.style.transition = "fill 300ms ease, opacity 300ms ease";

        segments.push(path);

        svg.appendChild(path);

        currentAngle = endAngle;
    });

    // ================= HOVER =================
    segments.forEach((segment) => {
        segment.addEventListener("mouseenter", () => {
            segments.forEach((other) => {
                if (other !== segment) {
                    other.style.fill = "#F5F5F5";
                    other.style.opacity = "1";

                } else {
                    other.style.fill =
                        investmentData[
                            other.dataset.asset
                        ].color;
                    other.style.opacity = "1";
                }
            });

        });
        segment.addEventListener("mouseleave", () => {
            segments.forEach((other) => {
                const asset =
                    investmentData[
                        other.dataset.asset
                    ];
                other.style.fill = asset.color;
                other.style.opacity = "1";
            });
        });
    });

    // ================= CENTER HOLE =================
    const hole = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );

    hole.setAttribute("cx", center);
    hole.setAttribute("cy", center);
    hole.setAttribute("r", innerRadius);
    hole.setAttribute("fill", "white");

    svg.appendChild(hole);
    
    donut.appendChild(svg);
}

updateInvestmentDonut();