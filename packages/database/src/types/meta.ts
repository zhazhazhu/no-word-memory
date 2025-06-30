export interface Word {
  word: string;
  pronunciation: string;
  part_of_speech: string;
  meaning: string;
  example: string;
}

export interface ECdictWord {
  word: string;
  phonetic?: string;
  definition?: string;
  translation?: string;
  pos?: string;
  collins?: string;
  oxford?: string;
  tag?: string;
  bnc?: string;
  frq?: string;
  exchange?: string;
  detail?: string;
  audio?: string;
}
