import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../utils";
import employeeData from "../data/employeeData.json";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salary, setSalary] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const departments = employeeData.departments || [];

  const validate = () => {
    const nextErrors = {};

    if (!firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!salary.trim()) {
      nextErrors.salary = "Salary is required.";
    } else if (Number(salary) <= 0 || Number.isNaN(Number(salary))) {
      nextErrors.salary = "Salary must be a positive number greater than 0.";
    }

    if (!departmentId) {
      nextErrors.departmentId = "Please select a department.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    const payload = {
      empName: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
      empSalary: Number(salary),
      depId: Number(departmentId),
      supervisorId: null,
      dependents: [],
    };

    try {
      await axios.post("/employees", payload);
      setSubmitSuccess("Employee created successfully.");
      setTimeout(() => {
        navigate("/employees");
      }, 800);
    } catch (error) {
      console.error("Create employee failed:", error);
      setSubmitError("Unable to create employee. Please try again.");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: 760 }}>
      <h2 className="text-center mb-4">Create New Employee</h2>
      {submitError && <Alert variant="danger">{submitError}</Alert>}
      {submitSuccess && <Alert variant="success">{submitSuccess}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="salary">
          <Form.Label>Salary *</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
            isInvalid={!!errors.salary}
          />
          <Form.Control.Feedback type="invalid">{errors.salary}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="department">
          <Form.Label>Department *</Form.Label>
          <Form.Select
            value={departmentId}
            onChange={(event) => setDepartmentId(event.target.value)}
            isInvalid={!!errors.departmentId}
          >
            <option value="">Select a department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.depName}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.departmentId}</Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            Save Employee
          </Button>
          <Button variant="secondary" onClick={() => navigate("/employees")}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateEmployee;
