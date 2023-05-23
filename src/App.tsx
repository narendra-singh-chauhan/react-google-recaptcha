// packages
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';
import axios from 'axios';
// css
import './App.css';

const App = () => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const onChange = (value: string | null) => {
    console.log('Captcha value:', value);
  };

  const onSubmit = async () => {
    const token = await recaptchaRef.current?.getValue();

    if (token) {
      const params = {
        email: 'narendrasinghks2019@gmail.com',
        password: '1234',
        token,
      };

      try {
        const apiURL = import.meta.env.VITE_APP_API_URL || '';
        const response = await axios.post<{ data: any }>(`${apiURL}/test-recaptcha`, params);
        console.log('response data: ', response?.data);
      } catch (error) {
        console.error('Respons error: ', error);
      }
    } else {
      console.log('Please complete the reCAPTCHA.');
    }



  };

  return (
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey='6LdLrDAmAAAAAOYtjQs6lTLMpCx9Kb1aYPmHdeOo'
        onChange={onChange}
      />

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default App;