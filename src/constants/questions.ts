
import { Question } from '@/types/poll';

export const questions: Question[] = [
  {
    id: 'welcome',
    type: 'welcome' as const,
    title: 'Oscars 2025 Poll',
    subtitle: 'Share your predictions for the biggest night in Hollywood',
    description: 'This will take about 2 minutes to complete.'
  },
  {
    id: 'bestPicture',
    type: 'choice' as const,
    title: 'Who will win Best Picture?',
    subtitle: 'Choose your top pick for the most prestigious award',
    options: [
      'Dune: Part Two',
      'Oppenheimer',
      'Killers of the Flower Moon',
      'Poor Things',
      'The Zone of Interest',
      'Barbie'
    ]
  },
  {
    id: 'bestActor',
    type: 'choice' as const,
    title: 'Best Actor in a Leading Role?',
    subtitle: 'Who deserves the golden statue?',
    options: [
      'Cillian Murphy - Oppenheimer',
      'Paul Giamatti - The Holdovers',
      'Bradley Cooper - Maestro',
      'Colman Domingo - Rustin',
      'Jeffrey Wright - American Fiction'
    ]
  },
  {
    id: 'bestActress',
    type: 'choice' as const,
    title: 'Best Actress in a Leading Role?',
    subtitle: 'Your prediction for the leading lady',
    options: [
      'Emma Stone - Poor Things',
      'Carey Mulligan - Maestro',
      'Sandra Hüller - Anatomy of a Fall',
      'Margot Robbie - Barbie',
      'Lily Gladstone - Killers of the Flower Moon'
    ]
  },
  {
    id: 'bestDirector',
    type: 'choice' as const,
    title: 'Best Director?',
    subtitle: 'Who will take home the directing prize?',
    options: [
      'Christopher Nolan - Oppenheimer',
      'Martin Scorsese - Killers of the Flower Moon',
      'Yorgos Lanthimos - Poor Things',
      'Justine Triet - Anatomy of a Fall',
      'Jonathan Glazer - The Zone of Interest'
    ]
  },
  {
    id: 'mostOverrated',
    type: 'choice' as const,
    title: 'Most overrated nomination?',
    subtitle: 'Which film do you think doesn\'t deserve the hype?',
    options: [
      'Barbie',
      'Oppenheimer',
      'Poor Things',
      'Maestro',
      'The Zone of Interest',
      'None - they all deserve it!'
    ]
  },
  {
    id: 'email',
    type: 'input' as const,
    title: 'What\'s your email?',
    subtitle: 'We\'ll send you the results after the ceremony',
    placeholder: 'your@email.com',
    inputType: 'email'
  },
  {
    id: 'thanks',
    type: 'thanks' as const,
    title: 'Thank you! 🏆',
    subtitle: 'Your predictions have been recorded',
    description: 'We\'ll email you the results after the Oscars ceremony on March 10th, 2025.'
  }
];
