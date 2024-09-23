import React, { useState } from "react";
import styled from "styled-components";
import { Plane, Bus, Repeat } from "lucide-react";
import Header from "../components/HeaderMain";
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  margin: 0 auto;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 75%;
`;

const IconsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem auto;
    width: fit-content;
    border: 1px solid #d1d5db;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    padding: 0.5rem;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  justify-content: center;
`;

const StyledIconButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.$active ? "#3B82F6" : "#6B7280")};
  background: none;
  border: none;
  cursor: pointer;
`;

const IconText = styled.span`
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const TripTypeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  justify-content: center;
`;

const StyledRadioButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const RadioCircle = styled.div`
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.$checked ? "#3B82F6" : "#D1D5DB")};
  background-color: ${(props) => (props.$checked ? "#3B82F6" : "transparent")};
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.1fr 2fr 1fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputLabel = styled.label`
  font-size: 0.75rem;
  color: #6b7280;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #d1d5db;
  padding: 0.25rem 0;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  &:focus {
    outline: none;
    border-bottom-color: #3b82f6;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
`;

const CircleBetween = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FareTypeDescription = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const SearchButton = styled.button`
  background-image: linear-gradient(90deg, #3b82f6, #60a5fa);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  font-weight: bold;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  width: auto;
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7);
  }
`;

const TripContainer = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  width: 85%;
  margin: 0 auto;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
`;

const HomePage = () => {
  const [transportType, setTransportType] = useState("flights");
  const [tripType, setTripType] = useState("oneWay");
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Bengaluru");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState("1 Adult");
  const [busOperator, setBusOperator] = useState(""); 
  const navigate = useNavigate();
  
  const popularCities = [
    "Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai",
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Surat",
    "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Coimbatore",
    "Patna", "Indore", "Thane", "Bhopal", "Chandigarh",
    "Vadodara", "Guwahati", "Nashik", "Agra", "Rajkot",
    "Mysuru", "Vijayawada", "Faridabad", "Meerut", "Aurangabad",
  ];

  const busOperators = [
    "RedBus", "Intercity Express", "SRS Travels", "VRL Travels",
    "Orange Tours", "KPN Travels", "Neeta Travels", "Sai Travels",
    "KSRTC", "SETC", "VRL Logistics", "Gujarat Travels",
    "Himachal Road Transport", "Yamuna Travels", "Laxmi Travels",
    "Sharma Travels",
  ];

  const handleSearch = () => {
    const searchParams = { from, to, departureDate, travellers };
    if (transportType === "buses") {
      searchParams.busOperator = busOperator; 
    }
    navigate(transportType === "flights" ? "/results" : "/bus-results", {
      state: searchParams,
    });
  };

  return (
    <>
      <Header />
      <Container>
        <BackgroundImage>
          <img
            src="https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg4.jpg"
            alt="Description of image"
          />
        </BackgroundImage>
        <TripContainer>
          <IconsContainer>
            <IconGroup>
              <IconButton
                icon={<Plane size={24} />}
                text="Flights"
                active={transportType === "flights"}
                onClick={() => setTransportType("flights")}
              />
              <IconButton
                icon={<Bus size={24} />}
                text="Buses"
                active={transportType === "buses"}
                onClick={() => setTransportType("buses")}
              />
            </IconGroup>
          </IconsContainer>

          {transportType === "flights" && (
            <TripTypeContainer>
              <RadioButton
                label="One Way"
                checked={tripType === "oneWay"}
                onChange={() => setTripType("oneWay")}
              />
              <RadioButton
                label="Round Trip"
                checked={tripType === "roundTrip"}
                onChange={() => setTripType("roundTrip")}
              />
            </TripTypeContainer>
          )}

          <InputsContainer>
            <InputWithDropdown
              label="From"
              value={from}
              onChange={setFrom}
              options={popularCities}
            />

            <CircleBetween onClick={() => {
              const temp = from;
              setFrom(to);
              setTo(temp);
            }}>
              <Repeat size={16} />
            </CircleBetween>

            <InputWithDropdown
              label="To"
              value={to}
              onChange={setTo}
              options={popularCities}
            />

            <InputGroup>
              <InputLabel>Departure</InputLabel>
              <StyledInput
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </InputGroup>

            {transportType === "flights" && tripType === "roundTrip" && (
              <InputGroup>
                <InputLabel>Return</InputLabel>
                <StyledInput
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departureDate}
                />
              </InputGroup>
            )}

            {transportType === "flights" ? (
              <InputGroup>
                <InputLabel>Travellers</InputLabel>
                <StyledSelect
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                >
                  <option value="1 Adult">1 Adult</option>
                  <option value="2 Adults">2 Adults</option>
                  <option value="3 Adults">3 Adults</option>
                  <option value="4 Adults">4 Adults</option>
                  <option value="5 Adults">5 Adults</option>
                  <option value="6 Adults">6 Adults</option>
                </StyledSelect>
              </InputGroup>
            ) : (
              <InputGroup>
                <InputLabel>Bus Operator</InputLabel>
                <StyledSelect
                  value={busOperator} 
                  onChange={(e) => setBusOperator(e.target.value)}
                >
                  {busOperators.map((operator) => (
                    <option key={operator} value={operator}>
                      {operator}
                    </option>
                  ))}
                </StyledSelect>
              </InputGroup>
            )}
          </InputsContainer>

          <FareTypeDescription>
            {transportType === "flights"
              ? "Book Regular Flights for extra flexibility"
              : "Choose from a wide range of bus types"}
          </FareTypeDescription>
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </TripContainer>
      </Container>
    </>
  );
};

const RadioButton = ({ label, checked, onChange }) => (
  <StyledRadioButton onClick={onChange}>
    <RadioCircle $checked={checked} />
    {label}
  </StyledRadioButton>
);

const IconButton = ({ icon, text, active, onClick }) => (
  <StyledIconButton $active={active} onClick={onClick}>
    {icon}
    <IconText>{text}</IconText>
  </StyledIconButton>
);

const InputWithDropdown = ({ label, value, onChange, options }) => (
  <InputGroup>
    <InputLabel>{label}</InputLabel>
    <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyledSelect>
  </InputGroup>
);

export default HomePage;
