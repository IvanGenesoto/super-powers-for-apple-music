module.exports = function shouldTrackBe(action, track) {
  const qualifiers =
      action === 'disabled' ? ['alternate', 'version', 'acoustic', 'remix', 'mix']
    : action === 'disregarded' ? ['interlude', 'intro', 'outro']
    : []
  const name = track.name()
  return !!qualifiers.find(qualifier => name.includes(qualifier))
}
