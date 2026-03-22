const PROMPTS = [
  "What app drained your energy most today?",
  "Name one moment you wished you weren't on your phone.",
  "What offline activity brought you joy today?",
  "Did any notification stress you out today?",
  "What's one thing you learned online today?",
  "How did social media make you feel today?",
  "What would you do with an extra hour offline?",
  "Did you have a meaningful conversation today — online or offline?",
  "What's one app you could live without this week?",
  "Rate your digital day in three words.",
  "What was the best thing you saw online today?",
  "Did you compare yourself to someone online today?",
  "What helped you focus today?",
  "What distracted you the most today?",
  "How did your screen time affect your sleep recently?",
  "What's a digital habit you'd like to change?",
  "Did you use your phone during meals today?",
  "What's one thing you're grateful for today?",
  "Did you take any screen breaks today? How did they feel?",
  "What made you pick up your phone most often today?",
  "If you could only keep 3 apps, which would they be?",
  "How connected to your friends did you feel today?",
  "What's one positive way you used tech today?",
  "Did you feel FOMO (fear of missing out) today?",
  "What's your favorite way to unwind without screens?",
  "How did your digital habits affect your mood today?",
  "What's one boundary you could set with your phone?",
  "Did you doom-scroll today? How long?",
  "What's a conversation you had face-to-face today?",
  "How would you describe your relationship with your phone?",
  "What content actually enriched your day?",
  "Did you feel in control of your screen time today?",
];

export function getPromptForDate(date: string): string {
  // Simple hash based on date string to get consistent daily prompt
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = (hash * 31 + date.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % PROMPTS.length;
  return PROMPTS[index];
}

export { PROMPTS as JOURNAL_PROMPTS };
