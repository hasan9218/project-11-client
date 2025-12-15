import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEye, FaTrash, FaCheck } from "react-icons/fa";
import ReportDetailsModal from "./ReportDetailsModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Fetch all reported lessons
  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });

  // Delete lesson
  const handleDelete = async (lessonId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the lesson!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/reports/${lessonId}`);
        Swal.fire("Deleted!", "Lesson removed", "success");
        refetch();
      }
    });
  };

  // Ignore report
  const handleIgnore = async (lessonId) => {
    await axiosSecure.patch(`/reports/ignore/${lessonId}`);
    Swal.fire("Ignored", "This report is now removed", "success");
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reported Lessons</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Lesson Title</th>
              <th>Total Reports</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((item, index) => (
              <tr key={item.lessonId}>
                <td>{index + 1}</td>
                <td>{item.lessonTitle}</td>
                <td>
                  <span className="badge badge-error text-white">
                    {item.totalReports}
                  </span>
                </td>

                <td className="flex gap-3">
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => setSelectedLesson(item)}
                  >
                    <FaEye /> View
                  </button>

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(item.lessonId)}
                  >
                    <FaTrash /> Delete Lesson
                  </button>

                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleIgnore(item.lessonId)}
                  >
                    <FaCheck /> Ignore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLesson && (
        <ReportDetailsModal
          lesson={selectedLesson}
          close={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
};

export default ReportedLessons;
