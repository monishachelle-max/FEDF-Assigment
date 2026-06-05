import React from 'react'

// Child Component - Student List
// Receives memoized delete function from parent (useCallback)
const StudentList = React.memo(({ students, onDeleteStudent }) => {
    console.log('📝 StudentList rendered')

    // Empty State - When no students
    if (students.length === 0) {
        return (
            <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                    <div className="display-1 mb-3">👨‍🎓</div>
                    <h5 className="text-muted">No students added yet</h5>
                    <p className="text-muted small">Start by adding your first student above!</p>
                </div>
            </div>
        )
    }

    // Student List Table
    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-4 d-flex justify-content-between align-items-center">
                <h3 className="h4 mb-0">📋 Student List</h3>
                <span className="badge bg-primary rounded-pill fs-6">
                    {students.length} student{students.length !== 1 ? 's' : ''}
                </span>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th style={{ width: '80px' }} className="text-center">#</th>
                                <th>Student Name</th>
                                <th style={{ width: '130px' }} className="text-center">Characters</th>
                                <th style={{ width: '100px' }} className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <span className="badge bg-primary rounded-pill">{index + 1}</span>
                                    </td>
                                    <td>
                                        <strong>{student}</strong>
                                    </td>
                                    <td className="text-center">
                                        <span className="badge bg-info text-dark">
                                            📝 {student.length} character{student.length !== 1 ? 's' : ''}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => onDeleteStudent(index)}
                                            className="btn btn-danger btn-sm"
                                            aria-label={`Delete ${student}`}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="table-light">
                            <tr>
                                <td colSpan="4" className="text-muted small py-3">
                                    <i className="bi bi-info-circle"></i> Total: {students.length} student{students.length !== 1 ? 's' : ''} |
                                    Total Characters: {students.reduce((sum, s) => sum + s.length, 0)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
})

StudentList.displayName = 'StudentList'

export default StudentList