import React from 'react';
import LessonCard from './LessonCard';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Lessons = () => {
    // get my all lessons from the db
        const { data: lessons = [] } = useQuery({
            queryKey: ['lessons'],
            queryFn: async () => {
                const result = await axios.get(`${import.meta.env.VITE_API_URL}/lessons`)
                return result.data;
            }
        })
    return (
        <div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                {
                    lessons?.map(lesson=><LessonCard key={lesson._id} lesson={lesson}></LessonCard>)
                }
            </div>
        </div>
    );
};

export default Lessons;