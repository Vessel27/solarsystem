$(document).ready(function () {
  const body = $("body");
  const solarsys = $("#solar-system");

  const planetData = {
    sun: {
      title: "The Sun",
      desc: "The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
      diameter: "1,392,700 km",
      distance: "0 km",
      orbit: "N/A",
    },
    mercury: {
      title: "Mercury",
      desc: "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets.",
      diameter: "4,879 km",
      distance: "57.9 million km",
      orbit: "88 days",
    },
    venus: {
      title: "Venus",
      desc: "Venus is the second planet from the Sun. It is sometimes called Earth's 'sister' or 'twin' planet as it is almost as large and has a similar composition.",
      diameter: "12,104 km",
      distance: "108.2 million km",
      orbit: "225 days",
    },
    earth: {
      title: "Earth",
      desc: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29.2% of Earth's surface is land consisting of continents and islands.",
      diameter: "12,742 km",
      distance: "149.6 million km",
      orbit: "365.25 days",
    },
    mars: {
      title: "Mars",
      desc: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. It is often referred to as the 'Red Planet'.",
      diameter: "6,779 km",
      distance: "227.9 million km",
      orbit: "687 days",
    },
    jupiter: {
      title: "Jupiter",
      desc: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined.",
      diameter: "139,820 km",
      distance: "778.5 million km",
      orbit: "11.86 years",
    },
    saturn: {
      title: "Saturn",
      desc: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth.",
      diameter: "116,460 km",
      distance: "1.434 billion km",
      orbit: "29.45 years",
    },
    uranus: {
      title: "Uranus",
      desc: "Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the great-grandfather of Ares, grandfather of Zeus and father of Cronus.",
      diameter: "50,724 km",
      distance: "2.871 billion km",
      orbit: "84 years",
    },
    neptune: {
      title: "Neptune",
      desc: "Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.",
      diameter: "49,244 km",
      distance: "4.495 billion km",
      orbit: "164.8 years",
    },
  };

  // Modal Logic
  function showModal(planetKey) {
    const data = planetData[planetKey];
    if (!data) return;

    $("#modal-title").text(data.title);
    $("#modal-desc").text(data.desc);
    $("#stat-diameter").text(data.diameter);
    $("#stat-distance").text(data.distance);
    $("#stat-orbit").text(data.orbit);

    $("#modal-overlay").fadeIn(300);
    $("#planet-modal").fadeIn(300);
  }

  function hideModal() {
    $("#modal-overlay").fadeOut(300);
    $("#planet-modal").fadeOut(300);
  }

  // Click events for planets and sun
  $(".planet, #sun").on("click", function () {
    const planetKey = $(this).data("planet");
    showModal(planetKey);
  });

  // Click events for side menu
  $("#data a").on("click", function (e) {
    e.preventDefault();
    const planetKey = $(this).data("planet");
    $("#data a").removeClass("active");
    $(this).addClass("active");
    showModal(planetKey);
  });

  $("#close-modal, #modal-overlay").on("click", hideModal);

  // Generate Stars
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  function generateStars() {
    stars.length = 0;
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        opacity: Math.random(),
      });
    }
  }
  generateStars();

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateStars();
  });

  // Generate Asteroids
  const belt = $("#asteroids-belt");
  const asteroidCount = 400; // Increased count for better visibility
  for (let i = 0; i < asteroidCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 23 + Math.random() * 4; // Wider belt
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    // Vertical spread for 3D effect
    const z = (Math.random() - 0.5) * 4; // Spread of 4em vertically

    // Randomly assign size class
    let sizeClass = "small";
    const rand = Math.random();
    if (rand > 0.9) sizeClass = "big";
    else if (rand > 0.6) sizeClass = "medium";

    const asteroid = $(`<div class="asteroid ${sizeClass}"></div>`);
    const baseColor = 70 + Math.random() * 50;
    asteroid.css({
      left: `calc(50% + ${x}em)`,
      top: `calc(50% + ${y}em)`,
      opacity: 0.8 + Math.random() * 0.2,
      background: `radial-gradient(circle at 35% 35%, rgb(${baseColor + 60}, ${baseColor + 60}, ${baseColor + 60}), rgb(${baseColor}, ${baseColor}, ${baseColor}) 70%, rgb(${baseColor - 20}, ${baseColor - 20}, ${baseColor - 20}))`,
      "--z-offset": `${z}em`, // Pass vertical offset to CSS variable
    });
    belt.append(asteroid);
  }

  // Toggle Panels
  $("#toggle-data").on("click", function () {
    body.toggleClass("data-open data-close");
  });

  $("#toggle-controls").on("click", function () {
    body.toggleClass("controls-open controls-close");
  });

  // Speed & Pause Controls
  const baseDurations = {
    "#mercury": 5,
    "#venus": 8,
    "#earth": 12,
    "#mars": 20,
    "#jupiter": 40,
    "#saturn": 60,
    "#uranus": 100,
    "#neptune": 150,
    "#asteroids-belt": 50,
    "#earth .orbit": 8,
  };

  function setSpeed(multiplier) {
    Object.entries(baseDurations).forEach(([sel, base]) => {
      const duration = (base / multiplier) + "s";
      $(sel).css("animation-duration", duration);
      $(sel + " .pos").css("animation-duration", duration);
    });
  }

  $("#speed-slider").on("input", function () {
    const val = parseFloat(this.value);
    $("#speed-label").text(val.toFixed(1) + "x");
    setSpeed(val);
  });

  let paused = false;
  $("#toggle-pause").on("click", function () {
    paused = !paused;
    const state = paused ? "paused" : "running";
    $(".orbit, .pos, #asteroids-belt, .asteroid").css("animation-play-state", state);
    $(this).text(paused ? "▶ Resume" : "⏸ Pause");
  });

  // Scale Toggle
  $('input[name="scale"]').on("change", function () {
    if (this.value === "size") {
      solarsys.addClass("scale-size");
    } else {
      solarsys.removeClass("scale-size");
    }
  });

  // Initial UI delay
  setTimeout(() => {
    body.removeClass("hide-UI");
  }, 1000);
});