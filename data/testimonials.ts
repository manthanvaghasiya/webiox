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
    author: 'rajeshbhai',
    role: 'Founder',
    company: 'TechStartup Inc',
    quote: 'Webiox transformed our digital presence completely. The team delivered a stunning website that not only looks amazing but performs exceptionally well. Their attention to detail is unmatched.',
    image: '/rajeshbhai.png',
    rating: 5,
  },
  {
    _id: '2',
    author: 'priyaben',
    role: 'CTO',
    company: 'Global Solutions Ltd',
    quote: 'Working with Webiox was a game-changer for our company. Their innovative approach and technical expertise resulted in a platform that exceeded all our expectations.',
    image: '/priyaben.png',
    rating: 5,
  },
  {
    _id: '3',
    author: 'amitbhai',
    role: 'founder',
    company: 'Digital Ventures',
    quote: 'The custom software solution Webiox built for us has streamlined our operations significantly. Their team is responsive, professional, and truly understands our business needs.',
    image: '/amitbhai.png',
    rating: 5,
  },
];
