import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LeapFrog } from '@uiball/loaders';
import styles from './Signup.module.css';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToken from '../../hooks/useToken';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, googleSignIn, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [tokenEmail, setTokenEmail] = useState('');
  const { token } = useToken(tokenEmail);

  const saveUser = async (name, email, type = 'buyer') => {
    const newUser = { name, email, type };

    if (type === 'seller') {
      newUser.isVerified = false;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/user/new',
        newUser
      );

      if (response?.acknowledged) {
        setTokenEmail(email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      type: form.type.value,
    };

    try {
      const response = await signUp(formData.email, formData.password);
      if (response?.user?.uid) {
        updateUserProfile(formData.name);
        saveUser(formData.name, formData.email, formData.type);
        toast.success('Sign Up Successful!', {
          style: {
            border: '1px solid var(--clr-accent-300)',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await googleSignIn();
      if (response?.user?.uid) {
        saveUser(response.user.displayName, response.user.email);
        toast.success('Sign Up Successful!', {
          style: {
            border: '1px solid var(--clr-accent-300)',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container flow margin-block">
      <div className={styles.signup}>
        <h2 className="title-primary">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="control">
            <label className="label">Name</label>
            <input className="input" name="name" type="text" />
          </div>
          <div className="control">
            <label className="label">Email</label>
            <input className="input" name="email" type="text" />
          </div>
          <div className="control">
            <label className="label">Password</label>
            <input className="input" name="password" type="password" />
          </div>
          <div className="control">
            <label className="label">Account type</label>
            <select className="input" name="type">
              <option value="buyer">buyer</option>
              <option value="seller">seller</option>
            </select>
          </div>
          {isLoading ? (
            <div className={styles.spinner}>
              <LeapFrog size={40} speed={2.5} color="#c558ef" />
            </div>
          ) : (
            <>
              <div className={styles.btnGroup}>
                <button className="btn-primary" type="submit">
                  Sign Up
                </button>
                <button className="btn-secondary" onClick={handleGoogleSignup}>
                  google
                </button>
              </div>
              <p className={styles.suggestion}>
                <Link to="/login">or Login</Link>
              </p>
            </>
          )}
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default Signup;
