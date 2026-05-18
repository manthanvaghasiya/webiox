export interface Testimonial {
  _id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    _id: '1',
    author: 'Sarah Johnson',
    role: 'Founder',
    company: 'TechStartup Inc',
    quote: 'Webiox transformed our digital presence completely. The team delivered a stunning website that not only looks amazing but performs exceptionally well. Their attention to detail is unmatched.',
    image: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
  },
  {
    _id: '2',
    author: 'Michael Chen',
    role: 'CTO',
    company: 'Global Solutions Ltd',
    quote: 'Working with Webiox was a game-changer for our company. Their innovative approach and technical expertise resulted in a platform that exceeded all our expectations.',
    image: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
  },
  {
    _id: '3',
    author: 'Emily Rodriguez',
    role: 'CEO',
    company: 'Digital Ventures',
    quote: 'The custom software solution Webiox built for us has streamlined our operations significantly. Their team is responsive, professional, and truly understands our business needs.',
    image: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
  },
];
