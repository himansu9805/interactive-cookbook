import React from "react";
import Navbar from "../components/Navbar";
import { useUserContext } from "../contexts/UserContext";
import { Grid, Typography, Box, Divider, Link, IconButton } from '@mui/joy';
import axios from 'axios';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import RecipeCard from "../components/RecipeCard";
import Greeting from "../components/Greeting";
import Onboading from "../components/Onboarding";
import SkeletonCard from "../components/SkeletonCard";

import '../styles/dashboard.css';
import { Icon } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";

interface Meal {
  category: string;
  recipes: any[];
}

export default function Dashboard() {

  const { user } = useUserContext();

  const [meals, setMeals] = React.useState<Meal[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [preferenceCount, setPreferenceCount] = React.useState<number>(0); // set default value to 0

  const [isModalOpen, setIsModalOpen] = React.useState(false);


  React.useEffect(() => {
    console.log(user);
    if (user?.preferences === null || user?.preferences?.length === 0) {
      setIsModalOpen(true);
    }
    setMeals([]);
    setPreferenceCount(user?.preferences?.length || 0); // set default value to 0
    user?.preferences?.forEach((preference: string) => {
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${preference}`).then((res: any) => {
        const selectedResults: any[] = [];
        const numResultsToSelect = 3;
        while (selectedResults.length < numResultsToSelect) {
          const randomIndex = Math.floor(Math.random() * res.data.meals.length);
          const randomResult = res.data.meals[randomIndex];

          if (!selectedResults.includes(randomResult)) {
            selectedResults.push(randomResult);
          }
        }
        const meal: Meal = { category: preference, recipes: selectedResults };
        setMeals((prevMeals: any) => [...prevMeals, meal]);
      });
    });
    console.log(meals);
    setIsLoading(false);
  }, [user]);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
        <Box sx={{ width: '80%', margin: '0.75rem' }}>
          <Navbar />
          <Divider />
          <Box marginTop={"2rem"} marginBottom={"1rem"} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start', width: '100%', height: '100%' }}>
            <Box>
              <Typography level="h2"><Greeting />, {user?.name}</Typography>
              <Typography level="h3">Welcome back</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography level="body1">You have {preferenceCount} preferences</Typography>
              <Box sx={{ width: '1rem' }}></Box>
              <IconButton onClick={() => setIsModalOpen(true)}><TuneTwoToneIcon /></IconButton>
            </Box>
          </Box>
          <Typography level="h3" marginY={"1rem"}>Recipes by Categories</Typography>
          {!isLoading && meals.map((meal: Meal, index: number) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography level="h4" marginY={"1rem"}>{meal.category}</Typography>
                <Link href={`/category/${meal.category}`} underline={"none"}>See all <ArrowRight /></Link>
              </Box>
              <Grid container spacing={4} alignItems={"center"} justifyContent={"center"}>
                {meal.recipes !== undefined ? meal.recipes.map((recipe: any) => (
                  <Grid xs={12} md={4}>
                    <RecipeCard meal={recipe} />
                  </Grid>
                )) :
                  Array.from(Array(3).keys()).map((i: number) => (
                    <Grid key={i} xs={12} md={4}>
                      <SkeletonCard />
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
      <Onboading isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </React.Fragment >
  );
}