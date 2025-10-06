const phases = [
  {
    id: "alpha",
    label: "Phase Alpha",
    title: "Fondation préconceptionnelle",
    timeline: "Avant conception",
    description: `Purifier le terrain et affiner la vision parentale pour que l’âme choisisse un véhicule clair et vibrant.`,
    points: [
      "Détoxiﬁcation ciblée foie, reins, lymphe et soutien de la méthylation.",
      "Nutrition quantique : oméga-3 intelligents, chlorophylle, plasma marin.",
      "Protection électromagnétique, activation pinéale et intention de transmission.",
    ],
  },
  {
    id: "beta",
    label: "Phase Bêta",
    title: "Grossesse sacrée",
    timeline: "Trimestres 1-3",
    description: `Créer une bulle sensorielle où l’enfant communique en conscience avec la mère et le père.`,
    points: [
      "Interface télépathique mère-enfant, visualisations et immersion sonore.",
      "Nutrition vibratoire, hygiène énergétique et rituel quotidien de gratitude.",
      "Préparation corporelle sacrée à l’accouchement et respiration consciente.",
    ],
  },
  {
    id: "charlie",
    label: "Phase Charlie",
    title: "Naissance sacrée",
    timeline: "Jours 1 à 3",
    description: `Accueillir l’enfant comme une âme souveraine : ancrer l’empreinte vibratoire du foyer.`,
    points: [
      "Création d’un espace d’accueil sacré et cérémonie de passage.",
      "Soins initiaux : colostrum, lumière rouge, harmonisation crânio-sacrée.",
      "Présence pleine, ancrage du nom et reconnaissance d’âme.",
    ],
  },
  {
    id: "delta",
    label: "Phase Delta",
    title: "Fondation quantique",
    timeline: "Jours 4 à 10",
    description: `Stabiliser les systèmes organiques et vibratoires pour un atterrissage doux dans la matière.`,
    points: [
      "Développement du microbiome et stimulation vestibulaire consciente.",
      "Bains sonores, lumière douce, posture et sécurité vibratoire.",
      "Alignement post-naissance et intégration des rythmes jour/nuit.",
    ],
  },
  {
    id: "echo",
    label: "Phase Echo",
    title: "Programmation fondamentale",
    timeline: "Jours 11 à 30",
    description: `Sculpter la neuro-perception par le toucher, le son et la cohérence émotionnelle.`,
    points: [
      "Développement sensoriel guidé et allaitement vibratoire.",
      "Massages énergétiques, activation méridiens et stimulation crânienne.",
      "Rituels circadiens et respiration synchronisée avec les parents.",
    ],
  },
  {
    id: "foxtrot",
    label: "Phase Foxtrot",
    title: "Conscience élargie",
    timeline: "Mois 2 à 12",
    description: `Éveiller le mouvement libre, la géométrie du vivant et l’immunité instinctive.`,
    points: [
      "Grilles cristallines, géométrie sacrée et bain de nature quotidien.",
      "Sonothérapie, mouvements croisés et stimulation vestibulaire.",
      "Soutien du système immunitaire par superaliments et lumière solaire.",
    ],
  },
  {
    id: "golf",
    label: "Phase Golf",
    title: "Développement avancé",
    timeline: "Âge 1 à 7 ans",
    description: `Accompagner l’enfant dans sa mission créative en activant langage sacré et intuition.`,
    points: [
      "Langage sacré, mandalas sonores et géométrie du vivant.",
      "Yoga arc-en-ciel, respiration rythmée et visualisation créative.",
      "Apprentissages naturels, jeûnes doux et nutrition instinctive.",
    ],
  },
  {
    id: "hotel",
    label: "Phase Hotel",
    title: "Intégration vibratoire",
    timeline: "Synthèse continue",
    description: `Unifier les apprentissages en un mode de vie sacré qui évolue avec l’enfant et la famille.`,
    points: [
      "Tableaux pratiques alimentation/fréquences et protocoles saisonniers.",
      "Journal d’évolution, rituels communautaires et cercle de guidance.",
      "Alignement missionnel pour l’enfant et ses gardiens.",
    ],
  },
];

function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navbar = document.querySelector(".navbar");

  if (!hamburger || !navMenu || !navbar) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  window.addEventListener("scroll", () => {
    const offset = window.scrollY;
    const opacity = Math.min(0.92, 0.72 + offset / 600);
    navbar.style.background = `rgba(4, 7, 18, ${opacity})`;
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

function buildPhases() {
  const list = document.getElementById("phaseList");
  const detail = document.getElementById("phaseDetail");
  if (!list || !detail) return;

  const tag = detail.querySelector(".phase-tag");
  const title = detail.querySelector("h3");
  const timeline = detail.querySelector(".phase-timeline");
  const description = detail.querySelector(".phase-description");
  const points = detail.querySelector(".phase-points");

  let activeId = phases[0].id;

  function renderDetail(phase) {
    if (!phase) return;
    tag.textContent = phase.label;
    title.textContent = phase.title;
    timeline.textContent = phase.timeline;
    description.textContent = phase.description;
    points.innerHTML = "";
    phase.points.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      points.appendChild(li);
    });
  }

  phases.forEach((phase) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "phase-card reveal";
    if (phase.id === activeId) {
      card.classList.add("active");
    }

    const titleWrap = document.createElement("div");
    const heading = document.createElement("h4");
    heading.textContent = phase.title;
    const label = document.createElement("span");
    label.textContent = phase.label;
    titleWrap.append(heading, label);

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-arrow-right";

    card.append(titleWrap, icon);
    card.dataset.phaseId = phase.id;
    card.addEventListener("click", () => {
      if (activeId === phase.id) return;
      activeId = phase.id;
      document
        .querySelectorAll(".phase-card")
        .forEach((btn) => btn.classList.remove("active"));
      card.classList.add("active");
      renderDetail(phase);
    });

    list.appendChild(card);
  });

  renderDetail(phases[0]);
}

function initReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  const selectors = [
    ".vision-card",
    ".phase-detail",
    ".stat-card",
    ".immersion-card",
    ".immersion-quote",
    ".point-card",
    ".contact-inner",
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  });

  document
    .querySelectorAll(".phase-card")
    .forEach((el) => observer.observe(el));
}

function createRibbon(group) {
  const points = [];
  const layers = 32;
  for (let i = 0; i < layers; i += 1) {
    const angle = (i / layers) * Math.PI * 2;
    const radius = 1.8 + Math.sin(angle * 1.6) * 0.4;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.2) * 0.9,
        Math.sin(angle) * radius,
      ),
    );
  }
  const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.5);
  const geometry = new THREE.TubeGeometry(curve, 320, 0.12, 16, true);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00d8ff,
    metalness: 0.8,
    roughness: 0.1,
    transparent: true,
    opacity: 0.65,
    emissive: 0x06253c,
    emissiveIntensity: 0.4,
  });
  const ribbon = new THREE.Mesh(geometry, material);
  ribbon.rotation.x = Math.PI * 0.2;
  group.add(ribbon);
  return ribbon;
}

function createHalo(group) {
  const geometry = new THREE.RingGeometry(2.6, 3.7, 128);
  const material = new THREE.MeshBasicMaterial({
    color: 0x64ffda,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide,
  });
  const halo = new THREE.Mesh(geometry, material);
  halo.rotation.x = Math.PI / 2;
  halo.position.y = -0.2;
  group.add(halo);
  return halo;
}

function createNoisePlane(scene) {
  const geometry = new THREE.PlaneGeometry(18, 12, 1, 1);
  const uniforms = {
    uTime: { value: 0 },
    uIntensity: { value: 0.08 },
  };
  const vertex = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;
  const fragment = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uIntensity;

    float hash(vec2 p){
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p){
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main(){
      vec2 uv = vUv * 4.0;
      float n = noise(uv + uTime * 0.08);
      float grain = noise(uv * 2.5 + uTime * 0.2);
      float glow = smoothstep(0.2, 1.0, n);
      vec3 color = vec3(0.0, 0.5, 0.7) * glow + vec3(0.2 * grain);
      gl_FragColor = vec4(color, uIntensity * (0.3 + glow * 0.7));
    }
  `;
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, -5);
  mesh.rotation.x = -0.08;
  scene.add(mesh);
  return { mesh, uniforms };
}

function initThreeScene() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x050b17, 6, 26);

  const camera = new THREE.PerspectiveCamera(
    58,
    window.innerWidth / window.innerHeight,
    0.1,
    120,
  );
  camera.position.set(0, 0.6, 8.4);

  const ambient = new THREE.AmbientLight(0x6bc3ff, 0.45);
  scene.add(ambient);

  const lightFront = new THREE.PointLight(0x64ffda, 1.4, 60);
  lightFront.position.set(8, 6, 8);
  scene.add(lightFront);

  const lightBack = new THREE.PointLight(0x2336ff, 1, 70);
  lightBack.position.set(-7, -5, -6);
  scene.add(lightBack);

  const coreGroup = new THREE.Group();
  const floatingGroup = new THREE.Group();
  const haloGroup = new THREE.Group();
  scene.add(coreGroup);
  coreGroup.add(floatingGroup);
  coreGroup.add(haloGroup);

  const geometries = [
    new THREE.IcosahedronGeometry(1.2, 2),
    new THREE.DodecahedronGeometry(0.9),
    new THREE.OctahedronGeometry(0.7),
    new THREE.TetrahedronGeometry(0.5),
  ];

  const palette = [0x64ffda, 0x00d8ff, 0x78a0ff];

  for (let i = 0; i < 22; i += 1) {
    const geometry = geometries[i % geometries.length].clone();
    const material = new THREE.MeshStandardMaterial({
      color: palette[i % palette.length],
      roughness: 0.18,
      metalness: 0.72,
      transparent: true,
      opacity: 0.88,
      emissive: 0x071321,
      emissiveIntensity: 0.45,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const radius = 2.2 + Math.random() * 2.6;
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * (Math.PI * 0.9);
    mesh.position.set(
      Math.sin(theta) * Math.cos(phi) * radius,
      (Math.cos(theta) * 1.4 + Math.random() * 0.4) * 1.2,
      Math.sin(theta) * Math.sin(phi) * radius,
    );
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    );
    mesh.userData = {
      speed: 0.003 + Math.random() * 0.004,
      noiseOffset: Math.random() * Math.PI * 2,
    };
    floatingGroup.add(mesh);
  }

  const ribbon = createRibbon(haloGroup);
  const halo = createHalo(haloGroup);

  const { mesh: noisePlane, uniforms: noiseUniforms } = createNoisePlane(scene);

  // Enhanced particle system with multiple layers
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1200;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i += 1) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 40;
    positions[i3 + 1] = (Math.random() - 0.5) * 35;
    positions[i3 + 2] = (Math.random() - 0.5) * 40;

    // Rainbow color distribution
    const colorIndex = Math.floor(Math.random() * 6);
    const rainbowColors = [
      [1.0, 0.41, 0.38], // Red
      [1.0, 0.65, 0.17], // Orange
      [1.0, 0.86, 0.35], // Yellow
      [0.38, 0.87, 0.72], // Green
      [0.41, 0.62, 1.0], // Blue
      [0.78, 0.4, 1.0], // Purple
    ];
    const [r, g, b] = rainbowColors[colorIndex];
    colors[i3] = r;
    colors[i3 + 1] = g;
    colors[i3 + 2] = b;

    sizes[i] = Math.random() * 0.08 + 0.02;
  }

  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  starGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.05,
    transparent: true,
    opacity: 0.8,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Add floating orbs for extra depth
  const orbGeometry = new THREE.SphereGeometry(0.15, 16, 16);
  const orbMaterial = new THREE.MeshBasicMaterial({
    color: 0x64ffda,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
  });

  for (let i = 0; i < 15; i += 1) {
    const orb = new THREE.Mesh(orbGeometry, orbMaterial.clone());
    orb.position.set(
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 25,
    );
    orb.userData = {
      speed: 0.002 + Math.random() * 0.003,
      direction: Math.random() * Math.PI * 2,
    };
    scene.add(orb);
  }

  const pointer = new THREE.Vector2();
  const targetRotation = { x: 0, y: 0 };

  function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * Math.PI * 0.06;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * Math.PI * 0.04;
    targetRotation.x = pointer.y;
    targetRotation.y = pointer.x;
  }

  window.addEventListener("pointermove", onPointerMove);

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", onResize);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Animate floating geometric shapes
    floatingGroup.children.forEach((mesh) => {
      const { speed, noiseOffset } = mesh.userData;
      mesh.rotation.x += speed;
      mesh.rotation.y += speed * 1.4;
      mesh.position.y += Math.sin(elapsed * 0.6 + noiseOffset) * 0.0025;
    });

    // Animate floating orbs
    scene.children.forEach((child) => {
      if (child.userData && child.userData.speed) {
        const { speed, direction } = child.userData;
        child.position.x += Math.cos(direction + elapsed * speed) * 0.001;
        child.position.y += Math.sin(direction + elapsed * speed * 1.3) * 0.001;
        child.position.z += Math.cos(direction + elapsed * speed * 0.7) * 0.001;
        child.rotation.x += speed * 0.5;
        child.rotation.y += speed * 0.8;
      }
    });

    // Animate main elements
    halo.rotation.z += 0.0009;
    ribbon.rotation.y += 0.0008;
    haloGroup.rotation.y += (targetRotation.y - haloGroup.rotation.y) * 0.04;
    haloGroup.rotation.x += (targetRotation.x - haloGroup.rotation.x) * 0.04;

    // Enhanced star field animation
    stars.rotation.y += 0.0004;
    stars.rotation.x += 0.0001;

    // Animate star opacity for twinkling effect
    const twinkle = Math.sin(elapsed * 2) * 0.1 + 0.8;
    starMaterial.opacity = twinkle;

    // Update noise shader
    noiseUniforms.uTime.value = elapsed;

    renderer.render(scene, camera);
  }

  animate();

  setupScrollMotion({
    camera,
    coreGroup,
    floatingGroup,
    ribbon,
    halo,
    noisePlane,
  });
}

function setupScrollMotion({
  camera,
  coreGroup,
  floatingGroup,
  ribbon,
  halo,
  noisePlane,
}) {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;
  gsap.registerPlugin(ScrollTrigger);

  // Create a more sophisticated scroll timeline like igloo.inc
  const master = gsap.timeline({ defaults: { ease: "none" } });

  // Hero section - initial camera movement
  master.to(camera.position, {
    z: 7.2,
    y: 0.4,
    x: 0.3,
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    },
  });

  // Vision section - dramatic rotation and color shift
  master.to(coreGroup.rotation, {
    y: () => coreGroup.rotation.y + Math.PI * 1.2,
    x: () => coreGroup.rotation.x - Math.PI * 0.18,
    z: () => coreGroup.rotation.z + Math.PI * 0.3,
    scrollTrigger: {
      trigger: "#vision",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  // Phases section - camera dive and ribbon transformation
  master.to(
    camera.position,
    {
      z: 5.8,
      y: -0.2,
      x: 0.8,
      scrollTrigger: {
        trigger: "#phases",
        start: "top 80%",
        end: "bottom top",
        scrub: 1.8,
      },
    },
    0,
  );

  master.to(
    ribbon.material,
    {
      opacity: 0.95,
      emissiveIntensity: 0.9,
      color: 0xff6b61,
      scrollTrigger: {
        trigger: "#phases",
        start: "top center",
        end: "bottom top",
        scrub: 1.2,
      },
    },
    0,
  );

  // Evidence section - floating elements dance
  master.to(
    floatingGroup.position,
    {
      y: 0.8,
      x: 0.4,
      scrollTrigger: {
        trigger: "#evidence",
        start: "top 85%",
        end: "bottom top",
        scrub: 1.4,
      },
    },
    0,
  );

  master.to(
    floatingGroup.rotation,
    {
      y: Math.PI * 0.4,
      x: Math.PI * 0.1,
      scrollTrigger: {
        trigger: "#evidence",
        start: "top 85%",
        end: "bottom top",
        scrub: 1.6,
      },
    },
    0,
  );

  // Immersion section - halo expansion and color shift
  master.to(
    halo.scale,
    {
      x: 1.6,
      y: 1.6,
      scrollTrigger: {
        trigger: "#immersion",
        start: "top bottom",
        end: "top 20%",
        scrub: 1.3,
      },
    },
    0,
  );

  master.to(
    halo.material,
    {
      color: 0x61ddb7,
      opacity: 0.4,
      scrollTrigger: {
        trigger: "#immersion",
        start: "top bottom",
        end: "top 20%",
        scrub: 1.1,
      },
    },
    0,
  );

  // Noise plane intensity and color evolution
  master.to(
    noisePlane.material.uniforms.uIntensity,
    {
      value: 0.25,
      scrollTrigger: {
        trigger: "#immersion",
        start: "top 80%",
        end: "bottom top",
        scrub: 1.5,
      },
    },
    0,
  );

  // Contact section - final camera pull back
  master.to(
    camera.position,
    {
      z: 8.5,
      y: 0.1,
      x: 0,
      scrollTrigger: {
        trigger: "#contact",
        start: "top 90%",
        end: "bottom top",
        scrub: 1.2,
      },
    },
    0,
  );

  // Add parallax effect to floating elements
  floatingGroup.children.forEach((mesh, index) => {
    gsap.to(mesh.position, {
      y: `+=${0.5 + index * 0.1}`,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2 + index * 0.2,
      },
    });
  });

  // Add color transitions to floating elements
  floatingGroup.children.forEach((mesh, index) => {
    const colors = [0xff6b61, 0xffa62b, 0xffdb5a, 0x61ddb7, 0x689dff, 0xc867ff];
    gsap.to(mesh.material, {
      color: colors[index % colors.length],
      scrollTrigger: {
        trigger: "#phases",
        start: "top center",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  });

  ScrollTrigger.refresh();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSmoothScroll();
  buildPhases();
  initReveals();
});

window.addEventListener("load", () => {
  initThreeScene();
});
