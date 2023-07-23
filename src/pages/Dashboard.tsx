import React from "react";
import Navbar from "../components/Navbar";
import { useUserContext } from "../contexts/UserContext";
import { Grid, Typography, Box, Divider, Link } from '@mui/joy';
import axios from 'axios';

import '../styles/dashboard.css';
import RecipeCard from "../components/RecipeCard";
import Greeting from "../components/Greeting";

export default function Dashboard() {

  const { user } = useUserContext();

  const [isLoading, setIsLoading] = React.useState(true);

  const [meals, setMeals] = React.useState<any[]>([]);
  const [vegetarianMeals, setVegetarianMeals] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian')
      .then((res: any) => {
        console.log(res.data.meals);
        const selectedResults: any[] = [];
        const numResultsToSelect = 3;

        while (selectedResults.length < numResultsToSelect) {
          const randomIndex = Math.floor(Math.random() * res.data.meals.length);
          const randomResult = res.data.meals[randomIndex];

          if (!selectedResults.includes(randomResult)) {
            selectedResults.push(randomResult);
          }
        }
        setVegetarianMeals(selectedResults);
        // setMeals(res.data.meals);
        setIsLoading(false);
      })
      .catch((err: any) => console.log(err));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
      <Box sx={{ width: '80%', margin: '0.75rem' }}>
        <Navbar />
        <Divider />
        <Box sx={{ width: "100%" }}>
          <Typography level="h2" marginTop={"2rem"}><Greeting />, {user?.email}</Typography>
          <Typography level="h3" marginBottom={"1rem"}>Welcome back</Typography>
        </Box>
        <Typography level="h3" marginY={"1rem"}>Recipes by Categories</Typography>
        <Grid container spacing={4} alignItems={"center"} justifyContent={"center"}>
          {vegetarianMeals.map((meal: any) => (
            <Grid xs={12} md={4}>
              <RecipeCard meal={meal} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}