import React, { useEffect, useState } from 'react';
import { API_URL } from "../../auth/authConstants";
import Sidebar from '../../components/sidebar';
import { useAuth } from '../../auth/AuthProvider';
import type { Facturas } from "../../types/types";
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const FacturasPendientes = () => {
  const auth = useAuth();
  const [facturas, setFacturas] = useState<Facturas[]>([]);
  const [selectedFactura, setSelectedFactura] = useState<any>(null); // Cambia `any` al tipo adecuado para tus facturas
  const [errorMessage, setErrorMessage] = useState<string>('');
  //const [selectedFactura, setSelectedFactura] = useState<Facturas | null>(null); // Estado para la factura seleccionada
  const [open, setOpen] = useState(false); // Estado para controlar el modal
  const [pagoRealizado, setPagoRealizado] = useState(false); // Estado para simular el pago
  const [metodoPago, setMetodoPago] = useState(''); // Estado para almacenar el método de pago
  const navigate = useNavigate();



    // Facturas pendientes
    const fetchFacturas = async () => {
      try {
        const response = await fetch(`${API_URL}/Pacient/facturas/${auth.getUser()?.username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
        });
        const data = await response.json();
            if (response.ok) {
                setFacturas(data.body.data);
            } else {
                setErrorMessage(data.error || 'Error al cargar las facturas');
            }
      } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Ocurrió un error al cargar las facturas');
      }
    };

    useEffect(() => {
        fetchFacturas();
    }, []);

    const handleOpen = (factura: Facturas) => {
      setSelectedFactura(factura);
      setOpen(true);
    };
  
    
    const handleClose = () => {
      setOpen(false);
      setSelectedFactura(null);
      setPagoRealizado(false); // Reinicia el estado del pago
    };
    

    const handlePago = () => {
      
      if (metodoPago === 'PSE') {
        window.location.href = "https://www.pse.com.co/persona";
      } else if (metodoPago === 'Tarjeta de Crédito') {
        navigate(`/pasarela-pago/${selectedFactura.idFactura}`);
      } else if (metodoPago === 'Tarjeta Debito') {
        navigate(`/pasarela-pago/${selectedFactura.idFactura}`);
      } else {
        alert('Selecciona un método de pago válido.');
      }
    };

  return (
    <>
      <Sidebar />
      <div className="calendar-container">
        <h1>Facturas Pendientes</h1>
        
         {/* {facturas.length > 0 ? ( */}
          <table>
            <thead>
              <tr>
                <th>ID Factura</th>
                <th>ID Cita</th>
                <th>Servicio</th>
                <th>Estado</th>
                <th>Generar Colilla de Pago</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>1552</td>
                  <td>52</td>
                  <td>Yo ni si</td>
                  <td>activa</td>
                  <td><Button /*</td>onClick={() => handleOpen(facturas)}*/> Pagar </Button></td>
                </tr>
              {/* {facturas.map((factura: Facturas, index) => (
                <tr key={index}>
                  <td>{factura.idFactura}</td>
                  <td>{factura.idCita}</td>
                  <td>{factura.servicioPago}</td>
                  <td>{factura.estadoFE}</td>
                  <td><Button onClick={() => handleOpen(facturas)}> VER </Button></td>
                </tr>
              ))} */}
            </tbody>
          </table>

        {/* ) : (
          <p>No se encontraron facturas pendientes</p>
        )} */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Detalles</DialogTitle>
          <DialogContent>
            {selectedFactura && (
              <>
                <Typography><strong>ID Colilla:</strong> {selectedFactura.idFactura}</Typography>
                <Typography><strong>ID Cita:</strong> {selectedFactura.idCita}</Typography>
                <Typography><strong>Servicio:</strong> {selectedFactura.servicioPago}</Typography>
                <Typography><strong>Monto:</strong> $7.500</Typography>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Método de Pago</InputLabel>
                  <Select
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  >
                    <MenuItem value=""><em>Seleccione un método</em></MenuItem>
                    <MenuItem value="Tarjeta Debito">Tarjeta Debito</MenuItem>
                    <MenuItem value="PSE">PSE</MenuItem>
                    <MenuItem value="Tarjeta de Crédito">Tarjeta Crédito</MenuItem>
                    <MenuItem value="Transferencia Bancaria">Transferencia Bancaria</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="success"
                  onClick={handlePago}
                  disabled={!metodoPago}
                >
                  Proceder al Pago
                </Button>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cerrar</Button>
          </DialogActions>
        </Dialog>

      </div>
    </>
  );
};

export default FacturasPendientes;
