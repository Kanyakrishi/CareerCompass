import React from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useState, useCallback } from 'react';
import { icons, COLORS, SIZES } from '../../constants';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import useFetch from '../../hook/useFetch';


const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const tabs = ["About", "Qualifications", "Responsibilities"];

    const [activeTab, setActiveTab] = useState(tabs[0])

    const displayTabContent = () => {
        switch(activeTab){
            case "Qualifications":
                return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ['N/A']}/>
            case "About":
                return <JobAbout info={data[0].job_description ?? ['N/A']}/>
            case "Responsibilities":
                return (
                  <Specifics
                    title="Responsibilities"
                    points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                  />
                );
                default:
                    break;
        }
    }

    const onRefresh = () => {}

    const {data, isLoading, error, refetch} = useFetch('job-details', {job_id:params.id})
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
            />
          ),
          headerShadowVisible: false,
          headerTitle: ''
        }}
      />
      <>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
      {isLoading? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ): error ? (
        <Text> Something is wrong</Text>
      ): data.length === 0 ? (
        <Text>No Data</Text>
      ):(
        <View style={{padding: SIZES.medium, paddingBottom: 100}}>
        <Company 
        companyLogo={data[0].employer_logo}
        companyName={data[0].employer_name}
        jobTitle={data[0].job_title}
        location={data[0].job_country}
        />

        <JobTabs
        tabs={tabs }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        />
        {displayTabContent()}

        </View>
      )}
      </ScrollView>

      <JobFooter  url={data[0]?.job_google_link ?? 'https://careers.google.com/job/results'}/>
      </>
    </SafeAreaView>
  );
}

export default JobDetails

// This will automatically take you to the respective job page based on the id.
// useSearch params will get the specifi job that we have clicked 
//  fetch the job details for that particular ID 
// 