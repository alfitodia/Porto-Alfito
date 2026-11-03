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

// ================= WEATHER (WEATHERAPI) =================
async function loadWeather() {
    const weatherElement = document.getElementById("weather");

    if (!weatherElement) return;

    const API_KEY = "c4f928ad388743b39dd62950260311";

    try {
        weatherElement.textContent = "🌤️ Memuat cuaca...";

        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Malang&lang=id`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const suhu = Math.round(data.current.temp_c);
        const kelembapan = data.current.humidity;
        const kodeCuaca = data.current.condition.code;
        const siang = data.current.is_day === 1;

        const terjemahanCuaca = {
            1000: "Cerah",
            1003: "Cerah berawan",
            1006: "Berawan",
            1009: "Mendung",
            1030: "Berkabut",
            1063: "Hujan lokal",
            1066: "Salju lokal",
            1069: "Hujan es lokal",
            1072: "Gerimis beku lokal",
            1087: "Hujan petir",
            1114: "Badai salju",
            1117: "Badai salju lebat",
            1135: "Kabut",
            1147: "Kabut beku",
            1150: "Gerimis ringan lokal",
            1153: "Gerimis ringan",
            1168: "Gerimis beku",
            1171: "Gerimis beku lebat",
            1180: "Hujan ringan lokal",
            1183: "Hujan ringan",
            1186: "Hujan sedang lokal",
            1189: "Hujan sedang",
            1192: "Hujan lebat lokal",
            1195: "Hujan lebat",
            1198: "Hujan beku ringan",
            1201: "Hujan beku lebat",
            1204: "Hujan es ringan",
            1207: "Hujan es lebat",
            1210: "Salju ringan",
            1213: "Salju ringan",
            1216: "Salju sedang",
            1219: "Salju sedang",
            1222: "Salju lebat",
            1225: "Salju lebat",
            1237: "Hujan es",
            1240: "Hujan lokal ringan",
            1243: "Hujan lokal sedang",
            1246: "Hujan lokal lebat",
            1249: "Hujan es lokal ringan",
            1252: "Hujan es lokal lebat",
            1255: "Salju lokal ringan",
            1258: "Salju lokal lebat",
            1261: "Hujan es ringan",
            1264: "Hujan es lebat",
            1273: "Hujan petir lokal",
            1276: "Hujan petir disertai hujan lebat",
            1279: "Hujan salju disertai petir",
            1282: "Hujan salju lebat disertai petir"
        };

        const kondisi =
            terjemahanCuaca[kodeCuaca] ||
            data.current.condition.text;

        let ikonCuaca = "🌤️";

        if (kodeCuaca === 1000) {
            ikonCuaca = siang ? "☀️" : "🌙";
        } else if (kodeCuaca === 1003) {
            ikonCuaca = siang ? "🌤️" : "☁️";
        } else if ([1006, 1009].includes(kodeCuaca)) {
            ikonCuaca = "☁️";
        } else if ([1030, 1135, 1147].includes(kodeCuaca)) {
            ikonCuaca = "🌫️";
        } else if ([1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1240, 1249, 1252].includes(kodeCuaca)) {
            ikonCuaca = "🌦️";
        } else if ([1186, 1189, 1192, 1195, 1198, 1201, 1243, 1246].includes(kodeCuaca)) {
            ikonCuaca = "🌧️";
        } else if ([1087, 1273, 1276, 1279, 1282].includes(kodeCuaca)) {
            ikonCuaca = "⛈️";
        } else if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(kodeCuaca)) {
            ikonCuaca = "❄️";
        } else if ([1069, 1204, 1207, 1237, 1261, 1264].includes(kodeCuaca)) {
            ikonCuaca = "🌨️";
        }
        
        weatherElement.textContent =
            `Cuaca Malang: ${ikonCuaca} ${kondisi} (${suhu}°C) | Kelembapan: ${kelembapan}%`;

    } catch (error) {
        console.error("Gagal memuat cuaca:", error);
        weatherElement.textContent = "🌥️ Cuaca tidak tersedia";
    }
}

loadWeather();

setInterval(loadWeather, 600000);

// ================= Transisi Ketik =================
const texts = [
    "Frontend Developer",
    "Video Editor/3D Designer",
    "Mathematics Bachelor",
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
        "bg-black/5",
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
        "./Preloader.html";

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

// ================= LIQUID CORNER ANIMATION =================

const liquidElements = document.querySelectorAll(".liquid-float");

liquidElements.forEach((el, index) => {

    const duration = 7000 + index * 700;
    const startTime = performance.now();

    function animateLiquid(time) {

        const progress =
            ((time - startTime) % duration) / duration;

        const angle = progress * Math.PI * 2;

        const x = Math.sin(angle) * 4;
        const y = Math.cos(angle) * 4;
        const rotate = Math.sin(angle) * 0.6;

        el.style.transform =
            `translate(${x}px, ${y}px) rotate(${rotate}deg)`;

        requestAnimationFrame(animateLiquid);
    }

    requestAnimationFrame(animateLiquid);
});

// ================= CERTIFICATE GALLERY MODAL =================
const certificateGallery = {
    1: {
        images: [
            "assets/img/KMI Expo 2025/Sertif Rekan.png",
            "assets/img/KMI Expo 2025/1.jpg",
            "assets/img/KMI Expo 2025/4.jpg",
            "assets/img/KMI Expo 2025/3.JPG",
            "assets/img/KMI Expo 2025/6.jpg",
            "assets/img/KMI Expo 2025/7.jpg"
        ]
    },

    2: {
        images: [
            "assets/img/KPP Mining/SertifKPP.jpg.jpeg",
            "assets/img/KPP Mining/1.jpg",
            "assets/img/KPP Mining/2.jpg",
            "assets/img/KPP Mining/3.jpg",
            "assets/img/KPP Mining/4.jpg",
            "assets/img/KPP Mining/6.jpg",
            "assets/img/KPP Mining/7.jpg"
        ]
    },

    3: {
        images: [
            "assets/img/KMI Expo 2025/SertifStand.png",
            "assets/img/KMI Expo 2025/2.JPG",
            "assets/img/KMI Expo 2025/5.jpg"
        ]
    },

    4: {
        images: [
            "assets/img/PKM AMLI/Amli.png",
            "assets/img/PKM AMLI/1.JPG",
            "assets/img/PKM AMLI/2.JPG",
            "assets/img/PKM AMLI/3.JPG",
            "assets/img/PKM AMLI/4.JPG",
            "assets/img/PKM AMLI/5.JPG",
            "assets/img/PKM AMLI/6.jpg"
        ]
    },

    5: {
        images: [
            "assets/img/SertifJuri.jpg.jpeg"
        ]
    },

    6: {
        images: [
            "assets/img/Sentosa Foundation/SertifIDE3.jpeg"
        ]
    }

};

// ================= ELEMENT MODAL =================
const certificateModal =
    document.getElementById("certificateModal");

const certificateBackdrop =
    document.getElementById("certificateBackdrop");

const closeCertificateModal =
    document.getElementById("closeCertificateModal");

const certificateMainImage =
    document.getElementById("certificateMainImage");

const certificateThumbnails =
    document.getElementById("certificateThumbnails");

const viewCertificateButtons =
    document.querySelectorAll(".view-certificate");

if (
    certificateModal &&
    certificateBackdrop &&
    closeCertificateModal &&
    certificateMainImage &&
    certificateThumbnails
) {

    // ================= BUKA MODAL =================
    viewCertificateButtons.forEach(button => {
        button.addEventListener("click", () => {
            const certificateId =
                button.dataset.certificate;

            const certificate =
                certificateGallery[certificateId];

            if (!certificate) return;

            certificateMainImage.src =
                certificate.images[0];

            certificateThumbnails.innerHTML = "";

            certificate.images.forEach((image, index) => {
                const thumbnail =
                    document.createElement("button");
                thumbnail.type = "button";

                thumbnail.className = `
                    w-20 h-20
                    md:w-24 md:h-24
                    flex-shrink-0
                    shrink-0
                    rounded-lg
                    overflow-hidden
                    border-2
                    border-white/70
                    bg-white
                    hover:scale-105
                    transition-all
                    duration-300
                `;

                thumbnail.innerHTML = `
                    <img
                        src="${image}"
                        class="w-full h-full object-cover"
                        alt="Certificate ${index + 1}">
                `;

                thumbnail.addEventListener("click", () => {
                    certificateMainImage.src = image;

                    certificateThumbnails
                        .querySelectorAll("button")
                        .forEach(btn => {
                            btn.classList.remove(
                                "border-[#006041]",
                                "scale-105"
                            );
                            btn.classList.add(
                                "border-white/70"
                            );
                        });

                    thumbnail.classList.remove(
                        "border-white/70"
                    );

                    thumbnail.classList.add(
                        "border-[#006041]",
                        "scale-105"
                    );
                });

                if (index === 0) {
                    thumbnail.classList.remove(
                        "border-white/70"
                    );
                    thumbnail.classList.add(
                        "border-[#006041]",
                        "scale-105"
                    );
                }
                certificateThumbnails.appendChild(thumbnail);
            });
            
            certificateThumbnails.scrollLeft = 0;

            certificateModal.classList.remove("hidden");
            certificateModal.classList.add("flex");

            document.body.classList.add("overflow-hidden");
        });
    });

    // ================= TUTUP MODAL =================
    function closeCertificateGallery() {
        certificateModal.classList.add("hidden");
        certificateModal.classList.remove("flex");

        document.body.classList.remove("overflow-hidden");
    }

    closeCertificateModal.addEventListener(
        "click",
        closeCertificateGallery
    );

    certificateBackdrop.addEventListener(
        "click",
        closeCertificateGallery
    );

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeCertificateGallery();
        }
    });
}

// ================= CONTACT FORM NOTIFICATION =================
const contactForm = document.getElementById("contact-form");
const contactModal = document.getElementById("contact-modal");
const closeContactModal = document.getElementById("close-contact-modal");

const submitButton = document.getElementById("submit-contact");
const submitText = document.getElementById("submit-text");

const modalTitle = document.getElementById("contact-modal-title");
const modalMessage = document.getElementById("contact-modal-message");

const successIcon = document.getElementById("contact-success-icon");
const errorIcon = document.getElementById("contact-error-icon");

function showContactModal(success, message) {

    if (!contactModal) return;

    if (success) {

        modalTitle.textContent = "Pesan Berhasil Dikirim!";
        modalTitle.classList.remove("text-red-700");
        modalTitle.classList.add("text-[#006041]");

        successIcon.classList.remove("hidden");
        errorIcon.classList.add("hidden");

    } else {

        modalTitle.textContent = "Pesan Gagal Dikirim";

        modalTitle.classList.remove("text-[#006041]");
        modalTitle.classList.add("text-red-700");

        successIcon.classList.add("hidden");
        errorIcon.classList.remove("hidden");

    }

    modalMessage.textContent = message;

    contactModal.classList.remove("hidden");
    contactModal.classList.add("flex");

    document.body.classList.add("overflow-hidden");

    closeContactModal.focus();
}

function hideContactModal() {

    if (!contactModal) return;

    contactModal.classList.add("hidden");
    contactModal.classList.remove("flex");

    document.body.classList.remove("overflow-hidden");

}

if (closeContactModal && contactModal) {

    closeContactModal.addEventListener("click", hideContactModal);

    // Klik area luar modal
    contactModal.addEventListener("click", (event) => {

        if (event.target === contactModal) {
            hideContactModal();
        }

    });

    // Tutup menggunakan tombol Escape
    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            !contactModal.classList.contains("hidden")
        ) {
            hideContactModal();
        }

    });

}

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const originalText = "Kirim Pesan";

        submitButton.disabled = true;
        submitText.textContent = "Mengirim...";

        try {

            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (!response.ok || result.success !== "true") {
                throw new Error(
                    result.message || "Pesan tidak berhasil dikirim."
                );
            }

            contactForm.reset();

            showContactModal(
                true,
                "Terima kasih telah menghubungi saya. Pesan kamu berhasil dikirim dan akan segera saya baca."
            );

        } catch (error) {

            console.error("Gagal mengirim pesan:", error);

            showContactModal(
                false,
                "Maaf, pesan kamu belum berhasil dikirim. Silakan coba beberapa saat lagi."
            );

        } finally {

            submitButton.disabled = false;
            submitText.textContent = originalText;

        }

    });

}

