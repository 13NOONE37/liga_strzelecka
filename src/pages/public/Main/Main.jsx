import React from 'react';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Main() {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    navigate('/auth');
  }, []);
  return <div></div>;
}
