const LessonContent = ({ lesson, isLocked }) => {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">{lesson.title}</h1>

      {!isLocked ? (
        <p className="text-gray-700 leading-relaxed">
          {lesson.description}
        </p>
      ) : (
        <p className="text-gray-500 blur-sm">
          {lesson.description}
        </p>
      )}

      {/* Featured Image */}
      {lesson.image && (
        <img
          src={lesson.image}
          alt={lesson.title}
          className={`rounded-lg mt-3 shadow-lg h-70 w-full ${isLocked && "blur-sm opacity-70"}`}
        />
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="badge badge-primary">{lesson.category}</span>
        <span className="badge badge-secondary">{lesson.emotionalTone}</span>
        <span
          className={`badge ${
            lesson.accessLevel === "premium" ? "badge-error" : "badge-success"
          }`}
        >
          {lesson.accessLevel}
        </span>
      </div>
    </section>
  );
};

export default LessonContent;
