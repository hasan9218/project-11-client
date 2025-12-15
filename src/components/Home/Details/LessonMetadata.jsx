const LessonMetadata = ({ lesson }) => (
  <div className="p-5 bg-base-200 rounded-lg shadow-sm text-sm text-gray-600">
    <p><strong>Created:</strong> {lesson.createdAt}</p>
    <p><strong>Last Updated:</strong> {lesson.last_update_at}</p>
    <p><strong>Visibility:</strong> {lesson.privacy}</p>
  </div>
);

export default LessonMetadata;
