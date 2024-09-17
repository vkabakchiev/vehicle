import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/vehicle-details/${id}`);
  };

  return (
    <Container>
      <h1 className="my-4">Списък с регистрирани автомобили</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Марка</th>
            <th>Модел</th>
            <th>Регистрационен номер</th>
            <th>Година на регистрация</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={vehicle.vehicle_id} onClick={() => handleRowClick(vehicle.vehicle_id)} style={{ cursor: 'pointer' }}>
              <td>{index + 1}</td>
              <td>{vehicle.carmark}</td>
              <td>{vehicle.carmodel}</td>
              <td>{vehicle.regno}</td>
              <td>{vehicle.reg_year}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default VehicleList;