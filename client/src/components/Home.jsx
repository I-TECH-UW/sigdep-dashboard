import { useState } from 'react'
import '../App.css'
import Papa from "papaparse";
import React, { useEffect } from 'react';
import { Flex, Box, Input, Button, HStack, VStack, Center } from "@chakra-ui/react";


function Home() {

  const logo1Url = '/react.svg';
  const logo2Url = '/vite.svg';
  const currentUrl = window.location.href;


  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const [filteredValues, setFilteredValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');



  const fetchFileAndCreateObject = async (relativePath, fileName, fileType) => {
    const response = await fetch(relativePath);
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: fileType, lastModified: Date.now() });
    return file;
  };


  // Example usage
  const relativePath = '/locations.csv';
  const fileName = 'locations.csv';
  const fileType = 'text/csv';
  useEffect(() => {

    fetch('/fetch-file')
      .then(response => {

        if (!response.ok) {
          throw new Error('Failed to fetch the file');
        }
        return response.blob();
      })
      .then(blob => {
        // Process the downloaded file blob
        // For example, save it or display its content
        const file = new File([blob], fileName, { type: fileType, lastModified: Date.now() });

        Papa.parse(file, {

          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            const rowsArray = [];
            const valuesArray = [];

            // Iterating data to get column name and their values
            results.data.map((d) => {

              rowsArray.push(Object.keys(d));
              valuesArray.push(Object.values(d));
            });

            // Parsed Data Response in array format
            setParsedData(results.data);

            // Filtered Column Names
            setTableRows(rowsArray[0]);

            // Filtered Values
            setValues(valuesArray);
          },
        });
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  const handleFilter = () => {
    const filteredData = parsedData.filter((data) => {
      for (let key in data) {
        if (String(data[key]).toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    const filteredValuesArray = filteredData.map((d) => Object.values(d));
    setFilteredValues(filteredValuesArray.slice(0, 10)); // Limit to 10 rows
  };



  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (

    <div >
      <VStack h="80vh" align="start" >
      <div style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>

        <HStack h="80vh" justify="space-evenly" align="start"  spacing={0}>
          <Box bg="gray.200" w="100%" py={4} px={10} position="sticky" top={0} left={0}>
            <Center>

              <Input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
                placeholder="Search"
                mr={8}
                style={{ width: "200px", height: "40px"
              }}
              />
              <Button onClick={handleFilter} style={{ width: "200px", height: "40px" }}
              >Search</Button>

            </Center>
          </Box>
        </HStack>
        <HStack h="80vh" justify="space-evenly" align="start"  spacing={0} >
          {filteredValues.length > 0 && (

            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  {tableRows.map((rows, index) => {
                    return <th key={index}>{rows}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredValues.map((value, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'lightgray' : 'white',
                      border: '1px solid black',
                    }}
                  >
                    {value.map((val, i) => (
                      <td
                        key={i}
                        style={{
                          padding: '0.5rem',
                          border: '1px solid black',
                        }}
                      >

                        {val !== '' && val !== null && i === 1 || i === 2 || i !== 0 ? (
                          <>
                            {(() => {
                              try {
                                const url = new URL(val);
                                return (
                                  <a href={url} target="_blank" rel="noopener noreferrer">
                                    {val}
                                  </a>
                                );
                              } catch (error) {
                                return val;
                              }
                            })()}
                          </>
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

          )}
        </HStack>
        </div>

      </VStack>

    </div>
  )
}

export default Home;
