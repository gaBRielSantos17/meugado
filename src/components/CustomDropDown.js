import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomDropdown = ({ data, selectedItem, setSelectedItem, placeholder }) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={(item) => setSelectedItem(item.title)}
      renderButton={(selectedItem, isOpened) => (
        <View style={styles.dropdownButtonStyle}>
          {selectedItem && <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />}
          <Text style={styles.dropdownButtonTxtStyle}>
            {selectedItem?.title || placeholder}
          </Text>
          <Icon name={isOpened ? "chevron-up" : "chevron-down"} style={styles.dropdownButtonArrowStyle} />
        </View>
      )}
      renderItem={(item, index, isSelected) => (
        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: "#D2D9DF" }) }}>
          <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      )}
    />
  );
};


const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '100%',
    height:'40',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default CustomDropdown;