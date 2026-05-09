export interface Contributor {
  name: string;
  github?: string;
  avatar?: string;
  contributions: string[];
}

export const contributors: Contributor[] = [
  {
    name: 'Shubham Agarwal',
    github: 'shubhamag91',
    contributions: ['Creator', 'Content', 'Architecture', 'Design'],
  },
];
