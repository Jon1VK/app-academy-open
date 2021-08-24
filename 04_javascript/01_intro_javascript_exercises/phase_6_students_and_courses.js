function Student(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.courses = [];
}

Student.prototype.name = function () {
  return `${this.firstname} ${this.lastname}`;
};

Student.prototype.enroll = function (course) {
  if (this.courses.some((c) => c.conflictsWith(course))) {
    throw `Course ${course.name} conflicts with some of the already enrolled courses.`;
  }

  this.courses.push(course);
  course.students.push(this);
};

Student.prototype.courseLoad = function () {
  return this.courses.reduce((load, course) => {
    load[course.department] = load.hasOwnProperty(course.department)
      ? load[course.department] + course.credits
      : course.credits;
    return load;
  }, {});
};

function Course(name, department, credits, weekdays, timeblock) {
  this.name = name;
  this.department = department;
  this.credits = credits;
  this.weekdays = weekdays;
  this.timeblock = timeblock;
  this.students = [];
}

Course.prototype.addStudent = function (student) {
  student.enroll(this);
};

Course.prototype.conflictsWith = function (course) {
  return (
    this.timeblock == course.timeblock &&
    this.weekdays.some((weekday) => course.weekdays.includes(weekday))
  );
};
