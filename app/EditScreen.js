import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button, SectionList, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';

export default function EditScreen({navigation}) {
    // TODO: Save input data to state and pass it to next screen


    const capitalizeFirstLetter = (val) => 
        String(val).charAt(0).toUpperCase() + String(val).slice(1);
    

    confirmCallback = () => {
        console.log("Confirmed");
        navigation.navigate("MapScreen");
    }
    
    // Dummy data to be replaced by GPT response
    const data = 
        {
        name: "Machine1",
        description: "Description",
        location: "Location",
        condition: "Condition",
        comments: "Comments"
        };
      
    const groups = { // Group fields by category, adjust as needed
        technical: ["name", "description", "condition"],
        location: ["location"],
        comments: ["comments"]
    }

    // Format for SectionList
    const sectionListData = Object.keys(groups).map((key) => ({
        title: key,
        data: groups[key].map((field) => ({
            label: field,
            value: data[field],
        })),
    }));


    const ListField = ({label, value}) => (
        <View style={styles.fieldContainer}>
            <Text multiline={true} style={styles.fieldLabel}>{capitalizeFirstLetter(label)}</Text>
            <TextInput multiline={true} style={styles.fieldValue}>{value}</TextInput>
        </View>
    );

    return (
        <ThemedView style={styles.screenContainer}>
            <ThemedText style={styles.title} type="title">Edit Data</ThemedText>
            <SectionList
                sections={sectionListData}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => <ListField {...item} />}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.sectionHeader}>{capitalizeFirstLetter(title)}</Text>
                )}
                style={styles.sectionList}            
            />
            <TouchableOpacity 
                onPress={confirmCallback}
                style={styles.confirmButton}
                >
                <Text >Confirm</Text>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        height: "100%"
    },
    title: {
        fontSize: 32,
        // textAlign: 'center',
        padding: 5,
    },
    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        // borderWidth: 5,
        // borderColor: 'yellow'

    },
    fieldLabel: {
        fontSize: 20,
        padding: 5,
        maxWidth: "35%",
    },
    fieldValue: {
        fontSize: 20,
        padding: 5,
        maxWidth: "65%",
        // borderColor: 'yellow'
        // borderWidth: 5,
    },
    sectionHeader: {
        fontSize: 24,
        backgroundColor: 'lightgrey',
        padding: 3,
    },
    sectionList: {
        height: 100,
        // borderWidth: 5,
        // borderColor: 'yellow'
    },
    confirmButton: {
        alignItems: 'center',
        backgroundColor: 'orange',
        padding: 10,
        margin: 10,
    },
});