// Job listing data for the Team page

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits?: string[];
  postedDate: string;
}

export const jobListings: Job[] = [
  {
    id: 1,
    title: 'Senior Litigation Attorney',
    department: 'Litigation',
    location: 'Mumbai, India',
    type: 'Full-time',
    experience: '5+ years',
    description: 'We are seeking an experienced litigation attorney to join our growing team. The ideal candidate will have experience in complex commercial disputes and excellent advocacy skills.',
    responsibilities: [
      'Represent clients in court proceedings and arbitrations',
      'Develop case strategies and legal arguments',
      'Draft pleadings, motions, and legal briefs',
      'Prepare witnesses for testimony and depositions',
      'Negotiate settlements and dispute resolutions'
    ],
    qualifications: [
      'J.D. degree and active bar membership',
      '5+ years of experience in litigation',
      'Excellent written and oral advocacy skills',
      'Experience in complex commercial disputes',
      'Strong analytical and research skills'
    ],
    benefits: [
      'Competitive salary and performance bonuses',
      'Health insurance and retirement plans',
      'Professional development opportunities',
      'Work-life balance initiatives',
      'Modern office environment'
    ],
    postedDate: '2025-05-15'
  },
  {
    id: 2,
    title: 'Corporate Law Associate',
    department: 'Corporate Law',
    location: 'Delhi, India',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'Join our corporate team to work on mergers and acquisitions, corporate governance, and commercial transactions for our diverse client base.',
    responsibilities: [
      'Draft and review corporate transaction documents',
      'Conduct due diligence for M&A deals',
      'Advise clients on corporate governance issues',
      'Support senior attorneys on complex transactions',
      'Research legal issues related to corporate matters'
    ],
    qualifications: [
      'J.D. degree and active bar membership',
      '2-4 years of corporate law experience',
      'Experience with M&A transactions',
      'Strong drafting and negotiation skills',
      'Excellent attention to detail'
    ],
    benefits: [
      'Competitive salary package',
      'Health and dental insurance',
      'Continuing legal education',
      'Mentorship program',
      'Remote work flexibility'
    ],
    postedDate: '2025-05-20'
  },
  {
    id: 3,
    title: 'Intellectual Property Specialist',
    department: 'Intellectual Property',
    location: 'Bangalore, India',
    type: 'Full-time',
    experience: '3+ years',
    description: 'We are looking for an IP specialist to help our clients protect their innovations, brands, and creative works across various industries.',
    responsibilities: [
      'Manage trademark and patent portfolios',
      'Draft and prosecute patent applications',
      'Conduct IP due diligence for transactions',
      'Advise on IP licensing and enforcement',
      'Handle IP litigation matters'
    ],
    qualifications: [
      'Law degree with focus on IP law',
      '3+ years of experience in IP practice',
      'Understanding of patent, trademark, and copyright law',
      'Experience with IP litigation is preferred',
      'Technical background is a plus'
    ],
    benefits: [
      'Competitive compensation',
      'Professional development budget',
      'Health benefits',
      'Collaborative work environment',
      'Opportunity for advancement'
    ],
    postedDate: '2025-05-10'
  },
  {
    id: 4,
    title: 'Legal Research Intern',
    department: 'Research',
    location: 'Remote/Hybrid',
    type: 'Internship',
    experience: 'Entry Level',
    description: 'Opportunity for law students to gain practical experience in legal research, case analysis, and legal writing under the guidance of experienced attorneys.',
    responsibilities: [
      'Conduct legal research on various topics',
      'Assist in case preparation and analysis',
      'Draft legal memoranda and briefs',
      'Support attorneys in document review',
      'Attend client meetings and court proceedings'
    ],
    qualifications: [
      'Currently enrolled in law school',
      'Strong research and writing skills',
      'Attention to detail',
      'Ability to work independently',
      'Interest in legal practice'
    ],
    benefits: [
      'Stipend',
      'Mentorship from senior attorneys',
      'Networking opportunities',
      'Exposure to various areas of law',
      'Potential for full-time employment'
    ],
    postedDate: '2025-05-22'
  },
  {
    id: 5,
    title: 'Real Estate Law Associate',
    department: 'Real Estate',
    location: 'Mumbai, India',
    type: 'Full-time',
    experience: '3-5 years',
    description: 'We are seeking a skilled real estate law associate to handle property transactions, leasing agreements, and real estate litigation for our diverse client portfolio.',
    responsibilities: [
      'Handle real estate transactions and closings',
      'Draft and review leases and purchase agreements',
      'Conduct title searches and due diligence',
      'Represent clients in real estate disputes',
      'Advise on zoning and land use regulations'
    ],
    qualifications: [
      'J.D. degree and active bar membership',
      '3-5 years of experience in real estate law',
      'Experience with commercial and residential transactions',
      'Knowledge of land use and zoning regulations',
      'Strong client communication skills'
    ],
    benefits: [
      'Competitive salary and bonus structure',
      'Health insurance and retirement benefits',
      'Professional development opportunities',
      'Work-life balance',
      'Collaborative work environment'
    ],
    postedDate: '2025-05-08'
  }
];
