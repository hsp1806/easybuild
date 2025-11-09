type Part = any;
type PartsDB = Record<string, Part[]>;

function chooseBest(list: Part[], maxPrice: number) {
  const sorted = [...list].sort((a,b) => (b.score || 0) - (a.score || 0));
  return sorted.find(p => p.price <= maxPrice) || sorted[sorted.length-1];
}

function findMotherboardForCPU(mobos: Part[], cpu: Part, maxPrice: number) {
  const candidates = mobos.filter(m => m.socket === cpu.socket && m.price <= maxPrice);
  if (candidates.length === 0) {
    return chooseBest(mobos, maxPrice);
  }
  return candidates.sort((a,b) => (b.score||0)-(a.score||0))[0];
}

export function buildFromBudget(budget: number, parts: PartsDB) {
  const buckets = {
    gpu: Math.round(budget * 0.40),
    cpu: Math.round(budget * 0.20),
    mobo: Math.round(budget * 0.08),
    ram: Math.round(budget * 0.08),
    storage: Math.round(budget * 0.07),
    psu: Math.round(budget * 0.05),
    case: Math.round(budget * 0.05)
  };

  const gpu = chooseBest(parts.gpu, buckets.gpu);
  const cpu = chooseBest(parts.cpu, buckets.cpu);
  const mobo = findMotherboardForCPU(parts.mobo, cpu, buckets.mobo);
  const ram = chooseBest(parts.ram.filter(r => r.ram_type === mobo.ram_type || !r.ram_type), buckets.ram);
  const storage = chooseBest(parts.storage, buckets.storage);

  const requiredWatt = (gpu.tdp || 100) + (cpu.tdp || 65) + 100;
  let psu = parts.psu.find(p => p.wattage >= requiredWatt && p.price <= buckets.psu);
  if (!psu) psu = chooseBest(parts.psu, 9999);

  const pcCase = chooseBest(parts.case, buckets.case);

  const chosen = { cpu, gpu, mobo, ram, storage, psu, case: pcCase };
  let total = Object.values(chosen).reduce((s, p) => s + (p?.price || 0), 0);

  if (total > budget) {
    const gpusSorted = [...parts.gpu].sort((a,b) => a.price - b.price);
    for (const g of gpusSorted) {
      const trial = { ...chosen, gpu: g };
      const trialTotal = Object.values(trial).reduce((s, p) => s + (p?.price || 0), 0);
      if (trialTotal <= budget) {
        Object.assign(chosen, { gpu: g });
        total = trialTotal;
        break;
      }
    }
  }

  const explanations: Record<string,string> = {};
  for (const k of Object.keys(chosen)) {
    const p = (chosen as any)[k];
    explanations[k] = p ? p.desc || `${p.name} chosen` : "No part found";
  }

  return { parts: chosen, total, explanations };
}
