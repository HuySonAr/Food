import {
  createContactService,
  deleteContactService,
  getContactByIdService,
  getContactsService,
  updateContactService,
} from '@/services/contact.service';
import { formatResponse } from '@/utils/response';
import { useEffect, useState } from 'react';

export const useContact = () => {
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

  const submitContact = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    setErrorField({});

    try {
      const response = await createContactService(formData);
      if (response.code === 0) {
        setSuccessMsg(response.msg);
      }
      return { success: true, msg: response.msg };
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.data?.errors) {
        let fieldErrors = {};
        errorData?.data?.errors.forEach((item) => {
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
    submitContact,
    loading,
    error,
    errorField,
    successMsg,
    clearFieldError,
  };
};

export const useAdminContacts = ({
  page = 1,
  limit = 10,
  keyword = '',
  status = '',
  sort = 'desc',
} = {}) => {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = { page, limit, sort };
        if (keyword) params.keyword = keyword;
        if (status) params.status = status;
        const response = await getContactsService(params);
        setContacts(response.data.contacts);
        setPagination(response.data.pagination);
      } catch (err) {
        setError(err.response?.data.msg);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [page, limit, keyword, status, sort]);

  return { contacts, pagination, loading, error };
};

export const useContactDetail = (id) => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      setLoading(false);
      setError(null);

      try {
        const response = await getContactByIdService(id);
        setContact(response.data);
      } catch (err) {
        setError(err.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { contact, loading, error };
};

export const useContactActions = () => {
  const [loading, setLoading] = useState(false);

  const updateContact = async (id, data) => {
    setLoading(true);
    try {
      const response = await updateContactService(id, data);
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

  const deleteContact = async (id) => {
    setLoading(true);
    try {
      const response = await deleteContactService(id);
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

  return { updateContact, deleteContact, loading };
};
