export default function getUniqueEntries(aniList) {
  const animeSet = [];
  var duplicate = false;

  // Go through every anime.
  for (let i = 0; i < aniList.length; ++i) {
    // Starting from the beginning of array, check if each of anime has the same mal_id as the current.
    for (let j = 0; j < i; ++j) {
      if (aniList[i].mal_id === aniList[j].mal_id) {
        duplicate = true;
        break;
      }
    }

    if (!duplicate) {
      animeSet.push(aniList[i]);
    }

    duplicate = false;
  }

  return animeSet;
}
