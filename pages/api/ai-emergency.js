const responses = {
  burst_pipe: {
    severity: 'HIGH — Act immediately',
    assessment: 'Call a Pro',
    response: `🚨 BURST PIPE — Emergency Response:

IMMEDIATE STEPS (Do these NOW):
1. 🔴 SHUT OFF MAIN WATER VALVE — Usually located near the water meter or where the main line enters your home (basement, crawl space, or near the street)
2. Open all faucets to drain remaining water from pipes
3. Turn OFF your water heater to prevent damage
4. Turn OFF electricity to affected areas if water is near outlets/appliances

DAMAGE CONTROL:
5. Use towels, buckets, and a wet-dry vacuum to remove standing water
6. Move furniture and valuables away from the affected area
7. If ceiling is bulging with water, poke a small hole to release it (place bucket underneath)

NEXT STEPS:
8. Document everything with photos/video for insurance
9. Call a licensed plumber — average emergency call: $150-$500
10. Call your homeowner's insurance to file a claim
11. Set up fans and dehumidifier to prevent mold growth

⚠️ MOLD WARNING: Mold can begin growing within 24-48 hours. Professional water mitigation is recommended for significant flooding.

📞 If you can't find your shut-off valve and water is actively flooding, call your water utility's emergency line.`
  },
  power_outage: {
    severity: 'MODERATE — Check safely',
    assessment: 'DIY first, then Pro if needed',
    response: `⚡ POWER OUTAGE — Troubleshooting Guide:

FIRST, DETERMINE THE SCOPE:
1. Check if neighbors also lost power — if yes, it's a utility issue
2. If only your home, check your electrical panel for tripped breakers

IF IT'S JUST YOUR HOME:
3. Go to your breaker panel and look for any switches in the middle position
4. Flip tripped breakers fully OFF, then back ON
5. If a breaker trips again immediately, there may be a short circuit — do NOT keep resetting it

IF IT'S A UTILITY OUTAGE:
6. Report the outage to your power company
7. Unplug sensitive electronics to prevent surge damage when power returns
8. Keep refrigerator/freezer doors closed (fridge stays cold ~4 hrs, freezer ~48 hrs if full)

SAFETY DURING OUTAGE:
9. Use flashlights, NOT candles (fire risk)
10. If using a generator, NEVER run it indoors or in a garage (carbon monoxide risk)
11. If outage lasts >4 hours, discard perishable food above 40°F

💡 PRO TIP: A whole-home surge protector ($200-$500 installed) can protect all your electronics when power returns.

📞 Call an electrician if: breakers keep tripping, you smell burning, or see sparks.`
  },
  gas_smell: {
    severity: 'CRITICAL — Life-threatening',
    assessment: 'Call 911 and Gas Company IMMEDIATELY',
    response: `🔥 GAS SMELL — CRITICAL EMERGENCY:

⚠️ THIS IS A LIFE-THREATENING EMERGENCY ⚠️

DO IMMEDIATELY:
1. 🚫 Do NOT turn on/off ANY lights or electrical switches
2. 🚫 Do NOT use your phone inside the house
3. 🚫 Do NOT light any flames or create any sparks
4. OPEN doors and windows as you exit
5. GET EVERYONE OUT of the house immediately — including pets
6. Move at least 100 feet away from the building

ONCE YOU'RE SAFELY OUTSIDE:
7. Call 911
8. Call your gas company's emergency line
9. Do NOT re-enter the building until cleared by emergency services
10. Warn neighbors if you're in an attached home/apartment

SIGNS OF GAS LEAK:
• Rotten egg / sulfur smell
• Hissing sound near gas lines
• Dead vegetation near gas lines outside
• Bubbling in standing water near gas line

🚨 NEVER try to find or fix a gas leak yourself. Natural gas is extremely flammable and can cause explosions.

📞 National Gas Emergency: Call your local gas utility or 911`
  },
  hvac_failure: {
    severity: 'MODERATE — Uncomfortable but not dangerous',
    assessment: 'DIY troubleshooting, then Pro if needed',
    response: `❄️ HVAC FAILURE — Troubleshooting Steps:

BASIC CHECKS (Try these first):
1. Check thermostat settings — make sure it's set to the right mode (heat/cool) and temperature
2. Replace thermostat batteries if it's blank or unresponsive
3. Check your air filter — a clogged filter can shut down the system. Replace if dirty.
4. Check the breaker panel — HVAC should have its own dedicated breaker
5. Check the outdoor unit — remove any debris, ice, or obstructions
6. Make sure all vents/registers are open and unblocked

IF HEATING FAILS IN WINTER:
7. Check pilot light on gas furnace (if applicable)
8. Open curtains on sunny side for passive heating
9. Use space heaters safely (keep 3ft from anything flammable)
10. Insulate pipes to prevent freezing if temps will drop below 32°F
11. Keep faucets dripping slightly to prevent pipe freeze

IF AC FAILS IN SUMMER:
7. Check if the outdoor unit fan is spinning
8. Clear ice from the unit if frozen (turn off and let thaw)
9. Close blinds, use fans, stay hydrated
10. Check condensate drain line — pour vinegar to clear clogs

WHEN TO CALL A PRO:
• System turns on but blows wrong-temperature air
• Strange noises (banging, screeching, clicking)
• Burning smell
• Refrigerant leak (ice on lines, hissing sound)

💰 Average HVAC service call: $75-$200. Major repairs: $500-$2,000.`
  },
  roof_leak: {
    severity: 'HIGH — Prevent further damage',
    assessment: 'Temporary DIY, then call Pro',
    response: `🏠 ROOF LEAK — Emergency Response:

IMMEDIATE DAMAGE CONTROL:
1. Place buckets or containers under all drip points
2. If ceiling is bulging, carefully puncture it to release water (prevents ceiling collapse)
3. Move furniture and valuables away from the affected area
4. Lay down plastic sheeting or tarps to protect flooring

IF YOU CAN SAFELY ACCESS THE ATTIC:
5. Trace the leak to its source (water often travels along rafters before dripping)
6. Place a bucket at the highest point of entry
7. If you can see daylight through the roof, mark the spot

TEMPORARY EXTERIOR FIX (Only if safe — no lightning, not icy):
8. Place a tarp over the affected area, extending 4+ feet past the damage
9. Secure with boards or heavy objects (don't nail through good roofing)
10. Use roofing cement/tar for small cracks as a temporary seal

NEXT STEPS:
11. Document all damage with photos and video
12. Contact your homeowner's insurance
13. Get 2-3 quotes from licensed roofers
14. Set up fans and dehumidifier in affected area

⚠️ NEVER get on a wet roof. Never work on a roof during storms.

💰 Average roof repair: $400-$1,500. Full replacement: $5,000-$15,000+.`
  },
  flooding: {
    severity: 'HIGH — Health and safety risk',
    assessment: 'Call a Pro — Water mitigation needed',
    response: `🌊 FLOODING — Emergency Response:

SAFETY FIRST:
1. 🚫 Do NOT walk through floodwater if you can't see the ground (electrical hazard)
2. 🚫 Do NOT use any electrical appliances while standing in water
3. Turn OFF electricity at the main breaker if safe to access
4. Turn OFF gas supply if flooding is significant
5. If flooding is from external source (storm), move to higher ground

WATER REMOVAL:
6. Once safe, use a sump pump or wet-dry vacuum to remove water
7. Open windows and doors for ventilation
8. Remove waterlogged carpet, padding, and drywall (bottom 12-18 inches)
9. Salvage what you can, discard porous items that were submerged

PREVENTING MOLD (Start within 24 hours):
10. Set up industrial fans and dehumidifiers
11. Apply antimicrobial spray to affected surfaces
12. Remove baseboards to allow wall cavities to dry
13. Disinfect all hard surfaces with bleach solution (1 cup per gallon)

DOCUMENTATION & INSURANCE:
14. Photograph and video ALL damage before cleanup
15. Keep damaged items for insurance adjuster
16. File claim immediately — flooding damage grows exponentially

📞 Call a water mitigation company for significant flooding.
💰 Professional water mitigation: $1,000-$5,000+. Mold remediation: $2,000-$10,000+.`
  },
  general: {
    severity: 'VARIES — Assess the situation',
    assessment: 'See recommendations below',
    response: `I'll help you assess your home emergency. Here are some general guidelines:

🔴 CALL 911 FOR:
• Gas leak / gas smell
• Fire or smoke
• Carbon monoxide alarm
• Structural collapse
• Electrical fire

🟡 CALL A PROFESSIONAL FOR:
• Major water leaks you can't stop
• Complete HVAC failure in extreme weather
• Electrical problems (sparking, burning smell)
• Sewage backup
• Major roof damage

🟢 SAFE TO DIY:
• Tripped breaker
• Clogged drain
• Running toilet
• Minor dripping faucet
• Frozen pipe (if not burst)

GENERAL EMERGENCY TIPS:
1. Know where your main water shut-off is
2. Know where your electrical panel is
3. Know where your gas shut-off is
4. Keep a flashlight and basic tools accessible
5. Have your insurance policy number handy

Can you describe your specific issue? I can provide more targeted guidance.`
  }
};

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { description, category } = req.body;
  const key = category?.toLowerCase() || 'general';
  const data = responses[key] || responses.general;

  res.status(200).json({
    response: `**Severity: ${data.severity}**\n**Assessment: ${data.assessment}**\n\n${data.response}`,
    severity: data.severity,
    assessment: data.assessment,
  });
}
