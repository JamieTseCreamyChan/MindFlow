import { useCallback } from 'react';
import { SurveyResponse, SurveyAnswer } from '../models/SurveyResponse';
import { STORAGE_KEYS } from '../services/storage';
import { useStorage } from './useStorage';
import { v4 as uuid } from 'uuid';

export function useSurvey() {
  const { data: surveys, loading, save } = useStorage<SurveyResponse[]>(
    STORAGE_KEYS.SURVEYS,
    []
  );

  const submitSurvey = useCallback(
    async (
      surveyType: SurveyResponse['surveyType'],
      responses: SurveyAnswer[]
    ) => {
      const survey: SurveyResponse = {
        id: uuid(),
        surveyType,
        completedAt: new Date().toISOString(),
        responses,
      };
      await save([...surveys, survey]);
      return survey;
    },
    [surveys, save]
  );

  const hasCompletedBaseline = surveys.some((s) => s.surveyType === 'baseline');

  return { surveys, loading, submitSurvey, hasCompletedBaseline };
}
