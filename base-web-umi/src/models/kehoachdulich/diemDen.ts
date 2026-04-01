import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<KeHoachDuLich.IDiemDen>('api/du-lich/diem-den', undefined, undefined, '');

  return {
    ...objInit,
  };
};
