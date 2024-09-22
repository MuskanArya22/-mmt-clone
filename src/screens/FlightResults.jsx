import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/Header";

// Styled components

const MainContainer = styled.div`
  background-image: linear-gradient(0deg, #15457b, #051423);
  height: 40vh; // Adjust the height as needed
`;
const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  background-color: white;
  border-radius: 10px;
`;

const FiltersAndResultsContainer = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const FiltersContainer = styled.div`
  width: 250px;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 1rem;
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 0.2rem;
  color: #6b7280;
  font-weight: bold;
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #2563eb;
  }
`;

const FlightGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const InputsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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

const Dropdown = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const SearchButton = styled.button`
  margin-left: 0.5rem;
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #60a5fa;
  }
`;

const FlightCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const AirlineInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AirlineLogo = styled.img`
  width: 50px;
  height: auto;
  margin-right: 1rem;
`;

const FlightDetails = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const FlightPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #e91e63;
`;

const MealType = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
`;

const FlightTiming = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: bold;
  margin: 0;
`;

const FlightDuration = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

const FilterSelect = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const FilterRange = styled.input`
  width: 100%;
`;

const FlightResults = () => {
  const location = useLocation();
  const [from, setFrom] = useState(location.state?.from || "");
  const [to, setTo] = useState(location.state?.to || "");
  const [departureDate, setDepartureDate] = useState(location.state?.departureDate || "");
  const [travellers, setTravellers] = useState(location.state?.travellers || 1);
  const [mealFilter, setMealFilter] = useState("All");
  const [priceRange, setPriceRange] = useState(5000);
  const [durationFilter, setDurationFilter] = useState(12);
  const [airlineFilter, setAirlineFilter] = useState("All");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target)) {
        setFromDropdownOpen(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target)) {
        setToDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const airlines = [
    { name: "IndiGo", logo: "https://logos-world.net/wp-content/uploads/2023/01/IndiGo-Logo.png" },
    
  ];
  const mealTypes = ["All", "Free Meal", "No Meal", "Vegetarian Meal", "Non-Vegetarian Meal"];
   const airlineOptions = ["All", 
    "Cathay Pacific", 
    "Emirates", 
    "Qatar Airways",
    "Singapore Airlines", 
    "Air India", 
    "IndiGo", 
    "SpiceJet", 
    "Vistara", 
    "GoAir", 
    "AirAsia India",
    "Alliance Air", 
    "Star Air", 
    "TruJet", 
    "Air Odisha",  
    "Air Costa", 
    "Air Deccan", 
    "Air India Express", 
    "Air India Regional", 
    "Air Pegasus"];
  
  const flightOptions = [
    "Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai", "Hyderabad",
    "Ahmedabad", "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur",
    "Nagpur", "Visakhapatnam", "Coimbatore", "Patna", "Indore",
    "Thane", "Bhopal", "Chandigarh", "Vadodara", "Guwahati", 
    "Nashik", "Agra", "Rajkot", "Mysuru", "Vijayawada", 
    "Faridabad", "Meerut", "Aurangabad", "New York", "Los Angeles", "Chicago", "Houston", "Miami"
  ];

  const flights = Array.from({ length: 20 }, (_, index) => {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const meal = mealTypes[Math.floor(Math.random() * mealTypes.length)];
    const duration = Math.floor(Math.random() * 12) + 1;

    return {
      id: index + 1,
      from,
      to,
      date: departureDate || new Date('2024-09-22'),
      price: Math.random() * 5000 + 1000,
      duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
      timing: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} - ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      airline: airline.name,
      meal,
      logo: airline.logo,
    };
  });

  const applyFilters = () => {
    const filtered = flights.filter(flight => {
      return (mealFilter === "All" || flight.meal === mealFilter) &&
             (airlineFilter === "All" || flight.airline === airlineFilter) &&
             flight.price <= priceRange &&
             parseInt(flight.duration.split('h')[0]) <= durationFilter;
    });
    setFilteredFlights(filtered);
  };

  const handleSearch = () => {
    console.log("Search initiated for:", { from, to, departureDate, travellers });
    applyFilters();
  };

  return (
    <>
    <MainContainer>
    <Header/>

    
    <ResultsContainer>
      <InputsContainer>
        <InputGroup ref={fromDropdownRef}>
          <FilterLabel>From</FilterLabel>
          <StyledInput
            type="text"
            value={from}
            placeholder="Enter departure city"
            onClick={() => {
              setFromDropdownOpen(!fromDropdownOpen);
              setToDropdownOpen(false);
            }}
            onChange={(e) => {
              setSearchFrom(e.target.value);
              setFrom(e.target.value);
            }}
          />
          {fromDropdownOpen && (
            <Dropdown>
              <StyledInput
                type="text"
                placeholder="Search..."
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
              />
              {flightOptions.filter(option => option.toLowerCase().includes(searchFrom.toLowerCase())).map((option) => (
                <DropdownItem key={option} onClick={() => {
                  setFrom(option);
                  setSearchFrom(option);
                  setFromDropdownOpen(false);
                }}>
                  {option}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </InputGroup>

        <InputGroup ref={toDropdownRef}>
          <FilterLabel>To</FilterLabel>
          <StyledInput
            type="text"
            value={to}
            placeholder="Enter destination city"
            onClick={() => {
              setToDropdownOpen(!toDropdownOpen);
              setFromDropdownOpen(false);
            }}
            onChange={(e) => {
              setSearchTo(e.target.value);
              setTo(e.target.value);
            }}
          />
          {toDropdownOpen && (
            <Dropdown>
              <StyledInput
                type="text"
                placeholder="Search..."
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
              />
              {flightOptions.filter(option => option.toLowerCase().includes(searchTo.toLowerCase())).map((option) => (
                <DropdownItem key={option} onClick={() => {
                  setTo(option);
                  setSearchTo(option);
                  setToDropdownOpen(false);
                }}>
                  {option}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </InputGroup>

        <InputGroup>
          <FilterLabel>Departure Date</FilterLabel>
          <DatePicker
            selected={departureDate ? new Date(departureDate) : null}
            onChange={(date) => setDepartureDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select date"
          />
        </InputGroup>

        <InputGroup>
          <FilterLabel>Travelers</FilterLabel>
          <StyledInput
            type="number"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            min="1"
            placeholder="Number of travelers"
          />
        </InputGroup>

        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </InputsContainer>

      <FiltersAndResultsContainer>
        <FiltersContainer>
          <FilterLabel>Meal Type</FilterLabel>
          <FilterSelect value={mealFilter} onChange={(e) => setMealFilter(e.target.value)}>
            {mealTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </FilterSelect>

          <FilterLabel>Airline</FilterLabel>
          <FilterSelect value={airlineFilter} onChange={(e) => setAirlineFilter(e.target.value)}>
            {airlineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>

          <FilterLabel>Price Range</FilterLabel>
          <FilterRange
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
          <div>Max Price: {priceRange}</div>

          <FilterLabel>Duration (hours)</FilterLabel>
          <FilterRange
            type="range"
            min="1"
            max="12"
            step="1"
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
          />
          <div>Max Duration: {durationFilter} hours</div>

          <ApplyButton onClick={applyFilters}>Apply Filters</ApplyButton>
        </FiltersContainer>

        <FlightGrid>
      {filteredFlights.length > 0 ? (
        filteredFlights.map(flight => (
          <FlightCard key={flight.id}>
            <AirlineInfo>
              <AirlineLogo src={flight.logo} alt={flight.airline} />
              <FlightDetails>
                <p><strong>{flight.airline}</strong></p>
                <p>{flight.from} to {flight.to}</p>
                <FlightTiming>{flight.timing}</FlightTiming>
                <FlightDuration>Duration: {flight.duration}</FlightDuration>
                <p>{flight.date instanceof Date ? flight.date.toLocaleDateString() : flight.date}</p>
                <MealType>{flight.meal}</MealType>
              </FlightDetails>
            </AirlineInfo>
            <div style={{ textAlign: 'right' }}>
              <FlightPrice>₹{flight.price.toFixed(2)}</FlightPrice>
              <SearchButton>BOOK</SearchButton>
            </div>
          </FlightCard>
        ))
      ) : (
        <div>No flights found.</div>
      )}
    </FlightGrid>
      </FiltersAndResultsContainer>
    </ResultsContainer>
    </MainContainer>
    </>
  );
};

export default FlightResults;
