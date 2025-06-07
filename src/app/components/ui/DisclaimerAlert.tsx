'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const DisclaimerAlert = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show disclaimer every time the component mounts
        // Check if the disclaimer has been accepted
        const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
        if (!disclaimerAccepted) {
            // If not accepted, open the disclaimer dialog
        setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('disclaimerAccepted', 'true');
        setIsOpen(false);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/75" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="bg-black-50 rounded-lg p-4 mb-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <FontAwesomeIcon
                                                icon={faExclamationTriangle}
                                                className="h-5 w-5 text-black-700"
                                            />
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="ml-3 text-lg font-medium text-black-700"
                                        >
                                            Disclaimer
                                        </Dialog.Title>
                                    </div>
                                </div>

                                <div className="mt-2 space-y-4">
                                    <p className="text-sm text-gray-700">
                                        The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. By accessing this website, <b>www.shoolinconsultancy.org</b>, you acknowledge and confirm that you are seeking information relating to Shoolin Consultancy of your own accord and that there has been no form of solicitation, advertisement, or inducement by Shoolin Consultancy or its members. The content of this website is for informational purposes only and should not be interpreted as soliciting or advertisement. No material/information provided on this website should be construed as legal advice. Shoolin Consultancy shall not be liable for the consequences of any action taken by relying on the material/information provided on this website. The contents of this website are the intellectual property of Shoolin Consultancy.
                                    </p>

                                </div>

                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent bg-black-600 px-4 py-2 text-sm font-medium text-white hover:bg-black-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-black-500 focus-visible:ring-offset-2"
                                        onClick={handleClose}
                                    >
                                        I Understand and Accept
                                    </button>
                                </div>

                                <div className="mt-3 text-center">
                                    <p className="text-xs text-gray-500">
                                        By clicking "I Understand and Accept", you acknowledge that you have read and agreed to our disclaimer.
                                    </p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DisclaimerAlert;
