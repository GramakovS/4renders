'use client';

import cl from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Upload, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { formApi } from '@/lib/api';

export type ModalFormData = {
  textInput: string;
  file: FileList;
};

export type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose, title = 'Submit Form' }: ModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<ModalFormData>();

  const watchedFile = watch('file');

  const onSubmit = async (data: ModalFormData) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const formData = new FormData();
      formData.append('textInput', data.textInput);

      if (data.file && data.file[0]) {
        formData.append('file', data.file[0]);
      }

      const response = await formApi.submitFormData(formData);

      if (response.success) {
        setSubmitResult('Form submitted successfully!');
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setSubmitResult(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitResult('Unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setSubmitResult(null);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <button
                    onClick={handleClose}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                {submitResult ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={cl(
                      'text-center p-4 rounded-lg',
                      submitResult.includes('Error')
                        ? 'bg-red-50 text-red-700'
                        : 'bg-green-50 text-green-700'
                    )}
                  >
                    {submitResult}
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Input
                      </label>
                      <textarea
                        {...register('textInput', {
                          required: 'Text input is required',
                          minLength: { value: 5, message: 'Minimum 5 characters required' }
                        })}
                        placeholder="Enter your message here..."
                        className={cl(
                          'w-full px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500',
                          errors.textInput ? 'border-red-300' : 'border-gray-300'
                        )}
                        rows={4}
                      />
                      {errors.textInput && (
                        <p className="mt-1 text-sm text-red-600">{errors.textInput.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Upload
                      </label>
                      <div className="relative">
                        <input
                          {...register('file')}
                          type="file"
                          accept="image/*,.pdf,.doc,.docx,.txt"
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className={cl(
                            'flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all',
                            'hover:border-blue-400 hover:bg-blue-50',
                            watchedFile && watchedFile[0]
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-300'
                          )}
                        >
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">
                              {watchedFile && watchedFile[0]
                                ? `Selected: ${watchedFile[0].name}`
                                : 'Click to upload file'
                              }
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Images, PDF, DOC, TXT supported
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cl(
                        'w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all',
                        'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
                        'hover:from-blue-700 hover:to-purple-700',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer'
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Form
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}