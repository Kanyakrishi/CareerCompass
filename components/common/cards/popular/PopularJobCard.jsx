import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: checkImageURL(item.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
      </View>
      <Text style={styles.location}>{item.job_country}</Text>
    </TouchableOpacity>
  );
};

// we have to make each of the card clikcable - hence within the touchable opacity add this
// This is an event handler for the touch event. When the <TouchableOpacity> component is pressed, the handleCardPress function is called with the current item as its argument. The handleCardPress function would contain logic to determine what should happen when the component is pressed

// number of lines = 1 ==> only 1 line will be visible on the card. Rest will be ... 

// defaul image - check if image is there or not --> use this code. Tests it and gives 200 if it exists.
export default PopularJobCard;
