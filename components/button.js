import { StyleSheet, Text, View, Pressable } from 'react-native';
export default function MyButton(props) {
    return(
        <Pressable style={styles.block}><Text>🗿</Text></Pressable>
    )
}
const styles = StyleSheet.create({
    block: {
      width: '10%',
      height: '20%',
      backgroundColor: 'black',
    }
  });