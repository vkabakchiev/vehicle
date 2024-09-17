import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/vehicles/${id}`);
        setVehicle(response.data);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Vehicle Details</h1>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Vehicle ID</td>
            <td>{vehicle.vehicle_id}</td>
          </tr>
          <tr>
            <td>Car Mark</td>
            <td>{vehicle.carmark}</td>
          </tr>
          <tr>
            <td>Car Model</td>
            <td>{vehicle.carmodel}</td>
          </tr>
          <tr>
            <td>Registration Number</td>
            <td>{vehicle.regno}</td>
          </tr>
          <tr>
            <td>WIN</td>
            <td>{vehicle.win}</td>
          </tr>
          <tr>
            <td>Motor Number</td>
            <td>{vehicle.motor_no}</td>
          </tr>
          <tr>
            <td>Registration Year</td>
            <td>{vehicle.reg_year}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{vehicle.city}</td>
          </tr>
          <tr>
            <td>Axes Number</td>
            <td>{vehicle.axes_number}</td>
          </tr>
          <tr>
            <td>Fuel</td>
            <td>{vehicle.fuel}</td>
          </tr>
          <tr>
            <td>Motor Capacity</td>
            <td>{vehicle.motor_capacity}</td>
          </tr>
          <tr>
            <td>Power (kW)</td>
            <td>{vehicle.power_kw}</td>
          </tr>
          <tr>
            <td>Power (HP)</td>
            <td>{vehicle.power_hp}</td>
          </tr>
          <tr>
            <td>Max Mass Camp</td>
            <td>{vehicle.max_mass_camp}</td>
          </tr>
          <tr>
            <td>Bruto Ton</td>
            <td>{vehicle.bruto_ton}</td>
          </tr>
          <tr>
            <td>EURO Category</td>
            <td>{vehicle.EURO_CAT}</td>
          </tr>
          <tr>
            <td>Max Possible Mass</td>
            <td>{vehicle.max_posible_mass}</td>
          </tr>
          <tr>
            <td>Is Active</td>
            <td>{vehicle.isactive ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default VehicleDetails;