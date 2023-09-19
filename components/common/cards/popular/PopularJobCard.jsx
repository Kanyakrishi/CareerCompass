import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image source={{ uri: item.employer_logo }} style={styles.logoImage} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// we have to make each of the card clikcable - hence within the touchable opacity add this
// This is an event handler for the touch event. When the <TouchableOpacity> component is pressed, the handleCardPress function is called with the current item as its argument. The handleCardPress function would contain logic to determine what should happen when the component is pressed

export default PopularJobCard;
