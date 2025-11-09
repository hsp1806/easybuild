// Database of PC parts
const parts = {
  cpus: [
    { name: "Intel Core i3", price: 120 },
    { name: "Intel Core i5", price: 200 },
    { name: "Intel Core i7", price: 350 }
  ],
  gpus: [
    { name: "NVIDIA GTX 1650", price: 180 },
    { name: "NVIDIA RTX 3060", price: 350 },
    { name: "NVIDIA RTX 4070 Ti", price: 800 }
  ],
  rams: [
    { name: "16GB DDR4", price: 60 },
    { name: "16GB DDR5", price: 90 },
    { name: "32GB DDR5", price: 150 }
  ],
  storages: [
    { name: "512GB SSD", price: 50 },
    { name: "1TB SSD", price: 90 },
    { name: "2TB SSD", price: 150 }
  ],
  motherboards: [
    { name: "B660 Chipset", price: 120 },
    { name: "Z690 Chipset", price: 180 },
    { name: "Z790 Chipset", price: 250 }
  ],
  psus: [
    { name: "500W Power Supply", price: 60 },
    { name: "650W Power Supply", price: 90 },
    { name: "750W Gold Power Supply", price: 130 }
  ],
  cases: [
    { name: "Basic Mid Tower", price: 50 },
    { name: "RGB Mid Tower", price: 90 },
    { name: "Premium Full Tower", price: 150 }
  ]
};

// Part descriptions
const partDescriptions = {
  cpus: {
    "Intel Core i3": "Good for basic tasks like web browsing and office work.",
    "Intel Core i5": "A solid all-rounder for gaming and productivity.",
    "Intel Core i7": "High-performance CPU for gaming and content creation."
  },
  gpus: {
    "NVIDIA GTX 1650": "Entry-level graphics card for light gaming.",
    "NVIDIA RTX 3060": "Mid-range GPU capable of high-quality gaming.",
    "NVIDIA RTX 4070 Ti": "High-end GPU for 4K gaming and heavy workloads."
  },
  rams: {
    "16GB DDR4": "Enough memory for most users and light multitasking.",
    "16GB DDR5": "Faster memory for gaming and productivity.",
    "32GB DDR5": "Great for heavy multitasking, gaming, and editing."
  },
  storages: {
    "512GB SSD": "Fast storage, suitable for OS and some apps/games.",
    "1TB SSD": "More storage for larger game and software libraries.",
    "2TB SSD": "Lots of fast storage for multiple games and projects."
  },
  motherboards: {
    "B660 Chipset": "Supports Intel 12th-gen CPUs, basic features.",
    "Z690 Chipset": "High-end motherboard with more features and upgrades.",
    "Z790 Chipset": "Premium motherboard for enthusiast builds."
  },
  psus: {
    "500W Power Supply": "Provides enough power for basic builds.",
    "650W Power Supply": "Sufficient for mid-range systems with a dedicated GPU.",
    "750W Gold Power Supply": "High-efficiency PSU for high-end gaming builds."
  },
  cases: {
    "Basic Mid Tower": "Standard PC case, easy to assemble.",
    "RGB Mid Tower": "Includes RGB lighting, stylish design.",
    "Premium Full Tower": "Spacious case for custom builds and high-end cooling."
  }
};

// Part images
const partImages = {
  cpus: {
    "Intel Core i3": "images/cpu_i3.png",
    "Intel Core i5": "images/cpu_i5.png",
    "Intel Core i7": "images/cpu_i7.png"
  },
  gpus: {
    "NVIDIA GTX 1650": "images/gpu_1650.png",
    "NVIDIA RTX 3060": "images/gpu_3060.png",
    "NVIDIA RTX 4070 Ti": "images/gpu_4070ti.png"
  },
  rams: {
    "16GB DDR4": "images/ram_ddr4.png",
    "16GB DDR5": "images/ram_ddr5.png",
    "32GB DDR5": "images/ram_32gb.png"
  },
  storages: {
    "512GB SSD": "images/ssd_512.png",
    "1TB SSD": "images/ssd_1tb.png",
    "2TB SSD": "images/ssd_2tb.png"
  },
  motherboards: {
    "B660 Chipset": "images/mobo_b660.png",
    "Z690 Chipset": "images/mobo_z690.png",
    "Z790 Chipset": "images/mobo_z790.png"
  },
  psus: {
    "500W Power Supply": "images/psu_500w.png",
    "650W Power Supply": "images/psu_650w.png",
    "750W Gold Power Supply": "images/psu_750w.png"
  },
  cases: {
    "Basic Mid Tower": "images/case_basic.png",
    "RGB Mid Tower": "images/case_rgb.png",
    "Premium Full Tower": "images/case_full.png"
  }
};

// Helper function: pick best part within budget
function pickPart(options, maxBudget) {
  const affordable = options.filter(part => part.price <= maxBudget);
  if (affordable.length === 0) return options[0]; // fallback
  return affordable[affordable.length - 1]; // pick most expensive affordable
}

// Generate builds
function generateBuild() {
  const budgetInput = document.getElementById("budget").value;
  const outputDiv = document.getElementById("output");

  if (!budgetInput) {
    outputDiv.innerHTML = "⚠️ Please enter a budget first!";
    return;
  }

  const amount = Number(budgetInput);
  const numberOfBuilds = 2;
  const builds = [];

  for (let i = 0; i < numberOfBuilds; i++) {
    const build = {
      cpu: pickPart(parts.cpus, amount * 0.2),
      gpu: pickPart(parts.gpus, amount * 0.25),
      ram: pickPart(parts.rams, amount * 0.15),
      storage: pickPart(parts.storages, amount * 0.1),
      motherboard: pickPart(parts.motherboards, amount * 0.1),
      psu: pickPart(parts.psus, amount * 0.05),
      case: pickPart(parts.cases, amount * 0.05)
    };

    const total =
      build.cpu.price +
      build.gpu.price +
      build.ram.price +
      build.storage.price +
      build.motherboard.price +
      build.psu.price +
      build.case.price;

    builds.push({ build, total });
  }

  // Clear previous results
  outputDiv.innerHTML = "";

  // Display builds
  builds.forEach((item, index) => {
    const leftover = amount - item.total;
    let message = leftover > 0
      ? `💡 You have $${leftover} left! Consider upgrading your GPU or RAM.`
      : leftover < 0
      ? `⚠️ This build slightly exceeds your budget.`
      : `✅ Perfect fit!`;

    outputDiv.innerHTML += `
      <div class="build-card">
        <h2>Build Option ${index + 1} 🖥️</h2>
        <p><b>Total Cost:</b> $${item.total}</p>

        <p><b>CPU:</b> ${item.build.cpu.name} - ${partDescriptions.cpus[item.build.cpu.name]}
        <br><img src="${partImages.cpus[item.build.cpu.name]}" alt="${item.build.cpu.name}" class="part-img"></p>

        <p><b>GPU:</b> ${item.build.gpu.name} - ${partDescriptions.gpus[item.build.gpu.name]}
        <br><img src="${partImages.gpus[item.build.gpu.name]}" alt="${item.build.gpu.name}" class="part-img"></p>

        <p><b>RAM:</b> ${item.build.ram.name} - ${partDescriptions.rams[item.build.ram.name]}
        <br><img src="${partImages.rams[item.build.ram.name]}" alt="${item.build.ram.name}" class="part-img"></p>

        <p><b>Storage:</b> ${item.build.storage.name} - ${partDescriptions.storages[item.build.storage.name]}
        <br><img src="${partImages.storages[item.build.storage.name]}" alt="${item.build.storage.name}" class="part-img"></p>

        <p><b>Motherboard:</b> ${item.build.motherboard.name} - ${partDescriptions.motherboards[item.build.motherboard.name]}
        <br><img src="${partImages.motherboards[item.build.motherboard.name]}" alt="${item.build.motherboard.name}" class="part-img"></p>

        <p><b>Power Supply:</b> ${item.build.psu.name} - ${partDescriptions.psus[item.build.psu.name]}
        <br><img src="${partImages.psus[item.build.psu.name]}" alt="${item.build.psu.name}" class="part-img"></p>

        <p><b>Case:</b> ${item.build.case.name} - ${partDescriptions.cases[item.build.case.name]}
        <br><img src="${partImages.cases[item.build.case.name]}" alt="${item.build.case.name}" class="part-img"></p>

        <p>${message}</p>
      </div>
    `;
  });
}

// Reset build
function resetBuild() {
  document.getElementById("budget").value = "";
  document.getElementById("output").innerHTML = "";
}
