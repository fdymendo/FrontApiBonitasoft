import "./App.css";
import React, { useEffect, useState } from "react";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";

const apiBonitaSoft = "http://localhost:8083/createProcess";

const sendServices = async (
  values,
  setMessage,
  setSeverity,
  aprobada,
  pagada
) => {
  try {
    values.aprobada = aprobada;
    values.pagada = pagada;

    const result = await axios.post(apiBonitaSoft, {
      publicacionesInput: values,
    });
    setSeverity("success");
    setMessage("Mensaje enviado correctamente");
    console.log(result);
  } catch (error) {
    console.log(error.response.data);
    setSeverity("error");
    setMessage("Error: " + error.response.data);
  }
};

const handleChange = (values, setValues) => (prop) => (event) => {
  setValues({ ...values, [prop]: event.target.value });
};

function App() {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [aprobada, setAprobada] = useState(false);
  const [pagada, setPagada] = useState(false);

  const handleChangeAprobada = () => {
    setAprobada(!aprobada);
  };
  const handleChangePagada = () => {
    setPagada(!pagada);
  };
  const initial = {
    ano: "",
    aprobada: aprobada,
    color: "",
    kms: "",
    pagada: pagada,
    placa: "",
    precio: "",
    persistenceVersion: "",
    usuario: "",
    ciudadVenta: "",
    marca: "",
    plan: "",
    tipodevehiculo: "",
    tipousuario: "",
    tipoplan: "",
    calificacion: "",
  };
  const [values, setValues] = useState(initial);

  const onSubmit = () => {
    sendServices(values, setMessage, setSeverity, aprobada, pagada);
  };
  const clear = () => {
    setMessage("");
    setValues(initial);
  };
  return (
    <div className="App">
      <Grid container spacing={2} style={{ marginTop: "50px" }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div" gutterBottom>
            Publicar Vehiculo
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            label="Tipo de vehiculo"
            type="search"
            onChange={handleChange(values, setValues)("tipodevehiculo")}
            value={values.tipodevehiculo}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.dMarcaPid}
            label="Marca"
            onChange={handleChange(values, setValues)("marca")}
            type="search"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            label="A??o"
            value={values.ano}
            onChange={handleChange(values, setValues)("ano")}
            type="search"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.placa}
            label="Placa"
            onChange={handleChange(values, setValues)("placa")}
            type="search"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.ciudadVenta}
            label="Ciudad Venta"
            onChange={handleChange(values, setValues)("ciudadVenta")}
            type="search"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.kms}
            label="KMS"
            onChange={handleChange(values, setValues)("kms")}
            type="search"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.precio}
            label="Precio"
            onChange={handleChange(values, setValues)("precio")}
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.color}
            label="Color"
            onChange={handleChange(values, setValues)("color")}
            type="search"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.usuario}
            label="Usuario"
            onChange={handleChange(values, setValues)("usuario")}
            type="search"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.plan}
            label="Plan"
            onChange={handleChange(values, setValues)("plan")}
            type="search"
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" component="div" gutterBottom>
            Aprobada
          </Typography>
          <Checkbox checked={aprobada} onChange={handleChangeAprobada} />
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" component="div" gutterBottom>
            Pagada
          </Typography>
          <Checkbox checked={pagada} onChange={handleChangePagada} />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.tipousuario}
            label="Tipo Usuario"
            onChange={handleChange(values, setValues)("tipousuario")}
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.tipoplan}
            label="Tipo Plan"
            onChange={handleChange(values, setValues)("tipoplan")}
            type="number"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-search"
            value={values.calificacion}
            label="Calificacion"
            onChange={handleChange(values, setValues)("calificacion")}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="success" onClick={onSubmit}>
            Publicar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="error" onClick={clear}>
            Limpiar
          </Button>
        </Grid>
      </Grid>
      {message !== "" ? (
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      ) : null}
    </div>
  );
}

export default App;
