import React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../../contexts/AuthContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          EcoTokenize
        </Typography>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/marketplace" passHref>
          <Button color="inherit">Marketplace</Button>
        </Link>
        <ConnectButton />
        {/* {user ? (
          <>
            <Link href="/profile" passHref>
              <Button color="inherit">Profile</Button>
            </Link>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Link href="/auth/login" passHref>
            <Button color="inherit">Login</Button>
          </Link>
        )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
