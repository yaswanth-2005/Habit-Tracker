import { Box, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'
import useHabitStore, { Habit } from '../store/store'

const HabitStats = () => {

    const { habits, isLoading, error } = useHabitStore();
    const getTotalHabits = () => habits.length;
    const getCompletedToday = () => {
        const today = new Date().toISOString().split("T")[0]
        return habits.filter((habit) => habit.completedDates.includes(today)).length
    }
    const getLongestStreak = () => {
        const getStreak = (habit: Habit) => {
            let streak = 0;
            const currentDate = new Date();

            while (true) {
                const dateString = currentDate.toISOString().split("T")[0]
                if (habit.completedDates.includes(dateString)) {
                    streak++;
                    currentDate.setDate(currentDate.getDate() - 1);
                } else {
                    break;
                }
            }
            return streak;
        }
        return Math.max(...habits.map(getStreak), 0)
    }

    if (isLoading) {
        return <LinearProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }


    return (
        <Paper elevation={2} sx={{ p: 2, mt: 4, }}>
            <Typography variant="h6" gutterBottom fontFamily="poppins">
                Habit Statistics
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body1" fontFamily="poppins">
                    Total Habits: {getTotalHabits()}
                </Typography>
                <Typography variant="body1" fontFamily="poppins">
                    Completed Today: {getCompletedToday()}
                </Typography>
                <Typography variant="body1" fontFamily="poppins">
                    Longest Streak: {getLongestStreak()} days
                </Typography>
            </Box>
        </Paper>
    )
}

export default HabitStats
