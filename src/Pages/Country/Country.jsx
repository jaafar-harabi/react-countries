import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Button,Card,CardHeader,CardBody,CardFooter,Typography,Select, Option } from "@material-tailwind/react";
import {Link} from 'react-router-dom'
import { Box,Pagination} from '@mui/material'
import TextField from '@mui/material/TextField'; 
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'

const apiURL = "https://restcountries.com/v3.1";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Country = ({theme}) => {


  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let [color, setColor] = useState("#ffffff");
  const [error, setError] = useState("");

  // get all countries 
  const getAllCountries = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await fetch(`${apiURL}/all`);

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();


      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error)
    }
  };

  //  search by name

  const [input, setInput] = useState("");
  
  const submitHandler = (e) => {
    e.preventDefault()
    if (input.length >= 1) {
      getCountryByName(input);
    }
    else{
      setInput("")
    }

    
  }
  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);
  
      if (!res.ok) {
        throw new Error("Error fetching data");
      }
  
      const data = await res.json();
  
      if (data.length === 0) {
        setError("No country found with that name");
      } else {
        setCountries(data);
      }
  
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

// search by region
  const getCountryByRegion = async (regionName) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await fetch(`${apiURL}/region/${regionName}`);

      if (!res.ok) throw new Error("Failed..........");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  const selectHandler = (e) => {
    const regionName = e;
    
    getCountryByRegion(regionName);
  }

  //  Pagination
  const items = 6
  const [current,setCurrent]=useState(1);
  const NbPage = Math.ceil(countries.length / items)
  const startIndex = (current-1) * items
  const endIndex = startIndex + items
  const dataPerPage = countries.slice(startIndex,endIndex)
  const handleChange = (event, page) =>{
    if (page >= 1 && page <= NbPage) {
      setCurrent(page);
    }
  }

  useEffect(() => {
    getAllCountries();
  }, []);
  return (
    <div   >
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className=" mt-10 flex justify-center items-center ">
          {/* Search field */}
              <TextField  label="Search" variant="standard" type="search" value={input} onChange={(e) => setInput(e.target.value)} className="bg-gray-50  border-none input-responsive "/>  
              <Button onClick={submitHandler} variant="outlined" color="blue" className="ml-5 btn-responsive">
                    Search
              </Button>
        </div>

        <div className="mt-10 flex justify-center items-center ">
          <div>
              {/* Select field */}
            <Select   label="Filter by Region" onChange={selectHandler} className="bg-white  border-2  " >
                <Option value="Africa">Africa</Option>
                <Option value="America">America</Option>
                <Option value="Asia">Asia</Option>
                <Option value="Europe">Europe</Option>
                <Option value="Oceania">Oceania</Option>
            </Select>
          </div>
        </div>
      </div>

        {/* error field */}

      {!isLoading && error.length > 1 && error &&  (<Stack sx={{ width: '50%',height:'300px',alignItems:'center',mx:'auto' }} spacing={2}>
      <Alert severity="error" > {error} </Alert>
    </Stack>)}
      
      <ClipLoader className="mt-10" color={color} loading={isLoading} cssOverride={override} size={300} aria-label="Loading Spinner" data-testid="loader"/>
      
        {/* Card field */}
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1  gap-4 ">
          {dataPerPage?.map((country,index) => (
            <div key={index} className="card-responsive">
                <Card className="mt-20 w-96 border-2 mx-auto card-responsive" id={theme} >
                <CardHeader color="blue-gray" className="relative h-auto w-80 img-responsive" floated={false}>
                  <img src={country.flags.png} alt="" />
                </CardHeader>
                <CardBody className="text-center">
                  <Typography variant="h5"  className="mb-2">
                    {country.name.common}
                  </Typography>
                  <Typography>
                    Population :{" "} {new Intl.NumberFormat().format(country.population)}
                  
                  
                  </Typography>
                  <Typography>
                      Region : {country.region}

                  </Typography>
                  <Typography>
                      Capital : {country.capital}
                  </Typography>

                </CardBody>
                <CardFooter className="pt-0 text-center">
                  <Link to={`/country/${country.name.common}`}> <Button variant="outlined" color="blue" > Read more</Button> </Link> 
                </CardFooter>
              </Card>
              
            </div>
              ))}
          </div>

            {/* Pagination field */}

          <Box sx={{ display:"flex",justifyContent: "center", mt:10}} >
            <Pagination count={NbPage} page={current} onChange={handleChange}   className="bg-white" /> 

          </Box>
        

      
      


    </div>
  )
}

export default Country