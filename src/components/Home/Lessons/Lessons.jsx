import React from 'react';
import LessonCard from './LessonCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdArrowDropdown } from "react-icons/io";

const Lessons = () => {
    const [lessons, setLessons] = useState([]);
    const [totalLesson, setTotalLessons] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 9;
    console.log(totalLesson);

    // filters
    const [category, setCategory] = useState('all');
    const [emotionalTone, setEmotionalTone] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState(null);


  

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/lessons?limit=${limit}&skip=${currentPage * limit}`)
            .then(data => {
                setLessons(data.data.result || []);
                setTotalLessons(data.data.total || 0);

                const page = Math.ceil(data.data.total / limit);
                setTotalPage(page);
            });
    }, [currentPage]);

    // filtering 
    let filteredLessons = lessons;

    if (category !== 'all') {
        filteredLessons = filteredLessons.filter(
            lesson => lesson.category?.toLowerCase() === category.toLowerCase()
        );
    }

    if (emotionalTone !== 'all') {
        filteredLessons = filteredLessons.filter(
            lesson => lesson.emotionalTone?.toLowerCase() === emotionalTone.toLowerCase()
        );
    }

    if (search) {
        filteredLessons = filteredLessons.filter(
            lesson => lesson.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    // sorting
    if (sortBy === 'newest') {
        filteredLessons = filteredLessons.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    if (sortBy === 'mostSaved') {
        filteredLessons = filteredLessons.sort(
            (a, b) => (b.favoritesCount || 0) - (a.favoritesCount || 0)
        );
    }

    return (
        <div>
           
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">

                {/* LEFT: Filter Row */}
                <div className="flex items-center gap-8 relative">
                    <div className="flex items-center gap-8"></div>

                    {/* CATEGORY */}
                    <div className="relative">
                        <button
                            onClick={() => setActiveFilter(activeFilter === 'category' ? null : 'category')}
                            className="flex items-center gap-1 font-semibold border-b-2 border-transparent hover:border-primary"
                        >
                            Category <IoMdArrowDropdown />
                        </button>

                        {activeFilter === 'category' && (
                            <div className="absolute bg-white shadow-md rounded w-40 mt-2 z-50">
                                {['all', 'Career', 'Personal Growth', 'Relationships', 'Mindset'].map(item => (
                                    <p
                                        key={item}
                                        onClick={() => {
                                            setCategory(item === 'all' ? 'all' : item);
                                            setCurrentPage(0);
                                            setActiveFilter(null);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {item}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* EMOTIONAL TONE */}
                    <div className="relative">
                        <button
                            onClick={() => setActiveFilter(activeFilter === 'tone' ? null : 'tone')}
                            className="flex items-center gap-1 font-semibold border-b-2 border-transparent hover:border-primary"
                        >
                            Emotional Tone <IoMdArrowDropdown />
                        </button>

                        {activeFilter === 'tone' && (
                            <div className="absolute bg-white shadow-md rounded w-40 mt-2 z-50">
                                {['all', 'Motivational', 'Reflective', 'Sad', 'Inspiring'].map(tone => (
                                    <p
                                        key={tone}
                                        onClick={() => {
                                            setEmotionalTone(tone === 'all' ? 'all' : tone);
                                            setCurrentPage(0);
                                            setActiveFilter(null);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
                            className="flex items-center gap-1 font-semibold border-b-2 border-transparent hover:border-primary"
                        >
                            Sort By <IoMdArrowDropdown />
                        </button>

                        {activeFilter === 'sort' && (
                            <div className="absolute bg-white shadow-md rounded w-40 mt-2 z-50">
                                <p
                                    onClick={() => {
                                        setSortBy('newest');
                                        setActiveFilter(null);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Newest
                                </p>
                                <p
                                    onClick={() => {
                                        setSortBy('mostSaved');
                                        setActiveFilter(null);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Most Saved
                                </p>
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
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                {
                    filteredLessons.map(lesson =>
                        <LessonCard key={lesson._id} lesson={lesson} />
                    )
                }
            </div>

            {/* Pagination */}
            <div className="flex justify-center flex-wrap gap-3 py-10">
                {
                    currentPage > 0 && (
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="btn bg-secondary text-white"
                        >
                            Prev
                        </button>
                    )
                }

                {
                    [...Array(totalPage).keys()].map((i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`btn ${i === currentPage ? "bg-primary text-white" : "bg-secondary text-white"}`}
                        >
                            {i + 1}
                        </button>
                    ))
                }

                {
                    currentPage < totalPage - 1 && (
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="btn bg-secondary text-white"
                        >
                            Next
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default Lessons;