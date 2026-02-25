import React from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ course, onEnroll, isEnrolled }) => {
  return (
    <div className="course-card">
      <div className="course-thumbnail">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} />
        ) : (
          <div className="placeholder">No Image</div>
        )}
        <span className={`course-level ${course.level}`}>{course.level}</span>
      </div>
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description.substring(0, 100)}...</p>
        <div className="course-meta">
          <span className="category">{course.category}</span>
          <span className="rating">⭐ {course.rating.toFixed(1)}</span>
        </div>
        <div className="course-footer">
          <span className="price">${course.price}</span>
          <button
            className={`btn ${isEnrolled ? 'btn-enrolled' : 'btn-enroll'}`}
            onClick={onEnroll}
            disabled={isEnrolled}
          >
            {isEnrolled ? 'Enrolled' : 'Enroll'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
