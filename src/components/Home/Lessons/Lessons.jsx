import { useEffect, useState } from 'react';
import LessonCard from './LessonCard';
import axios from 'axios';
import { IoMdArrowDropdown } from "react-icons/io";
const Lessons = () => {
    const [lessons, setLessons] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    // filters
    const [category, setCategory] = useState('all');
    const [emotionalTone, setEmotionalTone] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState(null);


    const limit = 9;

    useEffect(() => {
        axios(
            `${import.meta.env.VITE_API_URL}/lessons`,
            {
                params: {
                    limit,
                    skip: currentPage * limit,
                    category,
                    emotionalTone,
                    sortBy,
                    search
                }
            }
        ).then(res => {
            setLessons(res.data.result || []);
            setTotalPage(Math.ceil(res.data.total / limit));
        });
    }, [currentPage, category, emotionalTone, sortBy, search]);

    return (
        <div>
            {/* 🔹 Filters + Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">

                {/* LEFT: Filter Row */}
                <div className="flex items-center gap-8 relative">

                    {/* CATEGORY */}
                    <div className="relative">
                        <button
                            onClick={() => setActiveFilter(activeFilter === 'category' ? null : 'category')}
                            className={`flex items-center gap-1 font-semibold ${activeFilter === 'category' ? 'text-primary border-b-2 border-primary' : 'text-gray-700'
                                }`}
                        >
                            Category <IoMdArrowDropdown  size={16} />
                        </button>

                        {activeFilter === 'category' && (
                            <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md z-50 w-40">
                                {['all', 'personal_growth', 'career', 'relationships', 'mindset'].map(item => (
                                    <p
                                        key={item}
                                        onClick={() => {
                                            setCategory(item);
                                            setCurrentPage(0);
                                            setActiveFilter(null);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
                                    >
                                        {item.replace('_', ' ')}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* EMOTIONAL TONE */}
                    <div className="relative">
                        <button
                            onClick={() => setActiveFilter(activeFilter === 'tone' ? null : 'tone')}
                            className={`flex items-center gap-1 font-semibold ${activeFilter === 'tone' ? 'text-primary border-b-2 border-primary' : 'text-gray-700'
                                }`}
                        >
                            Emotional Tone <IoMdArrowDropdown size={16} />
                        </button>

                        {activeFilter === 'tone' && (
                            <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md z-50 w-40">
                                {['all', 'inspiring', 'motivational', 'sad', 'reflective'].map(tone => (
                                    <p
                                        key={tone}
                                        onClick={() => {
                                            setEmotionalTone(tone);
                                            setCurrentPage(0);
                                            setActiveFilter(null);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
                                    >
                                        {tone}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SORT */}
                    <div className="relative">
                        <button
                            onClick={() => setActiveFilter(activeFilter === 'sort' ? null : 'sort')}
                            className={`flex items-center gap-1 font-semibold ${activeFilter === 'sort' ? 'text-primary border-b-2 border-primary' : 'text-gray-700'
                                }`}
                        >
                            Sort By <IoMdArrowDropdown size={16} />
                        </button>

                        {activeFilter === 'sort' && (
                            <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md z-50 w-40">
                                {[
                                    { label: 'Newest', value: 'newest' },
                                    { label: 'Most Saved', value: 'mostSaved' },
                                ].map(opt => (
                                    <p
                                        key={opt.value}
                                        onClick={() => {
                                            setSortBy(opt.value);
                                            setCurrentPage(0);
                                            setActiveFilter(null);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {opt.label}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Search */}
                <input
                    type="text"
                    placeholder="Search lessons..."
                    className="input input-bordered w-full md:w-64"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(0);
                    }}
                />
            </div>

            {/* Lessons */}
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                {lessons.map((lesson) => (
                    <LessonCard key={lesson._id} lesson={lesson} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center flex-wrap gap-3 py-10">
                {currentPage > 0 && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="btn bg-secondary text-white"
                    >
                        Prev
                    </button>
                )}

                {[...Array(totalPage).keys()].map((i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`btn ${i === currentPage ? 'bg-primary text-white' : 'bg-secondary text-white'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                {currentPage < totalPage - 1 && (
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="btn bg-secondary text-white"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Lessons;