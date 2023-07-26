import { Typography, Card, IconButton, AspectRatio, CardContent, Button } from '@mui/joy';
import { Link } from 'react-router-dom';

export default function RecipeCard({ meal }: { meal: any }) {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <div>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {meal.strMeal}
        </Typography>
        {/* <Typography level="body2">April 24 to May 02, 2021</Typography> */}
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        >
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M5 0v24l7-6 7 6v-24h-14zm1 1h12v20.827l-6-5.144-6 5.144v-20.827z" /></svg>
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={meal.strMealThumb}
          loading="lazy"
          alt={meal.strMeal}
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        {/* <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            $2,900
          </Typography>
        </div> */}
        <Link to={`/recipe/${meal.idMeal}`}>
          <Button type='solid' sx={{ ml: 'auto' }}>
            Explore
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}