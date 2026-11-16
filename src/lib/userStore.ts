export interface MemoryUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  password_hash?: string;
  role: 'CEO' | 'MARKETING' | 'BUSINESS_DEVELOPER' | 'EMPLOYEE' | 'EXTERNAL_BD' | 'COORDINATOR' | 'PURCHASE_MANAGER';
  department: string;
  phone?: string;
  employee_id?: string;
}

export const globalUserStore: MemoryUser[] = [
  {
    _id: 'usr-ceo',
    name: 'Pratap Pawar (CEO)',
    email: 'ceo@airginternational.com',
    password: 'ceo123',
    password_hash: 'ceo123',
    role: 'CEO',
    department: 'Executive Management',
    phone: '9999988888',
    employee_id: 'EMP-CEO-00'
  },
  {
    _id: 'usr-ext-bd',
    name: 'Devidas Babanrao Ghogare',
    email: 'abhishekbuildcon22@gmail.com',
    password: 'Devidas@AirG2026',
    password_hash: 'Devidas@AirG2026',
    role: 'EXTERNAL_BD',
    department: 'External Partner Network',
    phone: '9309857250',
    employee_id: 'EXT-BD-01'
  }
];
