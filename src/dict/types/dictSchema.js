import { gql } from '@apollo/client';
export const typeDefs = gql `
  type Phonetics {
    text: String
    audio: String
  }

  type Definition {
    definition: String
    synonyms: [String]!
    antonyms: [String]!
  }

  type Meaning {
    partOfSpeech: String!
    definitions: [Definition]!
  }
  type WordInfo {
    word: String
    origin: String
    phonetic: String
    phonetics: [Phonetics]!
    meanings: [Meaning]!
  }

  type Query {
    getWordInfo: WordInfo
  }
`;
// End of Template String.
//# sourceMappingURL=dictSchema.js.map