import {Routes,Route} from 'react-router-dom'
import {Nav,Foot} from './Components'
import { createContext, useState } from 'react';
import {Country,CountryId,Notfound} from './Pages'
export const ThemeContext = createContext(null);



function App() {

  const [theme, setTheme] = useState("light");
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    setTheme((curr) => (curr === "light" ? "dark" : "light"));

  };
  return (
    
    <ThemeContext.Provider value={{theme,toggleDarkMode,isDarkMode}} >
      <div id={theme} >

        <Nav theme={theme} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>
        <Routes>
          <Route path='/' element={<Country theme={theme}/>} />
          <Route path='/country/:countryName' element={<CountryId theme={theme}  />} />
          <Route path='*' element={<Notfound/>} />
        


        </Routes>
        
      <Foot/>
      </div>
    


    </ThemeContext.Provider>
        
    
      

  
  );
}

export default App;
