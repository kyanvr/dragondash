const baseXP = 100; // Initial XP
const xpDifference = 100; // Difference in XP between levels

const generateLevels = (numLevels) => {
  const levels = [];

  for (let level = 1; level <= numLevels; level++) {
    levels.push({
      level: level,
      xp: baseXP + (level - 1) * xpDifference,
      xpToNextLevel: baseXP + level * xpDifference,
    });
  }

  return levels;
};

const Levels = generateLevels(20); // Generate levels up to a certain number

export default Levels;
