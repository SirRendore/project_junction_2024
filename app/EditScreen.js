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
            <Text style={styles.fieldLabel}>{capitalizeFirstLetter(label)}</Text>
            <TextInput style={styles.fieldValue}>{value}</TextInput>
        </View>
    );

    return (
        <ThemedView>
            <ThemedText type="title">Edit Screen</ThemedText>
            <SectionList
                sections={sectionListData}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => <ListField {...item} />}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.sectionHeader}>{capitalizeFirstLetter(title)}</Text>
                )}
            />
            <TouchableOpacity 
                onPress={confirmCallback}
                style={styles.button}
                >
                <Text >Confirm</Text>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    fieldLabel: {
        fontSize: 20,
    },
    fieldValue: {
        fontSize: 20,
    },
    sectionHeader: {
        fontSize: 24,
        backgroundColor: 'lightgrey',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'orange',
        padding: 10,
        margin: 10,
    },
});