// filepath: /Users/shubhammaurya/Desktop/SHCON/shoolinconsultancy/src/app/services/services-data.ts
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { 
  faScaleBalanced 
} from '@fortawesome/free-solid-svg-icons';

export interface LegalService {
  id: string;
  title: string;
  description: string;
  icon: IconDefinition;
  longDescription: string;
}

export const legalServices: LegalService[] = [
  {
    id: 'divorce',
    title: 'Divorce & Family Law',
    description: 'Expert legal representation in divorce proceedings, child custody, alimony, and family disputes.',
    icon: faScaleBalanced,
    longDescription: `Our experienced family law attorneys provide compassionate and professional legal guidance through 
    complex divorce proceedings and family matters. We understand the emotional challenges involved and work diligently 
    to protect your rights and interests.
    
    We handle all aspects of family law including:
    • Divorce proceedings and settlements
    • Child custody and visitation rights
    • Alimony and maintenance
    • Property division
    • Domestic violence protection
    • Marriage counseling and mediation`
  },
  // ... rest of the services array ...
];
