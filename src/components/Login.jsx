import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../firebase/firebaseConfig";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  max-width: 800px;
  width: 30%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PromoOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  text-align: left;
`;

const PromoLogo = styled.img`
  width: 100px;
  margin-bottom: 10px;
`;

const PromoTitle = styled.h2`
  font-size: 14px;
  margin-bottom: 5px;
`;

const PromoSubtitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PromoText = styled.p`
  font-size: 14px;
`;

const LoginContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const AccountTypeSelector = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const AccountTypeButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background-color: ${(props) => (props.active ? "#2196f3" : "#f2f2f2")};
  color: ${(props) => (props.active ? "white" : "inherit")};
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #4a4a4a;
`;

const InputGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const CountryCode = styled.select`
  width: 80px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const MobileInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const ContinueButton = styled.button`
  padding: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Divider = styled.div`
  text-align: center;
  margin: 20px 0;
  color: #4a4a4a;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
    background-color: #e0e0e0;
    z-index: 0;
  }

  span {
    display: inline-block;
    padding: 0 10px;
    background-color: white;
    position: relative;
    z-index: 1;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SocialButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-size: cover;
  background-image: ${(props) => `url(${props.icon})`};
`;

const Terms = styled.p`
  font-size: 12px;
  color: #4a4a4a;
  text-align: center;

  a {
    color: #2196f3;
    text-decoration: none;
  }
`;

const GoogleButton = styled(SocialButton)`
  background-image: url("https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png");
`;

export default function Modal({ isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(user));
          } else {
            setUser(null);
            // Remove user data from local storage on sign out
            localStorage.removeItem('user');
          }

          
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(result.user));
      console.log(result.user);
      setError(null);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      // Remove user data from local storage
      localStorage.removeItem('user');
      setError(null);
    } catch (error) {
      console.error("Error signing out: ", error);
      setError("Failed to sign out. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>

        <LoginContainer>
          <AccountTypeSelector>
            <AccountTypeButton active>PERSONAL ACCOUNT</AccountTypeButton>
          </AccountTypeSelector>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {user ? (
            <div>
              <h2>Welcome, {user.displayName}!</h2>
              <p>Email: {user.email}</p>
              <ContinueButton onClick={handleSignOut}>Sign Out</ContinueButton>
            </div>
          ) : (
            <>
              <Form>
                <Label htmlFor="mobile-number">Mobile Number</Label>
                <InputGroup>
                  <CountryCode>
                    <option value="+91">🇮🇳 +91</option>
                  </CountryCode>
                  <MobileInput
                    type="tel"
                    id="mobile-number"
                    placeholder="Enter Mobile Number"
                  />
                </InputGroup>
                <ContinueButton type="submit">CONTINUE</ContinueButton>
              </Form>
              <Divider>
                <span>Or Login/Signup With</span>
              </Divider>
              <SocialLogin>
                <GoogleButton onClick={handleGoogleSignIn} />
                <SocialButton icon="https://e7.pngegg.com/pngimages/298/243/png-clipart-email-address-computer-icons-mail-miscellaneous-angle.png" />
              </SocialLogin>
              <Terms>
                By proceeding, you agree to MakeMyTrip's
                <a href="#privacy">Privacy Policy</a>,{" "}
                <a href="#user-agreement">User Agreement</a> and{" "}
                <a href="#t-and-c">T&Cs</a>
              </Terms>
            </>
          )}
        </LoginContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;
