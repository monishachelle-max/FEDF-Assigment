import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'

// Child Component for Student List
const StudentList = ({ students, onDeleteStudent }) => {
  if (students.length === 0) {
    return (
      <div className="student-list-section">
        <h2>📋 Student List</h2>
        <div className="empty-state">
          <div className="empty-icon">👨‍🎓</div>
          <p>No students added yet</p>
          <p className="empty-subtitle">Start by adding your first student above!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="student-list-section">
      <div className="list-header">
        <h2>📋 Student List</h2>
        <span className="student-count-badge">
          {students.length} student{students.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="student-grid">
        {students.map((student, index) => (
          <div key={index} className="student-card">
            <div className="student-info">
              <span className="student-index">#{index + 1}</span>
              <span className="student-name">{student}</span>
              <span className="student-length">{student.length} chars</span>
            </div>
            <button
              onClick={() => onDeleteStudent(index)}
              className="delete-btn"
              aria-label={`Delete ${student}`}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Dashboard Component
const StudentManagementDashboard = () => {
  // ========== useState ==========
  const [students, setStudents] = useState([])
  const [studentName, setStudentName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // ========== useRef ==========
  const inputRef = useRef(null)

  // ========== useEffect: Update browser tab title ==========
  useEffect(() => {
    const studentCount = students.length
    const title = studentCount === 0
      ? '🎓 Student Manager - No Students'
      : `🎓 Student Manager (${studentCount} student${studentCount !== 1 ? 's' : ''})`

    document.title = title

    return () => {
      document.title = 'Student Management Dashboard'
    }
  }, [students])

  // ========== useEffect: Auto-focus on load ==========
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // ========== useMemo: Calculate statistics ==========
  const statistics = useMemo(() => {
    console.log('📊 Recalculating statistics...')

    const totalStudents = students.length
    const totalCharacters = students.reduce((sum, student) => sum + student.length, 0)
    const averageNameLength = totalStudents > 0
      ? (totalCharacters / totalStudents).toFixed(2)
      : 0

    return {
      totalStudents,
      totalCharacters,
      averageNameLength
    }
  }, [students])

  // ========== useCallback: Memoized delete function ==========
  const handleDeleteStudent = useCallback((indexToDelete) => {
    setStudents(prevStudents => {
      const updatedStudents = prevStudents.filter((_, index) => index !== indexToDelete)
      console.log(`🗑️ Deleted student at index ${indexToDelete}`)
      return updatedStudents
    })
  }, [])

  // ========== Add student handler ==========
  const handleAddStudent = () => {
    if (studentName.trim() === '') {
      alert('⚠️ Please enter a student name')
      return
    }

    if (studentName.length > 50) {
      alert('⚠️ Student name is too long (maximum 50 characters)')
      return
    }

    setStudents(prevStudents => [...prevStudents, studentName.trim()])
    setStudentName('')
    setIsSubmitted(true)

    if (inputRef.current) {
      inputRef.current.focus()
    }

    setTimeout(() => setIsSubmitted(false), 2000)
  }

  // ========== Handle Enter key ==========
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddStudent()
    }
  }

  // ========== Focus button handler ==========
  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // ========== Clear all students ==========
  const handleClearAll = () => {
    if (window.confirm(`Are you sure you want to delete all ${students.length} students?`)) {
      setStudents([])
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🎓 Student Management Dashboard</h1>
        <p className="subtitle">Assignment 1 - React Hooks Implementation</p>
      </header>

      {/* Statistics Section - useMemo in action */}
      <div className="statistics-card">
        <h2>📊 Dashboard Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-content">
              <span className="stat-label">Total Students</span>
              <span className="stat-value">{statistics.totalStudents}</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">🔤</div>
            <div className="stat-content">
              <span className="stat-label">Total Characters</span>
              <span className="stat-value">{statistics.totalCharacters}</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">📏</div>
            <div className="stat-content">
              <span className="stat-label">Average Name Length</span>
              <span className="stat-value">{statistics.averageNameLength}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Student Section - useRef in action */}
      <div className="add-student-section">
        <h2>➕ Add New Student</h2>
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter student name..."
            className="student-input"
            maxLength={50}
          />
          <button onClick={handleAddStudent} className="btn btn-primary">
            Add Student
          </button>
          <button onClick={handleFocusInput} className="btn btn-secondary">
            🎯 Focus Input
          </button>
          {students.length > 0 && (
            <button onClick={handleClearAll} className="btn btn-danger">
              Clear All
            </button>
          )}
        </div>
        {isSubmitted && (
          <div className="success-message">
            ✓ Student added successfully!
          </div>
        )}
        <div className="input-tips">
          <small>💡 Tip: Press Enter to quickly add a student</small>
        </div>
      </div>

      {/* Student List - Receives memoized callback */}
      <StudentList
        students={students}
        onDeleteStudent={handleDeleteStudent}
      />

      {/* Hooks Information */}
      <div className="hooks-info">
        <h3>✅ React Hooks Implemented:</h3>
        <div className="hooks-grid">
          <div className="hook-card">
            <strong>useState</strong>
            <p>Manages students list and input field</p>
          </div>
          <div className="hook-card">
            <strong>useEffect</strong>
            <p>Updates browser tab title with student count</p>
          </div>
          <div className="hook-card">
            <strong>useRef</strong>
            <p>Auto-focus + manual focus button</p>
          </div>
          <div className="hook-card">
            <strong>useMemo</strong>
            <p>Optimizes statistics calculations</p>
          </div>
          <div className="hook-card">
            <strong>useCallback</strong>
            <p>Memoized delete function passed to child</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentManagementDashboard