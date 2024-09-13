import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const VehicleForm = () => {
  const initialFormData = {
    carmark: '',
    carmodel: '',
    regno: '',
    win: '',
    motor_no: '',
    reg_year: '',
    city: '',
    axes_number: '',
    fuel: '',
    motor_capacity: '',
    power_kw: '',
    power_hp: '',
    max_mass_camp: '',
    bruto_ton: '',
    EURO_CAT: '',
    max_posible_mass: '',
    isactive: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/vehicles', formData);
      if (response.status === 201) {
        alert('Vehicle data submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting vehicle data:', error);
      alert('Failed to submit vehicle data. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Vehicle Form</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCarmark">
                  <Form.Label>Car Mark</Form.Label>
                  <Form.Control
                    type="text"
                    name="carmark"
                    value={formData.carmark}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCarmodel">
                  <Form.Label>Car Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="carmodel"
                    value={formData.carmodel}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRegno">
                  <Form.Label>Registration Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="regno"
                    value={formData.regno}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formWin">
                  <Form.Label>WIN</Form.Label>
                  <Form.Control
                    type="text"
                    name="win"
                    value={formData.win}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMotorNo">
                  <Form.Label>Motor Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="motor_no"
                    value={formData.motor_no}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRegYear">
                  <Form.Label>Registration Year</Form.Label>
                  <Form.Control
                    type="text"
                    name="reg_year"
                    value={formData.reg_year}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAxesNumber">
                  <Form.Label>Axes Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="axes_number"
                    value={formData.axes_number}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFuel">
                  <Form.Label>Fuel</Form.Label>
                  <Form.Control
                    type="text"
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMotorCapacity">
                  <Form.Label>Motor Capacity</Form.Label>
                  <Form.Control
                    type="text"
                    name="motor_capacity"
                    value={formData.motor_capacity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPowerKw">
                  <Form.Label>Power (kW)</Form.Label>
                  <Form.Control
                    type="text"
                    name="power_kw"
                    value={formData.power_kw}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPowerHp">
                  <Form.Label>Power (HP)</Form.Label>
                  <Form.Control
                    type="text"
                    name="power_hp"
                    value={formData.power_hp}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMaxMassCamp">
                  <Form.Label>Max Mass Camp</Form.Label>
                  <Form.Control
                    type="text"
                    name="max_mass_camp"
                    value={formData.max_mass_camp}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBrutoTon">
                  <Form.Label>Bruto Ton</Form.Label>
                  <Form.Control
                    type="text"
                    name="bruto_ton"
                    value={formData.bruto_ton}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEuroCat">
                  <Form.Label>EURO CAT</Form.Label>
                  <Form.Control
                    type="text"
                    name="EURO_CAT"
                    value={formData.EURO_CAT}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMaxPosibleMass">
                  <Form.Label>Max Possible Mass</Form.Label>
                  <Form.Control
                    type="text"
                    name="max_posible_mass"
                    value={formData.max_posible_mass}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formIsActive">
                  <Form.Check
                    type="checkbox"
                    name="isactive"
                    label="Is Active"
                    checked={formData.isactive}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-2">
                  Submit
                </Button>
                <Button variant="secondary" type="button" className="w-100" onClick={handleReset}>
                  Reset
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VehicleForm;