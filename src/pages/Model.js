// material
import { Box, Grid, Container, Typography, Card, CardContent } from '@mui/material';

import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import CircleIcon from '@mui/icons-material/Circle';
import { red, green } from '@mui/material/colors';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

import { properties } from '../properties'

const API_URL_BASE = properties.apiUrl;

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [state, setState] = React.useState({});
  const [trainedModels, setTrainedModels] = React.useState([]);
  const [latestModel, setLatestModel] = React.useState([]);
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const [openDeleteModelSuccessAlert, setOpenDeleteModelSuccessAlert] = React.useState(false);
  const [openDeleteModelFailAlert, setOpenDeleteModelFailAlert] = React.useState(false);
  const [selectedModelDelete, setselectedModelDelete] = React.useState("");
  // const [selectedModelDownload, setselectedModelDownload] = React.useState("");
  const [openDownloadModelFailAlert, setOpenDownloadModelFailAlert] = React.useState(false);

  useEffect(() => {
      getModels();
      return () => {
        setState({});
      };
    }, [])

    const handleClickOpenDeleteModel = () => {
      setOpenDeleteModel(true);
    };

    const handleCloseDeleteModel = () => {
      setOpenDeleteModel(false);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenDeleteModelSuccessAlert(false);
      setOpenDeleteModelFailAlert(false);
      setOpenDownloadModelFailAlert(false);
    };

    const getModels = () => {
      axios.get(`${API_URL_BASE}/config/update`, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          setTrainedModels(res.data["Model List"]);
        });

      axios.get(`${API_URL_BASE}/model/latest`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        setLatestModel(res.data["Latest Model"]);
      });
    }

    const deleteModel = (e, name) => { 
      e.preventDefault();

      handleCloseDeleteModel();
      
      axios.delete(`${API_URL_BASE}/model/${name}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        setOpenDeleteModelSuccessAlert(true);
        getModels();
        console.log("Model deleted successfully")
        console.log(res)
        console.log(res.data["Model List"]);
      }).catch(err => {
        setOpenDeleteModelFailAlert(true);
        console.log("Error deleting model")
      }); 
    }

    const downloadModel = (e, name) => { 
      e.preventDefault();

      console.log(name);
      
      axios.get(`${API_URL_BASE}/download/${name}`, {
        responseType: 'blob'
      }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${name}`);
        document.body.appendChild(link);
        link.click();
      }).catch(err => {
        setOpenDownloadModelFailAlert(true);
      }); 
    }

  return (
    <div>
  {/* <Page title="Model | Minimal-UI"> */}
      <Container maxWidth="xl">
      <Box sx={{ pb: 5 }}>
          <Typography data-testid="model-header" variant="h4">View all your trained models here!</Typography>
      </Box>
      </Container>
      <div>
          {trainedModels.map((val) => (
              <Card sx={{ minWidth: 275, marginBottom: 1 }}>
                  <CardContent style={{ display:"flex", justifyContent: "space-between" }}>
                      <Typography style={{ paddingTop: "10px" }} variant="h5" component="div" display="inline">
                          {latestModel === val ? <CircleIcon sx={{ color: green[500] }} /> : <CircleIcon sx={{ color: red[500] }} />}
                      </Typography>
                      <Typography style={{ paddingTop: "10px" }} variant="h5" component="div" display="inline" align="left">
                          {val}
                      </Typography>
                      <div style={{ display:"inline", align:"right" }}>
                        <Button
                          variant="contained"
                          onClick={ () => { handleClickOpenDeleteModel(); setselectedModelDelete(val); } }
                          className="trainBtn"
                          color="error"
                          >
                            Delete Model
                        </Button>
                        <Button
                        variant="contained"
                        onClick={ e => { downloadModel(e, val) } }
                        className="trainBtn"
                        >
                          Download Model
                        </Button>
                      </div>
                  </CardContent>
            </Card>
          ))}
      </div>
      <Snackbar open={openDeleteModelSuccessAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Model was deleted successfully!!
        </Alert>
      </Snackbar>
      <Snackbar open={openDeleteModelFailAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          ERROR: Was unable to delete model
        </Alert>
      </Snackbar>
      <Dialog
        open={openDeleteModel}
        onClose={handleCloseDeleteModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Model {selectedModelDelete}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete model {selectedModelDelete}?
            This action cannot be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModel}>Cancel</Button>
          <Button onClick={ e => { deleteModel(e,  selectedModelDelete) } } autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openDeleteModelFailAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          ERROR: Was unable to download model
        </Alert>
      </Snackbar>
  {/* </Page> */}
  </div>
  );
}
