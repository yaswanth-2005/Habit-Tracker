import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import React from 'react'
import useHabitStore, { Habit } from '../store/store'
import toast, { Toaster } from 'react-hot-toast';

const HabitList = () => {

    const { habits, removeHabit, toggleHabit } = useHabitStore();
    const today = new Date().toISOString().split("T")[0];

    const getStreak = (habit: Habit) => {
        let streak = 0;
        const currentDate = new Date();

        while (true) {
            const dateString = currentDate.toISOString().split("T")[0];
            if (habit.completedDates.includes(dateString)) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else
                break;
        }
        return streak;
    }

    return (
        <>
            <div><Toaster /></div>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
                {habits.map((habit) => (
                    <Paper key={habit.id} elevation={2} sx={{ p: 2, '&:hover': { boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', } }}>
                        <Grid container alignItems="center">
                            <Grid xs={12} sm={6}>
                                <Typography variant="h6" fontFamily="poppins">{habit.name}</Typography>
                                <Typography variant="body2" color="text.secondary" fontFamily="poppins">{habit.frequency}</Typography>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                    <Button sx={{ fontFamily: "poppins" }} variant='outlined' color={habit.completedDates.includes(today) ? "success" : "primary"} startIcon={<CheckCircleIcon />} onClick={() => toggleHabit(habit.id, today)}>
                                        {habit.completedDates.includes(today) ? "completed" : "Mark Complete"}
                                    </Button>
                                    <Button sx={{ fontFamily: "poppins" }} variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={(e) => { removeHabit(habit.id); toast.success("Removed") }}>Remove</Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                            <Typography fontFamily="poppins">Current Streak:{getStreak(habit)}</Typography>
                            <LinearProgress variant='determinate' value={(getStreak(habit) / 30) * 100} sx={{ mt: 1 }} />
                        </Box>
                    </Paper>
                ))
                }
            </Box >
        </>
    )
}

export default HabitList
