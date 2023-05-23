// packages
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';
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
      console.log('Captcha token:', token);
    } else {
      console.log('Please complete the reCAPTCHA.');
    }
  }

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