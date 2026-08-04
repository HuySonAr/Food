import {
  createReservationService,
  deleteReservationService,
  getReservationByIdService,
  getReservationService,
  updateReservationService,
  updateReservationStatusService,
} from '@/services/reservation.service';
import { formatResponse } from '@/utils/response';
import { useEffect, useState } from 'react';

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

export const useAdminReservations = (
  page,
  limit,
  keyword,
  status,
  time,
  sort,
) => {
  const [reservations, setReservations] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = { page, limit, sort };
        if (keyword) params.keyword = keyword;
        if (status) params.status = status;
        if (time) params.time = time;

        const response = await getReservationService(params);
        setReservations(response.data.reservations);
        setPagination(response.data.pagination);
      } catch (err) {
        setError(err.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [page, limit, keyword, status, time, sort]);

  return { reservations, pagination, loading, error };
};

export const useReservationDetail = (id) => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getReservationByIdService(id);
        setReservation(response.data);
      } catch (err) {
        setError(err.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  return { reservation, loading, error };
};

export const useReservationActions = () => {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (id, status) => {
    setLoading(true);
    try {
      const response = await updateReservationStatusService(id, status);
      return formatResponse(response.code, response.msg, response.data);
    } catch (err) {
      return formatResponse(
        err.response?.data?.code,
        err.response?.data?.msg,
        null,
      );
    } finally {
      setLoading(false);
    }
  };

  const updateDetails = async (id, data) => {
    setLoading(true);
    try {
      const response = await updateReservationService(id, data);
      return formatResponse(response.code, response.msg, response.data);
    } catch (err) {
      return formatResponse(
        err.response?.data?.code,
        err.response?.data?.msg,
        null,
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id) => {
    setLoading(true);
    try {
      const response = await deleteReservationService(id);
      return formatResponse(response.code, response.msg, response.data);
    } catch (err) {
      return formatResponse(
        err.response?.data?.code,
        err.response?.data?.msg,
        null,
      );
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, updateDetails, deleteReservation, loading };
};
