import React from 'react';
import profilePic from '../assets/fotos_with_dogs.jpg';
import NavBar from '../components/NavBar';

export const About = () => {
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
                            Hola! I'm <em className="bg-gradient-to-r from-indigo-400 to-orange-400 bg-clip-text text-transparent"> Janio. </em>
                        </h1>
                        <p className="mb-6 leading-relaxed">
                            Hi, I'm Janio — a data-driven full-stack developer who's half Dominican 🇩🇴, half German 🇩🇪, and fully obsessed with turning complexity into clarity.

                            I love building things that are simple, useful, and feel good to use — whether it's clean code, thoughtful design, or sharing what I’ve learned with others.

                            When I’m not building or teaching, I’m probably out for a run, lost in a book, or hanging out with my Himalayan cat.

                            Glad you’re here — feel free to say hi! 👋
                        </p>
                        <button className="max-w-xs w-auto mx-auto flex items-center gap-2 mt-12 bg-gray-700 text-white border-amber-500 py-2 px-4 rounded">
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
                                className="w-60 h-60 object-cover rounded-full border-4 border-amber-500 mx-auto"
                            />
                        </div>
                        <ul className="ml-1 mt-6 flex items-center justify-center space-x-5">
                            {/* LinkedIn */}
                            <li className="text-xs shrink-0">
                                <a
                                    className="block text-white hover:text-zinc-200"
                                    href="https://www.linkedin.com/in/janio-martinez-bachmann-26040ba1/"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    title="LinkedIn"
                                >
                                    <span className="sr-only">LinkedIn</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19v.14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                                    </svg>
                                </a>
                            </li>

                            {/* GitHub */}
                            <li className="text-xs shrink-0">
                                <a
                                    className="block text-white hover:text-zinc-200"
                                    href="https://github.com/alexanderbachmann"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    title="GitHub"
                                >
                                    <span className="sr-only">GitHub</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
        1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
        0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
        0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2
        .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08
        2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65
        3.95.29.25.54.73.54 1.48
        0 1.07-.01 1.93-.01 2.2
        0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                    </svg>
                                </a>
                            </li>

                            {/* Kaggle */}
                            <li className="text-xs shrink-0">
                                <a
                                    className="block text-white hover:text-zinc-200"
                                    href="https://www.kaggle.com/janiobachmann"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    title="Kaggle"
                                >
                                    <span className="sr-only">Kaggle</span>
                                    <svg width="25" height="25" viewBox="0 0 50.1 71.5" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor">
                                        <path d="M50.1 64.7L43.5 71.5 9.5 38.1V70.3H0V0.3h9.5v31.9L39.3 0l6.4 5.9L18.4 34.3l31.7 30.4z" />
                                    </svg>
                                </a>
                            </li>

                            {/* Goodreads */}
                            <li className="text-xs shrink-0">
                                <a
                                    className="block text-white hover:text-zinc-200"
                                    href="https://www.goodreads.com/user/show/139128464-janio-martinez-bachmann"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    title="Goodreads"
                                >
                                    <span className="sr-only">Goodreads</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor" className="h-6 w-6">
                                        <path d="M663.8 382.4c10.2 74.6-9.4 158-71.8 201.4-44.6 31-105.6 28.2-141.6 11.4-74.2-34.6-99-117.2-93.6-194.4
        8.6-121.8 81.8-175.8 150.6-175 93.8-.4 143.6 63.6 156.4 156.6zM960 176v672c0 61.8-50.2 112-112 112H176c-61.8
        0-112-50.2-112-112V176c0-61.8 50.2-112 112-112h672c61.8 0 112 50.2 112 112zM724 626.4s-.2-68-.2-434.6h-58v80.6c-1.6
        0.6-2.4-1-3.2-2.4-19.2-41.4-71.8-92.6-152-92-103.8 0.8-174.4 62.4-201.2 155.6-8.6 29.8-11.6 60.2-11
        91.2 3.4 155.8 90.2 235.6 224.8 230.4 57.8-2.2 109-34 138-90.4 1-2 2.2-3.8 3.4-5.8 0.4 0.2 0.8
        0.2 1.2 0.4 0.6 7.6 0.4 61.4 0.2 69-0.4 29.6-4 59-14.4 87-15.6 42-44.6 69.4-89
        79-35.6 7.8-71.2 7.6-106.4-2.4-43-12.2-73-38-82.2-83.6-0.6-3.2-2.6-2.6-4.6-2.6h-53.6c1.6
        21.2 6.4 40.6 17 58.4 48.4 81 165.4 97 256.4 74.8 99.8-24.6 134.6-109.8 134.8-212.6z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;