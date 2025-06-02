import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import useAuthHandlers from "../../Hooks/useAuthHandlers";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AuthDialog = ({ open, onClose, tabValue, setTabValue, baseUrl  }) => {
  const {
    userEmail,
    setUserEmail,
    password,
    setPassword,
    name,
    setName,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    loginError,
    handleGoogleSuccess,
    registerUser,
    loginUser,
    showPasswordForm,
    showSuccess,
    setShowSuccess,
    resetForm

  } = useAuthHandlers(baseUrl, () => {
  resetForm();
  onClose();
});



  return (
  <>
    <Dialog open={open} onClose={() => { onClose(); resetForm(); }}>
      <DialogTitle>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
      </DialogTitle>

      <DialogContent>
        {tabValue === 0 && (
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            {loginError && (
              <Typography color="error" sx={{ mt: 1 }}>
                {loginError}
              </Typography>
            )}
            <Button
              disabled={!loginEmail || !loginPassword}
              onClick={loginUser}
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          </Box>
        )}

        {tabValue === 1 && (
          <GoogleOAuthProvider clientId="104286559625-k9il200evklp8scjsc3feugnd9i5t3ag.apps.googleusercontent.com">
            <Box component="form" sx={{ mt: 2 }}>
              {!showPasswordForm ? (
                <>
                  <TextField
                    margin="dense"
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                  />
                  <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                     {loginError && (
              <Typography color="error" sx={{ mt: 1 }}>
                {loginError}
              </Typography>
            )}
                  <Button
                    disabled={!userEmail || !password || !name }
                    onClick={()=>registerUser( {userEmail, password, name} )}
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Divider sx={{ my: 2 }}>or</Divider>
                  <GoogleLogin
                    onSuccess={(credentialResponse)=>handleGoogleSuccess(credentialResponse)}
                    onError={() => {
                      console.log("فشل تسجيل الدخول من Google");
                    }}
                  />
                </>

              ) : (
              <>
                  <TextField
                    margin="dense"
                    label="Enter a password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                     {loginError && (
              <Typography color="error" sx={{ mt: 1 }} fullWidth>
                {loginError}
              </Typography>
            )}
                  <Button
                    disabled={!password}
                    onClick={()=>registerUser( {userEmail, password, name} )}
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </GoogleOAuthProvider>
        )}
      </DialogContent>

    </Dialog>
    
    <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: "100%" }}>
          تم التسجيل بنجاح!
        </Alert>
      </Snackbar>
    </>

  
  );
};

   
export default AuthDialog;
