import { Dispatch, SetStateAction } from "react";

export default function logoutUser(setAuth: Dispatch<SetStateAction<boolean>>) {
    localStorage.clear()
    setAuth(false);
};