import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/Header";
import axios from 'axios'; // Import axios



// Styled components (unchanged)

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

const BusGrid = styled.div`
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

const BusCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OperatorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const OperatorLogo = styled.img`
  width: 50px;
  height: auto;
  margin-right: 1rem;
`;

const BusDetails = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const BusPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #e91e63;
`;

const BusTiming = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: bold;
  margin: 0;
`;

const BusDuration = styled.p`
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

const BusResults = () => {
  const location = useLocation();
  const [from, setFrom] = useState(location.state?.from || "");
  const [to, setTo] = useState(location.state?.to || "");
  const [departureDate, setDepartureDate] = useState(
    location.state?.departureDate ? new Date(location.state.departureDate) : null
  );
  const [travellers, setTravellers] = useState(location.state?.travellers || 1);
  const [busOperatorFilter, setBusOperatorFilter] = useState("All");
  const [priceRange, setPriceRange] = useState(2000);
  const [durationFilter, setDurationFilter] = useState(12);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

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

  const busOperators = [
    { name: "RedBus", logo: "https://shorturl.at/neIFG" },
    { name: "Intercity Express", logo: "https://shorturl.at/vArRJ" },
    { name: "Greyhound", logo: "https://shorturl.at/nYcEa" },
    { name: "FlixBus", logo: "https://shorturl.at/H7Rz9" },
    { name: "Megabus", logo: "https://shorturl.at/IjesR" },
    { name: "National Express", logo: "https://rb.gy/nslqex" },
    { name: "Stagecoach", logo: "https://rb.gy/coys95" },
    { name: "Go Bus", logo: "https://rb.gy/q11yoq" },
  ];

  const busOperatorOptions = ["All", ...busOperators.map(operator => operator.name)];

  const cityOptions = [
    "Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai", "Hyderabad",
    "Ahmedabad", "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur",
    "Nagpur", "Visakhapatnam", "Coimbatore", "Patna", "Indore",
    "Thane", "Bhopal", "Chandigarh", "Vadodara", "Guwahati", 
    "Nashik", "Agra", "Rajkot", "Mysuru", "Vijayawada", 
    "Faridabad", "Meerut", "Aurangabad", "New York", "Los Angeles", "Chicago", "Houston", "Miami"
  ];

  const buses = Array.from({ length: 20 }, (_, index) => {
    const operator = busOperators[Math.floor(Math.random() * busOperators.length)];
    const duration = Math.floor(Math.random() * 12) + 1;

    return {
      id: index + 1,
      from,
      to,
      date: departureDate || new Date('2024-09-22'),
      price: Math.random() * 2000 + 500,
      duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
      timing: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} - ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      operator: operator.name,
      logo: operator.logo,
      type: ["AC Sleeper", "Non-AC Sleeper", "AC Seater", "Non-AC Seater"][Math.floor(Math.random() * 4)],
      availableSeats: Math.floor(Math.random() * 30) + 1,
    };
  });

  const applyFilters = () => {
    const filtered = buses.filter(bus => {
      return (busOperatorFilter === "All" || bus.operator === busOperatorFilter) &&
             bus.price <= priceRange &&
             parseInt(bus.duration.split('h')[0]) <= durationFilter;
    });
    setFilteredBuses(filtered);
  };

  const handleSearch = () => {
    console.log("Search initiated for:", { from, to, departureDate, travellers });
    applyFilters();
  };

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return date;
  };

  const handleBooking = async (bus) => {
    console.log("Booking function called for bus:", bus);
    
    const storedUser = localStorage.getItem('user');
    console.log("Stored user data:", storedUser);
    
    const user = storedUser ? JSON.parse(storedUser) : null;
    console.log("Parsed user data:", user);
    
    const bookingDetails = {
      operatorName: bus.operator,
      placeOfDeparture: bus.from,
      placeOfArrival: bus.to,
      DateOfDeparture: bus.date instanceof Date ? bus.date.toLocaleDateString() : bus.date,
      timing: bus.timing,
      userEmail: user ? user.email : 'Guest',
      userName: user ? user.displayName : 'Guest',
      ticketID: Math.floor(Math.random() * 1000000),
    };
  
    console.log("Booking details:", bookingDetails);
  
    try {
      console.log("Sending POST request to API");
      const response = await axios.post("http://localhost:3000/api/send-emailsignup", bookingDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("API Response:", response);
      console.log("Booking successful:", response.data);
      alert("Booking successful! Check your email for confirmation.");
    } catch (error) {
      console.error("Error during booking:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      alert("An error occurred during booking. Please try again.");
    }
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
              {cityOptions.filter(option => option.toLowerCase().includes(searchFrom.toLowerCase())).map((option) => (
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
              {cityOptions.filter(option => option.toLowerCase().includes(searchTo.toLowerCase())).map((option) => (
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
            selected={departureDate}
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
          <FilterLabel>Bus Operator</FilterLabel>
          <FilterSelect value={busOperatorFilter} onChange={(e) => setBusOperatorFilter(e.target.value)}>
            {busOperatorOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>

          <FilterLabel>Price Range</FilterLabel>
          <FilterRange
            type="range"
            min="500"
            max="5000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
          <div>Max Price: ₹{priceRange}</div>

          <FilterLabel>Duration (hours)</FilterLabel>
          <FilterRange
            type="range"
            min="1"
            max="24"
            step="1"
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
          />
          <div>Max Duration: {durationFilter} hours</div>

          <ApplyButton onClick={applyFilters}>Apply Filters</ApplyButton>
        </FiltersContainer>

        <BusGrid>
            {filteredBuses.length > 0 ? (
              filteredBuses.map(bus => (
                <BusCard key={bus.id}>
                  <OperatorInfo>
                    <OperatorLogo src={bus.logo} alt={bus.operator} />
                    <BusDetails>
                      <p><strong>{bus.operator}</strong></p>
                      <p>{bus.from} to {bus.to}</p>
                      <BusTiming>{bus.timing}</BusTiming>
                      <BusDuration>Duration: {bus.duration}</BusDuration>
                      <p>{formatDate(bus.date)}</p>
                      <p>{bus.type}</p>
                    </BusDetails>
                  </OperatorInfo>
                  <div style={{ textAlign: 'right' }}>
                    <BusPrice>₹{bus.price.toFixed(2)}</BusPrice>
                    <p>Available Seats: {bus.availableSeats}</p>
                    <SearchButton
                        onClick={() => {
                          const storedUser = localStorage.getItem('user');
                          const user = storedUser ? JSON.parse(storedUser) : null;
                          if (!user) {
                            alert("Login to book ticket");
                          } else {
                            handleBooking(bus);
                          }
                        }}
                      >
                        BOOK
                      </SearchButton>
                  </div>
                </BusCard>
              ))
            ) : (
              <div>No buses found.</div>
            )}
          </BusGrid>
      </FiltersAndResultsContainer>
    </ResultsContainer>
    </MainContainer>
    </>
  );
};

export default BusResults;