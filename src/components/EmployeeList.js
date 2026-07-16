import React, { useMemo, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../utils";
import employeeData from "../data/employeeData.json";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [employees, setEmployees] = useState(employeeData.employees || []);
  const [departments] = useState(employeeData.departments || []);
  const [projects] = useState(employeeData.projects || []);
  const [workOns] = useState(employeeData.workons || []);

  const enrichedEmployees = useMemo(() => {
    return employees
      .map((employee) => {
        const department = departments.find(
          (item) => Number(item.id) === Number(employee.depId)
        );

        const participation = workOns
          .filter((work) => Number(work.empId) === Number(employee.id))
          .map((work) => {
            const project = projects.find((item) => Number(item.id) === Number(work.proId));
            return {
              name: project?.proName || "Unknown Project",
              hours: Number(work.workHours) || 0,
            };
          });

        const participationSummary = participation.length
          ? participation
              .map((item) => `${item.name}(${item.hours} hours)`)
              .join("; ")
          : "has not participated";

        return {
          ...employee,
          fullName: `${employee.empName?.lastName || ""} ${employee.empName?.firstName || ""}`.trim(),
          departmentName: department?.depName || "Unknown",
          dependentCount: Array.isArray(employee.dependents) ? employee.dependents.length : 0,
          participationSummary,
        };
      })
      .filter((employee) => {
        const keyword = searchTerm.trim().toLowerCase();
        const matchesSearch =
          keyword.length === 0 ||
          employee.empName?.firstName?.toLowerCase().includes(keyword) ||
          employee.empName?.lastName?.toLowerCase().includes(keyword);

        const matchesDepartment =
          selectedDepartments.length === 0 || selectedDepartments.includes(employee.departmentName);

        return matchesSearch && matchesDepartment;
      })
      .sort((a, b) => Number(b.empSalary) - Number(a.empSalary));
  }, [departments, employees, projects, searchTerm, selectedDepartments, workOns]);

  const toggleDepartment = (departmentName) => {
    setSelectedDepartments((current) =>
      current.includes(departmentName)
        ? current.filter((item) => item !== departmentName)
        : [...current, departmentName]
    );
  };

  const handleDelete = async (employeeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    try {
      await axios.delete(`/employees/${employeeId}`);
      setEmployees((currentEmployees) => currentEmployees.filter((employee) => employee.id !== employeeId));
    } catch (error) {
      console.error("Delete employee failed:", error);
      alert("Unable to delete employee. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">EMPLOYEE MANAGEMENT SYSTEM</h2>

      <Row className="g-4">
        <Col md={3}>
          <div className="border rounded p-3 bg-light">
            <h5 className="mb-3">Department Filter</h5>
            <Form>
              {departments.map((department) => (
                <Form.Check
                  key={department.id}
                  type="checkbox"
                  label={department.depName}
                  checked={selectedDepartments.includes(department.depName)}
                  onChange={() => toggleDepartment(department.depName)}
                />
              ))}
            </Form>
          </div>
        </Col>

        <Col md={9}>
          <div className="d-flex flex-nowrap justify-content-between align-items-center mb-3 gap-2">
            <Form.Control
              type="text"
              placeholder="Search by first or last name"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="flex-grow-1"
            />
            <Button variant="primary" onClick={() => navigate("/employees/create")} className="flex-shrink-0">
              Create Employee
            </Button>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Dependents</th>
                <th> Project (Total Hours)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrichedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.departmentName}</td>
                  <td>{Number(employee.empSalary).toLocaleString()} VND</td>
                  <td>{employee.dependentCount} người</td>
                  <td>{employee.participationSummary}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(employee.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeList;
