import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { roledb, auth, filedb } from '../../fireBase'
import { ref , listAll, getDownloadURL } from "firebase/storage"
import { doc, getDoc} from "firebase/firestore"
import { read, utils} from "xlsx";


import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export const ScheduleScreen = () => {

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1 ;

  const currentUserID = auth.currentUser.uid;

  const currentYearFiles = ref(filedb, "Schedule/"+currentYear)

  const [allLocations, setAllLocations] = useState('')
  const [currentSchedules, setCurrentSchedules] = useState('')

  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')

  const [scheduleTable, setScheduleTable] = useState('')

  useEffect(() => {
    setSelectedMonth(currentMonth)


    listAll(currentYearFiles)
    .then((res) => {
      
      setAllLocations(res.prefixes)
      
    })
  }, [])

  //Get current User Location from Firestore and if 
  useEffect(() => {

    getDoc(doc(roledb, "usersCollection", currentUserID))
    .then((snapshot) => {

      const userData = snapshot.data()
      if(userData.Workplace === "admin" || userData.Workplace === "Kontor") {
      
      } else {
        setSelectedLocation(userData.Workplace)
      }
      

      
    }).catch(error => {error.message})


    }, [])

//Get Schedule file and convert it to a bufferArray, which is turned into an json array.
useEffect(() => {

  if(selectedMonth === '' || selectedLocation === '') {
    
  } else {
    const fileLocation = "Schedule/"+currentYear+"/"+selectedLocation+"/"+selectedMonth+".xlsx"

    getDownloadURL(ref(filedb, fileLocation))
      .then((url) => {

        fetch(url)
        .then(response => response.blob()).catch((error) => error.message)
        .then((res) => {
          readAsArrayBuffer(res)
          .then((buffer) => {

            const readFile = read(buffer, {type: "buffer", raw: true})
            
            const fs = readFile.SheetNames[0]
            const fss = readFile.Sheets[fs]
            const deita = utils.sheet_to_json(fss, { header: 1})
            console.log(deita)
            setScheduleTable(deita)
          }).catch((error) => error.message)

        }).catch((error) => error.message)

      })
      .catch(setScheduleTable("No Schedule found."));

  } 
}, [selectedLocation, selectedMonth])

function readAsArrayBuffer(blob) {

  return new Promise((resolve) => {
    
    const reader = new FileReader()
    
    reader.onload = (event) => {
      resolve(event.target?.result)
    }
    reader.readAsArrayBuffer(blob)
  })
}

  //Get file directory by current year and user Workplace or selected workplace.
  useEffect(() => {
    const currentLocationFiles = ref(filedb, "Schedule/"+currentYear+"/"+selectedLocation)
    listAll(currentLocationFiles)
    .then((ras) => {
      
      setCurrentSchedules(ras.items)
      
    })
  }, [selectedLocation])


  //Rendering schecule table.
  const renderTable = () => {

    if(scheduleTable === '') {
      return <Text style={styles.scheduleError}>Please choose Location and Month.</Text>
    } else if(scheduleTable === "No Schedule found.") {
      return <Text style={styles.scheduleError}>No schedule yet.</Text>
    } else {
      return (
        Object.keys(scheduleTable)?.map((rowData, index) => (
          <Row widthArr={[120, 120, 120, 120, 120, 120, 120, 120]} style={styles.rowStyle} textStyle={styles.tableText} key={index} data={scheduleTable[rowData]}/>
  
          ))
      )
    }
    
  }



  return (

    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerText}>Graafikud</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <View style={styles.locationFilter}>
          <Text style={styles.filterText}>Üksus: </Text>
          <Picker
              selectedValue={selectedLocation}
              style={styles.pickerStyle}
              onValueChange={(LocationValue) => setSelectedLocation(LocationValue)}
            >
              {Object.keys(allLocations)?.map((key) => 
                <Picker.Item color="#FEF5EF" label={allLocations[key].name} key={key} value={allLocations[key].name}></Picker.Item>
              )}
          </Picker>
        </View>
        <View style={styles.monthFilter}>
          <Text style={styles.filterText}>Kuu:   </Text>
          <Picker
              itemStyle={{color: "#FEF5EF", backgroundColor: "#FEF5EF"}}
              selectedValue={selectedMonth}
              style={styles.pickerStyle}
              onValueChange={(MonthValue) => setSelectedMonth(MonthValue)}
            >
              <Picker.Item color="#FEF5EF" label='Jaanuar' value='1'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='Veebruar' value='2'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='Märts' value='3'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='Aprill' value='4'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='Mai' value='5'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='Juuni' value='6'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='Juuli' value='7'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='August' value='8'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='September' value='9'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='Oktoober' value='10'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='November' value='11'></Picker.Item>
              <Picker.Item color="#FEF5EF" label='Detsember' value='12'></Picker.Item>
              
          </Picker>
        </View>
        
      </View>
      <View style={styles.filterContainer}>

      {Object.keys(currentSchedules).map(key => {
          <Text key={key} style={styles.headerText}>{currentSchedules[key].fullPath}</Text>
        })
        }

      </View>
      <View style={styles.tableContainer}>
        <ScrollView horizontal={true} style={styles.scrollStyle}>
          <ScrollView style={styles.scrollStyle}>
            <Table style= {styles.tableStyle}>

              {renderTable()}
            
            </Table>
          </ScrollView>
        </ScrollView>
      </View>
      
      
    </View>
    
  )
}

export default ScheduleScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flexWrap: "wrap",
    width: "100%",
    minHeight: "100%",
  },
  topBar: {
    width: "100%",
    height: 65,
    alignItems: "center",

    borderBottomWidth: 2,
    borderBottomColor: "#984447",
    padding: 10,
  },
  headerText: {
    color: "#FEF5EF",
    fontSize: 24,
  },
  filterContainer: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#984447",
    flexDirection: 'column',
  },
  locationFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: "#FEF5EF",
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center'
  },
  pickerStyle: {
    width: "50%",
    height: 30,
    backgroundColor: "#adadad",
    margin: 5,

  },
  tableContainer: {
    flex: 0.8,
    width: "100%",
    borderLeftWidth: 2,
    borderLeftColor: "#4a4a4a",
    flexDirection: "column",
  },
  scrollStyle: {
    
  },
  tableStyle: {

  },
  rowStyle: {
    height: 30,
    backgroundColor: "#262626",
    borderWidth: 1,
    borderColor: "#4a4a4a",
  },
  tableText: {
    color: "#FEF5EF",
    fontSize: 18,
    width: 120,
    textAlign: "left",
    borderLeftWidth: 2,
    borderLeftColor: "#4a4a4a",
    borderRightWidth: 2,
    borderRightColor: "#4a4a4a",
    height: "100%",
  },
  scheduleError: {
    marginTop: 50,
    color: "#FEF5EF",
    fontSize: 18,
  }, 

})