import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import useHabitStore from '../store/store';
import toast, { Toaster } from 'react-hot-toast';

const AddHabitForm = () => {

    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
    const [name, setName] = useState('')
    const { addHabit } = useHabitStore();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            addHabit(name, frequency)
            setName("")
            toast.success("Habit Added")
        }
    }
    // console.log(habits)

    return (
        <>
            <div><Toaster /></div>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, fontFamily: "poppins" }}>
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter the Name' fullWidth
                        InputProps={{
                            sx: {
                                fontFamily: "'Poppins', sans-serif",
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                fontFamily: "'Poppins', sans-serif",
                            },
                        }}
                        sx={{
                            fontFamily: "'Poppins', sans-serif",
                        }}
                    />
                    <FormControl fullWidth>
                        <InputLabel
                            sx={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Frequency
                        </InputLabel>
                        <Select
                            value={frequency}
                            label="Frequency"
                            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        fontFamily: "'Poppins', sans-serif",
                                    },
                                },
                            }}
                            sx={{
                                fontFamily: "'Poppins', sans-serif",
                            }}
                        >
                            <MenuItem value="daily" sx={{ fontFamily: "poppins" }}>Daily</MenuItem>
                            <MenuItem value="weekly" sx={{ fontFamily: "poppins" }}>Weekly</MenuItem>
                        </Select>

                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 500,
                            fontSize: '1.1rem',
                            letterSpacing: '0.05em',
                            padding: '0.7rem 2.5rem',
                            borderRadius: '10px',
                            background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                            color: '#fff',
                            textTransform: 'capitalize',
                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.5s ease',
                            '&:hover': {
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            }
                        }}
                    >
                        Add Habit
                    </Button>


                </Box>

            </form>
        </>
    )
}

export default AddHabitForm
