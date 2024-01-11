import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Card,CardHeader,CardBody,Typography} from "@material-tailwind/react";


const apiURL = "https://restcountries.com/v3.1";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const CountryId = ({theme}) => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [error, setError] = useState("");

  const { countryName } = useParams();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);
  return (
    <div className=" mb-36">
      <ClipLoader
        color={color}
        loading={isLoading}
        cssOverride={override}
        size={500}
        aria-label="Loading Spinner"
        data-testid="loader"
        
      />
      {country?.map((country, index) => (
        <div key={index} className="card-responsive ">
                <Card className="mt-20 w-96 border-2 mx-auto card-responsive " id={theme} >
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
                                
              </Card>
              
            </div>
      ))}
    </div>
  )
}

export default CountryId