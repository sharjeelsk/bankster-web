import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, Persister } from './components/redux/Store'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react'
import ReactGA from 'react-ga';
import { StrictMode } from 'react';
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff3d8b",
    },
    secondary: {
      main: "#fc0303",
    },
    tertiary: {
      main: "#ccc"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none'
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none'
          }
        }
      }
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none'
          }
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none'
          }
        }
      }
    }
  }
});

ReactGA.initialize('G-7LB14FK7SE');
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persister}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
