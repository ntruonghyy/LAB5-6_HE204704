export const employeeData = {
  departments: [
    { id: "1", depName: "Human Resources", managerId: 1 },
    { id: "2", depName: "IT", managerId: 2 },
    { id: "3", depName: "Finance", managerId: 6 }
  ],
  employees: [
    {
      id: "1",
      empName: { firstName: "An", lastName: "Nguyen" },
      empSalary: 18000000,
      empGender: "Male",
      empBirthdate: "1985-01-10",
      depId: 1,
      supervisorId: null,
      dependents: [
        { fullName: "Lan Nguyen", birthDate: "2015-05-01", relationship: "Daughter" },
        { fullName: "Mai Nguyen", birthDate: "2018-09-12", relationship: "Daughter" },
        { fullName: "Hoa Nguyen", birthDate: "1986-03-22", relationship: "Wife" }
      ]
    },
    {
      id: "2",
      empName: { firstName: "Binh", lastName: "Tran" },
      empSalary: 25000000,
      empGender: "Male",
      empBirthdate: "1983-03-12",
      depId: 2,
      supervisorId: null,
      dependents: [
        { fullName: "Hoa Tran", birthDate: "1985-07-20", relationship: "Wife" },
        { fullName: "Nam Tran", birthDate: "2010-01-01", relationship: "Son" },
        { fullName: "Linh Tran", birthDate: "2013-06-15", relationship: "Daughter" },
        { fullName: "Ba Tran", birthDate: "1960-02-02", relationship: "Mother" }
      ]
    },
    {
      id: "3",
      empName: { firstName: "Chi", lastName: "Le" },
      empSalary: 10000000,
      empGender: "Female",
      empBirthdate: "1995-08-21",
      depId: 2,
      supervisorId: 2,
      dependents: []
    },
    {
      id: "4",
      empName: { firstName: "Dung", lastName: "Pham" },
      empSalary: 12000000,
      empGender: "Male",
      empBirthdate: "1992-11-11",
      depId: 2,
      supervisorId: 2,
      dependents: [
        { fullName: "Mai Pham", birthDate: "2020-02-02", relationship: "Daughter" },
        { fullName: "Hien Pham", birthDate: "1993-04-04", relationship: "Wife" }
      ]
    },
    {
      id: "5",
      empName: { firstName: "Hanh", lastName: "Vo" },
      empSalary: 9000000,
      empGender: "Female",
      empBirthdate: "1998-04-09",
      depId: 2,
      supervisorId: 2,
      dependents: []
    },
    {
      id: "6",
      empName: { firstName: "Khanh", lastName: "Do" },
      empSalary: 20000000,
      empGender: "Male",
      empBirthdate: "1987-06-30",
      depId: 3,
      supervisorId: null,
      dependents: [
        { fullName: "Minh Do", birthDate: "2012-09-09", relationship: "Son" },
        { fullName: "Ha Do", birthDate: "2016-12-12", relationship: "Daughter" },
        { fullName: "Lan Do", birthDate: "1988-08-08", relationship: "Wife" }
      ]
    }
  ]
};

export default employeeData;
