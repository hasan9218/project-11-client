import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Lesson Not Found
                </h1>
                
                <p className="text-gray-600 mb-6">
                    Sorry, we couldn't find the lesson you're looking for.
                </p>

                <div className="space-y-3">
                    <Link
                        to="/"
                        className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition"
                    >
                        Go to Home
                    </Link>
                    
                    <Link
                        to="/public-lessons"
                        className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition"
                    >
                        View Public Lessons
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;