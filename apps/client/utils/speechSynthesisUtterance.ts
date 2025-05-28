export type Lang = 'en-US' | 'en-GB';

export function speak(text: string, lang: Lang = 'en-US') {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  speechSynthesis.speak(utterance);
}
