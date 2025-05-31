'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const translations = [
	{
		language: 'Hindi',
		text: 'धर्म की रक्षा करने वाला रक्षित होता है',
		transliteration: 'Dharma Ki Raksha Karne Wala Rakshit Hota Hai',
	},
	{
		language: 'Sanskrit',
		text: 'धर्मो रक्षति रक्षितः',
		transliteration: 'Dharmo Rakshati Rakshitah',
	},
	{
		language: 'Kannada',
		text: 'ಧರ್ಮವನ್ನು ರಕ್ಷಿಸಿದವನು ರಕ್ಷಿತನಾಗುತ್ತಾನೆ',
		transliteration: 'Dharmavanu Rakshisidavanu Rakshitanaguttane',
	},
	{
		language: 'Telugu',
		text: 'ధర్మం రక్షించినవాడు రక్షించబడతాడు',
		transliteration: 'Dharmam Rakshinchinavadu Rakshinchbadatadu',
	},
	{
		language: 'Tamil',
		text: 'தர்மத்தை காப்பவன் காக்கப்படுவான்',
		transliteration: 'Dharmatthai Kaappavan Kaakkapaduvaan',
	},
	{
		language: 'Malayalam',
		text: 'ധർമ്മം സംരക്ഷിക്കുന്നവൻ സംരക്ഷിക്കപ്പെടും',
		transliteration: 'Dharmam Samrakshikkunavan Samrakshikkappendum',
	},
	{
		language: 'Bengali',
		text: 'ধর্ম রক্ষা করলে ধর্ম রক্ষা করে',
		transliteration: 'Dharma Raksha Korle Dharma Raksha Kore',
	},
	{
		language: 'Marathi',
		text: 'धर्माचे रक्षण करणारा रक्षित होतो',
		transliteration: 'Dharmaache Rakshan Karnara Rakshit Hoto',
	},
];

const MottoAnimation = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [displayText, setDisplayText] = useState('');
	const [displayTransliteration, setDisplayTransliteration] = useState('');
	const [isTyping, setIsTyping] = useState(true);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		const animateText = async () => {
			// Clear previous text with fade out
			setIsVisible(false);
			await new Promise(resolve => setTimeout(resolve, 200));

			setDisplayText('');
			setDisplayTransliteration('');
			setIsVisible(true);

			let text = translations[currentIndex].text;
			let trans = translations[currentIndex].transliteration;

			// Type main text
			for (let i = 1; i <= text.length; i++) {
				await new Promise(resolve => {
					timeoutId = setTimeout(resolve, 40);
				});
				setDisplayText(prevText => {
					const typed = text.slice(0, i);
					const remaining = text.slice(i);
					return typed + `<span style="opacity: 0.3">${remaining}</span>`;
				});
			}

			// Type transliteration
			for (let i = 1; i <= trans.length; i++) {
				await new Promise(resolve => {
					timeoutId = setTimeout(resolve, 25);
				});
				setDisplayTransliteration(prevTrans => {
					const typed = trans.slice(0, i);
					const remaining = trans.slice(i);
					return typed + `<span style="opacity: 0.3">${remaining}</span>`;
				});
			}

			// Wait before next language
			await new Promise(resolve => {
				timeoutId = setTimeout(resolve, 2000);
			});

			// Move to next language
			setCurrentIndex(current => (current + 1) % translations.length);
		};

		animateText();

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [currentIndex]);

	return (
		<div
			className="h-[120px] w-full relative overflow-hidden"
			style={{ minHeight: '120px', maxHeight: '120px' }}
		>
			<motion.div 
				className="flex flex-col items-center justify-center h-full space-y-3"
				animate={{
					opacity: isVisible ? 1 : 0
				}}
				transition={{ duration: 0.2 }}
			>
				<motion.div 
					className="text-gold-400 text-3xl font-bold font-devanagari relative tracking-wider drop-shadow-md"
					dangerouslySetInnerHTML={{ __html: displayText }}
				>
				</motion.div>
				<div 
					className="text-neutral-200 text-sm md:text-base text-center relative tracking-wider"
					dangerouslySetInnerHTML={{ __html: displayTransliteration }}
				>
				</div>
				<motion.span
					className="absolute left-0 top-1/2 h-6 w-1 bg-gold-500 -translate-y-1/2 shadow-gold"
					style={{ left: "-4px" }}
					animate={{
						opacity: displayText !== translations[currentIndex].text ? [1, 0] : 0,
						x: displayText !== translations[currentIndex].text ? [0, 3] : 0
					}}
					transition={{
						duration: 0.4,
						repeat: displayText !== translations[currentIndex].text ? Infinity : 0,
						repeatType: "reverse"
					}}
				/>
			</motion.div>
		</div>
	);
};

export default MottoAnimation;
