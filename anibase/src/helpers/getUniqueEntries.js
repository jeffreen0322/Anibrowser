export default function getUniqueEntries(aniList) {
  const animeMap = new Map();
  const animeSet = [];

  for (let i = 0; i < aniList.length; ++i) {
    if (!animeMap.has(aniList[i].mal_id)) {
      animeMap.set(aniList[i].mal_id, 1);
      animeSet.push(aniList[i]);
    }
  }

  return animeSet;
}
