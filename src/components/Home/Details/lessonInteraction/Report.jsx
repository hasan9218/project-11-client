import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaFlag } from 'react-icons/fa';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ReportLesson = ({ lesson, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isReporting, setIsReporting] = useState(false);
    const [reportReason, setReportReason] = useState('');

    const handleReport = () => {
        if (!user) {
            Swal.fire({
                icon: "info",
                text: "Please log in to save lessons!",
            });
            return;
        }

        setIsReporting(true);
    };

    const submitReport = async () => {
        if (!reportReason) {
            Swal.fire("Error", "Please select a reason", "error");
            return;
        }

        try {
            const reportData = {
                lessonId: lesson._id,
                lessonTitle: lesson.title,
                reporterEmail: user.email,
                reporterName: user.displayName,
                reason: reportReason
            };

            const res = await axiosSecure.post('/reports', reportData);

            if (res.data.insertedId || res.data.message) {
                refetch();
                Swal.fire(
                    "Reported!",
                    "Thank you for helping keep the platform safe.",
                    "success"
                );
                setIsReporting(false);
                setReportReason("");
            }

        } catch (error) {
            console.error("Report error:", error);
            Swal.fire("Error", "Failed to submit report", "error");
        }
    };


    return (
        <>
            {/* Report Button */}
            <button
                onClick={handleReport}
                className="btn btn-sm btn-outline btn-error"
            >
                <FaFlag size={16} />
                Report
            </button>

            {/* Report Modal */}
            {isReporting && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Report This Lesson</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            "{lesson.title}"
                        </p>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Select Reason</span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                            >
                                <option value="">Choose a reason</option>
                                <option value="inappropriate">Inappropriate Content</option>
                                <option value="hate_speech">Hate Speech or Harassment</option>
                                <option value="misinformation">Misleading or False Information</option>
                                <option value="spam">Spam or Promotional Content</option>
                                <option value="sensitive">Sensitive or Disturbing Content</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {reportReason === 'other' && (
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Please specify</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered"
                                    placeholder="Additional details..."
                                    rows="3"
                                    onChange={(e) => setReportReason(`other: ${e.target.value}`)}
                                />
                            </div>
                        )}

                        <div className="modal-action">
                            <button
                                onClick={() => setIsReporting(false)}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitReport}
                                className="btn btn-error"
                                disabled={!reportReason}
                            >
                                Submit Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReportLesson;