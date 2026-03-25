// @ts-nocheck
import React from 'react';
import initialState from 'D:/Code/Project/B24DCCC155-TH1/src/.umi/plugin-initial-state/models/initialState';
import model0 from "D:/Code/Project/B24DCCC155-TH1/src/models/danhmuc/chucvu";
import model1 from "D:/Code/Project/B24DCCC155-TH1/src/models/game";
import model2 from "D:/Code/Project/B24DCCC155-TH1/src/models/import";
import model3 from "D:/Code/Project/B24DCCC155-TH1/src/models/oantuti";
import model4 from "D:/Code/Project/B24DCCC155-TH1/src/models/randomuser";
import model5 from "D:/Code/Project/B24DCCC155-TH1/src/models/thongbao/nhansu";
import model6 from "D:/Code/Project/B24DCCC155-TH1/src/models/thongbao/noticeicon";
import model7 from "D:/Code/Project/B24DCCC155-TH1/src/models/thongbao/receiver";
import model8 from "D:/Code/Project/B24DCCC155-TH1/src/models/thongbao/sinhvien";
import model9 from "D:/Code/Project/B24DCCC155-TH1/src/models/thongbao/thongbao";
import model10 from "D:/Code/Project/B24DCCC155-TH1/src/models/tienich/auditlog";
import model11 from "D:/Code/Project/B24DCCC155-TH1/src/models/tienich/caidat";
import model12 from "D:/Code/Project/B24DCCC155-TH1/src/models/tienich/phanhoi";
import model13 from "D:/Code/Project/B24DCCC155-TH1/src/models/todo";
// @ts-ignore
import Dispatcher from './helpers/dispatcher';
// @ts-ignore
import Executor from './helpers/executor';
// @ts-ignore
import { UmiContext } from './helpers/constant';

export const models = { '@@initialState': initialState, 'danhmuc.chucvu': model0, 'game': model1, 'import': model2, 'oantuti': model3, 'randomuser': model4, 'thongbao.nhansu': model5, 'thongbao.noticeicon': model6, 'thongbao.receiver': model7, 'thongbao.sinhvien': model8, 'thongbao.thongbao': model9, 'tienich.auditlog': model10, 'tienich.caidat': model11, 'tienich.phanhoi': model12, 'todo': model13 };

export type Model<T extends keyof typeof models> = {
  [key in keyof typeof models]: ReturnType<typeof models[T]>;
};

export type Models<T extends keyof typeof models> = Model<T>[T]

const dispatcher = new Dispatcher!();
const Exe = Executor!;

export default ({ children }: { children: React.ReactNode }) => {

  return (
    <UmiContext.Provider value={dispatcher}>
      {
        Object.entries(models).map(pair => (
          <Exe key={pair[0]} namespace={pair[0]} hook={pair[1] as any} onUpdate={(val: any) => {
            const [ns] = pair as [keyof typeof models, any];
            dispatcher.data[ns] = val;
            dispatcher.update(ns);
          }} />
        ))
      }
      {children}
    </UmiContext.Provider>
  )
}
