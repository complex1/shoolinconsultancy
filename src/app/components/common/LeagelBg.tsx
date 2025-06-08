import { motion } from 'framer-motion';
import React from 'react';

const LeagelBg: React.FC = () => {
  return <div className="fixed inset-0 pointer-events-none opacity-[0.04] overflow-hidden hidden lg:block">
        <div className="absolute w-full h-full">
          {/* Scrolling legal text background */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear"
            }}
            className="text-black text-opacity-50 whitespace-pre-line text-xs"
          >
            {`
            WHEREAS the parties hereto desire to enter into this Agreement for the purposes set forth herein;
            NOW, THEREFORE, in consideration of the mutual covenants and agreements herein contained, the parties hereto agree as follows:
            1. DEFINITIONS
               1.1 "Agreement" means this legal services agreement together with all schedules and appendices attached hereto;
               1.2 "Client" means the party engaging the legal services as set forth in Schedule A;
               1.3 "Services" means the legal and professional services to be provided by the Firm to the Client as described in Schedule B;
            2. TERM AND TERMINATION
               2.1 This Agreement shall commence on the Effective Date and shall continue until the completion of the Services or termination in accordance with Section 2.2;
               2.2 Either party may terminate this Agreement upon thirty (30) days written notice to the other party;
            3. FEES AND PAYMENT
               3.1 The Client shall pay to the Firm the fees for the Services as set forth in Schedule C;
               3.2 The Firm shall issue invoices to the Client on a monthly basis, and the Client shall pay such invoices within thirty (30) days of receipt;
            4. CONFIDENTIALITY
               4.1 Each party shall maintain the confidentiality of all confidential information disclosed by the other party;
               4.2 For the purposes of this Agreement, "confidential information" means all information, whether written or oral, that is not generally known to the public;
            5. INTELLECTUAL PROPERTY
               5.1 All intellectual property rights in the materials created by the Firm in the course of providing the Services shall remain the property of the Firm;
               5.2 The Firm grants to the Client a non-exclusive, perpetual license to use such materials for the Client's internal business purposes;
            6. LIABILITY AND INDEMNIFICATION
               6.1 The Firm's liability under this Agreement shall be limited to the fees paid by the Client for the Services;
               6.2 The Client shall indemnify and hold harmless the Firm from and against any and all claims, damages, losses, and expenses arising out of or resulting from the Client's breach of this Agreement;
            7. GOVERNING LAW
               7.1 This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction];
               7.2 Any dispute arising out of or in connection with this Agreement shall be submitted to the exclusive jurisdiction of the courts of [Jurisdiction];
            IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.
            `}
          </motion.div>
        </div>
      </div>
};

export default LeagelBg;