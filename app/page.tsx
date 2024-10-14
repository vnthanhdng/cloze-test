'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';


export default function InputPage() {
    const [text, setText] = useState('');
    const [nValue, setNValue] = useState(6);  // Default N value
    const router = useRouter();

    const handleSubmit = () => {
      if (text.trim() && nValue > 0) {
          router.push(`/test?text=${encodeURIComponent(text)}&nValue=${nValue}`);
      } else {
          alert("Please enter valid text and N value.");
      }
  };

    return (
      <Container maxWidth="sm" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} style={{ padding: '2rem', width: '100%' }}>
                <Box display="flex" flexDirection="column" gap={3}>
                    <Typography variant="h4" align="center" gutterBottom color="primary">
                        C-Test Input
                    </Typography>

                    <TextField 
                        label="Enter your paragraphs" 
                        multiline
                        rows={6}
                        variant="outlined"
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        fullWidth
                    />

                    <TextField 
                        label="Enter N value" 
                        type="number"
                        variant="outlined"
                        value={nValue} 
                        onChange={(e) => setNValue(parseInt(e.target.value) || 0)} 
                        fullWidth
                        inputProps={{ min: 1 }}  // Ensure N value is positive
                    />

                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit} 
                        fullWidth
                        style={{ padding: '0.75rem' }}
                    >
                        Start Test
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
