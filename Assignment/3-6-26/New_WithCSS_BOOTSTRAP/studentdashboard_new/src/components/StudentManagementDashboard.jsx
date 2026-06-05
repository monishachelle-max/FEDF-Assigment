import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import StudentList from './StudentList'

// Main Component
const StudentManagementDashboard = () => {
  // ========== useState: Maintain student list ==========
  const [students, setStudents] = useState([])
  const [studentName, setStudentName] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // ========== useRef: Focus management ==========
  const inputRef = useRef(null)

  // ========== useEffect: Auto-focus on component load ==========
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // ========== useEffect: Update browser tab title ==========
  useEffect(() => {
    const studentCount = students.length
    const title = studentCount === 0
      ? '🎓 Student Manager'
      : `🎓 Student Manager (${studentCount} student${studentCount !== 1 ? 's' : ''})`
    document.title = title
  }, [students])

  // ========== useMemo: Calculate statistics (optimized) ==========
  const { totalStudents, totalCharacters, averageLength } = useMemo(() => {
    console.log('📊 Recalculating statistics...')
    const total = students.length
    const characters = students.reduce((sum, student) => sum + student.length, 0)
    const avg = total > 0 ? (characters / total).toFixed(2) : 0
    return {
      totalStudents: total,
      totalCharacters: characters,
      averageLength: avg
    }
  }, [students])

  // ========== useCallback: Memoized delete function ==========
  const handleDeleteStudent = useCallback((indexToDelete) => {
    setStudents(prevStudents => prevStudents.filter((_, index) => index !== indexToDelete))
    setSuccessMessage('✅ Student deleted successfully!')
    setTimeout(() => setSuccessMessage(''), 2000)
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
    setSuccessMessage('✅ Student added successfully!')
    setTimeout(() => setSuccessMessage(''), 2000)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // ========== Handle Enter key ==========
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddStudent()
    }
  }

  // ========== Focus button handler (useRef) ==========
  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // ========== Clear all students ==========
  const handleClearAll = () => {
    if (students.length > 0 && window.confirm(`Are you sure you want to delete all ${students.length} students?`)) {
      setStudents([])
      setSuccessMessage('🗑️ All students deleted!')
      setTimeout(() => setSuccessMessage(''), 2000)
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-3">
              🎓 Student Management Dashboard
            </h1>
            <p className="lead mb-0">Assignment 1 - React Hooks with Bootstrap</p>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
          </div>
        )}

        {/* Statistics Cards - useMemo in action */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="display-4 mb-2">👨‍🎓</div>
                <h6 className="text-muted text-uppercase small">Total Students</h6>
                <h2 className="text-primary mb-0">{totalStudents}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="display-4 mb-2">🔤</div>
                <h6 className="text-muted text-uppercase small">Total Characters</h6>
                <h2 className="text-success mb-0">{totalCharacters}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="display-4 mb-2">📏</div>
                <h6 className="text-muted text-uppercase small">Average Length</h6>
                <h2 className="text-info mb-0">{averageLength}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Add Student Section - useRef in action */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0 pt-4">
            <h3 className="h4 mb-0">➕ Add New Student</h3>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control form-control-lg"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter student name..."
                  maxLength={50}
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-2">
                  <button onClick={handleAddStudent} className="btn btn-primary btn-lg flex-grow-1">
                    ➕ Add Student
                  </button>
                  <button onClick={handleFocusInput} className="btn btn-secondary btn-lg">
                    🎯 Focus Input
                  </button>
                  {students.length > 0 && (
                    <button onClick={handleClearAll} className="btn btn-danger btn-lg">
                      🗑️ Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <small className="text-muted">💡 Tip: Press <kbd>Enter</kbd> to quickly add a student</small>
            </div>
          </div>
        </div>

        {/* Student List - Receives memoized callback from useCallback */}
        <StudentList students={students} onDeleteStudent={handleDeleteStudent} />

        {/* Hooks Information */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 bg-light">
              <div className="card-body">
                <h4 className="mb-3">✅ React Hooks Implemented</h4>
                <div className="row g-3">
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="p-2 bg-white rounded text-center">
                      <strong className="text-primary">useState</strong>
                      <small className="d-block text-muted">Student list & input</small>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="p-2 bg-white rounded text-center">
                      <strong className="text-success">useEffect</strong>
                      <small className="d-block text-muted">Tab title updates</small>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="p-2 bg-white rounded text-center">
                      <strong className="text-info">useRef</strong>
                      <small className="d-block text-muted">Auto & manual focus</small>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="p-2 bg-white rounded text-center">
                      <strong className="text-warning">useMemo</strong>
                      <small className="d-block text-muted">Optimized stats</small>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="p-2 bg-white rounded text-center">
                      <strong className="text-danger">useCallback</strong>
                      <small className="d-block text-muted">Memoized delete</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentManagementDashboard