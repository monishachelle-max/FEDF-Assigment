function attendanceTracker() {

    let attendanceCount = 0; // private variable (closure)

    return {
        markAttendance: function() {
            attendanceCount++;
            console.log("Attendance marked");
        },

        displayAttendance: function() {
            console.log("Total attended classes: " + attendanceCount);
        }
    };
}

// Create tracker object
const student = attendanceTracker();

// Test operations
student.markAttendance();
student.markAttendance();
student.markAttendance();

student.displayAttendance();