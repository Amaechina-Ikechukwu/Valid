import { useRouter, useSegments, SplashScreen } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { CustomView } from "../components/Themed";
import { useLayoutEffect } from "react";
import { GetUserUUID } from "../apis/Facebook/GetUserUUID";
import { IsUserRegistered } from "../apis/Instagram/IsUserRegistered";
import { GetUsersFacebookProfile } from "../apis/Facebook/GetUsersFacebookProfile";
import supabase from "../supabase";
interface AuthContextType {
  signIn: (uid: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: string | null;
  userid: string | null;
  uuid: string | null;
  userFacebookInformation: any | null;
  getUserFacebookInformation?: () => Promise<void>;
  checkIfInstagramIsConnected?: () => Promise<any>;
  getInstagramInfo?: (userid: string | null) => Promise<any>;
  confirmedPages?: boolean | null;
}

SplashScreen.preventAutoHideAsync();
const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<string | null>(null);
  const [userid, setUserId] = useState<string | null>(null);
  const [uuid, setUUID] = useState<string | null>(null);
  const [userFacebookInformation, setUserFacebookInformation] = useState(null);
  const [isReady, setReady] = useState(false);
  const router = useRouter();
  const getUserUUID = async () => {
    const uuid = await GetUserUUID(user);
    setUUID(uuid);
  };
  const checkIfInstagramIsConnected = async () => {
    const result = await IsUserRegistered(user);

    if (result.data == null || result.data == "") {
      router.push("/instagrampages/listofpages");
      return false;
    } else {
      return true;
    }
  };
  const getUsersfacebookProfile = async () => {
    const responseData = await GetUsersFacebookProfile(user);
    setUserFacebookInformation(responseData);
  };
  const getInstagramInfo = async (userid: string | null) => {
    let { data: logindetails, error } = await supabase
      .from("logindetails")
      .select("instagramid,ig_token")
      .eq("uuid", userid);
    if (error) {
      throw new Error(error.message);
    } else {

      return logindetails?.[0];
    }
  };
  const userHasPage = async () => {
    try {
      let { data: pages, error } = await supabase.from("pages").select("*");
      if (error) {
        throw new Error(error.message);
      } else {
        if (pages?.length == 0) {
          router.push("/pageconfirmation/listofpages");
        }
      }
    } catch { }
  };
  const checkUser = async () => {
    SplashScreen.preventAutoHideAsync();
    await SecureStore.getItemAsync("userUID").then(async (uid) => {
      if (uid) {
        setUser(uid);
        setReady(true);
        router.push("/(tabs)");
        SplashScreen.hideAsync();
      } else {
        router.push("/auth/sign-in");
        SplashScreen.hideAsync();
      }
    });
  };
  useLayoutEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    checkUser();
    getUserUUID();
    getUsersfacebookProfile();
    userHasPage();
  }, [user]);
  // useEffect(() => {
  //   userHasPage();
  // }, []);
  const signIn = async (uid: string): Promise<void> => {
    await SecureStore.setItemAsync("userUID", uid);
    setUser(uid);
  };

  const signOut = async (): Promise<void> => {
    await SecureStore.deleteItemAsync("userUID");
    setUser(null);
    setUserId(null);
    setUserFacebookInformation(null);
    router.push("/auth/sign-in");
  };

  // useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        userid,
        userFacebookInformation,
        checkIfInstagramIsConnected,
        getInstagramInfo,
        uuid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
