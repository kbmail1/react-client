export interface Phonetics {
  text: string
  audio: string
}

export interface Definition {
  definition: string
  synonyms: string[]
  antonyms: string[]
}

export interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
}
export interface WordInfo {
  word: string
  origin: string
  phonetic: string
  phonetics: Phonetics[]
  meanings: Meaning[]
}
