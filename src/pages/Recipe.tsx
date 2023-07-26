import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Divider, Grid, Typography } from '@mui/joy';
import Navbar from '../components/Navbar';
import { PublicTwoTone } from '@mui/icons-material';

export default function Recipe() {

	let { id } = useParams<{ id: string }>();
	const [recipe, setRecipe] = React.useState<any>(null);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res: any) => {
			console.log(res.data.meals[0]);
			setRecipe(res.data.meals[0]);
			setIsLoading(false);
		});
	}, []);

	return (
		<React.Fragment>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
				<Box sx={{ width: '80%', margin: '0.75rem' }}>
					<Navbar />
					<Divider />
					{isLoading ? <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
						<img width={'360px'} src='https://thumbs.gfycat.com/AchingBelatedBarasinga-max-1mb.gif' />
						<Typography level="h2">Loading</Typography>
					</Box> :
						<Grid container spacing={2} sx={{ width: '100%', height: '100%', my: { xs: 8, md: 0 } }}>
							<Grid xs={12} md={6}>
								<img width={'100%'} src={recipe?.strMealThumb} />
							</Grid>
							<Grid xs={12} md={6}>
								<Box>
									<Typography level="h2">{recipe?.strMeal}</Typography>
									<Typography level="h3"><PublicTwoTone /> {recipe?.strArea}</Typography>
								</Box>
							</Grid>
						</Grid>
					}
				</Box>
			</Box>
		</React.Fragment >
	);
}