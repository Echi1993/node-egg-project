// This file is created by egg-ts-helper@1.24.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportMember from '../../../app/controller/member';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    member: ExportMember;
  }
}
