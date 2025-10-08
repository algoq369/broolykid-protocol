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
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Performance optimizations
  renderer.shadowMap.enabled = false;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

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
  const isMobile = window.innerWidth < 768;
  const starCount = isMobile ? 600 : 1200;
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
      [0.78, 0.40, 1.0], // Purple
    ];
    const [r, g, b] = rainbowColors[colorIndex];
    colors[i3] = r;
    colors[i3 + 1] = g;
    colors[i3 + 2] = b;

    sizes[i] = Math.random() * 0.08 + 0.02;
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
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

  const orbCount = isMobile ? 8 : 15;
  for (let i = 0; i < orbCount; i += 1) {
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

  // Add interactive particles that respond to mouse movement
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = isMobile ? 200 : 500;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i += 1) {
    const i3 = i * 3;
    particlePositions[i3] = (Math.random() - 0.5) * 50;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 40;
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 50;

    // Random rainbow colors
    const colorIndex = Math.floor(Math.random() * 6);
    const rainbowColors = [
      [1.0, 0.41, 0.38], // Red
      [1.0, 0.65, 0.17], // Orange
      [1.0, 0.86, 0.35], // Yellow
      [0.38, 0.87, 0.72], // Green
      [0.41, 0.62, 1.0], // Blue
      [0.78, 0.40, 1.0], // Purple
    ];
    const [r, g, b] = rainbowColors[colorIndex];
    particleColors[i3] = r;
    particleColors[i3 + 1] = g;
    particleColors[i3 + 2] = b;
  }

  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.02,
    transparent: true,
    opacity: 0.6,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

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

    // Animate floating orbs with enhanced morphing effects
    scene.children.forEach((child) => {
      if (child.userData && child.userData.speed) {
        const { speed, direction } = child.userData;
        child.position.x += Math.cos(direction + elapsed * speed) * 0.002;
        child.position.y += Math.sin(direction + elapsed * speed * 1.3) * 0.002;
        child.position.z += Math.cos(direction + elapsed * speed * 0.7) * 0.002;
        child.rotation.x += speed * 0.8;
        child.rotation.y += speed * 1.2;
        child.rotation.z += speed * 0.3;

        // Add morphing scale effects like igloo.inc
        const morphScale = 1 + Math.sin(elapsed * speed * 2) * 0.15;
        child.scale.setScalar(morphScale);

        // Add dynamic color shifting
        if (child.material && child.material.color) {
          const hue = (elapsed * 0.1 + direction) % 1;
          child.material.color.setHSL(hue, 0.8, 0.7);
        }
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

    // Animate interactive particles with enhanced effects
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0003;
    particles.rotation.z += 0.0002;

    // Make particles respond to mouse movement with more dramatic effects
    const mouseInfluence = 0.2;
    particles.rotation.y += (targetRotation.y * mouseInfluence - particles.rotation.y) * 0.02;
    particles.rotation.x += (targetRotation.x * mouseInfluence - particles.rotation.x) * 0.02;

    // Add morphing effects to particles
    const particleMorph = 1 + Math.sin(elapsed * 3) * 0.1;
    particles.scale.setScalar(particleMorph);

    // Add dynamic opacity changes
    if (particles.material) {
      particles.material.opacity = 0.7 + Math.sin(elapsed * 2) * 0.2;
    }

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

  // Create dramatic igloo.inc-style scroll timeline with more fluid animations
  const master = gsap.timeline({ defaults: { ease: "power2.out" } });

  // Hero section - dramatic camera zoom and rotation (igloo.inc style)
  master.to(camera.position, {
    z: 3.2,
    y: 2.1,
    x: 1.4,
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
    },
  });

  master.to(camera.rotation, {
    x: -0.25,
    y: 0.2,
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.7,
    },
  });

  // Add dramatic field of view changes like igloo.inc
  master.to(camera, {
    fov: 75,
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: () => camera.updateProjectionMatrix(),
    },
  });

  // Vision section - massive transformation with morphing effects
  master.to(coreGroup.rotation, {
    y: () => coreGroup.rotation.y + Math.PI * 3.2,
    x: () => coreGroup.rotation.x - Math.PI * 0.6,
    z: () => coreGroup.rotation.z + Math.PI * 1.2,
    scrollTrigger: {
      trigger: "#vision",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.8,
    },
  });

  master.to(coreGroup.scale, {
    x: 1.8,
    y: 1.8,
    z: 1.8,
    scrollTrigger: {
      trigger: "#vision",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.0,
    },
  });

  // Add dramatic position changes like igloo.inc
  master.to(coreGroup.position, {
    y: 0.8,
    x: 0.5,
    z: -0.3,
    scrollTrigger: {
      trigger: "#vision",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.9,
    },
  });

  // Phases section - camera dive and dramatic color shift
  master.to(
    camera.position,
    {
      z: 3.2,
      y: -0.8,
      x: 1.5,
      scrollTrigger: {
        trigger: "#phases",
        start: "top 80%",
        end: "bottom top",
        scrub: 1.0,
      },
    },
    0,
  );

  master.to(
    camera.rotation,
    {
      x: 0.2,
      y: -0.3,
      scrollTrigger: {
        trigger: "#phases",
        start: "top 80%",
        end: "bottom top",
        scrub: 1.2,
      },
    },
    0,
  );

  master.to(
    ribbon.material,
    {
      opacity: 1.0,
      emissiveIntensity: 1.2,
      color: 0xff6b61,
      scrollTrigger: {
        trigger: "#phases",
        start: "top center",
        end: "bottom top",
        scrub: 0.8,
      },
    },
    0,
  );

  // Evidence section - explosive transformation
  master.to(
    floatingGroup.position,
    {
      y: 1.5,
      x: 0.8,
      z: 0.5,
      scrollTrigger: {
        trigger: "#evidence",
        start: "top 85%",
        end: "bottom top",
        scrub: 0.9,
      },
    },
    0,
  );

  master.to(
    floatingGroup.rotation,
    {
      y: Math.PI * 0.8,
      x: Math.PI * 0.3,
      z: Math.PI * 0.2,
      scrollTrigger: {
        trigger: "#evidence",
        start: "top 85%",
        end: "bottom top",
        scrub: 1.1,
      },
    },
    0,
  );

  master.to(
    floatingGroup.scale,
    {
      x: 1.4,
      y: 1.4,
      z: 1.4,
      scrollTrigger: {
        trigger: "#evidence",
        start: "top 85%",
        end: "bottom top",
        scrub: 1.3,
      },
    },
    0,
  );

  // Immersion section - massive halo expansion
  master.to(
    halo.scale,
    {
      x: 2.2,
      y: 2.2,
      scrollTrigger: {
        trigger: "#immersion",
        start: "top bottom",
        end: "top 20%",
        scrub: 0.7,
      },
    },
    0,
  );

  master.to(
    halo.material,
    {
      color: 0x61ddb7,
      opacity: 0.6,
      scrollTrigger: {
        trigger: "#immersion",
        start: "top bottom",
        end: "top 20%",
        scrub: 0.9,
      },
    },
    0,
  );

  // Noise plane dramatic intensity increase
  master.to(
    noisePlane.material.uniforms.uIntensity,
    {
      value: 0.4,
      scrollTrigger: {
        trigger: "#immersion",
        start: "top 80%",
        end: "bottom top",
        scrub: 1.0,
      },
    },
    0,
  );

  // Contact section - final dramatic pull back
  master.to(
    camera.position,
    {
      z: 12.0,
      y: 0.5,
      x: 0,
      scrollTrigger: {
        trigger: "#contact",
        start: "top 90%",
        end: "bottom top",
        scrub: 0.8,
      },
    },
    0,
  );

  master.to(
    camera.rotation,
    {
      x: 0,
      y: 0,
      scrollTrigger: {
        trigger: "#contact",
        start: "top 90%",
        end: "bottom top",
        scrub: 1.0,
      },
    },
    0,
  );

  // Enhanced parallax effects for floating elements
  floatingGroup.children.forEach((mesh, index) => {
    gsap.to(mesh.position, {
      y: `+=${1.0 + index * 0.2}`,
      x: `+=${0.3 + index * 0.1}`,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5 + index * 0.3,
      },
    });
  });

  // Dynamic color transitions for floating elements
  floatingGroup.children.forEach((mesh, index) => {
    const colors = [0xff6b61, 0xffa62b, 0xffdb5a, 0x61ddb7, 0x689dff, 0xc867ff];
    gsap.to(mesh.material, {
      color: colors[index % colors.length],
      emissiveIntensity: 0.8,
      scrollTrigger: {
        trigger: "#phases",
        start: "top center",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  });

  // Add dramatic scale animations to individual elements with morphing
  floatingGroup.children.forEach((mesh, index) => {
    gsap.to(mesh.scale, {
      x: 2.2,
      y: 2.2,
      z: 2.2,
      scrollTrigger: {
        trigger: "#evidence",
        start: "top 80%",
        end: "bottom top",
        scrub: 0.8 + index * 0.1,
      },
    });

    // Add individual rotation effects like igloo.inc
    gsap.to(mesh.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 1.5,
      z: Math.PI * 0.8,
      scrollTrigger: {
        trigger: "#evidence",
        start: "top 80%",
        end: "bottom top",
        scrub: 1.2 + index * 0.15,
      },
    });
  });

  // Add morphing effects to particles
  if (typeof particles !== "undefined") {
    gsap.to(particles.material, {
      opacity: 0.9,
      scrollTrigger: {
        trigger: "#phases",
        start: "top center",
        end: "bottom top",
        scrub: 1.0,
      },
    });

    gsap.to(particles.rotation, {
      y: Math.PI * 2,
      x: Math.PI * 0.5,
      scrollTrigger: {
        trigger: "#phases",
        start: "top center",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }

  // Add dramatic lighting changes like igloo.inc
  const lights = scene.children.filter(child => child.isLight);
  lights.forEach((light, index) => {
    gsap.to(light, {
      intensity: 2.5,
      scrollTrigger: {
        trigger: "#immersion",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.0 + index * 0.2,
      },
    });
  });

  // Add dramatic fog effects like igloo.inc
  if (scene.fog) {
    gsap.to(scene.fog, {
      near: 0.1,
      far: 50,
      scrollTrigger: {
        trigger: "#phases",
        start: "top center",
        end: "bottom top",
        scrub: 1.0,
      },
    });
  }

  // Add dramatic renderer effects
  gsap.to(renderer, {
    toneMappingExposure: 2.0,
    scrollTrigger: {
      trigger: "#evidence",
      start: "top center",
      end: "bottom top",
      scrub: 1.0,
    },
  });

  // Add dramatic camera shake effects like igloo.inc
  gsap.to(camera.position, {
    x: "+=0.1",
    y: "+=0.05",
    scrollTrigger: {
      trigger: "#phases",
      start: "top center",
      end: "bottom top",
      scrub: 0.3,
      ease: "power2.inOut",
    },
  });

  ScrollTrigger.refresh();
}

// Multi-language content for PDF generation - Real content from BROOLYKID PDF
const translations = {
  fr: {
    title: "Protocole BROOLYKID",
    subtitle: "Programme Avancé de Développement de l'Enfant",
    vision: "Ce protocole représente une approche révolutionnaire pour l'optimisation du développement humain. Il demande engagement, patience et adaptation constante, mais les résultats en termes d'éveil conscientiel et de potentiel actualisé justifient largement l'investissement.",
    phases: [
      {
        id: "Alpha",
        name: "Fondation Préconceptionnelle",
        description: "Détoxification biologique (foie, reins, lymphe), nutrition quantique & Oméga-3 intelligents, protection énergétique & purification des ondes (EMF), pratiques de couple, héritage ancestral, activation de l'ADN, glande pinéale & vision intérieure."
      },
      {
        id: "Beta",
        name: "Grossesse Sacrée",
        description: "Trimestres 1 à 3 : sécurité, conscience, communication subtile, interface télépathique mère-enfant, immersion sonore, visualisation prénatale, nutrition vibratoire et hygiène énergétique."
      },
      {
        id: "Charlie",
        name: "Naissance Sacrée",
        description: "Création d'un espace d'accueil sacré, cérémonie de passage & empreinte vibratoire, soins initiaux : colostrum, crânio-sacré, lumière rouge, présence, ancrage, reconnaissance d'âme."
      },
      {
        id: "Delta",
        name: "Fondation Quantique",
        description: "Développement du microbiome, massage sacré, stimulation vestibulaire, bain sonore, lumière douce & sécurité vibratoire, alignement post-naissance."
      },
      {
        id: "Echo",
        name: "Programmation Fondamentale",
        description: "Développement sensoriel et neuro-emotionnel, nutrition par allaitement vibratoire, massage énergétique, méridiens, stimulation crânienne, harmonisation des cycles jour/nuit."
      },
      {
        id: "Foxtrot",
        name: "Conscience Élargie",
        description: "Grille cristalline, géométrie du vivant, sonothérapie & mouvement libre, bain de nature, éveil des perceptions, soutien de l'immunité naturelle."
      },
      {
        id: "Golf",
        name: "Développement Avancé",
        description: "Langage sacré & géométrie sonore, yoga, méditation arc-en-ciel, visualisation créative, apprentissages naturels & protocoles de jeûne doux, nutrition instinctive, activation cérébrale douce."
      },
      {
        id: "Hotel",
        name: "Intégration Vibratoire",
        description: "Récapitulatif des étapes (Alpha à Golf), tableaux pratiques : alimentation, fréquence, soins, synthèse sacrée et intégration complète."
      }
    ],
    evidence: "Hippocrate : 'Que ton aliment soit ta seule médecine et que ta médecine soit ton aliment.' Maître Omraam Mikhaël Aïvanhov : 'La nourriture est une lettre d'amour que nous envoie le Créateur.' Neuroplasticité et jeûne : Le jeûne intermittent chez l'enfant augmente la production de BDNF favorisant la connexion spirituelle.",
    methodology: "Nous incarnons des milliers d'années d'évolution humaine, porteurs de l'âme guerrière de nos ancêtres. Ces systèmes de récompense humains sont gravés profondément dans notre ADN. Camaraderie, amour, famille, amitié, lutte, dépassement de soi, apprentissage - tous ces éléments sont essentiels."
  },
  en: {
    title: "BROOLYKID Protocol",
    subtitle: "Advanced Child Development Program",
    vision: "This protocol represents a revolutionary approach to human development optimization. It requires commitment, patience and constant adaptation, but the results in terms of conscious awakening and actualized potential largely justify the investment.",
    phases: [
      {
        id: "Alpha",
        name: "Preconception Foundation",
        description: "Biological detoxification (liver, kidneys, lymph), quantum nutrition & intelligent Omega-3s, energetic protection & EMF purification, couple practices, ancestral heritage, DNA activation, pineal gland & inner vision."
      },
      {
        id: "Beta",
        name: "Sacred Pregnancy",
        description: "Trimesters 1-3: security, consciousness, subtle communication, mother-child telepathic interface, sound immersion, prenatal visualization, vibrational nutrition and energetic hygiene."
      },
      {
        id: "Charlie",
        name: "Sacred Birth",
        description: "Creation of a sacred welcoming space, passage ceremony & vibrational imprint, initial care: colostrum, cranio-sacral, red light, presence, anchoring, soul recognition."
      },
      {
        id: "Delta",
        name: "Quantum Foundation",
        description: "Microbiome development, sacred massage, vestibular stimulation, sound bath, soft light & vibrational security, post-birth alignment."
      },
      {
        id: "Echo",
        name: "Fundamental Programming",
        description: "Sensory and neuro-emotional development, vibrational breastfeeding nutrition, energetic massage, meridians, cranial stimulation, day/night cycle harmonization."
      },
      {
        id: "Foxtrot",
        name: "Expanded Consciousness",
        description: "Crystalline grid, geometry of life, sound therapy & free movement, nature bath, perception awakening, natural immunity support."
      },
      {
        id: "Golf",
        name: "Advanced Development",
        description: "Sacred language & sound geometry, yoga, rainbow meditation, creative visualization, natural learning & gentle fasting protocols, instinctive nutrition, gentle brain activation."
      },
      {
        id: "Hotel",
        name: "Vibrational Integration",
        description: "Summary of steps (Alpha to Golf), practical tables: nutrition, frequency, care, sacred synthesis and complete integration."
      }
    ],
    evidence: "Hippocrates: 'Let food be thy medicine and medicine be thy food.' Master Omraam Mikhaël Aïvanhov: 'Food is a love letter that the Creator sends us.' Neuroplasticity and fasting: Intermittent fasting in children increases BDNF production promoting spiritual connection.",
    methodology: "We embody thousands of years of human evolution, bearers of the warrior soul of our ancestors. These human reward systems are deeply engraved in our DNA. Camaraderie, love, family, friendship, struggle, self-transcendence, learning - all these elements are essential."
  },
  ar: {
    title: "بروتوكول BROOLYKID",
    subtitle: "برنامج متقدم لتطوير الطفل",
    vision: "هذا البروتوكول يمثل نهجاً ثورياً لتحسين التنمية البشرية. يتطلب الالتزام والصبر والتكيف المستمر، لكن النتائج من حيث اليقظة الواعية والإمكانات المحققة تبرر الاستثمار إلى حد كبير.",
    phases: [
      {
        id: "Alpha",
        name: "الأساس ما قبل الحمل",
        description: "إزالة السموم البيولوجية (الكبد، الكلى، الليمف)، التغذية الكمية وأوميغا 3 الذكية، الحماية الطاقية وتنقية الموجات، ممارسات الزوجين، التراث الأبوي، تفعيل الحمض النووي، الغدة الصنوبرية والرؤية الداخلية."
      },
      {
        id: "Beta",
        name: "الحمل المقدس",
        description: "الثلث الأول إلى الثالث: الأمان، الوعي، التواصل الدقيق، واجهة التخاطر بين الأم والطفل، الغمر الصوتي، التصور قبل الولادة، التغذية الاهتزازية والنظافة الطاقية."
      },
      {
        id: "Charlie",
        name: "الولادة المقدسة",
        description: "خلق مساحة ترحيب مقدسة، مراسم المرور والبصمة الاهتزازية، الرعاية الأولية: اللبأ، القحفي العجزي، الضوء الأحمر، الحضور، الترسيخ، الاعتراف بالروح."
      },
      {
        id: "Delta",
        name: "الأساس الكمي",
        description: "تطوير الميكروبيوم، التدليك المقدس، التحفيز الدهليزي، حمام الصوت، الضوء الناعم والأمان الاهتزازي، المحاذاة بعد الولادة."
      },
      {
        id: "Echo",
        name: "البرمجة الأساسية",
        description: "التطوير الحسي والعصبي العاطفي، التغذية بالرضاعة الاهتزازية، التدليك الطاقي، خطوط الطول، التحفيز القحفي، توازن دورات النهار والليل."
      },
      {
        id: "Foxtrot",
        name: "الوعي الموسع",
        description: "الشبكة البلورية، هندسة الحياة، العلاج الصوتي والحركة الحرة، حمام الطبيعة، إيقاظ الإدراك، دعم المناعة الطبيعية."
      },
      {
        id: "Golf",
        name: "التطوير المتقدم",
        description: "اللغة المقدسة وهندسة الصوت، اليوجا، التأمل قوس القزح، التصور الإبداعي، التعلم الطبيعي وبروتوكولات الصيام اللطيف، التغذية الغريزية، تفعيل الدماغ اللطيف."
      },
      {
        id: "Hotel",
        name: "التكامل الاهتزازي",
        description: "ملخص الخطوات (من ألفا إلى جولف)، الجداول العملية: التغذية، التردد، الرعاية، التركيب المقدس والتكامل الكامل."
      }
    ],
    evidence: "أبقراط: 'ليكن طعامك دواءك ودواؤك طعامك.' المعلم أومرام ميخائيل إيفانهوف: 'الطعام رسالة حب يرسلها لنا الخالق.' المرونة العصبية والصيام: الصيام المتقطع عند الأطفال يزيد إنتاج BDNF مما يعزز الاتصال الروحي.",
    methodology: "نحن نجسد آلاف السنين من التطور البشري، حاملو الروح المحاربة لأسلافنا. هذه الأنظمة البشرية للمكافأة منقوشة بعمق في حمضنا النووي. الرفقة، الحب، العائلة، الصداقة، النضال، تجاوز الذات، التعلم - كل هذه العناصر أساسية."
  },
  he: {
    title: "פרוטוקול BROOLYKID",
    subtitle: "תכנית מתקדמת לפיתוח ילדים",
    vision: "פרוטוקול זה מייצג גישה מהפכנית לאופטימיזציה של התפתחות אנושית. הוא דורש מחויבות, סבלנות והתאמה מתמדת, אבל התוצאות במונחים של התעוררות מודעת ופוטנציאל ממומש מצדיקות את ההשקעה במידה רבה.",
    phases: [
      {
        id: "Alpha",
        name: "יסוד טרום-התעברות",
        description: "ניקוי רעלים ביולוגי (כבד, כליות, לימפה), תזונה קוונטית ואומגה 3 חכמים, הגנה אנרגטית וטיהור גלים אלקטרומגנטיים, תרגולי זוג, מורשת אבות, הפעלת DNA, בלוטת האצטרובל וראייה פנימית."
      },
      {
        id: "Beta",
        name: "הריון קדוש",
        description: "טרימסטרים 1-3: ביטחון, מודעות, תקשורת עדינה, ממשק טלפתי אם-ילד, טבילה קולית, ויזואליזציה טרום לידה, תזונה ויברציונית והיגיינה אנרגטית."
      },
      {
        id: "Charlie",
        name: "לידה קדושה",
        description: "יצירת מרחב קבלה קדוש, טקס מעבר וחותם ויברציוני, טיפול ראשוני: קולוסטרום, קרניו-סקרל, אור אדום, נוכחות, עיגון, הכרת נשמה."
      },
      {
        id: "Delta",
        name: "יסוד קוונטי",
        description: "פיתוח מיקרוביום, עיסוי קדוש, גירוי וסטיבולרי, אמבט קול, אור רך וביטחון ויברציוני, יישור לאחר לידה."
      },
      {
        id: "Echo",
        name: "תכנות בסיסי",
        description: "פיתוח חושי ונוירו-רגשי, תזונה בהנקה ויברציונית, עיסוי אנרגטי, מרידיאנים, גירוי גולגולתי, הרמוניזציה של מחזורי יום/לילה."
      },
      {
        id: "Foxtrot",
        name: "מודעות מורחבת",
        description: "רשת קריסטלית, גיאומטריה של החיים, תרפיה קולית ותנועה חופשית, אמבט טבע, התעוררות תפיסה, תמיכה בחסינות טבעית."
      },
      {
        id: "Golf",
        name: "פיתוח מתקדם",
        description: "שפה קדושה וגיאומטריה קולית, יוגה, מדיטציית קשת, ויזואליזציה יצירתית, למידה טבעית ופרוטוקולי צום עדינים, תזונה אינסטינקטיבית, הפעלת מוח עדינה."
      },
      {
        id: "Hotel",
        name: "אינטגרציה ויברציונית",
        description: "סיכום שלבים (אלפא עד גולף), טבלאות מעשיות: תזונה, תדירות, טיפול, סינתזה קדושה ואינטגרציה מלאה."
      }
    ],
    evidence: "היפוקרטס: 'יהי מזונך תרופתך ותרופתך מזונך.' המורה אומראם מיכאל איבנהוף: 'המזון הוא מכתב אהבה שהבורא שולח לנו.' נוירופלסטיות וצום: צום לסירוגין בילדים מגביר ייצור BDNF המקדם חיבור רוחני.",
    methodology: "אנו מגלמים אלפי שנים של התפתחות אנושית, נושאי נשמת הלוחם של אבותינו. מערכות התגמול האנושיות הללו חרוטות עמוק ב-DNA שלנו. רעות, אהבה, משפחה, ידידות, מאבק, התעלות עצמית, למידה - כל האלמנטים הללו חיוניים."
  },
  es: {
    title: "Protocolo BROOLYKID",
    subtitle: "Programa Avanzado de Desarrollo Infantil",
    vision: "Este protocolo representa un enfoque revolucionario para la optimización del desarrollo humano. Requiere compromiso, paciencia y adaptación constante, pero los resultados en términos de despertar consciente y potencial actualizado justifican ampliamente la inversión.",
    phases: [
      {
        id: "Alpha",
        name: "Fundación Preconcepcional",
        description: "Desintoxicación biológica (hígado, riñones, linfa), nutrición cuántica y Omega-3 inteligentes, protección energética y purificación de ondas EMF, prácticas de pareja, herencia ancestral, activación del ADN, glándula pineal y visión interior."
      },
      {
        id: "Beta",
        name: "Embarazo Sagrado",
        description: "Trimestres 1-3: seguridad, conciencia, comunicación sutil, interfaz telepática madre-hijo, inmersión sonora, visualización prenatal, nutrición vibratoria e higiene energética."
      },
      {
        id: "Charlie",
        name: "Nacimiento Sagrado",
        description: "Creación de un espacio de bienvenida sagrado, ceremonia de paso e impronta vibratoria, cuidados iniciales: calostro, craneosacral, luz roja, presencia, anclaje, reconocimiento del alma."
      },
      {
        id: "Delta",
        name: "Fundación Cuántica",
        description: "Desarrollo del microbioma, masaje sagrado, estimulación vestibular, baño sonoro, luz suave y seguridad vibratoria, alineación post-natal."
      },
      {
        id: "Echo",
        name: "Programación Fundamental",
        description: "Desarrollo sensorial y neuro-emocional, nutrición por lactancia vibratoria, masaje energético, meridianos, estimulación craneal, armonización de ciclos día/noche."
      },
      {
        id: "Foxtrot",
        name: "Conciencia Expandida",
        description: "Rejilla cristalina, geometría de la vida, terapia sonora y movimiento libre, baño de naturaleza, despertar de percepciones, apoyo a la inmunidad natural."
      },
      {
        id: "Golf",
        name: "Desarrollo Avanzado",
        description: "Lenguaje sagrado y geometría sonora, yoga, meditación arcoíris, visualización creativa, aprendizaje natural y protocolos de ayuno suave, nutrición instintiva, activación cerebral suave."
      },
      {
        id: "Hotel",
        name: "Integración Vibratoria",
        description: "Resumen de pasos (Alpha a Golf), tablas prácticas: nutrición, frecuencia, cuidados, síntesis sagrada e integración completa."
      }
    ],
    evidence: "Hipócrates: 'Que tu alimento sea tu medicina y tu medicina sea tu alimento.' Maestro Omraam Mikhaël Aïvanhov: 'La comida es una carta de amor que nos envía el Creador.' Neuroplasticidad y ayuno: El ayuno intermitente en niños aumenta la producción de BDNF promoviendo la conexión espiritual.",
    methodology: "Encarnamos miles de años de evolución humana, portadores del alma guerrera de nuestros ancestros. Estos sistemas de recompensa humanos están profundamente grabados en nuestro ADN. Camaradería, amor, familia, amistad, lucha, superación personal, aprendizaje - todos estos elementos son esenciales."
  },
  fa: {
    title: "پروتکل BROOLYKID",
    subtitle: "برنامه پیشرفته رشد کودک",
    vision: "این پروتکل نمایانگر رویکردی انقلابی برای بهینه‌سازی رشد انسانی است. نیاز به تعهد، صبر و سازگاری مداوم دارد، اما نتایج از نظر بیداری آگاهانه و پتانسیل محقق شده، سرمایه‌گذاری را به طور گسترده توجیه می‌کند.",
    phases: [
      {
        id: "Alpha",
        name: "بنیان پیش از بارداری",
        description: "سم‌زدایی بیولوژیک (کبد، کلیه، لنف)، تغذیه کوانتومی و امگا 3 هوشمند، محافظت انرژی و تصفیه امواج EMF، تمرینات زوجین، میراث اجدادی، فعال‌سازی DNA، غده صنوبری و بینش درونی."
      },
      {
        id: "Beta",
        name: "بارداری مقدس",
        description: "سه ماهه 1-3: امنیت، آگاهی، ارتباط ظریف، رابط تله‌پاتیک مادر-کودک، غوطه‌وری صوتی، تجسم قبل از تولد، تغذیه ارتعاشی و بهداشت انرژی."
      },
      {
        id: "Charlie",
        name: "تولد مقدس",
        description: "ایجاد فضای استقبال مقدس، مراسم گذر و اثر ارتعاشی، مراقبت اولیه: آغوز، جمجمه‌ای-خاجی، نور قرمز، حضور، لنگر انداختن، شناخت روح."
      },
      {
        id: "Delta",
        name: "بنیان کوانتومی",
        description: "توسعه میکروبیوم، ماساژ مقدس، تحریک دهلیزی، حمام صوتی، نور نرم و امنیت ارتعاشی، تراز پس از تولد."
      },
      {
        id: "Echo",
        name: "برنامه‌ریزی بنیادی",
        description: "توسعه حسی و عصبی-عاطفی، تغذیه با شیردهی ارتعاشی، ماساژ انرژی، نصف‌النهارها، تحریک جمجمه‌ای، هماهنگی چرخه‌های روز/شب."
      },
      {
        id: "Foxtrot",
        name: "آگاهی گسترش یافته",
        description: "شبکه کریستالی، هندسه زندگی، درمان صوتی و حرکت آزاد، حمام طبیعت، بیداری ادراک، پشتیبانی ایمنی طبیعی."
      },
      {
        id: "Golf",
        name: "توسعه پیشرفته",
        description: "زبان مقدس و هندسه صوتی، یوگا، مدیتیشن رنگین‌کمان، تجسم خلاق، یادگیری طبیعی و پروتکل‌های روزه ملایم، تغذیه غریزی، فعال‌سازی ملایم مغز."
      },
      {
        id: "Hotel",
        name: "یکپارچگی ارتعاشی",
        description: "خلاصه مراحل (آلفا تا گلف)، جداول عملی: تغذیه، فرکانس، مراقبت، سنتز مقدس و یکپارچگی کامل."
      }
    ],
    evidence: "بقراط: 'بگذار غذای تو داروی تو باشد و داروی تو غذای تو.' استاد اومرام میخائیل آیوانهوف: 'غذا نامه عشقی است که خالق برای ما می‌فرستد.' نوروپلاستیسیتی و روزه: روزه متناوب در کودکان تولید BDNF را افزایش می‌دهد که ارتباط معنوی را تقویت می‌کند.",
    methodology: "ما هزاران سال تکامل انسانی را تجسم می‌کنیم، حاملان روح جنگجوی اجدادمان. این سیستم‌های پاداش انسانی عمیقاً در DNA ما حک شده‌اند. رفاقت، عشق، خانواده، دوستی، مبارزه، تعالی خود، یادگیری - همه این عناصر ضروری هستند."
  }
};

// PDF Generation functionality
function initPDFGenerator() {
  const generateBtn = document.getElementById("generate-pdf");
  const languageSelect = document.getElementById("language-select");
  const statusDiv = document.getElementById("pdf-status");

  if (!generateBtn || !languageSelect || !statusDiv) return;

  generateBtn.addEventListener("click", async () => {
    const selectedLanguage = languageSelect.value;
    const includeImages = document.getElementById("include-images").checked;
    const includePhases = document.getElementById("include-phases").checked;

    try {
      statusDiv.className = "pdf-status loading";
      statusDiv.textContent = "Génération du PDF en cours...";

      await generatePDF(selectedLanguage, includeImages, includePhases);

      statusDiv.className = "pdf-status success";
      statusDiv.textContent = "PDF généré avec succès !";

      setTimeout(() => {
        statusDiv.textContent = "";
        statusDiv.className = "pdf-status";
      }, 3000);

    } catch (error) {
      console.error("PDF generation error:", error);
      statusDiv.className = "pdf-status error";
      statusDiv.textContent = "Erreur lors de la génération du PDF";

      setTimeout(() => {
        statusDiv.textContent = "";
        statusDiv.className = "pdf-status";
      }, 3000);
    }
  });
}

async function generatePDF(language, includeImages, includePhases) {
  try {
    // Check if jsPDF is available
    if (typeof window.jsPDF === "undefined") {
      // Try to load jsPDF dynamically
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      // Wait a bit for the library to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (typeof window.jsPDF === "undefined") {
      throw new Error("jsPDF library could not be loaded");
    }

    const { jsPDF } = window.jsPDF;
    const doc = new jsPDF();

    // Set up fonts for different languages
    setupFontsForLanguage(doc, language);

    const translation = translations[language] || translations.fr;

    // Add title
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(translation.title, 20, 30);

    // Add subtitle
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    const subtitleLines = doc.splitTextToSize(translation.subtitle, 170);
    doc.text(subtitleLines, 20, 50);

    let yPosition = 80;

    // Add vision section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(translation.vision, 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const visionText = getVisionText(language);
    const visionLines = doc.splitTextToSize(visionText, 170);
    doc.text(visionLines, 20, yPosition);
    yPosition += visionLines.length * 6 + 20;

    // Add phases if requested
    if (includePhases) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(translation.phases, 20, yPosition);
      yPosition += 15;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      const phasesData = translation.phases || [];
      phasesData.forEach((phase, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 30;
        }

        doc.setFont("helvetica", "bold");
        doc.text(`${phase.id}: ${phase.name}`, 20, yPosition);
        yPosition += 8;

        doc.setFont("helvetica", "normal");
        const phaseText = phase.description;
        const phaseLines = doc.splitTextToSize(phaseText, 170);
        doc.text(phaseLines, 20, yPosition);
        yPosition += phaseLines.length * 6 + 10;
      });
    }

    // Add evidence section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(translation.evidence, 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const evidenceText = getEvidenceText(language);
    const evidenceLines = doc.splitTextToSize(evidenceText, 170);
    doc.text(evidenceLines, 20, yPosition);

    // Save the PDF
    const fileName = `BROOLYKID_Protocol_${language.toUpperCase()}.pdf`;
    doc.save(fileName);

  } catch (error) {
    console.error("PDF generation error:", error);
    // Fallback: create a simple text-based PDF
    await generateSimplePDF(language, includeImages, includePhases);
  }
}

// Fallback PDF generation function
async function generateSimplePDF(language, includeImages, includePhases) {
  const translation = translations[language] || translations.fr;
  const content = `
BROOLYKID PROTOCOL - ${translation.title}

${translation.subtitle}

${translation.vision}
${getVisionText(language)}

Phases du Protocole
${getPhasesText(language)}

${translation.evidence}
${getEvidenceText(language)}

---
Généré le ${new Date().toLocaleDateString()}
  `;

  // Create a simple text file download
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `BROOLYKID_Protocol_${language.toUpperCase()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

function setupFontsForLanguage(doc, language) {
  // For RTL languages, we would need special handling
  // For now, we'll use standard fonts that support most characters
  switch (language) {
    case 'ar':
    case 'fa':
      // Arabic and Farsi are RTL languages - would need special handling
      break;
    case 'he':
      // Hebrew is RTL - would need special handling
      break;
    default:
      // Use standard fonts for LTR languages
      break;
  }
}

function getVisionText(language) {
  const translation = translations[language] || translations.fr;
  return translation.vision || "Ce protocole représente une approche révolutionnaire pour l'optimisation du développement humain.";
}

function getEvidenceText(language) {
  const translation = translations[language] || translations.fr;
  return translation.evidence || "Hippocrate : 'Que ton aliment soit ta seule médecine et que ta médecine soit ton aliment.'";
}

function getPhasesText(language) {
  const translation = translations[language] || translations.fr;
  if (translation.phases && Array.isArray(translation.phases)) {
    return translation.phases.map(phase =>
      `${phase.name}: ${phase.description}`
    ).join('\n\n');
  }
  return "Phases de développement et étapes d'implémentation";
}

// Utility function to load scripts dynamically
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Kids Program Generator functionality
function initKidsGenerator() {
  const generateBtn = document.getElementById("generate-program");
  const resultsDiv = document.getElementById("program-results");

  if (!generateBtn || !resultsDiv) return;

  generateBtn.addEventListener("click", () => {
    const formData = collectFormData();
    if (validateFormData(formData)) {
      const program = generatePersonalizedProgram(formData);
      displayProgramResults(program, formData.childName);
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  });
}

function collectFormData() {
  return {
    childName: document.getElementById("child-name").value,
    age: document.getElementById("child-age").value,
    gender: document.getElementById("child-gender").value,
    location: document.getElementById("location").value,
    climate: document.getElementById("climate").value,
    familyStructure: document.getElementById("family-structure").value,
    interests: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value),
    challenges: document.getElementById("challenges").value
  };
}

function validateFormData(data) {
  return data.childName && data.age && data.location && data.interests.length > 0;
}

function generatePersonalizedProgram(data) {
  const program = {
    recommendedPhases: getRecommendedPhases(data),
    environmentalAdvice: getEnvironmentalAdvice(data),
    dailyPractices: getDailyPractices(data),
    specialConsiderations: getSpecialConsiderations(data)
  };
  return program;
}

function getRecommendedPhases(data) {
  const phases = [];

  // Age-based phase recommendations
  switch (data.age) {
    case "preconception":
      phases.push({
        title: "Phase Alpha - Fondation préconceptionnelle",
        description: "Purification du terrain parental et préparation vibratoire pour l'âme à venir.",
        priority: "high"
      });
      break;
    case "pregnancy":
      phases.push({
        title: "Phase Bêta - Grossesse sacrée",
        description: "Interface télépathique mère-enfant et création d'un environnement vibratoire cohérent.",
        priority: "high"
      });
      break;
    case "0-6months":
      phases.push({
        title: "Phase Charlie - Naissance sacrée",
        description: "Accueil de l'âme souveraine et ancrage de l'empreinte vibratoire du foyer.",
        priority: "high"
      });
      phases.push({
        title: "Phase Delta - Fondation quantique",
        description: "Stabilisation des systèmes organiques et vibratoires pour un atterrissage doux.",
        priority: "medium"
      });
      break;
    case "6-12months":
      phases.push({
        title: "Phase Echo - Programmation fondamentale",
        description: "Sculpture de la neuro-perception par le toucher, le son et la cohérence émotionnelle.",
        priority: "high"
      });
      break;
    case "1-2years":
    case "2-3years":
      phases.push({
        title: "Phase Foxtrot - Conscience élargie",
        description: "Éveil du mouvement libre, de la géométrie du vivant et de l'immunité instinctive.",
        priority: "high"
      });
      break;
    case "3-5years":
    case "5-7years":
    case "7+":
      phases.push({
        title: "Phase Golf - Développement avancé",
        description: "Accompagnement dans la mission créative avec activation du langage sacré et de l'intuition.",
        priority: "high"
      });
      phases.push({
        title: "Phase Hotel - Intégration vibratoire",
        description: "Unification des apprentissages en un mode de vie sacré évolutif.",
        priority: "medium"
      });
      break;
  }

  // Interest-based additional phases
  if (data.interests.includes("spiritual")) {
    phases.push({
      title: "Activation spirituelle renforcée",
      description: "Pratiques de méditation adaptées à l'âge et rituels de connexion sacrée.",
      priority: "medium"
    });
  }

  if (data.interests.includes("physical")) {
    phases.push({
      title: "Optimisation physique",
      description: "Nutrition quantique et exercices de développement moteur harmonieux.",
      priority: "medium"
    });
  }

  return phases;
}

function getEnvironmentalAdvice(data) {
  const advice = [];

  // Location-based advice
  switch (data.location) {
    case "urban":
      advice.push({
        icon: "fas fa-city",
        title: "Purification urbaine",
        content: "Utilisez des plantes purificatrices d'air et des cristaux pour neutraliser les pollutions électromagnétiques urbaines."
      });
      break;
    case "rural":
      advice.push({
        icon: "fas fa-tree",
        title: "Connexion naturelle",
        content: "Profitez de l'environnement naturel pour des bains de forêt quotidiens et une connexion directe avec les éléments."
      });
      break;
    case "coastal":
      advice.push({
        icon: "fas fa-water",
        title: "Thérapie marine",
        content: "Utilisez l'air marin riche en ions négatifs et les bains de mer pour renforcer le système immunitaire."
      });
      break;
    case "mountain":
      advice.push({
        icon: "fas fa-mountain",
        title: "Énergie tellurique",
        content: "Connectez-vous aux énergies telluriques des montagnes pour un ancrage profond et une élévation spirituelle."
      });
      break;
  }

  // Climate-based advice
  switch (data.climate) {
    case "tropical":
      advice.push({
        icon: "fas fa-sun",
        title: "Gestion de la chaleur",
        content: "Adaptez les pratiques aux heures fraîches et utilisez l'hydratation naturelle pour maintenir l'équilibre."
      });
      break;
    case "arctic":
      advice.push({
        icon: "fas fa-snowflake",
        title: "Adaptation au froid",
        content: "Renforcez les pratiques de chaleur interne et utilisez la lumière artificielle pour compenser le manque de soleil."
      });
      break;
  }

  return advice;
}

function getDailyPractices(data) {
  const practices = [];

  // Age-based practices
  if (data.age === "preconception" || data.age === "pregnancy") {
    practices.push({
      icon: "fas fa-heart",
      title: "Méditation parentale",
      content: "15 minutes de méditation quotidienne pour créer un espace sacré d'accueil."
    });
  }

  if (["0-6months", "6-12months"].includes(data.age)) {
    practices.push({
      icon: "fas fa-baby",
      title: "Massage énergétique",
      content: "Massage doux quotidien avec huiles essentielles adaptées pour renforcer le lien parent-enfant."
    });
  }

  if (["1-2years", "2-3years", "3-5years"].includes(data.age)) {
    practices.push({
      icon: "fas fa-music",
      title: "Sonothérapie",
      content: "Écoute de fréquences 432Hz et chant parental pour développer l'oreille musicale."
    });
  }

  // Interest-based practices
  if (data.interests.includes("spiritual")) {
    practices.push({
      icon: "fas fa-om",
      title: "Rituel spirituel",
      content: "Création d'un espace sacré avec cristaux et rituels adaptés à l'âge de l'enfant."
    });
  }

  if (data.interests.includes("physical")) {
    practices.push({
      icon: "fas fa-running",
      title: "Mouvement conscient",
      content: "Exercices de yoga adaptés et jeux de mouvement pour développer la coordination."
    });
  }

  if (data.interests.includes("creative")) {
    practices.push({
      icon: "fas fa-palette",
      title: "Expression créative",
      content: "Temps quotidien pour l'art, la musique et l'expression libre de la créativité."
    });
  }

  return practices;
}

function getSpecialConsiderations(data) {
  let considerations = "";

  // Family structure considerations
  switch (data.familyStructure) {
    case "single-parent":
      considerations += "• Renforcez le réseau de soutien avec des figures d'attachement multiples.\n";
      considerations += "• Créez des rituels de connexion adaptés à votre situation familiale.\n\n";
      break;
    case "extended":
      considerations += "• Utilisez la richesse de la famille élargie pour transmettre les traditions.\n";
      considerations += "• Établissez des rôles clairs pour chaque membre de la famille.\n\n";
      break;
  }

  // Challenge-based considerations
  if (data.challenges) {
    considerations += "• Considérez les défis spécifiques mentionnés dans votre approche personnalisée.\n";
    considerations += "• Adaptez le rythme des pratiques selon les besoins particuliers de votre enfant.\n\n";
  }

  // Age-specific considerations
  if (["3-5years", "5-7years", "7+"].includes(data.age)) {
    considerations += "• Encouragez l'autonomie progressive dans les pratiques.\n";
    considerations += "• Intégrez les apprentissages dans le jeu et l'exploration naturelle.\n";
  }

  return considerations || "• Adaptez le programme selon l'évolution de votre enfant.\n• Restez flexible et à l'écoute des besoins changeants.";
}

function displayProgramResults(program, childName) {
  const resultsDiv = document.getElementById("program-results");
  const childNameSpan = document.getElementById("result-child-name");

  if (childNameSpan) {
    childNameSpan.textContent = childName || "votre enfant";
  }

  // Display recommended phases
  const phasesContainer = document.getElementById("phase-recommendations");
  if (phasesContainer) {
    phasesContainer.innerHTML = "";
    program.recommendedPhases.forEach(phase => {
      const phaseCard = document.createElement("div");
      phaseCard.className = "phase-card";
      phaseCard.innerHTML = `
        <h5>${phase.title}</h5>
        <p>${phase.description}</p>
      `;
      phasesContainer.appendChild(phaseCard);
    });
  }

  // Display environmental advice
  const adviceContainer = document.getElementById("environmental-tips");
  if (adviceContainer) {
    adviceContainer.innerHTML = "";
    program.environmentalAdvice.forEach(advice => {
      const adviceCard = document.createElement("div");
      adviceCard.className = "advice-card";
      adviceCard.innerHTML = `
        <i class="${advice.icon}"></i>
        <div class="advice-card-content">
          <h6>${advice.title}</h6>
          <p>${advice.content}</p>
        </div>
      `;
      adviceContainer.appendChild(adviceCard);
    });
  }

  // Display daily practices
  const practicesContainer = document.getElementById("daily-practices-list");
  if (practicesContainer) {
    practicesContainer.innerHTML = "";
    program.dailyPractices.forEach(practice => {
      const practiceItem = document.createElement("div");
      practiceItem.className = "practice-item";
      practiceItem.innerHTML = `
        <i class="${practice.icon}"></i>
        <div class="practice-item-content">
          <h6>${practice.title}</h6>
          <p>${practice.content}</p>
        </div>
      `;
      practicesContainer.appendChild(practiceItem);
    });
  }

  // Display special considerations
  const considerationsContainer = document.getElementById("special-considerations-content");
  if (considerationsContainer) {
    considerationsContainer.innerHTML = program.specialConsiderations.replace(/\n/g, '<br>');
  }

  // Show results
  resultsDiv.classList.remove("hidden");
  resultsDiv.scrollIntoView({ behavior: "smooth" });
}

// Loading screen management
function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 2000); // Show loading for at least 2 seconds
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSmoothScroll();
  buildPhases();
  initReveals();
  initPDFGenerator();
  initKidsGenerator();
});

window.addEventListener("load", () => {
  initThreeScene();
  hideLoadingScreen();
});
