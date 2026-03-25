import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<CauLacBo.IRecord>('api/cau-lac-bo', undefined, undefined, '');

  return {
    ...objInit,
  };
};
