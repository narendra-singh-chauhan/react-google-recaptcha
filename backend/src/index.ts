// packages
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';


// configs
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// production
if (process.env.NODE_ENV === 'production') {
    // Serve the static files from the frontend build directory
    app.use(express.static(path.join(__dirname, 'dist')));
    
    // For all other routes, serve the frontend index.html
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'), (error) => {
            if (error) {
                res.status(400).json({ error });
          }
      });
    });
}

app.post('/test-recaptcha', async (req: Request, res: Response) => {
    try {
        const { email, password, token } = req.body;
        // Make a request to the reCAPTCHA API to verify the token
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
            secret: '6LdLrDAmAAAAAEsVa20Ts_7WG1FLvHAaAw5UZDzJ',
            response: token
            }
        });
        
        const { success } = response.data;
        
        if (success) {
            res.status(200).json({ success: true, email, password, token });
        } else {
            res.status(400).json({ success: false, message: 'Invalid captcha' });
        }
    } catch (error) {
        res.status(400).json({message: 'Something wrong with the backend.'});
    }
});

// development
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the backend');
});

// listen
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});