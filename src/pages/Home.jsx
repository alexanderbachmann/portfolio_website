import React from 'react';
import profilePic from '../assets/ai_self_pic.png';
import NavBar from '../components/NavBar';

export const Home = () => {
    return (
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
            {/* NAV BAR ROW */}
            <NavBar />

            {/* TWO-COLUMN CONTENT */}
            <div className="max-w-4xl w-full px-4 py-12 mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Card */}
                    <div className="text-white rounded-lg p-8 flex-1/3">
                        <h1 className="text-4xl font-bold mb-4">
                            Hola! I'm <em className="bg-gradient-to-r from-indigo-400 to-orange-400 bg-clip-text text-transparent"> Janio </em>.
                        </h1>
                        <p className="mb-6 leading-relaxed">
                            Hi, I'm Janio — a data-driven full-stack developer with roots in the Dominican Republic 🇩🇴 and Germany 🇩🇪.

                            I love making complex things feel simple — whether that's through code, design, or teaching others what I’ve learned along the way.

                            When I’m not building or sharing ideas, I’m probably out for a run, deep into a good book, or hanging out with my Himalayan cat.

                            Glad you’re here — feel free to say hi! 👋
                        </p>
                        <button className="max-w-xs w-auto mx-auto flex items-center gap-2 bg-gray-700 text-white border-amber-500 py-2 px-4 rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12" />
                            </svg>
                            Download CV
                        </button>
                    </div>

                    {/* Right List */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="rounded-full object-cover mt-4 border-amber-500 border-4 w-60 h-60 mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;