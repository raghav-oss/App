import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  
} from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';


const FormComponent = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    articleCode: '',
    color: '',
    size: '',
    quantity: '',
  });
  const [submittedData, setSubmittedData] = useState([]);
  const handleChange = (e, value) => {
    setFormData({
      ...formData,
      [e.target.name]: value || e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/submitFormData',
        {
          ...formData,
          name: formData.fullName, 
        }
      );
      fetchSubmittedData();
      alert('Submitted Succesfuly');
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fetchSubmittedData');
      setSubmittedData(response.data.submittedData)

    } catch (err) {
      console.error('Error Fetching Data', err)
    }
  };
  useEffect(() => {
    fetchSubmittedData();
  }, []);

 
  const columns = [
    { field: 'Id', headerName: 'ID', minWidth:120},
    { field: 'Name', headerName: 'Name', minWidth:120},
    { field: 'ArticleCode', headerName: 'Article Code', minWidth:147 },
    { field: 'Color', headerName: 'Color', minWidth:120},
    { field: 'Size', headerName: 'Size', minWidth:100 },
    { field: 'Quantity', headerName: 'Quantity', minWidth:122 },
    

    
  ];
 
  const getRowId = (row) => row.Id; 
  

  return (
    <Container maxWidth="md" mt={5}>
      <Typography variant="h4" align="center" mb={3}>
        Book Your Order
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange(e, null)} 
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Article Code"
                  variant="outlined"
                  name="articleCode"
                  value={formData.articleCode}
                  onChange={(e) => handleChange(e, null)} 
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Color"
                  variant="outlined"
                  name="color"
                  value={formData.color}
                  onChange={(e) => handleChange(e, null)} 
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Size"
                  variant="outlined"
                  name="size"
                  value={formData.size}
                  onChange={(e) => handleChange(e, null)} 
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={(e) => handleChange(e, null)} 
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <br />
     

      {submittedData.length > 0 && (
        <div id='table' style={{ height: 400, width: '100%' }}>
          <DataGrid rows={submittedData} columns={columns}  checkboxSelection  getRowId={getRowId} />
        </div>
      )}


    </Container >
  );
};

export default FormComponent;
