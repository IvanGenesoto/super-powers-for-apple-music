export function getChildLists(name) {

  const {state} = this
  const {allLists, hasNoParentByListName, parentNameByListName} = state
  const childLists = []

  allLists.forEach(list => {
    const {name: childName, playlist} = list
    const hasNoParent = hasNoParentByListName[childName]
    if (hasNoParent) return
    let parentName = parentNameByListName[childName]
    if (parentName) return parentName === name && childLists.push(list)
    try {
      parentName = parentNameByListName[childName] = playlist.parent.name()
    }
    catch {
      hasNoParentByListName[childName] = true
    }
    if (parentName === name) childLists.push(list)
  })

  return childLists
}
