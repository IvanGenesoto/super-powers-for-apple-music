import {tagKitByLabel, validate} from '..'

export function initialize(track) {

  const {state} = this
  const {nil, shouldDeriveRatingByArtist, tracksToAdoptValuesByArtist} = state
  const genreTagKit = tagKitByLabel['Song Genre']
  const {field: genreField} = genreTagKit
  const vocalsTagKit = tagKitByLabel['Song Vocals']
  const {field: vocalsField} = vocalsTagKit
  const isComprised = vocalsField === genreField
  const regardedTagKit = tagKitByLabel['Regarded']
  const {field: regardedField, fieldValue: regardedFieldValue} = regardedTagKit
  const data = track.properties()
  const this_ = {...this, data}
  const {genre, rating, composer, artist} = data
  const composerText = composer ? `Composer: ${composer}` : ''
  const delimiter = composer ? ', ' : ''
  const tracks_ = tracksToAdoptValuesByArtist[artist]
  const tracks = tracksToAdoptValuesByArtist[artist] = tracks_ || []

  try {
    track.composer.set(`${composerText}${delimiter}Original Genre: ${genre}`)
    track[genreField].set(nil)
    isComprised || track[vocalsField].set(nil)
    track[regardedField].set(regardedFieldValue)
    rating && (shouldDeriveRatingByArtist[artist] = true)
    tracks.push(track)
    validate.call(this_, track)
    track.delete()
  }

  catch {}
}
