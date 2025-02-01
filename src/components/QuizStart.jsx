import { Button, Container, Typography, Box, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion"; // For animation

const QuizStart = ({ onStart }) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(to right, #4facfe, #00f2fe)", // Beautiful Gradient
                padding: 3,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <Card sx={{ maxWidth: 500, textAlign: "center", boxShadow: 5, borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="h3" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                            🎯 Quiz Time!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, fontSize: "1.2rem" }}>
                            Test your knowledge and challenge yourself. Are you ready? 🚀
                        </Typography>

                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={onStart}
                                sx={{
                                    fontSize: "1.2rem",
                                    paddingX: 4,
                                    paddingY: 1,
                                    borderRadius: "50px",
                                    textTransform: "none",
                                }}
                            >
                                Start Quiz 🚀
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </Box>
    );
};

export default QuizStart;
