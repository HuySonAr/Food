import { createReservationService } from '@/services/reservation.service';
import { useState } from 'react';

export const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorField, setErrorField] = useState({});

  const clearFieldError = (field) => {
    setErrorField((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const submitReservation = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    setErrorField({});

    try {
      const response = await createReservationService(formData);
      if (response.code === 0) {
        setSuccessMsg(response.msg);
      }
      return { success: true, msg: response.msg, data: response.data };
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.data?.errors) {
        let fieldErrors = {};
        errorData.data.errors.forEach((item) => {
          fieldErrors[item.field] = item.message;
        });
        setErrorField(fieldErrors);
      }

      const errorText = errorData?.msg;
      setError(errorText);
      return { success: false, msg: errorText };
    } finally {
      setLoading(false);
    }
  };
  return {
    submitReservation,
    loading,
    error,
    errorField,
    successMsg,
    clearFieldError,
  };
};
