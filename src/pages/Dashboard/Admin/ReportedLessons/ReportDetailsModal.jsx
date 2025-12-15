const ReportDetailsModal = ({ lesson, close }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 w-full max-w-lg rounded-xl shadow-lg">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{lesson.lessonTitle}</h2>
          <button className="btn btn-sm btn-circle" onClick={close}>
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {lesson.reportReasons.map((report, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded-lg">
              <p><strong>Name:</strong> {report.reporterName}</p>
              <p><strong>Email:</strong> {report.reporterEmail}</p>
              <p><strong>Reason:</strong> {report.reason.replace("_", " ")}</p>
              <p className="text-gray-500 text-xs">
                {new Date(report.reportedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="text-right mt-4">
          <button className="btn btn-primary" onClick={close}>Close</button>
        </div>

      </div>
    </div>
  );
};

export default ReportDetailsModal;
