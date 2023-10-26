export function checkDuplicatesIDs(list: any) {
  const seenIds: any = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (seenIds[item.id]) {
      return true;
    } else {
      seenIds[item.id] = true;
    }
  }
  return false;
}
