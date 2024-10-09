import { Box, Container, Typography } from '@mui/material';
import useHabitStore from './store/store'
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';
import { useEffect } from 'react';
import HabitStats from './components/HabitStats';

const App = () => {

    const { fetchHabits } = useHabitStore();

    useEffect(() => {
        fetchHabits();
    }, [])
    return (
        <Container>
            <Box>
                <Typography
                    variant="h2"
                    component="h1"
                    align="center"
                    sx={{
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        transition: 'opacity 0.6s ease-in-out, transform 0.3s ease',
                        color: "blue",
                        opacity: 1,
                        '&:hover': {
                            opacity: 0.9,
                            transform: 'scale(1.03)',
                        },
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                    }}

                >
                    Habit Tracker
                </Typography>
                <AddHabitForm />
                <HabitList />
                <HabitStats />
            </Box>
        </Container>
    )
}

export default App
