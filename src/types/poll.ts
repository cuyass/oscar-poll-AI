
export interface PollData {
  bestPicture: string;
  bestActor: string;
  bestActress: string;
  bestDirector: string;
  mostOverrated: string;
  email: string;
}

export interface Question {
  id: string;
  type: 'welcome' | 'choice' | 'input' | 'thanks';
  title: string;
  subtitle: string;
  description?: string;
  options?: string[];
  placeholder?: string;
  inputType?: string;
}
