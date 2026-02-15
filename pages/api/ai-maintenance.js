const schedules = {
  hvac: {
    tasks: [
      { task: 'Replace air filter', frequency: 'Every 1-3 months', urgency: 'medium', season: 'all' },
      { task: 'Clean condenser coils', frequency: 'Annually (spring)', urgency: 'medium', season: 'spring' },
      { task: 'Check refrigerant levels', frequency: 'Annually', urgency: 'low', season: 'spring' },
      { task: 'Inspect ductwork for leaks', frequency: 'Every 2 years', urgency: 'low', season: 'fall' },
      { task: 'Schedule professional tune-up', frequency: 'Twice yearly (spring & fall)', urgency: 'high', season: 'spring' },
      { task: 'Clean evaporator drain line', frequency: 'Every 6 months', urgency: 'medium', season: 'summer' },
      { task: 'Test thermostat calibration', frequency: 'Annually', urgency: 'low', season: 'fall' },
    ],
    tips: ['Systems over 10 years old should be inspected more frequently.', 'Keep 2 feet of clearance around outdoor units.', 'Consider a programmable thermostat to reduce wear.'],
  },
  water_heater: {
    tasks: [
      { task: 'Test pressure relief valve', frequency: 'Every 6 months', urgency: 'high', season: 'all' },
      { task: 'Flush tank to remove sediment', frequency: 'Annually', urgency: 'medium', season: 'fall' },
      { task: 'Inspect anode rod', frequency: 'Every 2-3 years', urgency: 'medium', season: 'all' },
      { task: 'Check for leaks around base', frequency: 'Monthly', urgency: 'high', season: 'all' },
      { task: 'Insulate hot water pipes', frequency: 'Once (check annually)', urgency: 'low', season: 'winter' },
      { task: 'Verify temperature setting (120°F)', frequency: 'Every 6 months', urgency: 'low', season: 'all' },
    ],
    tips: ['Water heaters last 8-12 years on average.', 'Tankless models need descaling annually in hard-water areas.', 'Lower temperature to 120°F to save energy and prevent scalding.'],
  },
  roof: {
    tasks: [
      { task: 'Visual inspection from ground', frequency: 'Every 3 months', urgency: 'medium', season: 'all' },
      { task: 'Clean gutters and downspouts', frequency: 'Twice yearly', urgency: 'high', season: 'fall' },
      { task: 'Check for missing/damaged shingles', frequency: 'After major storms', urgency: 'high', season: 'all' },
      { task: 'Inspect flashing around vents/chimney', frequency: 'Annually', urgency: 'medium', season: 'spring' },
      { task: 'Trim overhanging tree branches', frequency: 'Annually', urgency: 'medium', season: 'spring' },
      { task: 'Professional roof inspection', frequency: 'Every 3-5 years', urgency: 'low', season: 'spring' },
    ],
    tips: ['Asphalt shingles last 20-30 years; metal roofs 40-70 years.', 'Address small leaks immediately to prevent major damage.', 'Ice dams can be prevented with proper attic insulation.'],
  },
  plumbing: {
    tasks: [
      { task: 'Check for leaky faucets', frequency: 'Monthly', urgency: 'medium', season: 'all' },
      { task: 'Inspect under-sink areas for moisture', frequency: 'Monthly', urgency: 'high', season: 'all' },
      { task: 'Test sump pump operation', frequency: 'Every 3 months', urgency: 'high', season: 'spring' },
      { task: 'Drain outdoor faucets before winter', frequency: 'Annually', urgency: 'high', season: 'fall' },
      { task: 'Snake main drain line', frequency: 'Every 2 years', urgency: 'low', season: 'all' },
      { task: 'Check water pressure', frequency: 'Every 6 months', urgency: 'low', season: 'all' },
    ],
    tips: ['Know where your main water shut-off valve is.', 'Water pressure should be 40-60 PSI.', 'Install water leak detectors near appliances.'],
  },
  electrical: {
    tasks: [
      { task: 'Test GFCI outlets', frequency: 'Monthly', urgency: 'high', season: 'all' },
      { task: 'Test smoke and CO detectors', frequency: 'Monthly', urgency: 'high', season: 'all' },
      { task: 'Replace smoke detector batteries', frequency: 'Every 6 months', urgency: 'high', season: 'spring' },
      { task: 'Inspect electrical panel for issues', frequency: 'Annually', urgency: 'medium', season: 'all' },
      { task: 'Check for frayed/damaged cords', frequency: 'Every 6 months', urgency: 'medium', season: 'all' },
      { task: 'Replace smoke detectors entirely', frequency: 'Every 10 years', urgency: 'low', season: 'all' },
    ],
    tips: ['Never overload outlets or extension cords.', 'Aluminum wiring (pre-1972) needs professional inspection.', 'Arc-fault breakers add significant fire protection.'],
  },
  appliances: {
    tasks: [
      { task: 'Clean refrigerator coils', frequency: 'Every 6 months', urgency: 'medium', season: 'all' },
      { task: 'Clean dishwasher filter', frequency: 'Monthly', urgency: 'low', season: 'all' },
      { task: 'Clean dryer vent duct', frequency: 'Annually', urgency: 'high', season: 'all' },
      { task: 'Descale washing machine', frequency: 'Every 3 months', urgency: 'low', season: 'all' },
      { task: 'Clean range hood filter', frequency: 'Every 3 months', urgency: 'low', season: 'all' },
      { task: 'Inspect washing machine hoses', frequency: 'Every 6 months', urgency: 'medium', season: 'all' },
    ],
    tips: ['Replace washing machine hoses every 5 years.', 'A clogged dryer vent is a fire hazard.', 'Run an empty hot cycle with vinegar monthly for washing machines.'],
  },
};

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { itemType, age, location } = req.body;
  const key = itemType?.toLowerCase().replace(/\s+/g, '_') || 'hvac';
  const data = schedules[key] || schedules.hvac;

  const now = new Date();
  const tasks = data.tasks.map((t, i) => ({
    ...t,
    id: `${key}_${i}_${Date.now()}`,
    system: itemType || 'HVAC',
    dueDate: new Date(now.getTime() + (i + 1) * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    completed: false,
  }));

  let ageNote = '';
  if (age && parseInt(age) > 10) {
    ageNote = `Your ${itemType} is ${age} years old. Consider budgeting for replacement within the next ${Math.max(1, 15 - parseInt(age))} years.`;
  }

  res.status(200).json({ tasks, tips: data.tips, ageNote });
}
