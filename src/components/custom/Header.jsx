import React, { useEffect, useState } from "react";
import travelmate from "../../assets/travelmate-logo.png";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";


function Header() {
  const [openDialog, setOpendialog] = useState(false);
  const users = JSON.parse(localStorage.getItem('user'));

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo) => {
    if (!tokenInfo || !tokenInfo.access_token) {
      console.error("Invalid token information");
      return;
    }

    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpendialog(false);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  useEffect(() => { console.log(users) }, [])
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-10">
      <a href="/"><img src={travelmate} className="w-40" /></a>
      <div>
        {users ? <div className="flex items-center gap-3">
          <a href="/create-trip"><Button variant="outline" className="rounded-full text-lg">Create Trip</Button></a>
          <a href="/my-trips"><Button variant="outline" className="rounded-full text-lg">My Trips</Button></a>
          <Popover>
            <PopoverTrigger>
              <img src={users?.picture} className="h-[35px] w-[35px] rounded-full" />
            </PopoverTrigger>
            <PopoverContent className="w-full p-2 mt-2">
              <Button onClick={() => {
                googleLogout();
                localStorage.clear()
                window.location.reload();
              }} 
              className="text-lg"      
              >Logout</ Button>
            </PopoverContent>
          </Popover>

        </div>
          : <Button onClick={() => setOpendialog(true)}>Sign In</Button>}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img src={travelmate} className="w-40" />
            </DialogTitle>
            <DialogDescription>
              <h2 className="font-bold text-xl mt-7">Sign In With Google</h2>
              <div>Sign in to the App with Google authentication securely</div>
              <Button
                className="w-full mt-5 flex gap-4 items-center  "
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
