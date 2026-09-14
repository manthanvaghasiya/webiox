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
    author: 'Rajesh Patel',
    role: 'Managing Director',
    company: 'Hariram Motors',
    quote: 'Webiox transformed our digital dealership from the ground up. Their engineering team delivered a blazing-fast inventory portal that increased our verified buyer inquiries by over 140% in just two months.',
    image: '/rajeshbhai.png',
    rating: 5,
  },
  {
    _id: '2',
    author: 'Priya Shah',
    role: 'Co-Founder & Tech Lead',
    company: 'Sadguru Car Surat',
    quote: 'Working with Webiox was game-changing for our operations. They built a custom staff PWA and local SEO engine that placed us #1 on Google for pre-owned luxury cars across South Gujarat.',
    image: '/priyaben.png',
    rating: 5,
  },
  {
    _id: '3',
    author: 'Amit Desai',
    role: 'Founder',
    company: 'DairyFlow Retail Solutions',
    quote: 'The SaaS POS and digital udhaar system Webiox built replaced years of manual paper ledger books for our network. It is rock-solid, fast, and handles heavy morning shifts effortlessly.',
    image: '/amitbhai.png',
    rating: 5,
  },
];
