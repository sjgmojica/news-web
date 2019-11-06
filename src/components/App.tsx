import React , { useState, useEffect } from 'react';
import './styles/App.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Business, Videocam, ImportantDevices } from '@material-ui/icons';
import TableComponent from './TableComponent';
import Fade from '@material-ui/core/Fade';
// import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));


const App: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const pageSize = 20;

  const fetchMore = (category : string) => {
    setPage(page + 1);
    setCategory(category);
  };

  useEffect(() => {
    setLoading(true);

    fetch(
      `http://localhost:3000/api/news/sources?category=${category}&page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setError(response.error);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false)
      });
  }, [category, page]);

  function handleClose() {
    setOpen(false);
  }

  return (
    
    <div className="App">
  
        <div className={classes.root}>

        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar />
        </AppBar>
        
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
            <List>
              <ListItem button key={"business"}>
                <ListItemAvatar>
                  <Avatar>
                    <Business />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Business" secondary="News Source 1" onClick={() => fetchMore('business')}/>
              </ListItem>
              <Divider />
              <ListItem  button key={"technology"}>
                <ListItemAvatar>
                  <Avatar>
                    <ImportantDevices />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Technology" secondary="News Source 2" onClick={() => fetchMore('technology')}/>
              </ListItem>
              <Divider />
              <ListItem button key={"entertainment"}>
                <ListItemAvatar>
                  <Avatar>
                    <Videocam />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Entertainment" secondary="News Source 3" onClick={(e) => fetchMore('entertainment')}/>
              </ListItem>
              <Divider />
          </List>
        </Drawer>
        { error ? 
        <Snackbar
          open={true}
          onClose={handleClose}
          autoHideDuration={3000}
          TransitionComponent={Fade}
          message={<span id="message-id">Something went wrong....</span>}
        />: 
            data && data.length > 1 ? <TableComponent data={data}/> : error ? <div> error ... </div> : null
        }
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    </div>
  )
  
}

export default App;
